/**
 * Tipos y definiciones para el catálogo de películas
 */

export interface Movie {
  /** ID único de la película (formato: titulo-año, ej: "lucia-1968") */
  id: string;
  
  /** Título de la película */
  title: string;
  
  /** Año de estreno */
  year: number;
  
  /** Director principal */
  director: string;
  
  /** Imagen del poster (import desde assets/posters) */
  poster: string;
  
  /** para el header carrucel */
  backdrop?: string;
  /** Sinopsis de la película */
  synopsis: string;
  
  /** Duración (formato: "XXX min") */
  duration: string;
  
  /** Géneros de la película */
  genre: Genre[];
  
  // === CAMPOS OPCIONALES ===
  
  /** URL del trailer (YouTube embed URL) */
  trailerUrl?: string;
  
  /** URL del video completo */
  videoUrl?: string;
  
  /** Premios recibidos */
  awards?: Award[];
  
  /** Elenco principal */
  cast?: CastMember[];
  
  /** País de producción (default: Cuba) */
  country?: string;
  
  /** Idioma original */
  language?: string;
  
  /** Notas adicionales o curiosidades */
  notes?: string;
}

/** Géneros disponibles para las películas */
export type Genre =
  | "Drama"
  | "Comedia"
  | "Histórico"
  | "Documental"
  | "Romance"
  | "Thriller"
  | "Animación"
  | "Experimental"
  | "Aventuras"    // <--- Nuevo
  | "Musical"      // <--- Nuevo (para Habana Blues)
  | "Terror"       // <--- Nuevo (para Juan de los Muertos)
  | "Crimen"       // <--- Nuevo (para Hacerse el Sueco)
  | "Road Movie"   // <--- Nuevo (para Miel para Oshún)
  | "Surrealista"; // <--- Nuevo (para La vida es silbar)

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
