/**
 * CATÁLOGO DE PELÍCULAS DEL CINE CUBANO
 * Archivo: src/data/movies/catalog.ts
 */

import type { Movie } from './types';

// === IMPORTACIÓN CENTRALIZADA DE POSTERS ===
// Gracias al archivo index.ts, ahora importamos todo de una sola vez.
import {
  // 60s
  posterLucia, posterBurocrata, poster12Sillas, posterJuanQuinQuin, posterMemoriasSub, posterSoyCuba,
  // 70s
  posterMaisinicu, posterDeCiertaManera, posterUltimaCena, posterRetratoTeresa, posterSobrevivientes, posterBrigadista, posterElpidioValdes,
  // 80s
  posterCecilia, posterHombreExito, posterLosPajaros, posterSePermuta, posterVampirosHabana, posterEnTresYDos, posterNoviaDavid, posterClandestinos, posterPlaff, posterBellaAlhambra, posterPapelesSecundarios,
  // 90s
  posterAdorablesMentiras, posterMariaAntonia, posterCaravana, posterAlicia, posterFresa, posterMadagascar, posterElefanteBicicleta, posterGuantanamera, posterAzucarAmarga, posterBambola, posterAmorVertical, posterZafiros, posterLaVidaEsSilbar, posterAmanda, posterKleinesTropicana, posterHelloHeminguey, posterParaisoEstrellas,
  // 2000s
  posterListaEspera, posterAntesAnochezca, posterPataNegra, posterNada, posterVideoDeFamilia, posterHacerseSueco, posterMielOshun, posterEntreCiclones, posterSuite, posterAunqueEstesLejos, posterTresVecesDos, posterPerfectoAmor, posterBailandoCha, posterVivaCuba, posterBarrioCuba, poster90Millas, posterDileALaura, posterFrutas, posterReyHabana, posterHabanaBlues, posterElBenny, posterPaginasMauricio, posterElEdenPerdido, posterCaminoEden, posterCuernoAbundancia, posterCercania, posterChe, posterCheArgentino, posterDiosesRotos,
  // 2010s
  posterMarti, posterMemoria, posterChala, posterJuanDeLosMuertos, posterHabanastation, posterSergioSerguei, posterInocencia,
  posterJuliette,
  posterRosaLaChina,
  posterEnfinElMar,
  posterHormigas,
  posterUnaRosaDeFrancia,
  posterCiudadEnRojo,
  posterElPremioFlaco,
  posterCuandoLaVerdadDespierta,
  posterLaAnunciacion,
  posterAfinidades,
  posterBoletoAlParaiso,
  posterCasaVieja,
  posterChamaco,
  posterLisanka,
  posterMolinaFeroz,
  posterExtravios,
  posterFabula,
  posterPenumbras,
  posterSumbe,
  posterEsther,
  posterLaPeliculaDeAna,
  posterBoccacherias,
  posterVirgilio,
  posterContigoPanyCebolla,
  posterFatima,
  posterLaParedDeLasPalabras,
  posterOmega3
} from '@/assets/posters';

// === IMPORTS HERO (Backdrops) ===
import {
  heroMemorias,
  heroElpidio,
  heroVampiros,
  heroFresa,
  heroHabana,
  heroJuan
} from '@/assets/hero';

// ============================================================================
// DÉCADA DE 1960
// ============================================================================

const movies1960s: Movie[] = [
  {
    id: "doce-sillas",
    title: "Las doce sillas",
    year: 1962,
    director: "Tomás Gutiérrez Alea",
    poster: poster12Sillas,
    duration: "97 min",
    genre: ["Comedia"],
    synopsis: "Un aristócrata venido a menos y su antiguo chófer buscan desesperadamente unos diamantes que fueron escondidos en una de las doce sillas de un juego de comedor antes de ser expropiadas.",
    videoUrl: 'https://archive.org/embed/las-12-sillas', 
    trailerUrl: 'https://www.youtube.com/embed/T3vdlz6Qfz8',
    awards: [
      { name: "Festival de Karlovy Vary", year: 1963, category: "Mención Especial" }
    ],
    cast: [
      { name: "Enrique Santiesteban", role: "Hipólito" },
      { name: "Reinaldo Miravalles", role: "Óscar" },
      { name: "René Sánchez", role: "Padre Cirilo" },
      { name: "Pilín Vallejo", role: "La viuda" }
    ]
  },
  {
    id: "aventuras-juan-quin-quin",
    title: "Las aventuras de Juan Quin Quín",
    year: 1967,
    director: "Julio García Espinosa",
    poster: posterJuanQuinQuin,
    duration: "110 min",
    genre: ["Comedia", "Aventuras"],
    synopsis: "Juan Quin Quín es un guajiro que trabaja en diversos oficios mientras lucha contra la injusticia en la Cuba prerrevolucionaria. Una aventura picaresca con humor y crítica social.",
    videoUrl: 'https://www.youtube.com/embed/cT3vjbkNY9o', 
    trailerUrl: 'https://www.youtube.com/embed/_HilxAW2dg4',
    awards: [
      { name: "Festival de Karlovy Vary", year: 1967, category: "Premio Especial del Jurado" }
    ],
    cast: [
      { name: "Julio Martínez", role: "Juan Quin Quín" },
      { name: "Erdwin Fernández", role: "Jachero" },
      { name: "Adelaida Raymat", role: "Teresa" }
    ],
    notes: "Una de las películas cubanas más populares y divertidas de la década."
  },
  {
    id: "muerte-burocrata",
    title: "La muerte de un burócrata",
    year: 1966,
    director: "Tomás Gutiérrez Alea",
    poster: posterBurocrata,
    duration: "85 min",
    genre: ["Comedia"],
    synopsis: "Sátira genial donde un sobrino intenta exhumar el cadáver de su tío para recuperar su carnet laboral, enfrentándose a un laberinto de trámites absurdos.",
    videoUrl: 'https://archive.org/embed/la-muerte-de-un-burocrata', 
    trailerUrl: 'https://www.youtube.com/embed/ZqjeKGGE1Z4',
    awards: [
      { name: "Festival de Karlovy Vary", year: 1966, category: "Premio Especial del Jurado" },
      { name: "Festival de Moscú", year: 1967, category: "Mención Especial" }
    ],
    cast: [
      { name: "Salvador Wood", role: "El sobrino" },
      { name: "Silvia Planas", role: "La tía" },
      { name: "Manuel Estanillo", role: "El burócrata" },
      { name: "Gaspar de Santelices", role: "El enterrador" }
    ],
    notes: "Incluye homenajes visuales a Laurel y Hardy, Buñuel y otros maestros del cine."
  },
  {
    id: "lucia-1968",
    title: "Lucía",
    year: 1968,
    director: "Humberto Solás",
    poster: posterLucia,
    duration: "160 min",
    genre: ["Drama", "Histórico"],
    synopsis: "Una obra maestra del cine cubano que narra tres historias de mujeres llamadas Lucía en tres momentos cruciales de la historia de Cuba: la guerra de independencia de 1895, la lucha contra Machado en los años 30, y la Revolución de los años 60.",
    videoUrl: 'https://www.youtube.com/embed/HOgmtOQvuwY', 
    trailerUrl: "https://www.youtube.com/embed/A_oD1MCtk5w",
    awards: [
      { name: "Festival de Moscú", year: 1969, category: "Gran Premio" },
      { name: "Festival de Karlovy Vary", year: 1969, category: "Mejor Película" }
    ],
    cast: [
      { name: "Raquel Revuelta", role: "Lucía (1895)" },
      { name: "Eslinda Núñez", role: "Lucía (1932)" },
      { name: "Adela Legrá", role: "Lucía (1960)" },
      { name: "Eduardo Moure", role: "Rafael" },
      { name: "Ramón Brito", role: "Aldo" },
      { name: "Adolfo Llauradó", role: "Tomás" }
    ],
    notes: "Considerada una de las obras maestras del cine latinoamericano."
  },
  {
    id: "memorias-subdesarrollo",
    title: "Memorias del subdesarrollo",
    year: 1968,
    director: "Tomás Gutiérrez Alea",
    poster: posterMemoriasSub,
    duration: "97 min",
    genre: ["Drama"],
    synopsis: "Un intelectual burgués decide quedarse en Cuba tras la Revolución mientras su familia huye al exilio. Atrapado entre dos mundos, observa los cambios de la sociedad cubana mientras cuestiona su propia identidad y lugar en el nuevo orden.",
    videoUrl: "https://archive.org/embde/memorias-del-subdesarrollo",
    trailerUrl: "https://www.youtube.com/embed/yFXqq4KuJ3w",
    awards: [
      { name: "Festival de Karlovy Vary", year: 1968, category: "Premio FIPRESCI" },
      { name: "Revista Sight & Sound", year: 1999, category: "Una de las mejores películas del siglo XX" }
    ],
    cast: [
      { name: "Sergio Corrieri", role: "Sergio" },
      { name: "Daisy Granados", role: "Elena" },
      { name: "Eslinda Núñez", role: "Noemí" },
      { name: "Omar Valdés", role: "Pablo" }
    ],
    notes: "Basada en la novela de Edmundo Desnoes. Considerada una de las obras maestras del cine latinoamericano.",
    backdrop: heroMemorias,
  },
  {
    id: 'soy-cuba',
    title: 'Soy Cuba',
    year: 1964,
    director: 'Mijaíl Kalatózov',
    poster: posterSoyCuba,
    duration: '141 min',
    genre: ['Drama', 'Histórico'],
    synopsis:
      'Una coproducción cubano-soviética visualmente deslumbrante que narra cuatro historias sobre la vida en Cuba antes de la Revolución. Famosa por sus increíbles planos secuencia y su fotografía en blanco y negro, redescubierta décadas después.',
    videoUrl: 'https://www.youtube.com/embed/Y3HpI898dwg', 
    trailerUrl: 'https://www.youtube.com/embed/XnynEcy_pus',
    awards: [
      { name: 'Cannes Classics', year: 2004, category: 'Selección Oficial (Restauración)' },
      { name: 'Independent Spirit Awards', year: 1996, category: 'Nominada Mejor Película Extranjera' }
    ],
    cast: [
      { name: 'Sergio Corrieri', role: 'Alberto' },
      { name: 'Salvador Wood', role: 'Campesino' },
    ],
  },
];

// ============================================================================
// DÉCADA DE 1970
// ============================================================================

