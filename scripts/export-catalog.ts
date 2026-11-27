/**
 * Exporta el catálogo de CineCuba a una hoja CSV y a una página HTML de búsqueda rápida,
 * para uso local (no se suben a git: la carpeta exports/ está en .gitignore).
 *
 * Uso:  npm run export:catalog        (equivale a: tsx scripts/export-catalog.ts)
 *
 * Genera, en exports/ (raíz del repo):
 *   - catalogo.csv              UTF-8 con BOM, separador ";" (se abre con doble clic en Excel en español)
 *   - catalogo-busqueda.html    un solo archivo autocontenido, sin dependencias ni peticiones de red
 *   - catalogo-identidad.json   instantánea de identidad (tipo, id, título, año, directores, título
 *                               normalizado) que usa CineCubaDownloader para detectar duplicados
 *
 * El HTML incluye además las pestañas "Actores" y "Directores" (quién tiene ficha, foto y en qué obras
 * aparece). Esos listados solo van en el HTML: el CSV y el JSON de identidad no los incluyen.
 *
 * Los datos reales (catalog.ts, sagas.ts, serials.ts, shorts.ts) importan pósters .jpg que tsx no sabe
 * cargar, así que se empaquetan en memoria con esbuild (ya instalado como dependencia de Vite),
 * sustituyendo cada imagen por su ruta de archivo.
 */
import { mkdirSync, readFileSync, renameSync, unlinkSync, writeFileSync } from "fs";
import { resolve, dirname, relative } from "path";
import { fileURLToPath } from "url";
import { build, type Plugin } from "esbuild";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const OUT_DIR = resolve(ROOT, "exports");
const BASE_URL = "https://cine-cubano.com";
const IDENTITY_TYPES = ["pelicula", "serial", "corto", "saga"] as const;

// ---------------------------------------------------------------------------
// 1) Carga de los datos reales
// ---------------------------------------------------------------------------

interface MovieLike {
  id: string;
  title: string;
  year: number;
  director: string | string[];
  poster?: string;
  duration?: string;
  genre?: string[];
  synopsis?: string;
  videoUrl?: string;
  awards?: { name: string; year: number; category?: string }[];
  cast?: { name: string; role: string }[];
}

interface SagaLike {
  id: string;
  title: string;
  director: string;
  anioInicio: number;
  anioFin: number;
  poster?: string;
  genre?: string[];
  synopsis?: string;
  tipo?: "corto" | "serial";
  episodios: { videoUrl?: string }[];
  cast?: { name: string; role: string }[];
  awards?: { name: string; year: number; category?: string }[];
}

interface ActorLike {
  id: string;
  name: string;
  biography: string;
  photo?: string;
}

interface DirectorLike {
  id: string;
  name: string;
  photo?: string;
}

interface CatalogData {
  movies: MovieLike[];
  serials: MovieLike[];
  shorts: MovieLike[];
  sagas: SagaLike[];
  actors: ActorLike[];
  directors: DirectorLike[];
  hasActorProfile: (actor: ActorLike) => boolean;
  getActorByName: (name: string) => ActorLike | undefined;
  directorList: (director: string | string[]) => string[];
  hasDirector: (director: string | string[], name: string) => boolean;
}

type IdentityType = (typeof IDENTITY_TYPES)[number];
interface IdentityEntry {
  tipo: IdentityType;
  id: string;
  titulo: string;
  anio: number;
  directores: string[];
  tituloNormalizado: string;
  subtipo?: "serial" | "corto";
}
interface IdentitySnapshot {
  schemaVersion: 1;
  generatedAt: string;
  source: "cine-cubano.com";
  count: number;
  entries: IdentityEntry[];
}

/** Los imports de imágenes (pósters) pasan a ser la ruta del archivo: solo importa que no estén vacíos. */
const assetPathPlugin: Plugin = {
  name: "asset-path",
  setup(b) {
    b.onLoad({ filter: /\.(jpe?g|png|webp|gif|avif|svg)$/i }, (args) => ({
      contents: `export default ${JSON.stringify(relative(ROOT, args.path).replace(/\\/g, "/"))};`,
      loader: "js",
    }));
  },
};

async function loadCatalog(): Promise<CatalogData> {
  const result = await build({
    stdin: {
      contents: [
        'export { movies } from "@/data/movies";',
        'export { serials } from "@/data/serials";',
        'export { shorts } from "@/data/shorts";',
        'export { sagas } from "@/data/sagas";',
        'export { actors, hasActorProfile, getActorByName } from "@/data/actors";',
        'export { directors } from "@/data/directors";',
        'export { directorList, hasDirector } from "@/lib/directors";',
      ].join("\n"),
      resolveDir: ROOT,
      loader: "ts",
    },
    bundle: true,
    write: false,
    platform: "node",
    format: "cjs",
    alias: { "@": resolve(ROOT, "src") },
    plugins: [assetPathPlugin],
    logLevel: "error",
  });
  const code = result.outputFiles[0].text;
  const mod = { exports: {} as Record<string, unknown> };
  new Function("module", "exports", code)(mod, mod.exports);
  return mod.exports as unknown as CatalogData;
}

// ---------------------------------------------------------------------------
// 2) Normalización a filas
// ---------------------------------------------------------------------------

type VideoKind = "archive.org" | "youtube" | "mixto" | "ninguno";

interface Row {
  tipo: string;
  id: string;
  titulo: string;
  anio: number;
  decada: string;
  directores: string;
  duracion: string;
  genero: string;
  num_reparto: number;
  tiene_sinopsis: "sí" | "no";
  tiene_poster: "sí" | "no";
  tipo_video: VideoKind;
  videoUrl: string;
  premios: string;
  url_web: string;
  reparto: string; // solo para el buscador (no va al CSV)
}

