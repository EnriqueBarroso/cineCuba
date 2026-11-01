/**
 * Fuente única de los géneros del catálogo (películas, sagas y seriales).
 *
 * Reglas:
 * - De 1 a MAX_GENRES (3) géneros por título.
 * - El primero es el principal (lo usa el Hero).
 * - Sin duplicados.
 * - No usar "Drama" de relleno si hay un género más preciso.
 *
 * El orden de GENRES es el del desplegable de filtros. Para añadir un género nuevo:
 * añádelo aquí y documéntalo en CONTRIBUTING.md; el tipo, la validación y los filtros lo recogen solos.
 */
export const GENRES = [
  "Drama",
  "Comedia",
  "Romance",
  "Histórico",
  "Bélico",
  "Musical",
  "Animación",
  "Documental",
  "Fantasía",
  "Terror",
  "Ciencia ficción",
  "Thriller",
  "Crimen",
  "Aventuras",
  "Biopic",
  "Experimental",
  "Infantil",
  "Sátira",
  "LGBT",
  "Road Movie",
] as const;

export type Genre = (typeof GENRES)[number];

export const MAX_GENRES = 3;

export const isGenre = (value: string): value is Genre =>
  (GENRES as readonly string[]).includes(value);

/** Recuento de títulos por género, en el orden de GENRES y solo con los que tienen al menos uno. */
export function getGenreCounts(items: ReadonlyArray<{ genre: readonly Genre[] }>): { genre: Genre; count: number }[] {
  return GENRES.map((genre) => ({
    genre,
    count: items.filter((item) => item.genre.includes(genre)).length,
  })).filter(({ count }) => count > 0);
}