const movies1970s: Movie[] = [
  {
    id: "hombre-maisinicu",
    title: "El hombre de Maisinicú",
    year: 1973,
    director: "Manuel Pérez",
    poster: posterMaisinicu,
    duration: "100 min",
    genre: ["Drama", "Histórico"],
    synopsis: "Basada en hechos reales, narra la historia de Alberto Delgado, un agente de la Seguridad del Estado que se infiltra entre los bandidos del Escambray haciéndose pasar por contrarrevolucionario.",
    videoUrl: 'https://archive.org/embed/el-hombre-de-maisinicu', 
    trailerUrl: 'https://www.youtube.com/watch?v=PoKUHKXj3Co&list=RDPoKUHKXj3Co&start_radio=1',
    awards: [
      { name: "Festival de Karlovy Vary", year: 1974, category: "Premio Especial" }
    ],
    cast: [
      { name: "Sergio Corrieri", role: "Alberto Delgado" },
      { name: "Reinaldo Miravalles", role: "Maro" },
      { name: "Nelson Villagra", role: "El capitán" }
    ],
    notes: "Una de las películas cubanas más emblemáticas sobre la lucha contra bandidos."
  },
  {
    id: "de-cierta-manera",
    title: "De cierta manera",
    year: 1974,
    director: "Sara Gómez",
    poster: posterDeCiertaManera,
    duration: "73 min",
    genre: ["Drama", "Documental"],
    synopsis: "Una maestra de origen burgués comienza a trabajar en un barrio marginal de La Habana y se enamora de un obrero. La película mezcla ficción y documental para explorar las tensiones de clase, género y los desafíos de la transformación social revolucionaria.",
    videoUrl: 'https://archive.org/embed/de-cierta-manera',
    trailerUrl: 'https://www.youtube.com/embed/csNWvMxNVXo',
    awards: [
      { name: "Festival de Leipzig", year: 1977, category: "Mención Especial" }
    ],
    cast: [
      { name: "Yolanda Cuéllar", role: "Yolanda" },
      { name: "Mario Balmaseda", role: "Mario" },
      { name: "Mario Limonta", role: "Humberto" },
      { name: "Isaura Mendoza", role: "Personaje" }
    ],
    notes: "Primera y única película de ficción de Sara Gómez, la primera directora afrocubana."
  },
  {
    id: "la-ultima-cena",
    title: "La última cena",
    year: 1976,
    director: "Tomás Gutiérrez Alea",
    poster: posterUltimaCena,
    duration: "120 min",
    genre: ["Drama", "Histórico"],
    synopsis: "Un conde hacendado del siglo XVIII decide recrear la Última Cena con doce de sus esclavos, ofreciéndoles libertad. Sin embargo, cuando su promesa no se cumple, estalla una rebelión que tendrá consecuencias trágicas.",
    videoUrl: 'https://archive.org/embed/la-ultima-cena',
    trailerUrl: 'https://www.youtube.com/embed/lfluvDZsqms',
    awards: [
      { name: "Festival de Taormina", year: 1977, category: "Mejor Película" },
      { name: "Festival de La Habana", year: 1976, category: "Gran Premio" }
    ],
    cast: [
      { name: "Nelson Villagra", role: "El Conde" },
      { name: "Silvano Rey", role: "Sebastián" },
      { name: "Luis Alberto García", role: "Antonio" },
      { name: "José Antonio Rodríguez", role: "Don Manuel" }
    ],
    notes: "Alegoría poderosa sobre la esclavitud y la hipocresía religiosa en la Cuba colonial."
  },
  {
    id: "retrato-de-teresa",
    title: "Retrato de Teresa",
    year: 1979,
    director: "Pastor Vega",
    poster: posterRetratoTeresa,
    duration: "103 min",
    genre: ["Drama"],
    synopsis: "Teresa es una trabajadora textil, esposa y madre que participa activamente en actividades culturales. Cuando su marido exige que abandone sus actividades para dedicarse exclusivamente al hogar, ella se niega, desencadenando un conflicto sobre los roles de género en la Cuba revolucionaria.",
    trailerUrl: 'https://www.youtube.com/embed/ff5SpRmTrng',
    videoUrl: "https://www.youtube.com/embed/H9chq3TSKbE",
    awards: [
      { name: "Festival de La Habana", year: 1979, category: "Gran Premio Coral" },
      { name: "Festival de Karlovy Vary", year: 1980, category: "Premio del Público" }
    ],
    cast: [
      { name: "Daisy Granados", role: "Teresa" },
      { name: "Adolfo Llauradó", role: "Ramón" },
      { name: "Alina Sánchez", role: "Personaje" },
      { name: "Raúl Pomares", role: "Personaje" }
    ],
    notes: "Película emblemática del feminismo cubano."
  },
  {
    id: "sobrevivientes",
    title: "Los sobrevivientes",
    year: 1979,
    director: "Tomás Gutiérrez Alea",
    poster: posterSobrevivientes,
    duration: "130 min",
    genre: ["Drama"],
    synopsis: "Una familia aristocrática decide encerrarse en su mansión creyendo que la Revolución será algo pasajero. Aislados del mundo, comienzan a involucionar hacia el salvajismo.",
    videoUrl: 'https://archive.org/embed/los-sobrevivientes', 
    trailerUrl: 'https://www.youtube.com/embed/7qKSk9fpF8M',
    awards: [
      { name: "Festival de San Sebastián", year: 1979, category: "Premio Especial del Jurado" }
    ],
    cast: [
      { name: "Enrique Santiesteban", role: "Sebastián" },
      { name: "Reynaldo Miravalles", role: "Olegario" },
      { name: "Germán Pinelli", role: "Ramiro" },
      { name: "Ana Viña", role: "María" },
      { name: "Vicente Revuelta", role: "Fernando" }
    ],
    notes: "Alegoría sobre la resistencia al cambio y la decadencia de la clase burguesa."
  },
  {
    id: "el-brigadista",
    title: "El Brigadista",
    year: 1977,
    director: "Octavio Cortázar",
    poster: posterBrigadista,
    duration: "119 min",
    genre: ["Drama", "Histórico"],
    synopsis: "Durante la Campaña de Alfabetización de 1961, un joven habanero viaja a las montañas del Escambray para enseñar a leer y escribir a los campesinos, enfrentándose a bandidos contrarrevolucionarios.",
    videoUrl: '',
    trailerUrl: 'https://www.youtube.com/embed/sM9WoGomm_E',
    awards: [
      { name: "Festival de Moscú", year: 1978, category: "Premio Especial" }
    ],
    cast: [
      { name: "Salvador Wood", role: "Mario" },
      { name: "Jorge Villazón", role: "Eladio" },
      { name: "Idalia Anreus", role: "Clarita" },
      { name: "Raúl Pomares", role: "Ciro" }
    ],
    notes: "Película emblemática sobre la Campaña de Alfabetización cubana."
  },
  {
    id: "elpidio-valdes-film",
    title: "Elpidio Valdés",
    year: 1979,
    director: "Juan Padrón",
    poster: posterElpidioValdes,
    duration: "70 min",
    genre: ["Animación", "Aventuras"],
    synopsis: "El largometraje que consolidó al personaje más icónico de la animación cubana. Elpidio, un coronel mambí, lucha por la independencia de Cuba contra el ejército español y el General Resoplez.",
    videoUrl: "https://www.youtube.com/embed/Ejq_lJVCqKU", 
    trailerUrl: "https://www.youtube.com/embed/6vcGn6a-0ss",
    awards: [
      { name: "Festival de Gijón", year: 1979, category: "Mejor Película Infantil" },
      { name: "Festival de Moscú", year: 1981, category: "Tercer Premio" }
    ],
    cast: [{ name: "Frank González", role: "Elpidio Valdés (voz)" }],
    backdrop: heroElpidio,
  },
];

// ============================================================================
// DÉCADA DE 1980
// ============================================================================

