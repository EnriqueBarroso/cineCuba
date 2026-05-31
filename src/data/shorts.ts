import type { Movie } from './movies/types';

export const shorts: Movie[] = [
  {
    id: "por-primera-vez",
    title: "Por Primera Vez",
    year: 1967,
    director: "Octavio Cortázar",
    poster: "",
    duration: "",
    genre: ["Documental"],
    synopsis: "Documental que registra la primera proyección cinematográfica en un remoto pueblo de la Sierra Maestra. Uno de los cortos más celebrados del cine cubano, retrata la reacción genuina de campesinos ante el cine por primera vez.",
    tipo: "corto",
    duracionMinutos: 11,
  },
  {
    id: "el-megano",
    title: "El Mégano",
    year: 1955,
    director: "Julio García Espinosa",
    poster: "",
    duration: "",
    genre: ["Documental", "Drama"],
    synopsis: "Considerado el primer documental neorrealista cubano, retrata las duras condiciones de vida de los carboneros en la Ciénaga de Zapata antes de la Revolución. Fue censurado por el régimen de Batista.",
    tipo: "corto",
    duracionMinutos: 25,
  },
];
