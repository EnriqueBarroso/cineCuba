export type ContentType = "pelicula" | "serial" | "corto";

export interface Movie {
  id: string;
  title: string;
  year: number;
  director: string;
  poster: string;
  backdrop?: string;
  duration: string;
  genre: string[];
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
  | "Aventuras"    
  | "Musical"      
  | "Terror"    
  | "Crimen"      
  | "Road Movie"   

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