const movies1980s: Movie[] = [
  {
    id: "cecilia",
    title: "Cecilia",
    year: 1982,
    director: "Humberto Solás",
    poster: posterCecilia,
    duration: "127 min",
    genre: ["Drama", "Romance", "Histórico"],
    synopsis: "En la Cuba colonial del siglo XIX, Cecilia Valdés, una bella mulata, se enamora de Leonardo, un joven criollo blanco, sin saber que son medio hermanos. Una historia de pasión, tragedia y desigualdad social.",
    awards: [
      { name: "Festival de La Habana", year: 1982, category: "Gran Premio Coral" },
      { name: "Festival de Cartagena", year: 1983, category: "Mejor Película" }
    ],
    trailerUrl: 'https://www.youtube.com/embed/xg8Fbj4nA1I',
    videoUrl: 'https://archive.org/embed/cecilia_202601',
    cast: [
      { name: "Daisy Granados", role: "Cecilia Valdés" },
      { name: "Imanol Arias", role: "Leonardo Gamboa" },
      { name: "Nelson Villagra", role: "Don Cándido Gamboa" },
      { name: "Raquel Revuelta", role: "Doña Rosa" }
    ],
    notes: "Basada en la novela clásica de Cirilo Villaverde."
  },
  {
    id: "un-hombre-de-exito",
    title: "Un hombre de éxito",
    year: 1986,
    director: "Humberto Solás",
    poster: posterHombreExito,
    duration: "120 min",
    genre: ["Drama"],
    synopsis: "Javier es un joven ambicioso que traiciona sus ideales revolucionarios para escalar posiciones durante las décadas del 30 al 50 en Cuba. Un retrato mordaz del oportunismo político.",
    awards: [
      { name: "Festival de La Habana", year: 1986, category: "Premio Coral" },
      { name: "Festival de Biarritz", year: 1987, category: "Premio del Público" }
    ],
    videoUrl: "https://archive.org/embed/un-hombre-de-exito", 
    cast: [
      { name: "César Évora", role: "Javier" },
      { name: "Daisy Granados", role: "Julia" },
      { name: "Jorge Trinchet", role: "Darío" },
      { name: "Raúl Pomares", role: "Jacinto" }
    ],
    notes: "Una de las películas cubanas más críticas con el oportunismo político."
  },
  {
    id: "pajaros-escopeta",
    title: "Los pájaros tirándole a la escopeta",
    year: 1984,
    director: "Rolando Díaz",
    poster: posterLosPajaros,
    duration: "90 min",
    genre: ["Comedia"],
    synopsis: "Dos jóvenes enamorados intentan impedir el romance entre el padre de él y la madre de ella. Una comedia clásica cubana que invierte los conflictos generacionales habituales.",
    videoUrl: 'https://archive.org/embed/los-pajaros-tirandole-a-la-escopeta', 
    trailerUrl: 'https://www.youtube.com/embed/yUUzGFLx7jY',
    awards: [
      { name: "Festival de Comedia de Peñíscola", year: 1985, category: "Mejor Película" }
    ],
    cast: [
      { name: "Luis Alberto García", role: "Carlos" },
      { name: "Thais Valdés", role: "Ofelia" },
      { name: "Daisy Granados", role: "La madre" },
      { name: "César Évora", role: "El padre" }
    ],
    notes: "Una de las comedias cubanas más populares de la década."
  },
  {
    id: "se-permuta",
    title: "Se permuta",
    year: 1984,
    director: "Juan Carlos Tabío",
    poster: posterSePermuta,
    duration: "100 min",
    genre: ["Comedia"],
    synopsis: "Gloria vive en un apartamento pequeño en Centro Habana y sueña con mudarse a un lugar mejor. A través de una cadena de permutas de viviendas, la película satiriza la burocracia y las aspiraciones de la clase media cubana.",
    trailerUrl: 'https://www.youtube.com/embed/2-0en0M6YCA',
    videoUrl: 'https://archive.org/embed/1983-se-permuta',
    awards: [
      { name: "Festival de La Habana", year: 1984, category: "Premio del Público" }
    ],
    cast: [
      { name: "Rosita Fornés", role: "Gloria" },
      { name: "Isabel Santos", role: "Yolanda" },
      { name: "Luis Alberto García", role: "Eugenio" },
      { name: "Mario Balmaseda", role: "Personaje" }
    ],
    notes: "Una de las comedias cubanas más populares y queridas de los 80s."
  },
  {
    id: "vampiros-habana",
    title: "¡Vampiros en La Habana!",
    year: 1985,
    director: "Juan Padrón",
    poster: posterVampirosHabana,
    duration: "69 min",
    genre: ["Animación", "Comedia"],
    synopsis: "Un científico vampiro cubano inventa una fórmula que permite a los vampiros resistir la luz del sol. Mientras tanto, las mafias vampíricas de Estados Unidos y Europa oriental luchan por hacerse con el secreto. Una sátira animada llena de humor negro.",
    videoUrl: 'https://www.youtube.com/embed/Z8RUvL_ChM0', 
    trailerUrl: 'https://www.youtube.com/embed/g5AQB02LdVw',
    awards: [
      { name: "Encuesta Noticine.com", year: 2009, category: "Top 100 Mejores Películas Iberoamericanas" }
    ],
    cast: [
      { name: "Manuel Marín", role: "Pepito (voz)" },
      { name: "Frank González", role: "Drácula (voz)" },
      { name: "Margarita Agüero", role: "Lola (voz)" }
    ],
    notes: "Coproducida con España y Alemania. Banda sonora de Arturo Sandoval.",
    backdrop: heroVampiros,
  },
  {
    id: "en-tres-y-dos",
    title: "En tres y dos",
    year: 1985,
    director: "Rolando Díaz",
    poster: posterEnTresYDos,
    duration: "100 min",
    genre: ["Comedia", "Drama"],
    synopsis: "Una comedia deportiva que sigue las peripecias de un equipo de béisbol cubano y su entrenador. La película captura con humor y sensibilidad el mundo del deporte nacional cubano.",
    videoUrl: 'https://archive.org/embed/en.-tres.-y.-dos',
    trailerUrl: 'https://www.youtube.com/embed/g5AQB02LdVw',
    awards: [
      { name: "Festival de La Habana", year: 1985, category: "Premio del Público" }
    ],
    cast: [
      { name: "Samuel Claxton", role: "El entrenador" },
      { name: "Mario Balmaseda", role: "Personaje principal" },
      { name: "Luis Alberto García", role: "Jugador" }
    ],
    notes: "Una de las películas de béisbol más queridas del cine cubano."
  },
  {
    id: "una-novia-para-david",
    title: "Una novia para David",
    year: 1985,
    director: "Orlando Rojas",
    poster: posterNoviaDavid,
    duration: "103 min",
    genre: ["Comedia", "Romance"],
    synopsis: "David busca novia y se debate entre Olga, espectacular pero superficial, y Ofelia, su compañera intelectual con quien tiene una conexión profunda.",
    videoUrl: "https://archive.org/embed/una-novia-para-david", 
    trailerUrl: "https://www.youtube.com/embed/-G-2kTjx25M",
    awards: [
      { name: "Festival de La Habana", year: 1985, category: "Premio de la Popularidad" }
    ],
    cast: [
      { name: "Jorge Luis Álvarez", role: "David" },
      { name: "María Isabel Díaz", role: "Ofelia" }
    ]
  },
  {
    id: "clandestinos",
    title: "Clandestinos",
    year: 1987,
    director: "Fernando Pérez",
    poster: posterClandestinos,
    duration: "100 min",
    genre: ["Drama", "Histórico"],
    synopsis: "La Habana, 1958. Un grupo de jóvenes revolucionarios vive en la clandestinidad mientras prepara acciones contra la dictadura de Batista. La película explora el amor, la lealtad y el sacrificio en tiempos de lucha.",
    awards: [
      { name: "Festival de La Habana", year: 1987, category: "Gran Premio Coral" },
      { name: "Festival de Karlovy Vary", year: 1988, category: "Premio Especial" }
    ],
    videoUrl: "https://archive.org/embed/clandestinos-01", 
    trailerUrl: "https://www.youtube.com/embed/E5UI-pav-Xo",
    cast: [
      { name: "Luis Alberto García", role: "Ernesto" },
      { name: "Isabel Santos", role: "Nereida" },
      { name: "Susana Pérez", role: "Rosa" }
    ],
    notes: "Ópera prima de Fernando Pérez."
  },
  {
    id: "plaff",
    title: "Plaff o Demasiado miedo a la vida",
    year: 1988,
    director: "Juan Carlos Tabío",
    poster: posterPlaff,
    duration: "100 min",
    genre: ["Comedia"],
    synopsis: "Concha, una viuda hipocondríaca y supersticiosa, vive atormentada por misteriosos huevos que caen sobre ella. Una comedia negra que satiriza los miedos irracionales.",
    awards: [
      { name: "Festival de La Habana", year: 1988, category: "Premio Coral a la Comedia" },
      { name: "Festival de Bogotá", year: 1989, category: "Mejor Película" }
    ],
    videoUrl: "https://www.youtube.com/embed/v-shMw0bZug",
    trailerUrl: "https://www.youtube.com/embed/7toSR5w4YEE",
    cast: [
      { name: "Daisy Granados", role: "Concha" },
      { name: "Thais Valdés", role: "Clarita" },
      { name: "Luis Alberto García", role: "José Ramón" }
    ],
    notes: "Título onomatopéyico que representa el sonido de los huevos al caer."
  },
  {
    id: "bella-alhambra",
    title: "La bella del Alhambra",
    year: 1989,
    director: "Enrique Pineda Barnet",
    poster: posterBellaAlhambra,
    duration: "108 min",
    genre: ["Drama", "Musical"],
    synopsis: "La historia de Rachel, una joven mulata que sueña con convertirse en vedette del famoso teatro Alhambra de La Habana a principios del siglo XX.",
    awards: [
      { name: "Premio Goya", year: 1990, category: "Mejor Película Extranjera de Habla Hispana" },
      { name: "Festival de La Habana", year: 1989, category: "Gran Premio Coral" }
    ],
    videoUrl: "https://archive.org/embed/la-bella-del-alhambra-vcd", 
    trailerUrl: "https://www.youtube.com/embed/xWEimAgTGic",
    cast: [
      { name: "Beatriz Valdés", role: "Rachel" },
      { name: "César Évora", role: "Adolfo" },
      { name: "Omar Valdés", role: "Federico" }
    ],
    notes: "Ganadora del primer Goya a Mejor Película Extranjera de Habla Hispana."
  },
  {
    id: "papeles-secundarios",
    title: "Papeles secundarios",
    year: 1989,
    director: "Orlando Rojas",
    poster: posterPapelesSecundarios,
    duration: "95 min",
    genre: ["Drama"],
    synopsis: "Un grupo de actores de teatro enfrenta las dificultades de ensayar una obra mientras lidian con sus propios dramas personales.",
    awards: [
      { name: "Festival de La Habana", year: 1989, category: "Premio Coral" }
    ],
    videoUrl: "https://archive.org/embed/papeles-secundarios",
    trailerUrl: "",
    cast: [
      { name: "Rosita Fornés", role: "Actriz principal" },
      { name: "Leonor Arocha", role: "Personaje" }
    ],
    notes: "Una de las películas cubanas más importantes sobre el mundo teatral."
  },
];

// ============================================================================
// DÉCADA DE 1990
// ============================================================================