const yesNo = (v: unknown): "sí" | "no" => (v ? "sí" : "no");
const decadeOf = (year: number) => `${Math.floor(year / 10) * 10}s`;

const kindOfUrl = (url: string): "archive.org" | "youtube" | null =>
  /archive\.org/i.test(url) ? "archive.org" : /youtube\.com|youtu\.be/i.test(url) ? "youtube" : null;

function videoInfo(urls: string[]): { kind: VideoKind; url: string } {
  const valid = urls.filter(Boolean);
  if (!valid.length) return { kind: "ninguno", url: "" };
  const kinds = new Set(valid.map((u) => kindOfUrl(u) ?? "archive.org"));
  const kind: VideoKind = kinds.size > 1 ? "mixto" : (kinds.values().next().value as VideoKind);
  return { kind, url: valid[0] + (valid.length > 1 ? ` (+${valid.length - 1} más)` : "") };
}

function awardsSummary(awards: MovieLike["awards"]): string {
  if (!awards?.length) return "";
  const first = awards
    .slice(0, 3)
    .map((a) => `${a.name} ${a.year}${a.category ? ": " + a.category : ""}`)
    .join(" / ");
  const extra = awards.length > 3 ? ` (+${awards.length - 3} más)` : "";
  return `${awards.length} — ${first}${extra}`.slice(0, 220);
}

const castNames = (cast?: { name: string }[]) => (cast ?? []).map((c) => c.name).join(", ");

function fromMovie(m: MovieLike, tipo: string, route: string): Row {
  const video = videoInfo([m.videoUrl ?? ""]);
  return {
    tipo,
    id: m.id,
    titulo: m.title,
    anio: m.year,
    decada: decadeOf(m.year),
    directores: Array.isArray(m.director) ? m.director.join(" / ") : m.director,
    duracion: m.duration ?? "",
    genero: (m.genre ?? []).join(" / "),
    num_reparto: m.cast?.length ?? 0,
    tiene_sinopsis: yesNo(m.synopsis?.trim()),
    tiene_poster: yesNo(m.poster),
    tipo_video: video.kind,
    videoUrl: video.url,
    premios: awardsSummary(m.awards),
    url_web: `${BASE_URL}/${route}/${m.id}`,
    reparto: castNames(m.cast),
  };
}

function fromSaga(s: SagaLike): Row {
  const video = videoInfo(s.episodios.map((e) => e.videoUrl ?? ""));
  return {
    tipo: s.tipo === "serial" ? "saga (serie)" : "saga (cortos)",
    id: s.id,
    titulo: s.title,
    anio: s.anioInicio,
    decada: decadeOf(s.anioInicio),
    directores: s.director,
    duracion: `${s.episodios.length} ep.`,
    genero: (s.genre ?? []).join(" / "),
    num_reparto: s.cast?.length ?? 0,
    tiene_sinopsis: yesNo(s.synopsis?.trim()),
    tiene_poster: yesNo(s.poster),
    tipo_video: video.kind,
    videoUrl: video.url,
    premios: awardsSummary(s.awards),
    url_web: `${BASE_URL}/saga/${s.id}`,
    reparto: castNames(s.cast),
  };
}

function buildRows(data: CatalogData): Row[] {
  const rows: Row[] = [
    ...data.movies.map((m) => fromMovie(m, "película", "pelicula")),
    ...data.serials.map((m) => fromMovie(m, "serial", "serial")),
    ...data.shorts.map((m) => fromMovie(m, "corto", "corto")),
    ...data.sagas.map(fromSaga),
  ];
  return rows.sort((a, b) => a.anio - b.anio || a.titulo.localeCompare(b.titulo, "es"));
}

// Mirrors the searcher's title normalization (NFD, no diacritics, lowercase,
// parenthesized year removed, punctuation collapsed) while preserving articles.
function normalizeIdentityTitle(title: string): string {
  return title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    .replace(/\(\s*\d{4}\s*\)/g, " ").replace(/[^a-z0-9]+/g, " ").trim();
}

