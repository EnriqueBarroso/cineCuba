export interface Movie {
  id: string;
  title: string;
  year: number;
  director: string;
  poster: string;
  backdrop?: string; // Opcional
  duration: string;
  genre: string[]; // Array de strings
  synopsis: string;
  videoUrl?: string;   // AQUÍ irá la PELÍCULA COMPLETA (Archive.org)
  trailerUrl?: string; // AQUÍ irá el TRAILER (YouTube) <--- ¡NUEVO!
  awards?: Award[];
  cast?: CastMember[];
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