const movies1990s: Movie[] = [
  {
    id: "adorables-mentiras",
    title: "Adorables mentiras",
    year: 1991,
    director: "Gerardo Chijona",
    poster: posterAdorablesMentiras,
    duration: "108 min",
    genre: ["Comedia", "Romance"],
    synopsis: "Nancy es una aspirante a actriz que sobrevive en La Habana del Período Especial. Cuando conoce a un extranjero que la confunde con una actriz famosa, decide seguir el juego.",
    awards: [
      { name: "Festival de La Habana", year: 1991, category: "Premio del Público" }
    ],
    cast: [
      { name: "Isabel Santos", role: "Nancy" },
      { name: "Luis Alberto García", role: "Lombardi" },
      { name: "Mirtha Ibarra", role: "Personaje" }
    ],
    notes: "Guion coescrito con Senel Paz."
  },
  {
    id: "maria-antonia",
    title: "María Antonia",
    year: 1990,
    director: "Sergio Giral",
    poster: posterMariaAntonia,
    duration: "111 min",
    genre: ["Drama"],
    synopsis: "Ambientada en los años 50. María Antonia es una mujer indomable cuya vida está marcada por la religión afrocubana y una pasión destructiva por un boxeador.",
    videoUrl: 'https://archive.org/embed/maria-antonia-1990',
    trailerUrl: '',
    awards: [
      { name: "Festival de La Habana", year: 1990, category: "Premio Coral a la Mejor Fotografía" }
    ],
    cast: [
      { name: "Alina Rodríguez", role: "María Antonia" },
      { name: "Alexis Valdés", role: "Julián" }
    ],
  },
  {
    id: "caravana",
    title: "Caravana",
    year: 1990,
    director: "Rogelio París",
    poster: posterCaravana,
    duration: "100 min",
    genre: ["Bélico", "Aventuras"],
    synopsis: "Durante la guerra de Angola, una caravana militar cubana debe abastecer un puente aislado, enfrentándose a emboscadas y tensiones internas.",
    videoUrl: 'https://archive.org/embed/caravana-1990',
    trailerUrl: 'https://www.youtube.com/embed/L8xKX7DaJYQ',
    awards: [],
    cast: [
      { name: "Manuel Porto", role: "El Jefe" },
      { name: "Patricio Wood", role: "Soldado" }
    ],
  },
  {
    id: "alicia-en-el-pueblo-de-maravillas",
    title: "Alicia en el pueblo de Maravillas",
    year: 1991,
    director: "Daniel Díaz Torres",
    poster: posterAlicia,
    duration: "93 min",
    genre: ["Sátira", "Comedia"],
    synopsis: "Una instructora de teatro llega a un pueblo donde ocurren sucesos absurdos y burocráticos. Una sátira mordaz sobre la sociedad cubana.",
    videoUrl: 'https://archive.org/embed/alicia-en-el-pueblo-de-maravillas',
    trailerUrl: 'https://www.youtube.com/embed/DYtGWXBJEU0',
    awards: [{ name: "Festival de Berlín", year: 1991, category: "Premio Caligari" }],
    cast: [
      { name: "Thais Valdés", role: "Alicia" },
      { name: "Reynaldo Miravalles", role: "El Director" }
    ],
  },
  {
    id: "fresa-chocolate-1993",
    title: "Fresa y Chocolate",
    year: 1993,
    director: "Tomás Gutiérrez Alea, Juan Carlos Tabío",
    poster: posterFresa,
    duration: "110 min",
    genre: ["Drama", "Comedia"],
    synopsis: "En La Habana de los años 90, Diego, un artista homosexual y culto, entabla una amistad inesperada con David, un joven militante comunista heterosexual. La película explora temas de tolerancia y libertad.",
    trailerUrl: "https://www.youtube.com/embed/ygR1OTyVr7I",
    videoUrl: "https://archive.org/embed/fresa-y-chocolate-1993",
    awards: [
      { name: "Oso de Plata - Festival de Berlín", year: 1994, category: "Gran Premio del Jurado" },
      { name: "Premio Goya", year: 1995, category: "Mejor Película Extranjera de Habla Hispana" },
      { name: "Nominación al Oscar", year: 1995, category: "Mejor Película Extranjera" }
    ],
    cast: [
      { name: "Jorge Perugorría", role: "Diego" },
      { name: "Vladimir Cruz", role: "David" },
      { name: "Mirta Ibarra", role: "Nancy" }
    ],
    notes: "Primera película cubana nominada al Oscar.",
    backdrop: heroFresa,
  },
  {
    id: "madagascar",
    title: "Madagascar",
    year: 1994,
    director: "Fernando Pérez",
    poster: posterMadagascar,
    duration: "52 min",
    genre: ["Drama"],
    synopsis: "En el Período Especial, una madre profesora y su hija adolescente enfrentan la crisis económica de los años 90 en Cuba. El título hace referencia al sueño de escape.",
    awards: [
      { name: "Festival de La Habana", year: 1994, category: "Premio Coral" },
      { name: "Festival de Gramado", year: 1994, category: "Mejor Película" }
    ],
    videoUrl: 'https://archive.org/embed/madagascar_202601',
    cast: [
      { name: "Laura de la Uz", role: "Laura" },
      { name: "Zaida Castellanos", role: "Laura madre" }
    ],
    notes: "Retrato intimista del Período Especial."
  },
  {
    id: "elefante-bicicleta",
    title: "El elefante y la bicicleta",
    year: 1994,
    director: "Juan Carlos Tabío",
    poster: posterElefanteBicicleta,
    duration: "85 min",
    genre: ["Comedia", "Drama"],
    synopsis: "En un pueblo costero aislado de Cuba, la llegada del cine ambulante genera un conflicto entre el cura del pueblo y los habitantes que quieren disfrutar del séptimo arte.",
    awards: [
      { name: "Festival de La Habana", year: 1994, category: "Premio del Público" }
    ],
     videoUrl: "https://archive.org/embed/el-elefante-y-la-bicicleta", 
    trailerUrl: "https://www.youtube.com/embed/RueAO8A7rdw",
    cast: [
      { name: "Luis Alberto García", role: "Jefe del pueblo" },
      { name: "Lilliam Vega", role: "Personaje" }
    ],
    notes: "Una celebración poética del cine."
  },
  {
    id: "guantanamera",
    title: "Guantanamera",
    year: 1995,
    director: "Tomás Gutiérrez Alea, Juan Carlos Tabío",
    poster: posterGuantanamera,
    duration: "101 min",
    genre: ["Comedia"],
    synopsis: "Un cortejo fúnebre atraviesa Cuba de punta a punta para trasladar el cadáver de la tía Yoyita, enfrentando los absurdos de la burocracia cubana.",
    videoUrl: "https://archive.org/embed/guantanamera-1995_202601", 
    trailerUrl: "https://www.youtube.com/embed/RueAO8A7rdw",
    awards: [
      { name: "Festival de Berlín", year: 1995, category: "Nominación al Oso de Oro" },
      { name: "Festival de La Habana", year: 1995, category: "Premio del Público" }
    ],
    cast: [
      { name: "Carlos Cruz", role: "Adolfo" },
      { name: "Mirtha Ibarra", role: "Gina" },
      { name: "Jorge Perugorría", role: "Mariano" }
    ],
    notes: "Última película de Tomás Gutiérrez Alea."
  },
  {
    id: "azucar-amarga",
    title: "Azúcar amarga",
    year: 1996,
    director: "Leon Ichaso",
    poster: posterAzucarAmarga,
    duration: "102 min",
    genre: ["Drama"],
    synopsis: "Filmada en blanco y negro, cuenta la historia de Gustavo, un joven comunista devoto que comienza a cuestionar sus ideales al enfrentarse a las duras realidades de la vida en La Habana.",
    videoUrl: "https://archive.org/embed/azucar-amarga-bitter-sugar-1996-ichaso-spanish-eng-sub-dvd",
    trailerUrl: "",
    awards: [],
    cast: [
      { name: "René Lavan", role: "Gustavo" },
      { name: "Mayte Vilán", role: "Yolanda" }
    ]
  },
  {
    id: "bambola",
    title: "Bámbola",
    year: 1996,
    director: "Bigas Luna",
    poster: posterBambola,
    duration: "95 min",
    genre: ["Drama", "Romance"],
    synopsis: "Un drama erótico y pasional donde Jorge Perugorría interpreta a Furio. Aunque es una producción europea, marcó la expansión internacional de los actores cubanos tras el éxito de Fresa y Chocolate.",
    videoUrl: "https://archive.org/details/bambola_202601",
    trailerUrl: "",
    awards: [],
    cast: [
      { name: "Valeria Marini", role: "Mina" },
      { name: "Jorge Perugorría", role: "Furio" }
    ]
  },
  {
    id: "amor-vertical",
    title: "Amor vertical",
    year: 1997,
    director: "Arturo Sotto",
    poster: posterAmorVertical,
    duration: "100 min",
    genre: ["Comedia", "Romance"],
    synopsis: "Estela y Ernesto intentan consumar su amor, pero no tienen dónde hacerlo. Una comedia sobre la falta de vivienda y la intimidad.",
    videoUrl: "https://archive.org/embed/amor-vertical",
    trailerUrl: "https://www.youtube.com/embed/9oO-5y0fldc",
    awards: [
      { name: "Premios Goya", year: 1998, category: "Nominada a Mejor Película Extranjera" }
    ],
    cast: [
      { name: "Jorge Perugorría", role: "Ernesto" },
      { name: "Silvia Águila", role: "Estela" }
    ]
  },
  {
    id: "zafiros-locura-azul",
    title: "Zafiros, locura azul",
    year: 1997,
    director: "Manuel Herrera",
    poster: posterZafiros,
    duration: "115 min",
    genre: ["Drama", "Musical"],
    synopsis: "La historia real del cuarteto vocal 'Los Zafiros', su ascenso meteórico en los 60 y su trágica caída, envuelta en su inolvidable música.",
    videoUrl: "https://archive.org/embed/zafiros-locura-azul",
    trailerUrl: "",
    awards: [
      { name: "Festival de La Habana", year: 1997, category: "Premio del Público" }
    ],
    cast: [
      { name: "Luis Alberto García", role: "Ignacio" },
      { name: "Sirio Soto", role: "Miguelito" }
    ]
  },
  {
    id: "la-vida-es-silbar",
    title: "La vida es silbar",
    year: 1998,
    director: "Fernando Pérez",
    poster: posterLaVidaEsSilbar,
    duration: "106 min",
    genre: ["Drama", "Surrealista"],
    synopsis: "Tres personajes buscan la felicidad en una Habana surrealista, cruzándose con la misteriosa figura de Santa Bárbara.",
    videoUrl: "https://archive.org/embed/la-vida-es-silvar",
    trailerUrl: "",
    awards: [
      { name: "Festival de Sundance", year: 1999, category: "Premio a la Libertad de Expresión" },
      { name: "Premios Goya", year: 1999, category: "Mejor Película Extranjera de Habla Hispana" }
    ],
    cast: [{ name: "Luis Alberto García", role: "Elpidio" }, { name: "Coralia Veloz", role: "Julia" }]
  },
  {
    id: "las-profecias-de-amanda",
    title: "Las profecías de Amanda",
    year: 1999,
    director: "Pastor Vega",
    poster: posterAmanda,
    duration: "90 min",
    genre: ["Drama"],
    synopsis: "Amanda tiene el don de ver el futuro, pero esto no le sirve para resolver los conflictos de su propia vida y familia.",
    videoUrl: "https://archive.org/embed/las-profecias-de-amanda",
    trailerUrl: "",
    awards: [
      { name: "Festival de Huelva", year: 1999, category: "Colón de Plata a la Mejor Actriz (Daisy Granados)" }
    ],
    cast: [
      { name: "Daisy Granados", role: "Amanda" },
      { name: "Laura Moras", role: "Hija" }
    ],
  },
  {
    id: "kleines-tropicana",
    title: "Kleines Tropicana",
    year: 1999,
    director: "Daniel Díaz Torres",
    poster: posterKleinesTropicana,
    duration: "115 min",
    genre: ["Comedia", "Crimen"],
    synopsis: "Un turista alemán aparece muerto vestido con plumas de cabaret. Una sátira policiaca llena de humor negro y choques culturales.",
    videoUrl: "https://archive.org/embed/kleines-tropikana",
    trailerUrl: "",
    awards: [],
    cast: [
      { name: "Peter Lohmeyer", role: "Klaus" },
      { name: "Vladimir Cruz", role: "Herman" },
      { name: "Coralia Veloz", role: "Mireya" }
    ]
  },
  {
    id: "un-paraiso-bajo-estrellas",
    title: "Un paraíso bajo las estrellas",
    year: 1999,
    director: "Gerardo Chijona",
    poster: posterParaisoEstrellas,
    duration: "90 min",
    genre: ["Comedia"],
    synopsis: "Siso sueña con ser bailarín del Tropicana. Una comedia de enredos que rinde homenaje al cabaret y a la picaresca.",
    awards: [],
    videoUrl: "https://archive.org/embed/un-paraiso-bajo-las-estrellas",
    trailerUrl: "",
    cast: [
      { name: "Thais Valdés", role: "Stacy" },
      { name: "Vladimir Cruz", role: "Sergito" },
    ]
  },
  {
    id: "hello-heminguey",
    title: "Hello Hemingüey",
    year: 1990,
    director: "Fernando Pérez",
    poster: posterHelloHeminguey,
    duration: "90 min",
    genre: ["Drama"],
    synopsis: "Larita sueña con una beca para estudiar en EE.UU. Es vecina de Hemingway y establece un paralelismo entre su vida y la del viejo pescador.",
    awards: [
      { name: "Festival de La Habana", year: 1990, category: "Primer Premio Coral" }
    ],
    videoUrl:"https://archive.org/embed/hello-hemingway",
    cast: [
      { name: "Laura de la Uz", role: "Larita" },
      { name: "Raúl Paz", role: "Víctor" }
    ],
  },
];

// ============================================================================
// DÉCADA DE 2000
// ============================================================================

