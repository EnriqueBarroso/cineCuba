export interface Episodio {
  id: string;
  titulo: string;
  anio: number;
  sinopsis?: string;
  duracionMinutos?: number;
  videoUrl?: string;
}

export interface Saga {
  id: string;
  title: string;
  director: string;
  anioInicio: number;
  anioFin: number;
  poster: string;
  genre: string[];
  synopsis: string;
  estado: "completo" | "parcial";
  tipo?: "corto" | "serial"; // omitir = "corto"
  episodios: Episodio[];
  cast?: { name: string; role: string }[];
  awards?: { name: string; category: string; year: number }[];
  // Temporadas o entregas relacionadas (ej. otra temporada de la misma serie)
  relatedSeasons?: { id: string; label: string }[];
}

export const sagas: Saga[] = [
  {
    id: "nicanor-odonnell",
    title: "Nicanor O'Donnell",
    director: "Eduardo del Llano",
    anioInicio: 2004,
    anioFin: 2019,
    poster: "/images/sagas/nicanor-odonnell.jpg",
    genre: ["Comedia"],
    synopsis:
      "La saga más irreverente del cine cubano independiente. Quince cortometrajes que siguen las aventuras de Nicanor O'Donnell, un intelectual habanero que enfrenta con humor y sarcasmo las contradicciones de la sociedad cubana contemporánea. Dirigida y escrita por Eduardo del Llano, la serie se convirtió en un fenómeno cultural dentro y fuera de Cuba.",
    estado: "completo",
    episodios: [
      {
        id: "monte-rouge",
        titulo: "Monte Rouge",
        anio: 2004,
        sinopsis:
          "Unos agentes de la Seguridad del Estado llegan al apartamento de Nicanor para instalar micrófonos, llegando al absurdo de pedirle colaboración por falta de presupuesto.",
        videoUrl: "https://archive.org/embed/domino-new-complete-episode-of-nicanor-o-27-donnell-tales-by-eduardo-del-llano-2-c-fea/Cortometraje_cubano_MONTE_ROUGE_-_Eduardo_del_Llano_-__con_Luis_Alberto_Garcia_e.mp4",
      },
      {
        id: "high-tech",
        titulo: "High Tech",
        anio: 2005,
      },
      {
        id: "photoshop",
        titulo: "Photoshop",
        anio: 2006,
        videoUrl: "https://www.youtube.com/embed/V71wt0hyk8I",
      },
      {
        id: "homo-sapiens",
        titulo: "Homo Sapiens",
        anio: 2006,
        videoUrl: "https://www.youtube.com/embed/4X_M7Qy7Rms",
      },
      {
        id: "intermezzo",
        titulo: "Intermezzo",
        anio: 2008,
        videoUrl: "https://www.youtube.com/embed/sN1uxY_EJSo",
      },
      {
        id: "brainstorm",
        titulo: "Brainstorm",
        anio: 2009,
        videoUrl: "https://www.youtube.com/embed/Ut-GB-8_y8U",
      },
      {
        id: "pas-de-quatre",
        titulo: "Pas de Quatre",
        anio: 2009,
        videoUrl: "https://archive.org/embed/domino-new-complete-episode-of-nicanor-o-27-donnell-tales-by-eduardo-del-llano-2-c-fea/Nicanor_O_27Donnell_-_Pas_de_Quatre.mp4",
      },
      {
        id: "ache",
        titulo: "Aché",
        anio: 2010,
        videoUrl: "https://www.youtube.com/embed/YoDByMx2LCc",
      },
      {
        id: "pravda",
        titulo: "Pravda",
        anio: 2010,
        videoUrl: "https://www.youtube.com/embed/D_ebNArkQVE",
      },
      {
        id: "exit",
        titulo: "Exit",
        anio: 2011,
        videoUrl: "https://www.youtube.com/embed/YqnnBLp1TFI",
      },
      {
        id: "arte",
        titulo: "Arte",
        anio: 2015,
        videoUrl:"https://archive.org/embed/domino-new-complete-episode-of-nicanor-o-27-donnell-tales-by-eduardo-del-llano-2-c-fea/ARTE_Episodio_11_corto_de__Nicanor%2C_Los_Cuentos_de_Nicanor_O_Donnell_comedia_cub.mp4"
      },
      {
        id: "epica",
        titulo: "Épica",
        anio: 2015,
      },
      {
        id: "domino",
        titulo: "Dominó",
        anio: 2017,
        sinopsis:
          "Nicanor y sus amigos debaten qué pasaría si un jeque árabe comprara Cuba por 5.000 millones de dólares.",
          videoUrl:"https://archive.org/embed/domino-new-complete-episode-of-nicanor-o-27-donnell-tales-by-eduardo-del-llano-2-c-fea/DOMINO_new_complete_episode_of_NICANOR_O_27DONNELL_TALES_by_Eduardo_del_Llano_2C_fea.mp4"
      },
      {
        id: "rallame-la-zanahoria",
        titulo: "Rállame la zanahoria",
        anio: 2018,
      },
      {
        id: "dos-veteranos",
        titulo: "Dos veteranos",
        anio: 2019,
        duracionMinutos: 22,
        sinopsis:
          "Historia de ciencia ficción en un futuro cercano, grabada enteramente en croma con efectos visuales destacados. Capítulo final de la saga principal.",
      },
    ],
    cast: [
      { name: "Luis Alberto García", role: "Nicanor O'Donnell" },
      { name: "Néstor Jiménez", role: "Elenco recurrente" },
      { name: "Osvaldo Doimeadiós", role: "Elenco recurrente" },
      { name: "Mario Guerra", role: "Elenco recurrente" },
      { name: "Carlos Gonzalvo", role: "Elenco recurrente" },
    ],
  },
  {
    id: "algo-mas-que-sonar",
    title: "Algo más que soñar",
    director: "Eduardo Moya",
    anioInicio: 1985,
    anioFin: 1985,
    poster: "/images/sagas/algo-mas-que-sonar.jpg",
    tipo: "serial",
    genre: ["Drama", "Bélico", "Romance"],
    synopsis:
      "Un clásico irrepetible de la televisión cubana. A principios de los años 80, las Fuerzas Armadas Revolucionarias reclutan estudiantes para formarlos como oficiales. Esta es la historia de cuatro jóvenes cadetes — Carlos Manuel, Antonio, Ignacio y sus compañeras — sus amores, sueños y realidades, desde que ingresan en la escuela militar hasta su participación en la guerra de Angola. Con música de Pablo Milanés, la serie se convirtió en un fenómeno generacional que marcó a millones de cubanos.",
    estado: "completo",
    episodios: [
      {
        id: "algo-mas-que-sonar-e01",
        titulo: "Capítulo 1",
        anio: 1985,
        videoUrl: "https://archive.org/embed/algo-mas-que-sonar-1x-08/Algo%20Mas%20Que%20So%C3%B1ar%20-%201x01.avi",
      },
      {
        id: "algo-mas-que-sonar-e02",
        titulo: "Capítulo 2",
        anio: 1985,
        videoUrl: "https://archive.org/embed/algo-mas-que-sonar-1x-08/Algo%20Mas%20Que%20So%C3%B1ar%20-%201x02.avi",
      },
      {
        id: "algo-mas-que-sonar-e03",
        titulo: "Capítulo 3",
        anio: 1985,
        videoUrl: "https://www.youtube.com/embed/jH6hs6NcxWQ",
      },
      {
        id: "algo-mas-que-sonar-e04",
        titulo: "Capítulo 4",
        anio: 1985,
        videoUrl: "https://www.youtube.com/embed/7rsG3MuWaEU",
      },
      {
        id: "algo-mas-que-sonar-e05",
        titulo: "Capítulo 5",
        anio: 1985,
        videoUrl: "https://archive.org/embed/algo-mas-que-sonar-1x-08/Algo%20Mas%20Que%20So%C3%B1ar%20-%201x05.avi",
      },
      {
        id: "algo-mas-que-sonar-e06",
        titulo: "Capítulo 6",
        anio: 1985,
        videoUrl: "https://archive.org/embed/algo-mas-que-sonar-1x-08/Algo%20Mas%20Que%20So%C3%B1ar%20-%201x06.avi",
      },
      {
        id: "algo-mas-que-sonar-e07",
        titulo: "Capítulo 7",
        anio: 1985,
        videoUrl: "https://archive.org/embed/algo-mas-que-sonar-1x-08/Algo%20Mas%20Que%20So%C3%B1ar%20-%201x07.avi",
      },
      {
        id: "algo-mas-que-sonar-e08",
        titulo: "Capítulo 8",
        anio: 1985,
        videoUrl: "https://archive.org/embed/algo-mas-que-sonar-1x-08/Algo%20Mas%20Que%20So%C3%B1ar%20-%201x08.avi",
      },
      {
        id: "algo-mas-que-sonar-e09",
        titulo: "Capítulo 9",
        anio: 1985,
        videoUrl: "https://archive.org/embed/algo-mas-que-sonar-1x-08/Algo%20Mas%20Que%20So%C3%B1ar%20-%201x09.avi",
      },
    ],
    cast: [
      { name: "Patricio Wood", role: "Carlos Manuel" },
      { name: "Luis Alberto García", role: "Antonio" },
      { name: "Isabel Santos", role: "protagonista" },
      { name: "Beatriz Valdés", role: "protagonista" },
      { name: "Rolando Brito", role: "Ignacio" },
      { name: "Enrique Álvarez", role: "Máximo" },
      { name: "Aida Hernández", role: "Ana" },
      { name: "Obelia Blanco", role: "reparto" },
      { name: "Martha del Río", role: "reparto" },
    ],
  },
  {
    id: "su-propia-guerra",
    title: "Su propia guerra",
    director: "Abel Ponce y José Andrés Torres",
    anioInicio: 1990,
    anioFin: 1990,
    poster: "",
    tipo: "serial",
    genre: ["Policíaco", "Drama", "Acción"],
    synopsis:
      "Miniserie policíaca perteneciente al espacio 'Día y Noche' de la televisión cubana, estrenada al inicio del Período Especial. Narra la historia de Octavio Sánchez Guzmán, conocido como 'El Tavo', un hombre de respeto en la delincuencia callejera habanera que, tras ser arrestado, es captado por el DTI (Departamento Técnico de Investigaciones) de la Policía Cubana. Se convierte en agente encubierto, infiltrado en los bajos fondos de La Habana mientras ayuda a neutralizar importantes grupos delictivos. Se convirtió en una de las series más populares y recordadas de la televisión cubana.",
    estado: "completo",
    episodios: [
      {
        id: "su-propia-guerra-e01",
        titulo: "Capítulo 1",
        anio: 1990,
        videoUrl: "https://archive.org/embed/su-propia-guerra-1x-05/Su%20propia%20guerra%201x01.mp4",
      },
      {
        id: "su-propia-guerra-e02",
        titulo: "Capítulo 2",
        anio: 1990,
        videoUrl: "https://archive.org/embed/su-propia-guerra-1x-05/Su%20propia%20guerra%201x02.mp4",
      },
      {
        id: "su-propia-guerra-e03",
        titulo: "Capítulo 3",
        anio: 1990,
        videoUrl: "https://archive.org/embed/su-propia-guerra-1x-05/Su%20propia%20guerra%201x03.mp4",
      },
      {
        id: "su-propia-guerra-e04",
        titulo: "Capítulo 4",
        anio: 1990,
        videoUrl: "https://archive.org/embed/su-propia-guerra-1x-05/Su%20propia%20guerra%201x04.mp4",
      },
      {
        id: "su-propia-guerra-e05",
        titulo: "Capítulo 5",
        anio: 1990,
        videoUrl: "https://archive.org/embed/su-propia-guerra-1x-05/Su%20propia%20guerra%201x05.mp4",
      },
      {
        id: "su-propia-guerra-e06",
        titulo: "Capítulo 6",
        anio: 1990,
        videoUrl: "https://archive.org/embed/su-propia-guerra-1x-05/Su%20propia%20guerra%201x06.mp4",
      },
      {
        id: "su-propia-guerra-e07",
        titulo: "Capítulo 7",
        anio: 1990,
        videoUrl: "https://archive.org/embed/su-propia-guerra-1x-05/Su%20propia%20guerra%201x07.mp4",
      },
      {
        id: "su-propia-guerra-e08",
        titulo: "Capítulo 8",
        anio: 1990,
        videoUrl: "https://archive.org/embed/su-propia-guerra-1x-05/Su%20propia%20guerra%201x08.mp4",
      },
      {
        id: "su-propia-guerra-e09",
        titulo: "Capítulo 9",
        anio: 1990,
        videoUrl: "https://archive.org/embed/su-propia-guerra-1x-05/Su%20propia%20guerra%201x09.mp4",
      },
      {
        id: "su-propia-guerra-e10",
        titulo: "Capítulo 10",
        anio: 1990,
        videoUrl: "https://archive.org/embed/su-propia-guerra-1x-05/Su%20propia%20guerra%201x10.mp4",
      },
    ],
    cast: [
      { name: "Alberto Pujols", role: "" },
      { name: "Fidel Pérez Michel", role: "" },
      { name: "Orlando Fundichely", role: "" },
      { name: "César Évora", role: "" },
      { name: "Jorge Villazón", role: "" },
      { name: "Sirio Soto", role: "" },
      { name: "Coralia Veloz", role: "" },
    ],
    relatedSeasons: [{ id: "su-propia-guerra-2", label: "Temporada 2" }],
  },
  {
    id: "su-propia-guerra-2",
    title: "Su propia guerra 2",
    director: "Abel Ponce y José Andrés Torres",
    anioInicio: 1991,
    anioFin: 1991,
    poster: "",
    tipo: "serial",
    genre: ["Policíaco", "Drama", "Acción"],
    synopsis:
      "Segunda temporada de la exitosa miniserie policíaca cubana. El Tavo, ya consolidado como agente encubierto del DTI, continúa infiltrado en el ambiente de la delincuencia callejera cubana, involucrándose en nuevos y turbulentos 'negocios' mientras libra su particular guerra entre dos mundos.",
    estado: "completo",
    episodios: [
      {
        id: "su-propia-guerra-2-e01",
        titulo: "Capítulo 1",
        anio: 1991,
        videoUrl: "https://archive.org/embed/su-propia-guerra-2x-18/Su%20propia%20guerra%202x01.mp4",
      },
      {
        id: "su-propia-guerra-2-e02",
        titulo: "Capítulo 2",
        anio: 1991,
        videoUrl: "https://archive.org/embed/su-propia-guerra-2x-18/Su%20propia%20guerra%202x02.mp4",
      },
      {
        id: "su-propia-guerra-2-e03",
        titulo: "Capítulo 3",
        anio: 1991,
        videoUrl: "https://archive.org/embed/su-propia-guerra-2x-18/Su%20propia%20guerra%202x03.mp4",
      },
      {
        id: "su-propia-guerra-2-e04",
        titulo: "Capítulo 4",
        anio: 1991,
        videoUrl: "https://archive.org/embed/su-propia-guerra-2x-18/Su%20propia%20guerra%202x04.mp4",
      },
      {
        id: "su-propia-guerra-2-e05",
        titulo: "Capítulo 5",
        anio: 1991,
        videoUrl: "https://archive.org/embed/su-propia-guerra-2x-18/Su%20propia%20guerra%202x05.mp4",
      },
      {
        id: "su-propia-guerra-2-e06",
        titulo: "Capítulo 6",
        anio: 1991,
        videoUrl: "https://archive.org/embed/su-propia-guerra-2x-18/Su%20propia%20guerra%202x06.mp4",
      },
      {
        id: "su-propia-guerra-2-e07",
        titulo: "Capítulo 7",
        anio: 1991,
        videoUrl: "https://archive.org/embed/su-propia-guerra-2x-18/Su%20propia%20guerra%202x07.mp4",
      },
      {
        id: "su-propia-guerra-2-e08",
        titulo: "Capítulo 8",
        anio: 1991,
        videoUrl: "https://archive.org/embed/su-propia-guerra-2x-18/Su%20propia%20guerra%202x08.mp4",
      },
      {
        id: "su-propia-guerra-2-e09",
        titulo: "Capítulo 9",
        anio: 1991,
        videoUrl: "https://archive.org/embed/su-propia-guerra-2x-18/Su%20propia%20guerra%202x09.mp4",
      },
      {
        id: "su-propia-guerra-2-e10",
        titulo: "Capítulo 10",
        anio: 1991,
        videoUrl: "https://archive.org/embed/su-propia-guerra-2x-18/Su%20propia%20guerra%202x10.mp4",
      },
      {
        id: "su-propia-guerra-2-e11",
        titulo: "Capítulo 11",
        anio: 1991,
        videoUrl: "https://archive.org/embed/su-propia-guerra-2x-18/Su%20propia%20guerra%202x11.mp4",
      },
      {
        id: "su-propia-guerra-2-e12",
        titulo: "Capítulo 12",
        anio: 1991,
        videoUrl: "https://archive.org/embed/su-propia-guerra-2x-18/Su%20propia%20guerra%202x12.mp4",
      },
      {
        id: "su-propia-guerra-2-e13",
        titulo: "Capítulo 13",
        anio: 1991,
        videoUrl: "https://archive.org/embed/su-propia-guerra-2x-18/Su%20propia%20guerra%202x13.mp4",
      },
      {
        id: "su-propia-guerra-2-e14",
        titulo: "Capítulo 14",
        anio: 1991,
        videoUrl: "https://archive.org/embed/su-propia-guerra-2x-18/Su%20propia%20guerra%202x14.mp4",
      },
      {
        id: "su-propia-guerra-2-e15",
        titulo: "Capítulo 15",
        anio: 1991,
        videoUrl: "https://archive.org/embed/su-propia-guerra-2x-18/Su%20propia%20guerra%202x15.mp4",
      },
      {
        id: "su-propia-guerra-2-e16",
        titulo: "Capítulo 16",
        anio: 1991,
        videoUrl: "https://archive.org/embed/su-propia-guerra-2x-18/Su%20propia%20guerra%202x16.mp4",
      },
      {
        id: "su-propia-guerra-2-e17",
        titulo: "Capítulo 17",
        anio: 1991,
        videoUrl: "https://archive.org/embed/su-propia-guerra-2x-18/Su%20propia%20guerra%202x17.mp4",
      },
      {
        id: "su-propia-guerra-2-e18",
        titulo: "Capítulo 18",
        anio: 1991,
        videoUrl: "https://archive.org/embed/su-propia-guerra-2x-18/Su%20propia%20guerra%202x18.mp4",
      },
      {
        id: "su-propia-guerra-2-e19",
        titulo: "Capítulo 19",
        anio: 1991,
        videoUrl: "https://archive.org/embed/su-propia-guerra-2x-18/Su%20propia%20guerra%202x19.mp4",
      },
    ],
    cast: [
      { name: "Alberto Pujols", role: "" },
      { name: "Jorge Villazón", role: "" },
      { name: "César Évora", role: "" },
      { name: "Sirio Soto", role: "" },
    ],
    relatedSeasons: [{ id: "su-propia-guerra", label: "Temporada 1" }],
  },
];

export const getSagaById = (id: string): Saga | undefined =>
  sagas.find((saga) => saga.id === id);
