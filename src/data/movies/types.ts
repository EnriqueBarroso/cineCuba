import type { Genre } from "./genres";

export type ContentType = "pelicula" | "serial" | "corto";

export interface Movie {
  id: string;
  title: string;
  year: number;
  director: string | string[];
  poster: string;
  backdrop?: string;
  duration: string;
  genre: Genre[];
  synopsis: string;
  videoUrl?: string;
  trailerUrl?: string;
  awards?: Award[];
  cast?: CastMember[];
  notes?: string;
  // Tipo de contenido — omitir equivale a "pelicula"
  tipo?: ContentType;
  // Campos de seriales
  temporadas?: number;
  episodios?: number;
  estado?: "completo" | "parcial";
  // Campos de cortos
  duracionMinutos?: number;
  // Disponibilidad de reproducción — omitir equivale a true
  disponible?: boolean;
}

/** Géneros disponibles: la fuente de verdad es ./genres.ts */
export type { Genre } from "./genres";

/** Estructura para premios */
export interface Award {
  name: string;
  year: number;
  category?: string;
}

/** Estructura para miembros del elenco */
export interface CastMember {
  name: string;
  role: string;
}
