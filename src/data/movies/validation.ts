/**
 * Utilidades de validación para el catálogo de películas
 * 
 * Uso: Ejecutar validateCatalog(movies) en desarrollo para detectar errores
 */

import type { Movie } from "./types";
import { GENRES, MAX_GENRES } from "./genres";
import { directorList } from "@/lib/directors";

export interface ValidationError {
  movieId: string;
  field: string;
  message: string;
  severity: "error" | "warning";
}

/**
 * Valida los géneros de una película, saga o serial contra el vocabulario cerrado (genres.ts):
 * entre 1 y MAX_GENRES géneros, todos en GENRES y sin repetidos.
 */
export function validateGenres(id: string, genre: readonly string[] | undefined): ValidationError[] {
  const errors: ValidationError[] = [];
  const fail = (message: string) =>
    errors.push({ movieId: id, field: "genre", message, severity: "error" });

  if (!genre || genre.length === 0) {
    fail("Debe tener al menos un género");
    return errors;
  }
  if (genre.length > MAX_GENRES) {
    fail(`Máximo ${MAX_GENRES} géneros (tiene ${genre.length}: ${genre.join(", ")})`);
  }
  const unknown = genre.filter((g) => !(GENRES as readonly string[]).includes(g));
  if (unknown.length > 0) {
    fail(`Géneros fuera del vocabulario: ${unknown.map((g) => `"${g}"`).join(", ")}`);
  }
  const repeated = genre.filter((g, i) => genre.indexOf(g) !== i);
  if (repeated.length > 0) {
    fail(`Géneros repetidos: ${[...new Set(repeated)].join(", ")}`);
  }
  return errors;
}

/**
 * Valida una película individual
 */
export function validateMovie(movie: Movie, allIds: Set<string>): ValidationError[] {
  const errors: ValidationError[] = [];
  
  // Validar ID único
  if (!movie.id || movie.id.trim() === "") {
    errors.push({
      movieId: movie.id || "UNKNOWN",
      field: "id",
      message: "El ID es obligatorio",
      severity: "error"
    });
  } else if (allIds.has(movie.id)) {
    errors.push({
      movieId: movie.id,
      field: "id",
      message: `ID duplicado: "${movie.id}"`,
      severity: "error"
    });
  }
  
  // Validar título
  if (!movie.title || movie.title.trim() === "") {
    errors.push({
      movieId: movie.id,
      field: "title",
      message: "El título es obligatorio",
      severity: "error"
    });
  }
  
  // Validar año
  if (!movie.year || movie.year < 1900 || movie.year > new Date().getFullYear() + 1) {
    errors.push({
      movieId: movie.id,
      field: "year",
      message: `Año inválido: ${movie.year}`,
      severity: "error"
    });
  }
  
  // Validar director
  if (directorList(movie.director).every((n) => !n || n.trim() === "")) {
    errors.push({
      movieId: movie.id,
      field: "director",
      message: "El director es obligatorio",
      severity: "error"
    });
  }
  
  // Validar poster
  if (!movie.poster) {
    errors.push({
      movieId: movie.id,
      field: "poster",
      message: "El poster es obligatorio",
      severity: "error"
    });
  }
  
  // Validar sinopsis
  if (!movie.synopsis || movie.synopsis.trim() === "") {
    errors.push({
      movieId: movie.id,
      field: "synopsis",
      message: "La sinopsis es obligatoria",
      severity: "error"
    });
  } else if (movie.synopsis.length < 50) {
    errors.push({
      movieId: movie.id,
      field: "synopsis",
      message: "La sinopsis debería tener al menos 50 caracteres",
      severity: "warning"
    });
  }
  
  // Validar duración
  if (!movie.duration || !movie.duration.match(/^\d+\s*min$/)) {
    errors.push({
      movieId: movie.id,
      field: "duration",
      message: `Formato de duración inválido: "${movie.duration}" (usar "XXX min")`,
      severity: "error"
    });
  }
  
  // Validar géneros
  errors.push(...validateGenres(movie.id, movie.genre));
  
  // Validar URL de trailer (si existe)
  if (movie.trailerUrl && !movie.trailerUrl.includes("youtube.com")) {
    errors.push({
      movieId: movie.id,
      field: "trailerUrl",
      message: "La URL del trailer debe ser de YouTube",
      severity: "warning"
    });
  }
  
  return errors;
}

/**
 * Valida todo el catálogo de películas
 */
export function validateCatalog(
  movies: Movie[],
  // Sagas u otros títulos de los que solo se comprueban los géneros
  others: ReadonlyArray<{ id: string; genre: readonly string[] }> = []
): ValidationError[] {
  const allErrors: ValidationError[] = [];
  for (const other of others) allErrors.push(...validateGenres(other.id, other.genre));
  const seenIds = new Set<string>();
  
  for (const movie of movies) {
    const movieErrors = validateMovie(movie, seenIds);
    allErrors.push(...movieErrors);
    
    if (movie.id) {
      seenIds.add(movie.id);
    }
  }
  
  return allErrors;
}

/**
 * Imprime un reporte de validación en consola
 */
export function printValidationReport(movies: Movie[]): void {
  const errors = validateCatalog(movies);
  
  if (errors.length === 0) {
    console.log("✅ Catálogo válido: No se encontraron errores");
    console.log(`📊 Total de películas: ${movies.length}`);
    return;
  }
  
  const errorCount = errors.filter(e => e.severity === "error").length;
  const warningCount = errors.filter(e => e.severity === "warning").length;
  
  console.group("🎬 Reporte de Validación del Catálogo");
  console.log(`📊 Total de películas: ${movies.length}`);
  console.log(`❌ Errores: ${errorCount}`);
  console.log(`⚠️ Advertencias: ${warningCount}`);
  console.log("");
  
  const groupedErrors = errors.reduce((acc, error) => {
    if (!acc[error.movieId]) acc[error.movieId] = [];
    acc[error.movieId].push(error);
    return acc;
  }, {} as Record<string, ValidationError[]>);
  
  for (const [movieId, movieErrors] of Object.entries(groupedErrors)) {
    console.group(`🎥 ${movieId}`);
    for (const error of movieErrors) {
      const icon = error.severity === "error" ? "❌" : "⚠️";
      console.log(`${icon} [${error.field}] ${error.message}`);
    }
    console.groupEnd();
  }
  
  console.groupEnd();
}

/**
 * Genera estadísticas del catálogo
 */
export function getCatalogStats(movies: Movie[]) {
  const byDecade = movies.reduce((acc, movie) => {
    const decade = Math.floor(movie.year / 10) * 10;
    acc[decade] = (acc[decade] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);
  
  const byDirector = movies.reduce((acc, movie) => {
    for (const name of directorList(movie.director)) acc[name] = (acc[name] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const byGenre = movies.reduce((acc, movie) => {
    for (const genre of movie.genre) {
      acc[genre] = (acc[genre] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);
  
  return {
    total: movies.length,
    byDecade,
    byDirector,
    byGenre,
    yearRange: {
      oldest: Math.min(...movies.map(m => m.year)),
      newest: Math.max(...movies.map(m => m.year))
    }
  };
}
