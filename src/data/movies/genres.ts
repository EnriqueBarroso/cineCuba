/**
 * Fuente única de los géneros del catálogo (películas, sagas y seriales).
 *
 * Reglas:
 * - De 1 a MAX_GENRES (3) géneros por título.
 * - El primero es el principal (lo usa el Hero).
 * - Sin duplicados.
 * - No usar "Drama" de relleno si hay un género más preciso.
 * - "Deportivo" va como segundo o tercer género (argumento en torno a una práctica deportiva competitiva);
 *   el principal sigue siendo el tono (Drama, Comedia...).
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
  "Deportivo",
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

/**
 * Slug de URL de un género: minúsculas, sin tildes y con guiones ("Ciencia ficción" → "ciencia-ficcion").
 * Función pura y única: la usan las rutas /genero/<slug>, el prerender y el sitemap.
 */
export const genreSlug = (genre: string): string =>
  genre
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

/** Inversa de genreSlug: devuelve el género del vocabulario o undefined si el slug no existe. */
export const genreFromSlug = (slug: string): Genre | undefined => GENRES.find((genre) => genreSlug(genre) === slug);

/** Slugs de todos los géneros del vocabulario (los 20), en el orden de GENRES. */
export const GENRE_SLUGS: readonly string[] = GENRES.map(genreSlug);

/**
 * Textos de la página /genero/<slug>: título (también el h1) y descripción, con el recuento ya aplicado.
 * Regla general: "Películas cubanas de comedia". Excepciones para que se lea bien en español:
 * Deportivo → "Películas cubanas deportivas"; LGBT → "Cine cubano LGBT".
 */
export const genrePageTexts = (genre: Genre, count: number): { title: string; description: string } => {
  const one = count === 1;
  const films = one ? "película" : "películas";
  const tail = one ? "ficha y vídeo para ver online gratis" : "fichas y vídeos para ver online gratis";
  const archive = "en el archivo de cine cubano de CineCuba.";
  let title: string;
  let subject: string;
  if (genre === "Deportivo") {
    title = "Películas cubanas deportivas";
    subject = one ? "película cubana deportiva" : "películas cubanas deportivas";
  } else if (genre === "LGBT") {
    title = "Cine cubano LGBT";
    subject = `${films} de cine cubano LGBT`;
  } else {
    title = `Películas cubanas de ${genre.toLowerCase()}`;
    subject = `${one ? "película cubana" : "películas cubanas"} de ${genre.toLowerCase()}`;
  }
  return { title, description: `${count} ${subject}: ${tail} ${archive}` };
};