function buildIdentityEntries(data: CatalogData): IdentityEntry[] {
  const entries: IdentityEntry[] = [
    ...data.movies.map((m): IdentityEntry => ({ tipo: "pelicula", id: m.id, titulo: m.title, anio: m.year,
      directores: Array.isArray(m.director) ? m.director : [m.director], tituloNormalizado: normalizeIdentityTitle(m.title) })),
    ...data.serials.map((m): IdentityEntry => ({ tipo: "serial", id: m.id, titulo: m.title, anio: m.year,
      directores: Array.isArray(m.director) ? m.director : [m.director], tituloNormalizado: normalizeIdentityTitle(m.title) })),
    ...data.shorts.map((m): IdentityEntry => ({ tipo: "corto", id: m.id, titulo: m.title, anio: m.year,
      directores: Array.isArray(m.director) ? m.director : [m.director], tituloNormalizado: normalizeIdentityTitle(m.title) })),
    ...data.sagas.map((s): IdentityEntry => ({ tipo: "saga", id: s.id, titulo: s.title, anio: s.anioInicio,
      directores: [s.director], tituloNormalizado: normalizeIdentityTitle(s.title), ...(s.tipo ? { subtipo: s.tipo } : {}) })),
  ];
  const seen = new Set<string>();
  const duplicates = new Set<string>();
  for (const entry of entries) {
    const key = `${entry.tipo}\0${entry.id}`;
    if (seen.has(key)) duplicates.add(`${entry.tipo}/${entry.id}`);
    seen.add(key);
  }
  if (duplicates.size) throw new Error(`IDs duplicados dentro del mismo tipo: ${[...duplicates].join(", ")}`);
  return entries.sort((a, b) => a.tipo < b.tipo ? -1 : a.tipo > b.tipo ? 1 : a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
}

function validateIdentitySnapshot(value: unknown): asserts value is IdentitySnapshot {
  if (!value || typeof value !== "object") throw new Error("El snapshot JSON no contiene un objeto raíz");
  const snapshot = value as Partial<IdentitySnapshot>;
  if (snapshot.schemaVersion !== 1 || snapshot.source !== "cine-cubano.com" ||
      typeof snapshot.generatedAt !== "string" || !Number.isFinite(Date.parse(snapshot.generatedAt)) ||
      !Array.isArray(snapshot.entries) || snapshot.count !== snapshot.entries.length) {
    throw new Error("El snapshot JSON no cumple el esquema de identidad esperado");
  }
  const seen = new Set<string>();
  for (const raw of snapshot.entries) {
    const entry = raw as IdentityEntry;
    if (!entry || !IDENTITY_TYPES.includes(entry.tipo) || typeof entry.id !== "string" ||
        typeof entry.titulo !== "string" || !Number.isInteger(entry.anio) ||
        !Array.isArray(entry.directores) || !entry.directores.every((d) => typeof d === "string") ||
        typeof entry.tituloNormalizado !== "string" ||
        (entry.tipo === "saga" && entry.subtipo !== undefined && entry.subtipo !== "serial" && entry.subtipo !== "corto") ||
        (entry.tipo !== "saga" && entry.subtipo !== undefined)) {
      throw new Error("Una entrada del snapshot JSON no cumple el esquema de identidad esperado");
    }
    const key = `${entry.tipo}\0${entry.id}`;
    if (seen.has(key)) throw new Error(`ID duplicado en snapshot: ${entry.tipo}/${entry.id}`);
    seen.add(key);
  }
  const sorted = [...snapshot.entries].sort((a, b) => a.tipo < b.tipo ? -1 : a.tipo > b.tipo ? 1 : a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
  if (snapshot.entries.some((entry, index) => entry.tipo !== sorted[index].tipo || entry.id !== sorted[index].id)) {
    throw new Error("Las entradas del snapshot no están ordenadas por tipo e ID");
  }
}

function writeIdentitySnapshot(path: string, entries: IdentityEntry[]): void {
  const snapshot: IdentitySnapshot = { schemaVersion: 1, generatedAt: new Date().toISOString(), source: "cine-cubano.com", count: entries.length, entries };
  const tempPath = `${path}.${process.pid}.${Date.now()}.tmp`;
  try {
    writeFileSync(tempPath, `${JSON.stringify(snapshot, null, 2)}\n`, "utf-8");
    const parsed: unknown = JSON.parse(readFileSync(tempPath, "utf-8"));
    validateIdentitySnapshot(parsed);
    renameSync(tempPath, path);
  } catch (error) {
    try { unlinkSync(tempPath); } catch { /* the temporary file may not exist */ }
    throw error;
  }
}

// ---------------------------------------------------------------------------
// 3) CSV (UTF-8 con BOM, separador ";", saltos CRLF)
// ---------------------------------------------------------------------------

const CSV_COLUMNS: (keyof Row)[] = [
  "tipo", "id", "titulo", "anio", "decada", "directores", "duracion", "genero", "num_reparto",
  "tiene_sinopsis", "tiene_poster", "tipo_video", "videoUrl", "premios", "url_web",
];

const csvCell = (v: unknown) => {
  const s = String(v ?? "");
  return /[;"\r\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

function toCsv(rows: Row[]): string {
  const lines = [CSV_COLUMNS.join(";"), ...rows.map((r) => CSV_COLUMNS.map((c) => csvCell(r[c])).join(";"))];
  return "﻿" + lines.join("\r\n") + "\r\n";
}

// ---------------------------------------------------------------------------
// 4) Página HTML autocontenida
// ---------------------------------------------------------------------------

// Plantilla con String.raw: las barras invertidas del JS del cliente se conservan tal cual.
// Regla: dentro de la plantilla no usar acentos graves ni "${".
const HTML_TEMPLATE = String.raw`<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Catálogo CineCuba — búsqueda local</title>
<style>
  :root { --bg:#0a0a0a; --panel:#121212; --line:#262626; --text:#ededed; --muted:#9ca3af; --gold:#d1a347; --ok:#4ade80; --bad:#f87171; }
  * { box-sizing: border-box; }
  body { margin:0; background:var(--bg); color:var(--text); font:15px/1.45 system-ui, -apple-system, "Segoe UI", Roboto, sans-serif; }
  header { padding:20px 20px 12px; border-bottom:1px solid var(--line); position:sticky; top:0; background:var(--bg); z-index:5; }
  h1 { margin:0 0 4px; font:700 20px Georgia, "Times New Roman", serif; }
  h1 span { color:var(--gold); }
  .meta { color:var(--muted); font-size:13px; }
  .tabs { display:flex; flex-wrap:wrap; gap:8px; margin-top:12px; }
  .tab { background:transparent; color:var(--muted); border:1px solid var(--line); border-radius:8px; padding:6px 12px; cursor:pointer; font:inherit; }
  .tab[aria-selected="true"] { color:#000; background:var(--gold); border-color:var(--gold); font-weight:600; }
  main { padding:16px 20px 40px; max-width:1200px; margin:0 auto; }
  .bar { display:flex; flex-wrap:wrap; gap:10px; align-items:center; margin-bottom:12px; }
  input[type=search] { flex:1 1 280px; min-width:0; background:var(--panel); color:var(--text); border:1px solid var(--line); border-radius:10px; padding:11px 14px; font:inherit; font-size:16px; }
  input[type=search]:focus, textarea:focus, select:focus { outline:2px solid var(--gold); outline-offset:1px; }
  select { background:var(--panel); color:var(--text); border:1px solid var(--line); border-radius:8px; padding:9px 10px; font:inherit; }
  label.chk { display:inline-flex; gap:6px; align-items:center; color:var(--muted); cursor:pointer; user-select:none; }
  .count { color:var(--gold); font-weight:600; margin:4px 0 10px; }
  .wrap { overflow-x:auto; border:1px solid var(--line); border-radius:10px; }
  table { width:100%; border-collapse:collapse; min-width:560px; }
  th, td { text-align:left; padding:8px 10px; border-bottom:1px solid var(--line); vertical-align:top; }
  th { color:var(--muted); font-weight:600; font-size:12px; text-transform:uppercase; letter-spacing:.06em; background:var(--panel); position:sticky; top:0; cursor:pointer; white-space:nowrap; }
  tbody tr:hover { background:#161616; }
  td.t { font-weight:600; }
  td.n { white-space:nowrap; color:var(--muted); }
  a { color:var(--gold); text-decoration:none; }
  a:hover { text-decoration:underline; }
  .tag { display:inline-block; padding:1px 7px; border-radius:999px; border:1px solid var(--line); color:var(--muted); font-size:12px; white-space:nowrap; }
  .tag.none { color:var(--bad); border-color:#5b2a2a; }
  .tag.yes { color:var(--ok); border-color:#244b32; }
  table.people { min-width:0; }
  td.titles { color:var(--muted); font-size:13px; }
  .sub { display:none; color:var(--muted); font-size:12px; font-weight:400; margin-top:2px; }
  .empty { padding:24px; color:var(--muted); text-align:center; }
  textarea { width:100%; min-height:170px; background:var(--panel); color:var(--text); border:1px solid var(--line); border-radius:10px; padding:12px; font:inherit; resize:vertical; }
  button.act { background:var(--gold); color:#000; border:0; border-radius:8px; padding:9px 14px; font:inherit; font-weight:600; cursor:pointer; }
  button.sec { background:transparent; color:var(--text); border:1px solid var(--line); border-radius:8px; padding:9px 14px; font:inherit; cursor:pointer; }
  .res { margin-top:14px; }
  .line { display:flex; gap:10px; align-items:baseline; padding:6px 0; border-bottom:1px solid var(--line); flex-wrap:wrap; }
  .badge { font-weight:700; font-size:12px; letter-spacing:.06em; min-width:54px; }
  .badge.ok { color:var(--ok); } .badge.no { color:var(--bad); }
  .src { color:var(--muted); }
  .summary { margin:12px 0; color:var(--muted); }
  [hidden] { display:none !important; }
  @media (max-width: 700px) { .hide-sm { display:none; } .sub { display:block; } header, main { padding-left:12px; padding-right:12px; } }
</style>
</head>
<body>
<header>
  <h1>Cine<span>Cuba</span> · catálogo</h1>
  <div class="meta" id="meta"></div>
  <div class="tabs" role="tablist">
    <button class="tab" role="tab" id="tab-buscar" aria-selected="true">Buscar</button>
    <button class="tab" role="tab" id="tab-lista" aria-selected="false">Comprobar lista</button>
    <button class="tab" role="tab" id="tab-actores" aria-selected="false">Actores</button>
    <button class="tab" role="tab" id="tab-directores" aria-selected="false">Directores</button>
  </div>
</header>
<main>
  <section id="vista-buscar">
    <div class="bar">
      <input type="search" id="q" placeholder="Buscar por título, director o reparto…" autocomplete="off" autofocus aria-label="Buscar">
    </div>
    <div class="bar">
      <select id="f-tipo" aria-label="Tipo"><option value="">Todos los tipos</option></select>
      <select id="f-decada" aria-label="Década"><option value="">Todas las décadas</option></select>
      <label class="chk"><input type="checkbox" id="f-sinvideo"> sin vídeo</label>
      <label class="chk"><input type="checkbox" id="f-sinposter"> sin póster</label>
      <label class="chk"><input type="checkbox" id="f-sinsinopsis"> sin sinopsis</label>
    </div>
    <div class="count" id="count" aria-live="polite"></div>
    <div class="wrap">
      <table>
        <thead><tr>
          <th data-k="titulo">Título</th><th data-k="anio">Año</th><th data-k="directores">Director</th>
          <th data-k="duracion" class="hide-sm">Duración</th><th data-k="tipo">Tipo</th>
          <th data-k="tipo_video" class="hide-sm">Vídeo</th><th>Ficha</th>
        </tr></thead>
        <tbody id="tbody"></tbody>
      </table>
      <div class="empty" id="empty" hidden>Sin resultados.</div>
    </div>
  </section>
  <section id="vista-lista" hidden>
    <p class="meta">Pega títulos, uno por línea. Se compara sin acentos, mayúsculas, signos ni artículos iniciales (el, la, los, las, un, una).</p>
    <textarea id="lista" placeholder="Las doce sillas&#10;Memorias del subdesarrollo&#10;…" aria-label="Lista de títulos"></textarea>
    <div class="bar" style="margin-top:10px">
      <button class="act" id="comprobar">Comprobar</button>
      <button class="sec" id="copiar" hidden>Copiar los que FALTAN</button>
      <span class="meta" id="copiado" aria-live="polite"></span>
    </div>
    <div class="summary" id="resumen"></div>
    <div class="res" id="resultado"></div>
  </section>
  <section id="vista-actores" hidden>
    <div class="bar">
      <input type="search" id="q-actores" placeholder="Buscar actor o título…" autocomplete="off" aria-label="Buscar actor">
    </div>
    <div class="bar">
      <select id="f-actores" aria-label="Ficha"></select>
      <select id="m-actores" aria-label="Número de películas"></select>
    </div>
    <div class="count" id="count-actores" aria-live="polite"></div>
    <div class="wrap">
      <table class="people">
        <thead><tr>
          <th data-p="n">Nombre</th><th data-p="f">Ficha</th><th data-p="p">Foto</th><th data-p="c">Películas</th><th class="hide-sm">Títulos</th>
        </tr></thead>
        <tbody id="tbody-actores"></tbody>
      </table>
      <div class="empty" id="empty-actores" hidden>Sin resultados.</div>
    </div>
  </section>
  <section id="vista-directores" hidden>
    <div class="bar">
      <input type="search" id="q-directores" placeholder="Buscar director o título…" autocomplete="off" aria-label="Buscar director">
    </div>
    <div class="bar">
      <select id="f-directores" aria-label="Ficha"></select>
    </div>
    <div class="count" id="count-directores" aria-live="polite"></div>
    <div class="wrap">
      <table class="people">
        <thead><tr>
          <th data-p="n">Nombre</th><th data-p="f">Ficha</th><th data-p="p">Foto</th><th data-p="c">Películas</th><th class="hide-sm">Títulos</th>
        </tr></thead>
        <tbody id="tbody-directores"></tbody>
      </table>
      <div class="empty" id="empty-directores" hidden>Sin resultados.</div>
    </div>
  </section>
</main>
<script>
var DATA = __DATA__;
var ACTORES = __ACTORES__;
var DIRECTORES = __DIRECTORES__;
var GENERADO = "__GENERADO__";

function norm(s) {
  return (s || "").toString().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}
function normTitle(s) {
  var t = norm(s).replace(/\(\s*\d{4}\s*\)/g, " ").replace(/[^a-z0-9]+/g, " ").trim();
  return t.replace(/^(el|la|los|las|un|una|unos|unas)\s+/, "");
}
function esc(s) {
  return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; });
}

DATA.forEach(function (d) {
  d._s = norm(d.titulo + " " + d.directores + " " + d.reparto);
  d._t = normTitle(d.titulo);
});

var $ = function (id) { return document.getElementById(id); };
$("meta").textContent = DATA.length + " entradas · generado el " + GENERADO + " · datos incrustados, sin conexión";

// Filtros
function fillSelect(id, values) {
  var el = $(id);
  values.forEach(function (v) { var o = document.createElement("option"); o.value = v; o.textContent = v; el.appendChild(o); });
}
function uniq(key) {
  var seen = {}, out = [];
  DATA.forEach(function (d) { if (!seen[d[key]]) { seen[d[key]] = 1; out.push(d[key]); } });
  return out.sort();
}
fillSelect("f-tipo", uniq("tipo"));
fillSelect("f-decada", uniq("decada"));

var sortKey = null, sortDir = 1;

function render() {
  var tokens = norm($("q").value).split(/\s+/).filter(Boolean);
  var tipo = $("f-tipo").value, dec = $("f-decada").value;
  var sv = $("f-sinvideo").checked, sp = $("f-sinposter").checked, ss = $("f-sinsinopsis").checked;
  var rows = DATA.filter(function (d) {
    if (tipo && d.tipo !== tipo) return false;
    if (dec && d.decada !== dec) return false;
    if (sv && d.tipo_video !== "ninguno") return false;
    if (sp && d.tiene_poster !== "no") return false;
    if (ss && d.tiene_sinopsis !== "no") return false;
    for (var i = 0; i < tokens.length; i++) { if (d._s.indexOf(tokens[i]) < 0) return false; }
    return true;
  });
  if (sortKey) {
    rows = rows.slice().sort(function (a, b) {
      var x = a[sortKey], y = b[sortKey];
      var r = typeof x === "number" && typeof y === "number" ? x - y : String(x).localeCompare(String(y), "es");
      return r * sortDir;
    });
  }
  $("count").textContent = rows.length + (rows.length === 1 ? " resultado" : " resultados") + " de " + DATA.length;
  $("empty").hidden = rows.length !== 0;
  $("tbody").innerHTML = rows.map(function (d) {
    var v = d.tipo_video === "ninguno" ? '<span class="tag none">sin vídeo</span>' : '<span class="tag">' + esc(d.tipo_video) + "</span>";
    return "<tr><td class=\"t\">" + esc(d.titulo) + "</td><td class=\"n\">" + esc(d.anio) + "</td><td>" + esc(d.directores) +
      "</td><td class=\"n hide-sm\">" + esc(d.duracion) + "</td><td class=\"n\">" + esc(d.tipo) +
      "</td><td class=\"hide-sm\">" + v + "</td><td><a href=\"" + esc(d.url_web) + "\" target=\"_blank\" rel=\"noopener noreferrer\">Ver ficha</a></td></tr>";
  }).join("");
}

["q", "f-tipo", "f-decada", "f-sinvideo", "f-sinposter", "f-sinsinopsis"].forEach(function (id) {
  $(id).addEventListener(id === "q" ? "input" : "change", render);
});
Array.prototype.forEach.call(document.querySelectorAll("th[data-k]"), function (th) {
  th.addEventListener("click", function () {
    var k = th.getAttribute("data-k");
    if (sortKey === k) sortDir = -sortDir; else { sortKey = k; sortDir = 1; }
    render();
  });
});

// Pestañas
var VISTAS = ["buscar", "lista", "actores", "directores"];
var FOCO = { buscar: "q", lista: "lista", actores: "q-actores", directores: "q-directores" };
function showTab(which) {
  VISTAS.forEach(function (v) {
    $("vista-" + v).hidden = v !== which;
    $("tab-" + v).setAttribute("aria-selected", String(v === which));
  });
  $(FOCO[which]).focus();
}
VISTAS.forEach(function (v) {
  $("tab-" + v).addEventListener("click", function () { showTab(v); });
});

// Comprobar lista
function buscarTitulo(linea) {
  var l = normTitle(linea);
  if (!l) return [];
  var exact = DATA.filter(function (d) { return d._t === l; });
  if (exact.length) return exact;
  var contiene = l.length >= 3 ? DATA.filter(function (d) { return d._t.indexOf(l) >= 0; }) : [];
  if (contiene.length) return contiene;
  return DATA.filter(function (d) { return d._t.length >= 5 && l.indexOf(d._t) >= 0; });
}

var faltan = [];
$("comprobar").addEventListener("click", function () {
  var lineas = $("lista").value.split(/\r?\n/).map(function (s) { return s.trim(); }).filter(Boolean);
  faltan = [];
  var estan = 0, html = "";
  lineas.forEach(function (linea) {
    var m = buscarTitulo(linea);
    if (m.length) {
      estan++;
      var extra = m.length > 1 ? " (+" + (m.length - 1) + " más)" : "";
      html += '<div class="line"><span class="badge ok">ESTÁ</span><span>' + esc(linea) + '</span><span class="src">→ ' + esc(m[0].titulo) + " (" + esc(m[0].anio) + ")" + extra + "</span></div>";
    } else {
      faltan.push(linea);
      html += '<div class="line"><span class="badge no">FALTA</span><span>' + esc(linea) + "</span></div>";
    }
  });
  $("resultado").innerHTML = html;
  $("resumen").textContent = lineas.length ? estan + " ESTÁN · " + faltan.length + " FALTAN · " + lineas.length + " líneas" : "No hay líneas que comprobar.";
  $("copiar").hidden = faltan.length === 0;
  $("copiado").textContent = "";
});

$("copiar").addEventListener("click", function () {
  var texto = faltan.join("\n");
  function listo() { $("copiado").textContent = "Copiado (" + faltan.length + ")"; }
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(texto).then(listo, function () { copiarAlternativo(texto); listo(); });
  } else { copiarAlternativo(texto); listo(); }
});
function copiarAlternativo(texto) {
  var ta = document.createElement("textarea");
  ta.value = texto; ta.style.position = "fixed"; ta.style.opacity = "0";
  document.body.appendChild(ta); ta.select();
  try { document.execCommand("copy"); } catch (e) { /* sin portapapeles */ }
  document.body.removeChild(ta);
}

// Actores y Directores: una fila por persona; "o" son índices de DATA.
function titulosDe(o) {
  return o.map(function (i) { return DATA[i].titulo + " (" + DATA[i].anio + ")"; });
}
function prepararPersonas(list) {
  list.forEach(function (p) {
    p.c = p.o.length;
    p._t = titulosDe(p.o).join(" · ");
    p._s = norm(p.n + " " + p._t);
  });
}
function sino(v) { return v ? '<span class="tag yes">sí</span>' : '<span class="tag none">no</span>'; }
function contar(list, fn) { return list.filter(fn).length; }

function vistaPersonas(cfg) {
  var sortKey = "c", sortDir = -1;
  var tbody = $("tbody-" + cfg.id);
  function render() {
    var tokens = norm($("q-" + cfg.id).value).split(/\s+/).filter(Boolean);
    var rows = cfg.list.filter(function (p) {
      if (!cfg.filtro(p)) return false;
      for (var i = 0; i < tokens.length; i++) { if (p._s.indexOf(tokens[i]) < 0) return false; }
      return true;
    });
    rows = rows.slice().sort(function (a, b) {
      var x = a[sortKey], y = b[sortKey];
      var r = typeof x === "number" && typeof y === "number" ? x - y : String(x).localeCompare(String(y), "es");
      return r !== 0 ? r * sortDir : a.n.localeCompare(b.n, "es");
    });
    $("count-" + cfg.id).textContent = rows.length + (rows.length === 1 ? " resultado" : " resultados") + " de " + cfg.list.length;
    $("empty-" + cfg.id).hidden = rows.length !== 0;
    tbody.innerHTML = rows.map(function (p) {
      var foto = p.f ? sino(p.p) : '<span class="meta">—</span>';
      var tit = p._t ? esc(p._t) : '<span class="meta">sin obras</span>';
      return '<tr><td class="t">' + esc(p.n) + '<div class="sub">' + tit + "</div></td><td>" + sino(p.f) + "</td><td>" + foto +
        '</td><td class="n">' + p.c + '</td><td class="titles hide-sm">' + tit + "</td></tr>";
    }).join("");
  }
  prepararPersonas(cfg.list);
  cfg.selects.forEach(function (s) {
    var el = $(s.id);
    s.opciones.forEach(function (o) {
      var op = document.createElement("option");
      op.value = o.v; op.textContent = o.t + (o.n === undefined ? "" : " (" + o.n + ")");
      el.appendChild(op);
    });
    el.addEventListener("change", render);
  });
  $("q-" + cfg.id).addEventListener("input", render);
  Array.prototype.forEach.call(document.querySelectorAll("#vista-" + cfg.id + " th[data-p]"), function (th) {
    th.addEventListener("click", function () {
      var k = th.getAttribute("data-p");
      if (sortKey === k) sortDir = -sortDir; else { sortKey = k; sortDir = k === "n" ? 1 : -1; }
      render();
    });
  });
  render();
}

(function () {
  prepararPersonas(ACTORES);
  var fa = $("f-actores"), ma = $("m-actores");
  vistaPersonas({
    id: "actores", list: ACTORES,
    selects: [
      { id: "f-actores", opciones: [
        { v: "", t: "Todos", n: ACTORES.length },
        { v: "con", t: "Con ficha", n: contar(ACTORES, function (p) { return p.f; }) },
        { v: "sin", t: "Sin ficha", n: contar(ACTORES, function (p) { return !p.f; }) },
        { v: "sinfoto", t: "Con ficha sin foto", n: contar(ACTORES, function (p) { return p.f && !p.p; }) }
      ] },
      { id: "m-actores", opciones: [
        { v: "1", t: "Cualquier nº de películas" },
        { v: "2", t: "2 o más películas", n: contar(ACTORES, function (p) { return p.c >= 2; }) },
        { v: "3", t: "3 o más películas", n: contar(ACTORES, function (p) { return p.c >= 3; }) }
      ] }
    ],
    filtro: function (p) {
      var f = fa.value;
      if (f === "con" && !p.f) return false;
      if (f === "sin" && p.f) return false;
      if (f === "sinfoto" && !(p.f && !p.p)) return false;
      return p.c >= Number(ma.value);
    }
  });
  prepararPersonas(DIRECTORES);
  var fd = $("f-directores");
  vistaPersonas({
    id: "directores", list: DIRECTORES,
    selects: [
      { id: "f-directores", opciones: [
        { v: "", t: "Todos", n: DIRECTORES.length },
        { v: "con", t: "Con ficha", n: contar(DIRECTORES, function (p) { return p.f; }) },
        { v: "sin", t: "Sin ficha", n: contar(DIRECTORES, function (p) { return !p.f; }) },
        { v: "sinobras", t: "Ficha sin películas", n: contar(DIRECTORES, function (p) { return p.f && p.c === 0; }) }
      ] }
    ],
    filtro: function (p) {
      var f = fd.value;
      if (f === "con") return !!p.f;
      if (f === "sin") return !p.f;
      if (f === "sinobras") return !!p.f && p.c === 0;
      return true;
    }
  });
})();

render();
$("q").focus();
</script>
</body>
</html>
`;

// ---------------------------------------------------------------------------
// 4b) Listados de personas para las pestañas "Actores" y "Directores" (solo HTML)
// ---------------------------------------------------------------------------

/** Una persona: n = nombre, f = tiene ficha (0/1), p = tiene foto (0/1), o = índices de obras en DATA. */
interface PersonRow {
  n: string;
  f: 0 | 1;
  p: 0 | 1;
  o: number[];
}

const normText = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

/** Entre grafías equivalentes (solo tildes/mayúsculas) gana la más usada y, a igualdad, la que más tildes lleva. */
function pickSpelling(counts: Map<string, number>): string {
  return [...counts.entries()].sort(
    (a, b) => b[1] - a[1] || b[0].normalize("NFD").length - a[0].normalize("NFD").length || a[0].localeCompare(b[0], "es")
  )[0][0];
}

function sortPeople(list: PersonRow[]): PersonRow[] {
  return list.sort((a, b) => b.o.length - a.o.length || a.n.localeCompare(b.n, "es"));
}

function buildActorRows(data: CatalogData, rows: Row[]): PersonRow[] {
  const index = new Map(rows.map((r, i) => [r.id, i]));
  const works: { id: string; cast?: { name: string }[] }[] = [...data.movies, ...data.serials, ...data.shorts, ...data.sagas];
  type Acc = { names: Map<string, number>; actor?: ActorLike; o: Set<number> };
  const people = new Map<string, Acc>();
  for (const w of works) {
    const i = index.get(w.id);
    if (i === undefined) continue;
    for (const c of w.cast ?? []) {
      const name = (c.name ?? "").trim();
      if (!name) continue;
      const actor = data.getActorByName(name);
      const key = actor ? "id:" + actor.id : "n:" + normText(name);
      let p = people.get(key);
      if (!p) {
        p = { names: new Map(), actor, o: new Set() };
        people.set(key, p);
      }
      p.names.set(name, (p.names.get(name) ?? 0) + 1);
      p.o.add(i);
    }
  }
  const out: PersonRow[] = [...people.values()].map((p) => {
    const ficha = p.actor !== undefined && data.hasActorProfile(p.actor);
    return {
      n: p.actor ? p.actor.name : pickSpelling(p.names),
      f: ficha ? 1 : 0,
      p: ficha && p.actor?.photo ? 1 : 0,
      o: [...p.o].sort((a, b) => a - b),
    };
  });
  return sortPeople(out);
}

/** Separa el director "en cadena" de una saga (" y ", "," o "&"), salvo que la cadena entera sea una ficha. */
function splitSagaDirector(name: string, fichaNames: Set<string>): string[] {
  if (fichaNames.has(normText(name))) return [name];
  return name.split(/\s+y\s+|\s*,\s*|\s*&\s*/i).map((s) => s.trim()).filter(Boolean);
}

function buildDirectorRows(data: CatalogData, rows: Row[]): { list: PersonRow[]; splitSagas: { saga: string; director: string; names: string[] }[] } {
  const index = new Map(rows.map((r, i) => [r.id, i]));
  const fichaNames = new Set(data.directors.map((d) => normText(d.name)));
  const splitSagas: { saga: string; director: string; names: string[] }[] = [];

  // Obras de cada director con ficha: misma coincidencia que la web (hasDirector / includes en sagas).
  const films = [...data.movies, ...data.serials, ...data.shorts];
  const list: PersonRow[] = data.directors.map((d) => {
    const o = new Set<number>();
    for (const m of films) {
      const i = index.get(m.id);
      if (i !== undefined && data.hasDirector(m.director, d.name)) o.add(i);
    }
    for (const s of data.sagas) {
      const i = index.get(s.id);
      if (i !== undefined && s.director.includes(d.name)) o.add(i);
    }
    return { n: d.name, f: 1, p: d.photo ? 1 : 0, o: [...o].sort((a, b) => a - b) };
  });

  // Directores sin ficha: nombres de películas (directorList) y de sagas (separando solo si hace falta).
  type Acc = { names: Map<string, number>; o: Set<number> };
  const others = new Map<string, Acc>();
  const add = (name: string, i: number) => {
    const clean = name.trim();
    if (!clean || fichaNames.has(normText(clean))) return;
    const key = normText(clean);
    let a = others.get(key);
    if (!a) {
      a = { names: new Map(), o: new Set() };
      others.set(key, a);
    }
    a.names.set(clean, (a.names.get(clean) ?? 0) + 1);
    a.o.add(i);
  };
  for (const m of films) {
    const i = index.get(m.id);
    if (i !== undefined) data.directorList(m.director).forEach((n) => add(n, i));
  }
  for (const s of data.sagas) {
    const i = index.get(s.id);
    if (i === undefined) continue;
    const names = splitSagaDirector(s.director, fichaNames);
    if (names.length > 1) splitSagas.push({ saga: s.id, director: s.director, names });
    names.forEach((n) => add(n, i));
  }
  others.forEach((a) =>
    list.push({ n: pickSpelling(a.names), f: 0, p: 0, o: [...a.o].sort((x, y) => x - y) })
  );
  return { list: sortPeople(list), splitSagas };
}

function toHtml(rows: Row[], actorRows: PersonRow[], directorRows: PersonRow[]): string {
  // Datos incrustados como JSON; "<" escapado para que nunca cierre el <script>.
  const embed = (value: unknown) =>
    JSON.stringify(value)
      .replace(/</g, "\\u003c")
      .split(String.fromCharCode(0x2028)).join(" ")
      .split(String.fromCharCode(0x2029)).join(" ");
  const stamp = new Date().toISOString().slice(0, 16).replace("T", " ");
  return HTML_TEMPLATE
    .replace("__DATA__", () => embed(rows))
    .replace("__ACTORES__", () => embed(actorRows))
    .replace("__DIRECTORES__", () => embed(directorRows))
    .replace("__GENERADO__", () => stamp);
}

// ---------------------------------------------------------------------------
// 5) Ejecución
// ---------------------------------------------------------------------------

async function main() {
  const data = await loadCatalog();
  const rows = buildRows(data);
  const identityEntries = buildIdentityEntries(data);
  const actorRows = buildActorRows(data, rows);
  const { list: directorRows, splitSagas } = buildDirectorRows(data, rows);

  mkdirSync(OUT_DIR, { recursive: true });
  const csvPath = resolve(OUT_DIR, "catalogo.csv");
  const htmlPath = resolve(OUT_DIR, "catalogo-busqueda.html");
  const identityPath = resolve(OUT_DIR, "catalogo-identidad.json");
  writeFileSync(csvPath, toCsv(rows), "utf-8");
  writeFileSync(htmlPath, toHtml(rows, actorRows, directorRows), "utf-8");
  writeIdentitySnapshot(identityPath, identityEntries);

  const porTipo: Record<string, number> = {};
  rows.forEach((r) => (porTipo[r.tipo] = (porTipo[r.tipo] ?? 0) + 1));
  console.log(`✓ ${rows.length} filas exportadas a CSV y HTML; ${identityEntries.length} identidades JSON`);
  Object.entries(porTipo).forEach(([t, n]) => console.log(`   ${t.padEnd(14)} ${n}`));
  console.log(`   CSV:  ${csvPath}`);
  console.log(`   HTML: ${htmlPath}`);
  const identityByType: Record<string, number> = {};
  identityEntries.forEach((entry) => (identityByType[entry.tipo] = (identityByType[entry.tipo] ?? 0) + 1));
  IDENTITY_TYPES.forEach((t) => console.log(`   JSON ${t.padEnd(10)} ${identityByType[t] ?? 0}`));
  console.log(`   JSON: ${identityPath}`);
  const conFicha = actorRows.filter((a) => a.f === 1);
  console.log(
    `   Actores:    ${actorRows.length} (con ficha ${conFicha.length}, con ficha sin foto ${conFicha.filter((a) => a.p === 0).length}, sin ficha ${actorRows.length - conFicha.length})`
  );
  const dirFicha = directorRows.filter((d) => d.f === 1);
  console.log(
    `   Directores: ${directorRows.length} (con ficha ${dirFicha.length}, sin ficha ${directorRows.length - dirFicha.length}, ficha sin películas ${dirFicha.filter((d) => d.o.length === 0).length})`
  );
  splitSagas.forEach((s) => console.log(`   saga ${s.saga}: director "${s.director}" separado en ${s.names.map((n) => `"${n}"`).join(" + ")}`));
}

main().catch((e) => {
  console.error("✗ Error al exportar CSV, HTML o snapshot de identidad:", e);
  process.exit(1);
});