const movies2000s: Movie[] = [
  {
    id: "lista-espera",
    title: "Lista de espera",
    year: 2000,
    director: "Juan Carlos Tabío",
    poster: posterListaEspera,
    duration: "112 min",
    genre: ["Comedia", "Drama"],
    synopsis: "Un grupo de pasajeros queda varado en una terminal de ómnibus. Mientras esperan, deciden transformar la estación en una comunidad ideal.",
    awards: [
      { name: "Festival de La Habana", year: 2000, category: "Gran Premio Coral" },
      { name: "Festival de Gramado", year: 2000, category: "Mejor Película" }
    ],
     videoUrl: "https://archive.org/embed/lista-de-espera",
    trailerUrl: "https://www.youtube.com/embed/AvhSlIs0ABE",
    cast: [
      { name: "Vladimir Cruz", role: "Emilio" },
      { name: "Tahimí Alvariño", role: "Jacqueline" },
      { name: "Jorge Perugorría", role: "Roldán" }
    ],
    notes: "Una de las comedias cubanas más queridas del nuevo milenio."
  },
  {
    id: "antes-que-anochezca",
    title: "Antes de que anochezca",
    year: 2000,
    director: "Julian Schnabel",
    poster: posterAntesAnochezca,
    duration: "133 min",
    genre: ["Drama", "Biopic"],
    synopsis: "Biografía del escritor cubano Reinaldo Arenas, desde su infancia en el campo, su participación en la Revolución y su posterior persecución por ser homosexual y escritor disidente.",
    videoUrl: "",
    trailerUrl: "https://www.youtube.com/embed/-yAfOGi8Jx4",
    awards: [
      { name: "Festival de Venecia", year: 2000, category: "Gran Premio del Jurado" },
      { name: "Premios Oscar", year: 2001, category: "Nominación Mejor Actor (Javier Bardem)" }
    ],
    cast: [
      { name: "Javier Bardem", role: "Reinaldo Arenas" },
      { name: "Olivier Martinez", role: "Lázaro Gómez" }
    ]
  },
  {
    id: "pata-negra",
    title: "Pata Negra",
    year: 2001,
    director: "Luis Oliveros",
    poster: posterPataNegra,
    duration: "112 min",
    genre: ["Comedia", "Thriller"],
    synopsis: "Un joven español viaja a Cuba para hacerse cargo de la herencia de su padre, pero se ve envuelto en una trama de enredos y santería.",
    videoUrl: "https://archive.org/embed/pata-negra",
    trailerUrl: "",
    awards: [],
    cast: [
      { name: "Gabino Diego", role: "José" },
      { name: "Laura Ramos", role: "Actriz" }
    ]
  },
  {
    id: "nada",
    title: "Nada",
    year: 2001,
    director: "Juan Carlos Cremata",
    poster: posterNada,
    duration: "92 min",
    genre: ["Drama", "Comedia"],
    synopsis: "Carla reescribe cartas tristes en la oficina de correos para alegrar a los destinatarios mientras espera irse a vivir a Miami.",
    videoUrl: "https://archive.org/embed/nada_20260103",
    trailerUrl: "",
    awards: [
      { name: "Festival de La Habana", year: 2001, category: "Premio Coral a la Ópera Prima" },
      { name: "Premios Goya", year: 2002, category: "Nominada Mejor Película Extranjera" },
    ],
    cast: [
      { name: "Thais Valdés", role: "Carla" },
      { name: "Nacha Guevara", role: "La Administradora" },
    ],
  },
  {
    id: "video-de-familia",
    title: "Video de familia",
    year: 2001,
    director: "Humberto Padrón",
    poster: posterVideoDeFamilia,
    duration: "45 min",
    genre: ["Drama"],
    synopsis: "Una familia se graba en video para su hijo emigrado. Lo que empieza alegre va revelando secretos y dolores familiares.",
    videoUrl: "",
    trailerUrl: "",
    awards: [
      { name: "Festival de La Habana", year: 2001, category: "Premio Coral al Mejor Cortometraje" }
    ],
    cast: [{ name: "Enrique Molina", role: "Padre" }, { name: "Verónica Lynn", role: "Madre" }],
  },
  {
    id: "hacerse-el-sueco",
    title: "Hacerse el sueco",
    year: 2001,
    director: "Daniel Díaz Torres",
    poster: posterHacerseSueco,
    duration: "105 min",
    genre: ["Comedia", "Crimen"],
    synopsis: "Un ladrón se hace pasar por profesor sueco en La Habana, alojándose con una familia cubana peculiar.",
    awards: [],
    videoUrl: "https://archive.org/embed/hacerse-el-sueco-cuba-icaic",
    trailerUrl: "", 
    cast: [
      { name: "Enrique Molina", role: "Amancio" },
      { name: "Peter Lohmeyer", role: "Bjorn (El Sueco)" },
    ],
  },
  {
    id: "miel-para-oshun",
    title: "Miel para Oshún",
    year: 2001,
    director: "Humberto Solás",
    poster: posterMielOshun,
    duration: "110 min",
    genre: ["Drama", "Road Movie"],
    synopsis: "Un joven cubano-americano regresa para buscar a su madre. Un viaje de redescubrimiento de identidad por toda la isla.",
    awards: [
      { name: "Festival de Sevilla", year: 2001, category: "Premio del Público" },
      { name: "Festival de La Habana", year: 2001, category: "Premio Especial del Jurado" }
    ],
    videoUrl: "https://archive.org/embed/miel-para-oshun",
    trailerUrl: "",
    cast: [
      { name: "Jorge Perugorría", role: "Roberto" },
      { name: "Isabel Santos", role: "Pilar" },
    ],
  },
  {
    id: "entre-ciclones",
    title: "Entre ciclones",
    year: 2003,
    director: "Enrique Colina",
    poster: posterEntreCiclones,
    duration: "112 min",
    genre: ["Comedia"],
    synopsis: "Tomás intenta sobrevivir en La Habana, pero un ciclón, su novia y su hermano delincuente convierten su vida en un torbellino cómico.",
    videoUrl: "",
    trailerUrl: "",
    awards: [],
    cast: [
      { name: "Mijail Mulkay", role: "Tomás" },
      { name: "Indira Valdés", role: "La novia" },
    ],
  },
  {
    id: "suite-habana-2003",
    title: "Suite Habana",
    year: 2003,
    director: "Fernando Pérez",
    poster: posterSuite,
    duration: "84 min",
    genre: ["Documental"],
    synopsis: "Un retrato poético y silencioso de La Habana a través de las vidas cotidianas de sus habitantes. Sin diálogos, una sinfonía visual sobre la realidad cubana.",
    videoUrl: "", 
    trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    awards: [
      { name: "Festival de San Sebastián", year: 2003, category: "Premio FIPRESCI" },
      { name: "Festival de La Habana", year: 2003, category: "Gran Premio Coral" },
      { name: "Premios Goya", year: 2004, category: "Nominación Mejor Documental" }
    ],
    cast: [
      { name: "Francisquito", role: "Él mismo" },
      { name: "Amanda", role: "Ella misma" }
    ],
    notes: "Sin diálogos, solo música e imágenes."
  },
  {
    id: "aunque-estes-lejos",
    title: "Aunque estés lejos",
    year: 2003,
    director: "Juan Carlos Tabío",
    poster: posterAunqueEstesLejos,
    duration: "100 min",
    genre: ["Drama"],
    synopsis: "Una coproducción que narra la historia de una guionista cubana y un productor español que intentan hacer una película sobre la emigración y los lazos rotos.",
    videoUrl: "",
    trailerUrl: "",
    awards: [],
    cast: [
      { name: "Mirtha Ibarra", role: "Mercedes" },
      { name: "Antonio Valero", role: "Alberto" }
    ]
  },
  {
    id: "tres-veces-dos",
    title: "3 veces 2",
    year: 2004,
    director: "Pavel Giroud, Lester Hamlet, Esteban Insausti",
    poster: posterTresVecesDos,
    duration: "90 min",
    genre: ["Drama", "Antología"],
    synopsis: "Tres historias sobre el amor y las relaciones humanas en la Cuba contemporánea, dirigidas por tres jóvenes realizadores que renovaron el cine cubano.",
    videoUrl: "https://archive.org/embed/3-veces-2",
    trailerUrl: "",
    awards: [
      { name: "Festival de Montreal", year: 2004, category: "Mejor Ópera Prima" }
    ],
    cast: [
      { name: "Georbis Martínez", role: "Actor" },
      { name: "Veronica Lynn", role: "Actriz" }
    ]
  },
  {
    id: "perfecto-amor-equivocado",
    title: "Perfecto amor equivocado",
    year: 2004,
    director: "Gerardo Chijona",
    poster: posterPerfectoAmor,
    duration: "100 min",
    genre: ["Comedia", "Romance"],
    synopsis: "Julio es un escritor exitoso que ve cómo su mundo se desmorona cuando su hija, su amante y su esposa coinciden en un enredo amoroso.",
    videoUrl: "",
    trailerUrl: "",
    awards: [
      { name: "Festival de La Habana", year: 2004, category: "Premio de la Popularidad" }
    ],
    cast: [
      { name: "Luis Alberto García", role: "Julio" },
      { name: "Susana Pérez", role: "Esposa" }
    ]
  },
  {
    id: "bailando-chachacha",
    title: "Bailando Cha Cha Cha",
    year: 2005,
    director: "Manuel Herrera",
    poster: posterBailandoCha,
    duration: "98 min",
    genre: ["Musical", "Drama"],
    synopsis: "Un homenaje a la música cubana de los años 50, centrado en una familia de músicos que intenta triunfar en medio de un ambiente competitivo y festivo.",
    videoUrl: "",
    trailerUrl: "",
    awards: [],
    cast: [
      { name: "Eslinda Núñez", role: "Actriz" }
    ]
  },
  {
    id: "viva-cuba",
    title: "Viva Cuba",
    year: 2005,
    director: "Juan Carlos Cremata",
    poster: posterVivaCuba,
    duration: "80 min",
    genre: ["Drama", "Infantil"],
    synopsis: "Malu y Jorgito son dos niños amigos inseparables, aunque sus familias se odian. Cuando la madre de Malu decide irse de Cuba, ambos escapan para evitar la separación.",
    videoUrl: "https://archive.org/embed/viva-cuba_202601",
    trailerUrl: "",
    awards: [
      { name: "Festival de Cannes", year: 2005, category: "Grand Prix Écrans Juniors" }
    ],
    cast: [
      { name: "Malú Tarrau", role: "Malú" },
      { name: "Jorgito Miló", role: "Jorgito" }
    ]
  },
  {
    id: "barrio-cuba",
    title: "Barrio Cuba",
    year: 2005,
    director: "Humberto Solás",
    poster: posterBarrioCuba,
    duration: "105 min",
    genre: ["Drama"],
    synopsis: "Historias entrecruzadas de personajes que buscan la felicidad y luchan por sobrevivir en una Habana dura pero llena de esperanza.",
    videoUrl: "",
    trailerUrl: "",
    awards: [
      { name: "Festival de Huelva", year: 2005, category: "Colón de Plata" }
    ],
    cast: [
      { name: "Jorge Perugorría", role: "El camionero" },
      { name: "Isabel Santos", role: "La Maga" }
    ]
  },
  {
    id: "90-millas",
    title: "90 millas",
    year: 2005,
    director: "Francisco Rodríguez",
    poster: poster90Millas,
    duration: "100 min",
    genre: ["Drama"],
    synopsis: "Una familia cubana decide emprender un peligroso viaje en balsa hacia Estados Unidos, enfrentándose al mar y a sus propios demonios.",
    videoUrl: "https://archive.org/embed/el-mani-es-asi/90+Millas.mp4",
    trailerUrl: "",
    awards: [
      { name: "Festival de Cine Latino de Nueva York", year: 2005, category: "Mejor Película" }
    ],
    cast: [
      { name: "Alexis Valdés", role: "Actor" }
    ]
  },
  {
    id: "dile-a-laura-que-la-quiero",
    title: "Dile a Laura que la quiero",
    year: 2005,
    director: "José Miguel Juárez",
    poster: posterDileALaura,
    duration: "100 min",
    genre: ["Comedia", "Romance"],
    synopsis: "Jorge, un español, se enamora de Laura en Cuba. Pero el matrimonio con un extranjero está lleno de complicaciones y malentendidos culturales.",
    videoUrl: "",
    trailerUrl: "",
    awards: [],
    cast: [
      { name: "Jorge Perugorría", role: "Marcos" },
      { name: "Nancho Novo", role: "Jorge" }
    ]
  },
  {
    id: "frutas-en-el-cafe",
    title: "Frutas en el café",
    year: 2005,
    director: "Humberto Padrón",
    poster: posterFrutas,
    duration: "95 min",
    genre: ["Drama", "Suspense"],
    synopsis: "Tres historias se entrelazan en La Habana: una prostituta, un pintor y un político. Un thriller sobre decisiones límite.",
    videoUrl: "https://archive.org/embed/frutas-en-el-cafe",
    trailerUrl: "",
    awards: [],
    cast: [
      { name: "Jorge Perugorría", role: "El Pintor" },
      { name: "Mario Limonta", role: "El Político" },
    ],
  },
  {
    id: "rey-habana",
    title: "Un rey en La Habana",
    year: 2005,
    director: "Alexis Valdés",
    poster: posterReyHabana,
    duration: "97 min",
    genre: ["Comedia"],
    synopsis: "Papito es un joven actor criado en un barrio marginal que sueña con salir adelante. Una comedia sobre supervivencia, amor y sueños en La Habana.",
    awards: [
      { name: "Festival de Comedia de Peñíscola", year: 2005, category: "Premio del Público" }
    ],
    videoUrl: "https://archive.org/embed/un-rey-en-la-habana-dvdrip-spanish-xvi-d-1.1-sedg",
    trailerUrl: "",
    cast: [
      { name: "Alexis Valdés", role: "Papito" },
      { name: "Carmen Salinas", role: "La Caimana" }
    ],
    notes: "Ópera prima de Alexis Valdés como director."
  },
  {
    id: "habana-blues",
    title: "Habana Blues",
    year: 2005,
    director: "Benito Zambrano",
    poster: posterHabanaBlues,
    duration: "115 min",
    genre: ["Drama", "Musical"],
    synopsis: "Dos músicos cubanos enfrentan un dilema: aceptar un contrato en España dejando atrás sus raíces o quedarse en Cuba.",
    videoUrl: "https://archive.org/embed/habana-blues", 
    trailerUrl: "https://www.youtube.com/embed/5lEAnDR46zo", 
    awards: [
      { name: "Premios Goya", year: 2006, category: "Mejor Música Original" },
      { name: "Premios Goya", year: 2006, category: "Mejor Montaje" }
    ],
    cast: [
      { name: "Alberto Yoel", role: "Ruy" }, 
      { name: "Roberto Sanmartín", role: "Tito" },
    ],
    backdrop: heroHabana,
  },
  {
    id: "el-benny",
    title: "El Benny",
    year: 2006,
    director: "Jorge Luis Sánchez",
    poster: posterElBenny,
    duration: "125 min",
    genre: ["Musical", "Biopic"],
    synopsis: "Biografía novelada de Benny Moré, el Bárbaro del Ritmo. La película recorre su genialidad musical, sus excesos y su lucha interna en la Cuba de los años 50.",
    videoUrl: "https://archive.org/embed/el-benny/El+Benny.mp4",
    trailerUrl: "",
    awards: [
      { name: "Festival de Locarno", year: 2006, category: "Premio Boccalino" }
    ],
    cast: [
      { name: "Renny Arozarena", role: "Benny Moré" },
      { name: "Enrique Molina", role: "Olimpio" }
    ]
  },
  {
    id: "paginas-del-diario-de-mauricio",
    title: "Páginas del diario de Mauricio",
    year: 2006,
    director: "Manuel Pérez",
    poster: posterPaginasMauricio,
    duration: "100 min",
    genre: ["Drama"],
    synopsis: "Mauricio repasa su vida y los acontecimientos de Cuba desde el año 2000, en un día crucial: su cumpleaños 60.",
    videoUrl: "https://archive.org/embed/paginas-del-diario-de-mauricio",
    trailerUrl: "",
    awards: [
      { name: "Festival de La Habana", year: 2006, category: "Premio Especial del Jurado" }
    ],
    cast: [
      { name: "Rolando Brito", role: "Mauricio" },
      { name: "Larisa Vega", role: "Esposa" }
    ]
  },
  {
    id: "el-eden-perdido",
    title: "El Edén perdido",
    year: 2007,
    director: "Manuel Estudillo",
    poster: posterElEdenPerdido,
    duration: "96 min",
    genre: ["Drama", "Histórico"],
    synopsis: "Película ambientada en 1895, durante la guerra de independencia. Una joven cubana se debate entre la lealtad a España y el amor por un insurrecto mambí.",
    videoUrl: "https://archive.org/embed/el-benny/El+Ed%C3%A9n+Perdido.mp4",
    trailerUrl: "",
    awards: [],
    cast: [
      { name: "Ana Polvorosa", role: "Actriz" }
    ]
  },
  {
    id: "camino-al-eden",
    title: "Camino al Edén",
    year: 2007,
    director: "Daniel Díaz Torres",
    poster: posterCaminoEden,
    duration: "90 min",
    genre: ["Drama", "Histórico"],
    synopsis: "Una historia de amor y guerra donde una mujer española en la Cuba colonial debe transformar su visión del mundo ante el conflicto independentista.",
    videoUrl: "https://archive.org/embed/el-benny/Camino+al+eden.mp4",
    trailerUrl: "",
    awards: [],
    cast: [
      { name: "Renny Arozarena", role: "Mambí" }
    ]
  },
  {
  id: "quien-diablos-es-juliette",
  title: "¿Quién diablos es Juliette?",
  director: "Carlos Marcovich",
  year: 1997,
  genre: ["Documental", "Drama"],
  duration: "1h 31m",
  synopsis: "Yuliet, una adolescente cubana, y Fabiola, una modelo mexicana, se cruzan en La Habana. El director Carlos Marcovich las sigue en un vibrante collage visual que explora sus vidas, sueños y las realidades contrastantes de sus mundos.",
  poster: posterJuliette,
  awards: [{ name: "Premio Ariel", year: 1998, category: "Mejor Ópera Prima" }],
  cast: [
    { name: "Yuliet Ortega", role: "Ella misma" },
    { name: "Fabiola Quiroz", role: "Ella misma" }
  ]
},
{
  id: "rosa-la-china",
  title: "Rosa la china",
  director: "Valeria Sarmiento",
  year: 2002,
  genre: ["Drama", "Romance"],
  duration: "1h 55m",
  synopsis: "Rosa, una mujer apasionada y de fuerte carácter en La Habana, busca reencontrar el amor mientras navega por las complejidades de la vida cotidiana y las relaciones en la isla.",
  poster: posterRosaLaChina,
  videoUrl: "https://archive.org/embed/el-mani-es-asi/Rosa+La+China.mpg",
  cast: [
    { name: "Mirtha Ibarra", role: "Rosa" },
    { name: "Azucena De La Fuente", role: "Amiga" }
  ]
},
{
  id: "en-fin-el-mar",
  title: "En fin, el mar (Al fin, el mar)",
  director: "Jorge Dyszel",
  year: 2003,
  genre: ["Drama", "Romance"],
  duration: "1h 42m",
  synopsis: "Tony, un operador financiero de Nueva York de origen cubano, encuentra los restos de una balsa con un nombre pintado. Su viaje a Cuba para encontrar respuestas le lleva a conocer a Mariana, una nadadora de ballet acuático, descubriendo que no todo es lo que parece.",
  poster: posterEnfinElMar,
  videoUrl:"https://archive.org/embed/el-mani-es-asi/En+Fin%2C+El+Mar-2003.mp4",
  cast: [
    { name: "Audry Gutiérrez Alea", role: "Mariana" },
    { name: "Joel Joan", role: "Tony" },
    { name: "Vladimir Cruz", role: "Amigo" }
  ]
},
{
  id: "hormigas-en-la-boca",
  title: "Hormigas en la boca",
  director: "Mariano Barroso",
  year: 2004,
  genre: ["Thriller", "Cine Negro"],
  duration: "1h 35m",
  synopsis: "La Habana, 1958. Martín vuelve a la isla tras años de cárcel en España para buscar a Julia y el botín de un antiguo robo. En medio de la agitación política previa a la revolución, se ve envuelto en una trama de traición y pasiones peligrosas.",
  poster: posterHormigas,
  awards: [{ name: "Festival de Málaga", year: 2004, category: "Premio Especial del Jurado" }],
  videoUrl:"https://archive.org/embed/el-mani-es-asi/Hormigas+En+La+Boca..mp4",
  cast: [
    { name: "Eduard Fernández", role: "Martín" },
    { name: "Jorge Perugorría", role: "Actor" },
    { name: "Ariadna Gil", role: "Julia" }
  ]
},
{
  id: "una-rosa-de-francia",
  title: "Una rosa de Francia",
  director: "Manuel Gutiérrez Aragón",
  year: 2005,
  genre: ["Aventura", "Drama", "Romance"],
  duration: "1h 40m",
  synopsis: "En la Cuba pre-revolucionaria, Andrés, un joven idealista, se enamora de Marie (Ana de Armas), una chica bajo la tutela de Simón, un contrabandista español. Juntos intentan escapar de la isla hacia una nueva vida.",
  poster: posterUnaRosaDeFrancia,
  cast: [
    { name: "Ana de Armas", role: "Marie" },
    { name: "Álex González", role: "Andrés" },
    { name: "Jorge Perugorría", role: "Simón" }
  ]
},
  {
    id: "cuerno-abundancia",
    title: "El cuerno de la abundancia",
    year: 2008,
    director: "Juan Carlos Tabío",
    poster: posterCuernoAbundancia,
    duration: "110 min",
    genre: ["Comedia"],
    synopsis: "Los habitantes de un pueblo cubano descubren que podrían heredar una fortuna millonaria de un antepasado, desatando el caos.",
    awards: [
      { name: "Festival de La Habana", year: 2008, category: "Premio del Público" }
    ],
    videoUrl: "https://archive.org/embed/el-cuerno-de-la-abundancia",
    trailerUrl: "",
    cast: [
      { name: "Jorge Perugorría", role: "Bernardito" },
      { name: "Enrique Molina", role: "Personaje" }
    ],
    notes: "Una sátira sobre la ambición."
  },
  {
    id: "cercania",
    title: "Cercanía",
    year: 2008,
    director: "Rolando Díaz",
    poster: posterCercania,
    duration: "95 min",
    genre: ["Drama"],
    synopsis: "Retrato de la vida de los cubanos inmigrantes en Miami, explorando el reencuentro de un padre anciano que llega desde Cuba con su hijo.",
    videoUrl: "",
    trailerUrl: "",
    awards: [],
    cast: [
      { name: "Reynaldo Miravalles", role: "Padre" }
    ]
  },
  {
    id: "che, el argentino",
    title: "Che, el argentino",
    year: 2008,
    director: "Steven Soderbergh",
    poster: posterCheArgentino,
    duration: "134 min",
    genre: ["Drama", "Biopic", "Bélico"],
    synopsis: "La épica historia de Ernesto 'Che' Guevara, centrada en su papel fundamental durante la Revolución Cubana y su posterior campaña en Bolivia.",
    videoUrl: "https://archive.org/embed/el-argentino/El+argentino.avi",
    trailerUrl: "",
    awards: [
      { name: "Festival de Cannes", year: 2008, category: "Mejor Actor (Benicio del Toro)" }
    ],
    cast: [
      { name: "Benicio del Toro", role: "Che Guevara" },
      { name: "Demián Bichir", role: "Fidel Castro" }
    ]
  },
    {
    id: "che, la guerrilla",
    title: "Che, la guerrilla",
    year: 2008,
    director: "Steven Soderbergh",
    poster: posterChe,
    duration: "134 min",
    genre: ["Drama", "Biopic", "Bélico"],
    synopsis: "La épica historia de Ernesto 'Che' Guevara, centrada en su papel fundamental durante la Revolución Cubana y su posterior campaña en Bolivia.",
    videoUrl: "https://archive.org/embed/el-argentino/Guerrilla.avi",
    trailerUrl: "",
    awards: [
      { name: "Festival de Cannes", year: 2008, category: "Mejor Actor (Benicio del Toro)" }
    ],
    cast: [
      { name: "Benicio del Toro", role: "Che Guevara" },
      { name: "Demián Bichir", role: "Fidel Castro" }
    ]
  },
  {
    id: "los-dioses-rotos",
    title: "Los dioses rotos",
    year: 2008,
    director: "Ernesto Daranas",
    poster: posterDiosesRotos,
    duration: "93 min",
    genre: ["Drama"],
    synopsis: "Laura investiga al famoso proxeneta Alberto Yarini, adentrándose en zonas oscuras donde pasado y presente se entrelazan.",
    videoUrl: "https://archive.org/embed/el-argentino/Los+Dioses+Rotos.mpg",
    trailerUrl: "",
    awards: [
      { name: "Festival de La Habana", year: 2008, category: "Premio del Público" },
      { name: "Premios ACE (Nueva York)", year: 2009, category: "Mejor Película" }
    ],
    cast: [
      { name: "Silvia Águila", role: "Laura" }, 
      { name: "Carlos Ever Fonseca", role: "Alberto" },
    ],
  },
  {
  id: "ciudad-en-rojo",
  title: "Ciudad en rojo",
  director: "Rebeca Chávez",
  year: 2008,
  genre: ["Drama", "Histórico", "Acción"],
  duration: "1h 30m",
  synopsis: "Santiago de Cuba, 1957. La ciudad vive bajo la tensión de la lucha clandestina contra la dictadura de Batista. En medio de la violencia y el peligro constante, un grupo de jóvenes revolucionarios intenta sobrevivir y amar sin perder la ternura.",
  poster: posterCiudadEnRojo,
  videoUrl: "https://archive.org/embed/el-argentino/Ciudad+En+Rojo.mp4",
  cast: [
    { name: "Rafael Ernesto Hernández", role: "Protagonista" },
    { name: "Eman Xor Oña", role: "Protagonista" }
  ]
},
{
  id: "cuando-la-verdad-despierta",
  title: "Cuando la verdad despierta",
  director: "Angelo Rizzi",
  year: 2008,
  genre: ["Drama", "Suspense"],
  duration: "1h 30m",
  synopsis: "Coproducción italo-cubana. Un hombre despierta en un hospital de La Habana sin memoria tras un accidente. Poco a poco, con la ayuda de una enfermera, intenta reconstruir su pasado, descubriendo verdades que quizás era mejor no recordar.",
  poster: posterCuandoLaVerdadDespierta,
  cast: [
    { name: "Rogelio Blaín", role: "Actor" },
    { name: "Enrique Molina", role: "Actor" }
  ]
},
{
  id: "el-premio-flaco",
  title: "El premio flaco",
  director: "Juan Carlos Cremata",
  year: 2009,
  genre: ["Comedia", "Drama"],
  duration: "1h 30m",
  synopsis: "Adaptación de la obra de Héctor Quintero. Iluminada gana un premio en un concurso que consiste en una casa nueva y despensa llena. Sin embargo, su suerte atrae la envidia y el oportunismo de vecinos y familiares, convirtiendo el premio en una pesadilla tragicómica.",
  poster: posterElPremioFlaco,
  videoUrl: "https://archive.org/embed/los-dioses-rotos_202601/EL+PREMIO+FLACO+VCD.mpg",
  cast: [
    { name: "Rosa Vasconcelos", role: "Iluminada" },
    { name: "Alina Rodríguez", role: "Vecina" }
  ]
},
{
  id: "la-anunciacion",
  title: "La anunciación",
  director: "Enrique Pineda Barnet",
  year: 2009,
  genre: ["Drama", "Familiar"],
  duration: "1h 20m",
  synopsis: "Una anciana médium convoca a su familia, dispersa por la emigración y los conflictos, para una reunión espiritual y física en La Habana. Un drama íntimo sobre la separación, la fe y la reconciliación familiar.",
  poster: posterLaAnunciacion,
  videoUrl: "https://archive.org/embed/los-dioses-rotos_202601/La+anunciacion.mpg",
  cast: [
    { name: "Verónica Lynn", role: "Amada" },
    { name: "Héctor Noas", role: "Hijo" }
  ]
},
];

