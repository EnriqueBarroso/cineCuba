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
  episodios: Episodio[];
  cast?: { name: string; role: string }[];
  awards?: { name: string; category: string; year: number }[];
}

export const sagas: Saga[] = [
  {
    id: "nicanor-odonnell",
    title: "Nicanor O'Donnell",
    director: "Eduardo del Llano",
    anioInicio: 2004,
    anioFin: 2019,
    poster: "",
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
];
