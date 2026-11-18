import { movies } from "@/data/movies";
import type { Genre, Movie } from "@/data/movies";
import { GENRES, genreSlug } from "@/data/movies/genres";

export interface GenreGroup {
  genre: Genre;
  slug: string;
  /** Películas con este género (igualdad exacta sobre movie.genre, el mismo criterio que el filtro de /peliculas). */
  movies: Movie[];
}

/** Primero las películas cuyo género principal (el primero) es este; después las demás. Dentro de cada grupo: año descendente y título. */
export const sortGenreMovies = (list: Movie[], genre: Genre): Movie[] =>
  [...list].sort(
    (a, b) =>
      Number(b.genre[0] === genre) - Number(a.genre[0] === genre) ||
      b.year - a.year ||
      a.title.localeCompare(b.title, "es")
  );

/** Películas de un género, ya ordenadas para su página. */
export const getMoviesOfGenre = (genre: Genre): Movie[] => sortGenreMovies(movies.filter((m) => m.genre.includes(genre)), genre);

/**
 * Géneros con al menos una película, de más a menos películas (desempate alfabético 'es').
 * Un género o una película nueva aparecen solos: todo se calcula con los datos.
 */
export const getGenreGroups = (): GenreGroup[] =>
  GENRES.map((genre) => ({ genre, slug: genreSlug(genre), movies: getMoviesOfGenre(genre) }))
    .filter((g) => g.movies.length > 0)
    .sort((a, b) => b.movies.length - a.movies.length || a.genre.localeCompare(b.genre, "es"));