// ============================================================================
// DÉCADA DE 2010
// ============================================================================

const movies2010s: Movie[] = [
  {
  id: "afinidades",
  title: "Afinidades",
  director: "Vladimir Cruz y Jorge Perugorría",
  year: 2010,
  genre: ["Drama", "Psicológico"],
  duration: "1h 30m",
  synopsis: "Dos parejas deciden pasar un fin de semana en un resort exclusivo para salir de la rutina. Lo que comienza como una escapada hedonista se convierte en un juego psicológico sobre los límites del deseo, el poder y el vacío emocional.",
  poster: posterAfinidades,
  videoUrl: "https://archive.org/embed/los-dioses-rotos_202601/Afinidades.mpg",
  cast: [
    { name: "Jorge Perugorría", role: "Actor/Director" },
    { name: "Vladimir Cruz", role: "Actor/Director" },
    { name: "Cuca Escribano", role: "Actriz" }
  ]
},
{
  id: "boleto-al-paraiso",
  title: "Boleto al paraíso",
  director: "Gerardo Chijona",
  year: 2010,
  genre: ["Drama"],
  duration: "1h 28m",
  synopsis: "Basada en hechos reales ocurridos en 1993. Un grupo de jóvenes rockeros y desilusionados decide inocularse voluntariamente el virus del VIH para ingresar en un sanatorio, donde creen que encontrarán comida garantizada y paz, su particular 'paraíso'.",
  poster: posterBoletoAlParaiso,
  videoUrl: "https://archive.org/embed/m-0-0",
  awards: [{ name: "Festival de Sundance", year: 2011, category: "Nominada Gran Premio del Jurado" }],
  cast: [
    { name: "Miriel Cejas", role: "Eunice" },
    { name: "Héctor Medina", role: "Alejandro" }
  ]
},
{
  id: "casa-vieja",
  title: "Casa vieja",
  director: "Lester Hamlet",
  year: 2010,
  genre: ["Drama"],
  duration: "1h 35m",
  synopsis: "Tras la muerte de su padre, esteban regresa a Cuba después de años viviendo en España. El reencuentro con su madre y su hermano en la vieja casa familiar desata secretos guardados, frustraciones y el dolor de la ausencia. Basada en la obra de Abelardo Estorino.",
  poster: posterCasaVieja,
  videoUrl: "https://archive.org/embed/los-dioses-rotos_202601/VCD+CASA+VIEJA.mpg",
  cast: [
    { name: "Yadro Reyes", role: "Esteban" },
    { name: "Daisy Granados", role: "Madre" }
  ]
},
{
  id: "chamaco",
  title: "Chamaco",
  director: "Juan Carlos Cremata",
  year: 2010,
  genre: ["Drama", "Crimen", "LGBT"],
  duration: "1h 30m",
  synopsis: "En la oscura noche de La Habana, el asesinato de un joven en el Parque Central conecta a una serie de personajes diversos: prostitución masculina, corrupción, ajedrez y soledad. Una mirada cruda a los márgenes de la sociedad.",
  poster: posterChamaco,
  videoUrl: "https://archive.org/embed/los-dioses-rotos_202601/Chamaco.mpg",
  cast: [
    { name: "Pancho García", role: "Padre" },
    { name: "Caleb Casas", role: "Hijo" }
  ]
},
{
  id: "molina-ferozz",
  title: "Molina's Ferozz",
  director: "Jorge Molina",
  year: 2010,
  genre: ["Terror", "Erótico"],
  duration: "1h 14m",
  synopsis: "Una reinterpretación visceral, gótica y erótica del cuento de Caperucita Roja ambientada en el campo cubano. Miranda vive con su abuela dominante mientras el deseo y el peligro acechan en el bosque.",
  poster: posterMolinaFeroz,
  videoUrl: "https://archive.org/embed/Lisanka/Molina+Feroz.mp4",
  cast: [
    { name: "Dayana Legrá", role: "Miranda" },
    { name: "Roberto Perdomo", role: "Lobo" }
  ]
},
{
  id: "lisanka",
  title: "Lisanka",
  director: "Daniel Díaz Torres",
  year: 2010,
  genre: ["Comedia", "Romance"],
  duration: "1h 45m",
  synopsis: "En un pueblo ficticio durante la Crisis de los Misiles (1962), tres hombres (dos cubanos y un soldado soviético) se disputan el amor de Lisanka, la muchacha más bella del lugar, mientras el mundo está al borde de la guerra nuclear.",
  poster: posterLisanka,
  videoUrl: "https://archive.org/embed/Lisanka",
  cast: [
    { name: "Miriel Cejas", role: "Lisanka" },
    { name: "Carlos Enrique Almirante", role: "Pretendiente" }
  ]
},
{
  id: "extravios",
  title: "Extravíos",
  director: "Alejandro Gil",
  year: 2011,
  genre: ["Drama"],
  duration: "1h 20m",
  synopsis: "Un escritor en crisis creativa y existencial intenta terminar su novela mientras su realidad se desmorona. Una reflexión sobre el arte, la soledad y la locura en el contexto cubano contemporáneo.",
  poster: posterExtravios,
  videoUrl: "https://archive.org/embed/Lisanka/Extravios.wmv",
  cast: [
    { name: "Laura de la Uz", role: "Actriz" },
    { name: "Héctor Noas", role: "Escritor" }
  ]
},
{
  id: "fabula",
  title: "Fábula",
  director: "Lester Hamlet",
  year: 2011,
  genre: ["Drama", "Romance"],
  duration: "1h 32m",
  synopsis: "Arturo e Ignacia, dos jóvenes con sueños frustrados, inician una intensa relación amorosa en una Habana difícil. Deben decidir si luchar por su amor o ceder ante las presiones económicas y la posibilidad de emigrar.",
  poster: posterFabula,
  videoUrl: "https://archive.org/embed/Lisanka/fabula.mpg",
  cast: [
    { name: "Carlos Luis González", role: "Arturo" },
    { name: "Alicia Hechavarría", role: "Ignacia" }
  ]
},
{
  id: "sumbe",
  title: "Sumbe",
  director: "Eduardo Moyano",
  year: 2011,
  genre: ["Bélico", "Drama", "Histórico"],
  duration: "1h 25m",
  synopsis: "Basada en hechos reales. Narra la resistencia de un grupo de colaboradores civiles cubanos (médicos, maestros, constructores) en Angola, que debieron tomar las armas para defender la ciudad de Sumbe ante el ataque de fuerzas de la UNITA en 1984.",
  poster: posterSumbe,
  videoUrl: "https://archive.org/embed/Lisanka/Sumbe.wmv",
  cast: [
    { name: "Fernando Hechavarría", role: "Protagonista" },
    { name: "Jorge Martínez", role: "Protagonista" }
  ]
},
{
  id: "penumbras",
  title: "Penumbras",
  director: "Charlie Medina",
  year: 2012,
  genre: ["Drama"],
  duration: "1h 15m",
  synopsis: "La Habana de los años 90 durante el Periodo Especial. Tres personajes alquilan habitaciones en una posada barata, enfrentándose a la incertidumbre, la falta de electricidad y la búsqueda de dignidad en medio de la crisis.",
  poster: posterPenumbras,
  videoUrl: "https://archive.org/embed/fatima-cubana-2014/PENUMBRA.mpg",  
  cast: [
    { name: "Omar Franco", role: "Actor" },
    { name: "Tomás Cao", role: "Actor" }
  ]
},
{
  id: "esther-en-alguna-parte",
  title: "Esther en alguna parte",
  director: "Gerardo Chijona",
  year: 2013,
  genre: ["Comedia", "Drama"],
  duration: "1h 35m",
  synopsis: "Lino, un anciano serio y rutinario, es abordado por Larry, un viejo extravagante que le revela que su difunta esposa, Maruja, tenía una doble vida. Juntos emprenden una búsqueda tragicómica para encontrar a Esther, el amor del pasado de Larry.",
  poster: posterEsther,
  videoUrl: "https://archive.org/embed/fatima-cubana-2014/Esther.mkv",
  cast: [
    { name: "Reynaldo Miravalles", role: "Lino" },
    { name: "Enrique Molina", role: "Larry" },
    { name: "Daisy Granados", role: "Maruja" }
  ]
},
{
  id: "la-pelicula-de-ana",
  title: "La película de Ana",
  director: "Daniel Díaz Torres",
  year: 2013,
  genre: ["Comedia", "Sátira"],
  duration: "1h 40m",
  synopsis: "Una actriz sin suerte decide fingir ser una prostituta para protagonizar un documental realizado por extranjeros y así ganar dinero y fama. Una crítica mordaz al turismo sexual y a los estereotipos sobre Cuba.",
  poster: posterLaPeliculaDeAna,
  awards: [{ name: "Festival de La Habana", year: 2013, category: "Mejor Guion" }],
  videoUrl: "https://archive.org/embed/fatima-cubana-2014/LA+PELICULA+DE+ANA.mpg",
  cast: [
    { name: "Laura de la Uz", role: "Ana" },
    { name: "Yuliet Cruz", role: "Amiga" }
  ]
},
{
  id: "boccaccerias-habaneras",
  title: "Boccaccerías Habaneras",
  director: "Arturo Sotto",
  year: 2014,
  genre: ["Comedia"],
  duration: "1h 40m",
  synopsis: "Tres historias independientes enlazadas por un hilo conductor: un escritor en crisis que paga por escuchar cuentos. Una adaptación libre y tropical del Decamerón de Boccaccio, llena de picardía, ingenio y sensualidad cubana.",
  poster: posterBoccacherias,
  videoUrl: "https://archive.org/embed/boccaccerias-habaneras-2014/Boccaccerias+Habaneras+(2014).mpg",
  cast: [
    { name: "Daniel Amat", role: "Escritor" },
    { name: "Jorge Perugorría", role: "Actor" }
  ]
},
{
  id: "contigo-pan-y-cebolla",
  title: "Contigo pan y cebolla",
  director: "Juan Carlos Cremata",
  year: 2014,
  genre: ["Comedia", "Drama", "Clásico"],
  duration: "1h 40m",
  synopsis: "Adaptación del clásico teatral de Héctor Quintero. Lala Fundora es una matriarca cubana de los años 50 obsesionada con comprar un refrigerador para aparentar estatus social, arrastrando a su familia a situaciones hilarantes y conmovedoras.",
  poster: posterContigoPanyCebolla,
  videoUrl: "https://archive.org/embed/boccaccerias-habaneras-2014/Contigo+Pan+y+Cebolla+%5B2014%5D.avi",
  cast: [
    { name: "Alina Rodríguez", role: "Lala Fundora" },
    { name: "Enrique Molina", role: "Anselmo" }
  ]
},
{
  id: "fatima",
  title: "Fátima o el Parque de la Fraternidad",
  director: "Jorge Perugorría",
  year: 2014,
  genre: ["Drama", "LGBT"],
  duration: "1h 30m",
  synopsis: "Basada en el cuento de Miguel Barnet. Fátima (antes Manolito) es un travesti de inquebrantable autoestima que se prostituye en La Habana. La película narra su vida, sus amores conflictivos y su devoción religiosa a la Virgen de Fátima.",
  poster: posterFatima,
  videoUrl: "https://archive.org/embed/fatima-cubana-2014/Fatima+%5BCubana%5D+%5B2014%5D.mpg",
  cast: [
    { name: "Carlos Enrique Almirante", role: "Fátima" },
    { name: "Tomás Cao", role: "Vaselina" }
  ]
},
{
  id: "la-pared-de-las-palabras",
  title: "La pared de las palabras",
  director: "Fernando Pérez",
  year: 2014,
  genre: ["Drama"],
  duration: "1h 38m",
  synopsis: "Luis padece una distonía que le impide comunicarse corporalmente, aunque su mente está lúcida. Su madre es su único puente con el mundo. Un drama profundo sobre el dolor, la incomunicación y los límites del sacrificio familiar en una institución psiquiátrica.",
  poster: posterLaParedDeLasPalabras,
  videoUrl: "https://archive.org/embed/fatima-cubana-2014/LA+PARED+DE+LAS+PALABRAS.mp4",
  cast: [
    { name: "Jorge Perugorría", role: "Luis" },
    { name: "Isabel Santos", role: "Madre" }
  ]
},
{
  id: "omega-3",
  title: "Omega 3",
  director: "Eduardo del Llano",
  year: 2014,
  genre: ["Ciencia Ficción", "Sátira"],
  duration: "1h 14m",
  synopsis: "En un futuro distópico, una guerra mundial se ha desatado entre los Vegs (vegetarianos), los Macs (carnívoros) y los Ovos (ovo-lácteo-vegetarianos). Un oficial Veg es interrogado para descubrir una supuesta conspiración. Una rareza de ciencia ficción en el cine cubano.",
  poster: posterOmega3,
  videoUrl: "https://archive.org/embed/fatima-cubana-2014/Omega+3+(Eduardo+del+Llano%2C+2014).mkv",
  cast: [
    { name: "Carlos Gonzalvo", role: "Oficial" },
    { name: "Dailenys Fuentes", role: "Soldado" }
  ]
},
{
  id: "si-vas-a-comer-espera-por-virgilio",
  title: "Si vas a comer espera por Virgilio",
  director: "Tomás Piard",
  year: 2013,
  genre: ["Drama", "Teatro"],
  duration: "1h 25m",
  synopsis: "Basada en la obra de José Milián. Una recreación de la mítica obra teatral donde el propio dramaturgo Virgilio Piñera regresa del más allá para sentarse a comer en una cafetería de La Habana, reflexionando sobre la cultura, la censura y el destino del artista.",
  poster: posterVirgilio,
  videoUrl: "https://archive.org/embed/boccaccerias-habaneras-2014/Si+vas+a+comer+espera+por+Virgilio+%5BCubana%5D%5B2014%5D.avi",
  cast: [
    { name: "Iván García", role: "Virgilio" },
    { name: "Javier Castro", role: "Pepe" }
  ]
},
  {
    id: "marti-2011",
    title: "José Martí: El Ojo del Canario",
    year: 2010,
    director: "Fernando Pérez",
    poster: posterMarti,
    duration: "120 min",
    genre: ["Drama", "Histórico"],
    synopsis: "Una mirada íntima a la infancia y juventud de José Martí, el héroe nacional de Cuba.",
    trailerUrl: "https://www.youtube.com/embed/1f7KHlOuzCA",
    videoUrl: "https://archive.org/embed/el-ojo-del-canario-marti",
    awards: [
      { name: "Festival de La Habana", year: 2010, category: "Gran Premio Coral" },
      { name: "Premios Ariel", year: 2011, category: "Mejor Película Iberoamericana" }
    ],
    cast: [
      { name: "Damián Rodríguez", role: "Pepe Martí (niño)" },
      { name: "Daniel Romero", role: "José Martí (adolescente)" }
    ],
    notes: "Retrato humanista del héroe nacional cubano en su juventud."
  },
  {
    id: "memoria-2010",
    title: "Memorias del Desarrollo",
    year: 2010,
    director: "Miguel Coyula",
    poster: posterMemoria,
    duration: "112 min",
    genre: ["Drama", "Experimental"],
    synopsis: "Un intelectual cubano en el exilio vive desconectado de la sociedad. Un collage visual sobre la alienación.",
    trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    awards: [
      { name: "Festival de Tribeca", year: 2010, category: "Mejor Película (New York)" }
    ],
    cast: [{ name: "Ron Blair", role: "Sergio" }],
  },
  {
    id: "conducta-2014",
    title: "Conducta",
    year: 2014,
    director: "Ernesto Daranas",
    poster: posterChala,
    duration: "108 min",
    genre: ["Drama"],
    synopsis: "Chala es un niño de once años que vive en un barrio marginal. Carmela, su maestra, lucha contra el sistema educativo para salvarlo.",
    trailerUrl: "https://www.youtube.com/embed/uBPfo4exDZM",
    videoUrl: "https://archive.org/embed/conducta_202601",
    awards: [
      { name: "Premio Goya", year: 2015, category: "Mejor Película Iberoamericana" },
      { name: "Festival de La Habana", year: 2014, category: "Gran Premio Coral" }
    ],
    cast: [
      { name: "Armando Valdés Freire", role: "Chala" },
      { name: "Alina Rodríguez", role: "Carmela" }
    ],
    notes: "La película cubana más taquillera de la historia en su país."
  },
  {
    id: "juan-de-los-muertos",
    title: "Juan de los Muertos",
    year: 2011,
    director: "Alejandro Brugués",
    poster: posterJuanDeLosMuertos,
    duration: "92 min",
    genre: ["Comedia", "Terror"],
    synopsis: "Zombis invaden La Habana. Juan decide hacer negocio matando a los seres queridos de la gente.",
    videoUrl: "https://archive.org/embed/juan-de-los-muertos", 
    trailerUrl: "https://www.youtube.com/embed/mhcIBEqczpg",
    awards: [
      { name: "Premios Goya", year: 2013, category: "Mejor Película Iberoamericana" },
      { name: "Festival de La Habana", year: 2011, category: "Premio de la Popularidad" }
    ],
    cast: [{ name: "Alexis Díaz de Villegas", role: "Juan" }, { name: "Jorge Molina", role: "Lázaro" }],
    backdrop: heroJuan,
  },
  {
    id: "habanastation",
    title: "Habanastation",
    year: 2011,
    director: "Ian Padrón",
    poster: posterHabanastation,
    duration: "95 min",
    genre: ["Drama", "Aventuras"],
    synopsis: "Dos niños de entornos sociales opuestos se pierden en La Habana y forjan una amistad inesperada.",
    videoUrl: "https://archive.org/embed/juan-de-los-muertos/HABANASTATION.mpg",
    trailerUrl: "https://www.youtube.com/embed/3t3fa6WIQ0U",
    awards: [
      { name: "Festival de Traverse City", year: 2011, category: "Premio Fundadores" },
      { name: "Festival de La Habana", year: 2011, category: "Premio de la UNICEF" }
    ],
    cast: [
      { name: "Andy Fornaris", role: "Mayito" }, 
      { name: "Ernesto Escalona", role: "Carlos" }
    ]
  },
  {
    id: "sergio-y-serguei",
    title: "Sergio y Serguéi",
    year: 2017,
    director: "Ernesto Daranas",
    poster: posterSergioSerguei,
    duration: "93 min",
    genre: ["Drama", "Comedia"],
    synopsis: "En 1991, un radioaficionado cubano contacta con el último cosmonauta soviético olvidado en el espacio.",
    videoUrl: "https://archive.org/embed/juan-de-los-muertos/%5BSergio+Y+Serguei+(Pelicula+Cubana%5D%5BAAA%5D%5B2018%5D.mp4",
    trailerUrl: "",
    awards: [
      { name: "Festival de Málaga", year: 2018, category: "Premio SIGNIS" },
      { name: "Festival de La Habana", year: 2017, category: "Premio del Público" }
    ],
    cast: [
      { name: "Tomás Cao", role: "Sergio" }, 
      { name: "Héctor Noas", role: "Serguéi" },
    ]
  },
  {
    id: "inocencia",
    title: "Inocencia",
    year: 2018,
    director: "Alejandro Gil",
    poster: posterInocencia,
    duration: "81 min",
    genre: ["Drama", "Histórico"],
    synopsis: "Ocho estudiantes de medicina son injustamente condenados a muerte en 1871. Años después se busca demostrar su inocencia.",
    videoUrl: "",
    trailerUrl: "",
    awards: [
      { name: "Festival de La Habana", year: 2018, category: "Premio Especial del Jurado" },
      { name: "Festival de La Habana", year: 2018, category: "Premio del Público" }
    ],
    cast: [
      { name: "Yasmany Guerrero", role: "Fermín Valdés Domínguez" }, 
      { name: "Luis Manuel Álvarez", role: "Estudiante" }
    ]
  },
];

