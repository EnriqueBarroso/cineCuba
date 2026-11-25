/**
 * Rotación semanal determinista del hero de la portada.
 *
 * Lógica PURA (sin imports de assets ni de datos) para poder usarla desde vite.config.ts,
 * desde el componente y desde tests.
 *
 * Cómo funciona:
 *  - La semana es la semana ISO en UTC (lunes a domingo), con clave "AAAA-Www".
 *  - Con la clave se obtiene un índice de semana (nº de semanas desde 1970). El hero toma una
 *    ventana de N entradas distintas sobre un flujo infinito de barajados del pool (mulberry32 +
 *    Fisher–Yates, semilla = nº de ciclo). La ventana avanza N posiciones por semana: cada entrada
 *    sale de forma repartida y ninguna aparece todas las semanas.
 *  - Misma semana ⇒ misma selección y mismo orden. Nada de Math.random ni de localStorage.
 */

export interface HeroRotationConfig {
  /** Nº de destacadas por semana. */
  count: number;
  /** Si es true, las entradas con `pinned` aparecen siempre (ocupan huecos de `count`). */
  usePinned: boolean;
}

const DAY_MS = 86_400_000;
const WEEK_MS = 7 * DAY_MS;
/** Lunes 5 de enero de 1970 (UTC): primer lunes tras el epoch. */
const FIRST_MONDAY_MS = Date.UTC(1970, 0, 5);
const SALT = "cinecuba-hero-v1";

/** Clave de semana ISO en UTC, p. ej. "2026-W48". */
export function isoWeekKey(date: Date): string {
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const dayNum = d.getUTCDay() || 7; // lunes=1 … domingo=7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum); // jueves de la semana ISO: fija el año ISO
  const isoYear = d.getUTCFullYear();
  const yearStart = Date.UTC(isoYear, 0, 1);
  const week = Math.ceil(((d.getTime() - yearStart) / DAY_MS + 1) / 7);
  return `${isoYear}-W${String(week).padStart(2, "0")}`;
}

/** Nº de semanas completas desde 1970 hasta el lunes de la semana ISO indicada. */
export function weekIndexFromKey(key: string): number {
  const m = /^(\d{4})-W(\d{2})$/.exec(key);
  if (!m) throw new Error(`Clave de semana no válida: "${key}" (se espera AAAA-Www)`);
  const year = Number(m[1]);
  const week = Number(m[2]);
  // El 4 de enero siempre cae en la semana 1 ISO.
  const jan4 = new Date(Date.UTC(year, 0, 4));
  const jan4Dow = jan4.getUTCDay() || 7;
  const mondayWeek1 = jan4.getTime() - (jan4Dow - 1) * DAY_MS;
  const monday = mondayWeek1 + (week - 1) * WEEK_MS;
  return Math.round((monday - FIRST_MONDAY_MS) / WEEK_MS);
}

/** Hash de cadena → entero de 32 bits (FNV-1a). */
function hashString(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** PRNG mulberry32: devuelve números en [0, 1). */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Fisher–Yates determinista. No modifica el original. */
export function shuffleSeeded<T>(items: readonly T[], seed: number): T[] {
  const arr = items.slice();
  const rand = mulberry32(seed);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Elige las destacadas de la semana `weekKey` a partir de `pool` (que debe contener solo entradas válidas).
 * Si el pool tiene `count` entradas o menos, las devuelve todas en su orden.
 */
export function selectHeroEntries<T extends { pinned?: boolean }>(
  pool: readonly T[],
  weekKey: string,
  config: HeroRotationConfig
): T[] {
  const count = Math.max(1, Math.floor(config.count));
  if (pool.length <= count) return pool.slice();

  const pinned = config.usePinned ? pool.filter((e) => e.pinned).slice(0, count) : [];
  const rest = pool.filter((e) => !pinned.includes(e));
  const slots = count - pinned.length;
  if (slots <= 0) return pinned;
  if (rest.length <= slots) return [...pinned, ...rest];

  const r = rest.length;
  const step = slots;
  const perms = new Map<number, T[]>();
  const streamAt = (i: number): T => {
    const cycle = Math.floor(i / r);
    let perm = perms.get(cycle);
    if (!perm) {
      perm = shuffleSeeded(rest, hashString(`${SALT}|${r}|cycle-${cycle}`));
      perms.set(cycle, perm);
    }
    return perm[i % r];
  };

  // Ventana de `slots` entradas distintas sobre el flujo, empezando en weekIndex * step.
  const picked: T[] = [];
  const seen = new Set<T>();
  for (let i = weekIndexFromKey(weekKey) * step; picked.length < slots; i++) {
    const e = streamAt(i);
    if (!seen.has(e)) {
      seen.add(e);
      picked.push(e);
    }
  }
  return [...pinned, ...picked];
}
