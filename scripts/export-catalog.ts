/**
 * Exporta el catálogo de CineCuba a una hoja CSV y a una página HTML de búsqueda rápida,
 * para uso local (no se suben a git: la carpeta exports/ está en .gitignore).
 *
 * Uso:  npm run export:catalog        (equivale a: tsx scripts/export-catalog.ts)
 *
 * Genera, en exports/ (raíz del repo):
 *   - catalogo.csv              UTF-8 con BOM, separador ";" (se abre con doble clic en Excel en español)
 *   - catalogo-busqueda.html    un solo archivo autocontenido, sin dependencias ni peticiones de red
 *
 * Los datos reales (catalog.ts, sagas.ts, serials.ts, shorts.ts) importan pósters .jpg que tsx no sabe
 * cargar, así que se empaquetan en memoria con esbuild (ya instalado como dependencia de Vite),
 * sustituyendo cada imagen por su ruta de archivo.
 */
import { mkdirSync, writeFileSync } from "fs";
import { resolve, dirname, relative } from "path";
import { fileURLToPath } from "url";
import { build, type Plugin } from "esbuild";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const OUT_DIR = resolve(ROOT, "exports");
const BASE_URL = "https://cine-cubano.com";

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

interface CatalogData {
  movies: MovieLike[];
  serials: MovieLike[];
  shorts: MovieLike[];
  sagas: SagaLike[];
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
  .tabs { display:flex; gap:8px; margin-top:12px; }
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
  @media (max-width: 700px) { .hide-sm { display:none; } header, main { padding-left:12px; padding-right:12px; } }
</style>
</head>
<body>
<header>
  <h1>Cine<span>Cuba</span> · catálogo</h1>
  <div class="meta" id="meta"></div>
  <div class="tabs" role="tablist">
    <button class="tab" role="tab" id="tab-buscar" aria-selected="true">Buscar</button>
    <button class="tab" role="tab" id="tab-lista" aria-selected="false">Comprobar lista</button>
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
</main>
<script>
var DATA = __DATA__;
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
function showTab(which) {
  var lista = which === "lista";
  $("vista-buscar").hidden = lista;
  $("vista-lista").hidden = !lista;
  $("tab-buscar").setAttribute("aria-selected", String(!lista));
  $("tab-lista").setAttribute("aria-selected", String(lista));
  (lista ? $("lista") : $("q")).focus();
}
$("tab-buscar").addEventListener("click", function () { showTab("buscar"); });
$("tab-lista").addEventListener("click", function () { showTab("lista"); });

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

render();
$("q").focus();
</script>
</body>
</html>
`;

function toHtml(rows: Row[]): string {
  // Datos incrustados como JSON; "<" escapado para que nunca cierre el <script>.
  const data = JSON.stringify(rows)
    .replace(/</g, "\\u003c")
    .split(String.fromCharCode(0x2028)).join(" ")
    .split(String.fromCharCode(0x2029)).join(" ");
  const stamp = new Date().toISOString().slice(0, 16).replace("T", " ");
  return HTML_TEMPLATE.replace("__DATA__", () => data).replace("__GENERADO__", () => stamp);
}

// ---------------------------------------------------------------------------
// 5) Ejecución
// ---------------------------------------------------------------------------

async function main() {
  const data = await loadCatalog();
  const rows = buildRows(data);

  mkdirSync(OUT_DIR, { recursive: true });
  const csvPath = resolve(OUT_DIR, "catalogo.csv");
  const htmlPath = resolve(OUT_DIR, "catalogo-busqueda.html");
  writeFileSync(csvPath, toCsv(rows), "utf-8");
  writeFileSync(htmlPath, toHtml(rows), "utf-8");

  const porTipo: Record<string, number> = {};
  rows.forEach((r) => (porTipo[r.tipo] = (porTipo[r.tipo] ?? 0) + 1));
  console.log(`✓ ${rows.length} filas exportadas`);
  Object.entries(porTipo).forEach(([t, n]) => console.log(`   ${t.padEnd(14)} ${n}`));
  console.log(`   CSV:  ${csvPath}`);
  console.log(`   HTML: ${htmlPath}`);
}

main().catch((e) => {
  console.error("✗ Error al exportar el catálogo:", e);
  process.exit(1);
});