// ============================================================================
// DÉCADA DE 2020
// ============================================================================
const movies2020s: Movie[] = [];


// ============================================================================
// LÓGICA DE ORDENAMIENTO Y EXPORTACIÓN
// ============================================================================

// 1. Función auxiliar: Ordena por año y luego por título
const sortByYear = (list: Movie[]) => {
  return [...list].sort((a, b) => {
    // Primero comparamos el año
    if (a.year !== b.year) {
      return a.year - b.year; 
    }
    // Si es el mismo año, alfabéticamente
    return a.title.localeCompare(b.title);
  });
};

// 2. EXPORTACIÓN DE LA LISTA COMPLETA
export const movies = sortByYear([
  ...movies1960s,
  ...movies1970s,
  ...movies1980s,
  ...movies1990s,
  ...movies2000s,
  ...movies2010s,
  ...movies2020s,
]);

// 3. EXPORTACIÓN POR DÉCADAS
export const moviesByDecade = {
  '1960s': sortByYear(movies1960s),
  '1970s': sortByYear(movies1970s),
  '1980s': sortByYear(movies1980s),
  '1990s': sortByYear(movies1990s),
  '2000s': sortByYear(movies2000s),
  '2010s': sortByYear(movies2010s),
  '2020s': sortByYear(movies2020s),
};

// 4. FUNCIONES AUXILIARES (Para Detalles y Buscador)
export const getMovieById = (id: string | undefined): Movie | undefined => {
  if (!id) return undefined;
  return movies.find((movie) => movie.id === id);
};

export const getRelatedMovies = (currentMovieId: string, limit: number = 4): Movie[] => {
  const currentMovie = getMovieById(currentMovieId);
  if (!currentMovie) return [];

  return movies
    .filter((movie) => 
      movie.id !== currentMovieId && 
      (movie.genre.some(g => currentMovie.genre.includes(g)) || movie.director === currentMovie.director)
    )
    .slice(0, limit);
};