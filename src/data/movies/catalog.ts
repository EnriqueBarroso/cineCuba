/**
 * CATÁLOGO DE PELÍCULAS DEL CINE CUBANO
 * Archivo: src/data/movies/catalog.ts
 */

import type { Movie } from './types';
import {
  posterLucia,
  posterBurocrata,
  poster12Sillas,
  posterJuanQuinQuin,
  posterDeCiertaManera,
  posterMaisinicu,
  posterRetratoTeresa,
  posterSobrevivientes,
  posterUltimaCena,
  posterLosPajaros,
  posterVampirosHabana,
  posterEnTresYDos,
  posterBellaAlhambra,
  posterCecilia,
  posterHombreExito,
  posterBrigadista,
  posterClandestinos,
  posterPlaff,
  posterAdorablesMentiras,
  posterElefanteBicicleta,
  posterFresa,
  posterMadagascar,
  posterListaEspera,
  posterSuite,
  posterCuernoAbundancia,
  posterReyHabana,
  posterChala,
  posterMarti,
  posterMemoria,
  posterGuantanamera,
  posterSePermuta,
  posterPapelesSecundarios,
  posterMemoriasSub,
  posterSoyCuba,
  posterElpidioValdes,
  posterLaVidaEsSilbar,
  posterJuanDeLosMuertos,
  posterVideoDeFamilia,
  posterHabanaBlues,
  posterDiosesRotos,
  posterHabanastation,
  posterSergioSerguei,
  posterInocencia,
  posterHelloHeminguey,
  posterParaisoEstrellas,
  posterHacerseSueco,
  posterMielOshun,
  posterNoviaDavid,
  posterAmorVertical,
  posterZafiros,
  posterKleinesTropicana,
  posterMariaAntonia,
  posterCaravana,
  posterAlicia,
  posterAmanda,
  posterNada,
  posterEntreCiclones,
  posterFrutas,
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
    id: 'doce-sillas',
    title: 'Las doce sillas',
    year: 1962,
    director: 'Tomás Gutiérrez Alea',
    poster: poster12Sillas,
    duration: '97 min',
    genre: ['Comedia'],
    synopsis:
      'Un aristócrata venido a menos y su antiguo chófer buscan desesperadamente unos diamantes que fueron escondidos en una de las doce sillas de un juego de comedor antes de ser expropiadas por la Revolución. En su frenética búsqueda, se enfrentan a las nuevas realidades sociales de Cuba.',
    videoUrl: 'https://archive.org/embed/las-12-sillas', 
    trailerUrl: '',
    awards: [
      { name: 'Festival de Karlovy Vary', year: 1963, category: 'Mención Especial' },
    ],
    cast: [
      { name: 'Enrique Santiesteban', role: 'Hipólito' },
      { name: 'Reinaldo Miravalles', role: 'Óscar' },
    ],
  },
  {
    id: 'aventuras-juan-quin-quin',
    title: 'Las aventuras de Juan Quin Quín',
    year: 1967,
    director: 'Julio García Espinosa',
    poster: posterJuanQuinQuin,
    duration: '110 min',
    genre: ['Comedia', 'Aventuras'],
    synopsis:
      'Juan Quin Quín es un campesino buscavidas que, junto a su amigo Jachero y su amada Teresa, vive múltiples aventuras en la Cuba prerrevolucionaria. La película parodia los géneros del cine comercial para narrar la toma de conciencia política.',
    videoUrl: '', // Pendiente de Archive.org
    trailerUrl: 'https://www.youtube.com/embed/_HilxAW2dg4',
    awards: [
      { name: 'Festival de Karlovy Vary', year: 1967, category: 'Premio Especial del Jurado' },
    ],
    cast: [
      { name: 'Julio Martínez', role: 'Juan Quin Quín' },
      { name: 'Erdwin Fernández', role: 'Jachero' },
    ],
  },
  {
    id: 'muerte-burocrata',
    title: 'La muerte de un burócrata',
    year: 1966,
    director: 'Tomás Gutiérrez Alea',
    poster: posterBurocrata,
    duration: '85 min',
    genre: ['Comedia'],
    synopsis:
      'Un joven intenta recuperar el carnet laboral de su tío recién fallecido, el cual fue enterrado con él, para que su viuda pueda cobrar la pensión. Esto desata una cadena de trámites absurdos y situaciones kafkianas.',
    videoUrl: 'https://archive.org/embed/la-muerte-de-un-burocrata',
    trailerUrl: 'https://www.youtube.com/embed/ZqjeKGGE1Z4',
    awards: [
      { name: 'Festival de Karlovy Vary', year: 1966, category: 'Premio Especial del Jurado' },
    ],
    cast: [{ name: 'Salvador Wood', role: 'El sobrino' }],
  },
  {
    id: 'lucia-1968',
    title: 'Lucía',
    year: 1968,
    director: 'Humberto Solás',
    poster: posterLucia,
    duration: '160 min',
    genre: ['Drama', 'Histórico'],
    synopsis:
      'Tres episodios, tres mujeres llamadas Lucía, tres momentos históricos: la guerra de independencia de 1895, la lucha contra Machado en los años 30 y la Revolución de los 60.',
    videoUrl: '', // Pendiente de Archive.org
    trailerUrl: 'https://www.youtube.com/embed/A_oD1MCtk5w',
    awards: [
      { name: 'Festival de Moscú', year: 1969, category: 'Gran Premio' },
    ],
    cast: [
      { name: 'Raquel Revuelta', role: 'Lucía (1895)' },
      { name: 'Eslinda Núñez', role: 'Lucía (1932)' },
    ],
  },
  {
    id: 'memorias-subdesarrollo',
    title: 'Memorias del subdesarrollo',
    year: 1968,
    director: 'Tomás Gutiérrez Alea',
    poster: posterMemoriasSub,
    duration: '97 min',
    genre: ['Drama'],
    synopsis:
      'Sergio, un intelectual burgués, decide quedarse en Cuba tras el triunfo de la Revolución mientras su familia y amigos huyen a Miami. Solo y alienado, deambula por La Habana observando críticamente los vertiginosos cambios sociales.',
    videoUrl: "", // Pendiente de Archive.org
    trailerUrl: "https://www.youtube.com/embed/yFXqq4KuJ3w",
    awards: [
      { name: 'Festival de Karlovy Vary', year: 1968, category: 'Premio FIPRESCI' },
    ],
    cast: [
      { name: 'Sergio Corrieri', role: 'Sergio' },
      { name: 'Daisy Granados', role: 'Elena' },
    ],
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
      'Una coproducción cubano-soviética visualmente deslumbrante que narra cuatro historias sobre la vida en Cuba antes de la Revolución. Famosa por sus increíbles planos secuencia y su fotografía en blanco y negro.',
    videoUrl: '', 
    trailerUrl: '',
    awards: [{ name: 'Cannes Classics', year: 2004, category: 'Restauración' }],
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
    id: 'hombre-maisinicu',
    title: 'El hombre de Maisinicú',
    year: 1973,
    director: 'Manuel Pérez',
    poster: posterMaisinicu,
    duration: '100 min',
    genre: ['Drama', 'Histórico'],
    synopsis:
      'Basada en hechos reales. Alberto Delgado opera como agente encubierto infiltrado en las bandas contrarrevolucionarias del Escambray. La película narra su peligrosa doble vida y sacrificio.',
    awards: [
      { name: 'Festival de Karlovy Vary', year: 1974, category: 'Premio Especial' },
    ],
     videoUrl: '', // Pendiente de Archive.org
    trailerUrl: 'https://www.youtube.com/embed/PoKUHKXj3Co&list=RDPoKUHKXj3Co&start_radio=1',
    cast: [{ name: 'Sergio Corrieri', role: 'Alberto Delgado' }],
  },
  {
    id: 'de-cierta-manera',
    title: 'De cierta manera',
    year: 1974,
    director: 'Sara Gómez',
    poster: posterDeCiertaManera,
    duration: '73 min',
    genre: ['Drama', 'Documental'],
    synopsis:
      'Yolanda, una maestra de clase media, se enamora de Mario, un obrero de un barrio marginal. La película mezcla ficción y documental para examinar los conflictos de clase y el machismo.',
    awards: [],
     videoUrl: 'https://archive.org/embed/de-cierta-manera', // Pendiente de Archive.org
    trailerUrl: 'https://www.youtube.com/embed/csNWvMxNVXo',
    cast: [
      { name: 'Yolanda Cuéllar', role: 'Yolanda' },
      { name: 'Mario Balmaseda', role: 'Mario' },
    ],
  },
  {
    id: 'la-ultima-cena',
    title: 'La última cena',
    year: 1976,
    director: 'Tomás Gutiérrez Alea',
    poster: posterUltimaCena,
    duration: '120 min',
    genre: ['Drama', 'Histórico'],
    synopsis:
      'A finales del siglo XVIII, un conde recrea la última cena con doce esclavos el Jueves Santo. Les promete un día de libertad, pero la brutalidad del día siguiente desata una rebelión.',
    awards: [
      { name: 'Festival de La Habana', year: 1976, category: 'Gran Premio' },
    ],
    videoUrl: '',
    trailerUrl: 'https://www.youtube.com/embed/lfluvDZsqms',
    cast: [{ name: 'Nelson Villagra', role: 'El Conde' }],
  },
  {
    id: 'retrato-de-teresa',
    title: 'Retrato de Teresa',
    year: 1979,
    director: 'Pastor Vega',
    poster: posterRetratoTeresa,
    duration: '103 min',
    genre: ['Drama'],
    synopsis:
      'Teresa es una trabajadora textil y dirigente sindical que se enfrenta al machismo de su esposo. El conflicto marital se convierte en símbolo de la lucha de la mujer por su emancipación.',
    awards: [
      { name: 'Festival de La Habana', year: 1979, category: 'Gran Premio Coral' },
    ],
    trailerUrl: 'https://www.youtube.com/embed/ff5SpRmTrng',
    cast: [
      { name: 'Daisy Granados', role: 'Teresa' },
      { name: 'Adolfo Llauradó', role: 'Ramón' },
    ],
  },
  {
    id: 'sobrevivientes',
    title: 'Los sobrevivientes',
    year: 1979,
    director: 'Tomás Gutiérrez Alea',
    poster: posterSobrevivientes,
    duration: '130 min',
    genre: ['Drama'],
    synopsis:
      "Una familia aristocrática decide encerrarse en su mansión esperando que la Revolución pase. Aislados, mantienen sus jerarquías hasta involucionar hacia la barbarie.",
    videoUrl: '', // Pendiente de Archive.org
    trailerUrl: 'https://www.youtube.com/embed/7qKSk9fpF8M',
    awards: [],
    cast: [{ name: 'Enrique Santiesteban', role: 'Sebastián' }],
  },
  {
    id: 'el-brigadista',
    title: 'El Brigadista',
    year: 1977,
    director: 'Octavio Cortázar',
    poster: posterBrigadista,
    duration: '119 min',
    genre: ['Drama', 'Histórico'],
    synopsis:
      'Durante la Campaña de Alfabetización de 1961, un joven estudiante llega a una zona rural remota para enseñar a leer, enfrentándose a la ignorancia y a las bandas contrarrevolucionarias.',
    awards: [
      { name: 'Festival de Moscú', year: 1978, category: 'Premio Especial' },
    ],
    videoUrl: '',
    trailerUrl: 'https://www.youtube.com/embed/sM9WoGomm_E',
    cast: [{ name: 'Salvador Wood', role: 'Mario' }],
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
    videoUrl: "", // Pendiente de Archive.org
    trailerUrl: "https://www.youtube.com/embed/6vcGn6a-0ss",
    awards: [{ name: "Festival de Gijón", year: 1979, category: "Mejor Película Infantil" }],
    cast: [{ name: "Frank González", role: "Elpidio Valdés (voz)" }],
    backdrop: heroElpidio,
  },
];

// ============================================================================
// DÉCADA DE 1980
// ============================================================================

const movies1980s: Movie[] = [
  {
    id: 'cecilia',
    title: 'Cecilia',
    year: 1982,
    director: 'Humberto Solás',
    poster: posterCecilia,
    duration: '127 min',
    genre: ['Drama', 'Romance', 'Histórico'],
    synopsis:
      "En la Habana colonial, la mestiza Cecilia y el aristócrata Leonardo viven un apasionado romance sin saber que son hermanos, desencadenando una tragedia.",
    awards: [
      { name: 'Festival de La Habana', year: 1982, category: 'Gran Premio Coral' },
    ],
    cast: [{ name: 'Daisy Granados', role: 'Cecilia' }],
  },
  {
    id: 'un-hombre-de-exito',
    title: 'Un hombre de éxito',
    year: 1986,
    director: 'Humberto Solás',
    poster: posterHombreExito,
    duration: '120 min',
    genre: ['Drama'],
    synopsis:
      "Javier es un joven ambicioso que se adapta camaleónicamente a los diferentes gobiernos de la Cuba republicana para ascender socialmente, sacrificando sus ideales.",
    awards: [],
    cast: [{ name: 'César Évora', role: 'Javier' }],
  },
  {
    id: 'pajaros-escopeta',
    title: 'Los pájaros tirándole a la escopeta',
    year: 1984,
    director: 'Rolando Díaz',
    poster: posterLosPajaros,
    duration: '90 min',
    genre: ['Comedia'],
    synopsis:
      'Dos jóvenes enamorados enfrentan un conflicto inesperado cuando sus padres solteros comienzan su propio romance, invirtiendo los roles generacionales.',
    videoUrl: 'https://archive.org/embed/los-pajaros-tirandole-a-la-escopeta', 
    trailerUrl: 'https://www.youtube.com/embed/yUUzGFLx7jY',
    awards: [],
    cast: [
      { name: 'Luis Alberto García', role: 'Carlos' },
      { name: 'Beatriz Valdés', role: 'Ofelia' },
    ],
  },
  {
    id: 'se-permuta',
    title: 'Se permuta',
    year: 1984,
    director: 'Juan Carlos Tabío',
    poster: posterSePermuta,
    duration: '100 min',
    genre: ['Comedia'],
    synopsis:
      'Gloria mueve cielo y tierra para mudarse de barrio mediante una compleja cadena de permutas, generando un caos burocrático y situaciones disparatadas.',
    awards: [
      { name: 'Festival de La Habana', year: 1984, category: 'Premio del Público' },
    ],
    trailerUrl: 'https://www.youtube.com/embed/2-0en0M6YCA',
    videoUrl: 'https://archive.org/embed/1983-se-permuta',
    cast: [
      { name: 'Rosita Fornés', role: 'Gloria' },
      { name: 'Isabel Santos', role: 'Yolanda' },
    ],
  },
  {
    id: 'vampiros-habana',
    title: '¡Vampiros en La Habana!',
    year: 1985,
    director: 'Juan Padrón',
    poster: posterVampirosHabana,
    duration: '69 min',
    genre: ['Animación', 'Comedia'],
    synopsis:
      "Un científico vampiro crea una fórmula para resistir el sol. Su sobrino Pepito debe protegerla de la mafia de vampiros de Chicago y Europa.",
    videoUrl: '', // Pendiente de Archive.org
    trailerUrl: 'https://www.youtube.com/embed/g5AQB02LdVw',
    awards: [],
    cast: [{ name: 'Frank González', role: 'Drácula (voz)' }],
    backdrop: heroVampiros,
  },
  {
    id: 'en-tres-y-dos',
    title: 'En tres y dos',
    year: 1985,
    director: 'Rolando Díaz',
    poster: posterEnTresYDos,
    duration: '100 min',
    genre: ['Comedia', 'Drama'],
    synopsis:
      'Mario, un pelotero estrella, debe enfrentar el retiro. La película explora el béisbol cubano y la difícil transición fuera del deporte de alto rendimiento.',
    awards: [],
     videoUrl: 'https://archive.org/embed/en.-tres.-y.-dos', // Pendiente de Archive.org
    trailerUrl: 'https://www.youtube.com/embed/g5AQB02LdVw',
    cast: [{ name: 'Samuel Claxton', role: 'El entrenador' }],
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
    videoUrl: "", // Pendiente de Archive.org
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
    id: 'clandestinos',
    title: 'Clandestinos',
    year: 1987,
    director: 'Fernando Pérez',
    poster: posterClandestinos,
    duration: '100 min',
    genre: ['Drama', 'Histórico'],
    synopsis:
      'La vida de un grupo de jóvenes en la lucha clandestina urbana contra Batista. Se centra en la relación de amor y sacrificio entre Ernesto y Nereida.',
    awards: [],
    cast: [
      { name: 'Luis Alberto García', role: 'Ernesto' },
      { name: 'Isabel Santos', role: 'Nereida' },
    ],
  },
  {
    id: 'plaff',
    title: 'Plaff o Demasiado miedo a la vida',
    year: 1988,
    director: 'Juan Carlos Tabío',
    poster: posterPlaff,
    duration: '100 min',
    genre: ['Comedia'],
    synopsis:
      "Concha vive obsesionada con que le lanzan huevos a su casa. Una sátira sobre los miedos irracionales y la inmovilidad social.",
    awards: [],
    cast: [{ name: 'Daisy Granados', role: 'Concha' }],
  },
  {
    id: 'bella-alhambra',
    title: 'La bella del Alhambra',
    year: 1989,
    director: 'Enrique Pineda Barnet',
    poster: posterBellaAlhambra,
    duration: '108 min',
    genre: ['Drama', 'Musical'],
    synopsis:
      'Rachel, una corista ambiciosa, lucha por ser vedette en el famoso Teatro Alhambra en la Habana de los años 20.',
    awards: [
      { name: 'Premio Goya', year: 1990, category: 'Mejor Película Extranjera' },
    ],
    cast: [{ name: 'Beatriz Valdés', role: 'Rachel' }],
  },
  {
    id: 'papeles-secundarios',
    title: 'Papeles secundarios',
    year: 1989,
    director: 'Orlando Rojas',
    poster: posterPapelesSecundarios,
    duration: '95 min',
    genre: ['Drama'],
    synopsis:
      'En un grupo de teatro, Mirta, una actriz veterana relegada a papeles secundarios, lucha por su dignidad en un ambiente de control y oportunismo.',
    awards: [],
    cast: [{ name: 'Rosita Fornés', role: 'Actriz' }],
  },
];

// ============================================================================
// DÉCADA DE 1990
// ============================================================================

const movies1990s: Movie[] = [
  {
    id: 'maria-antonia',
    title: 'María Antonia',
    year: 1990,
    director: 'Sergio Giral',
    poster: posterMariaAntonia,
    duration: '111 min',
    genre: ['Drama'],
    synopsis:
      'Ambientada en los años 50. María Antonia es una mujer indomable cuya vida está marcada por la religión afrocubana y una pasión destructiva por un boxeador.',
    videoUrl: '',
    trailerUrl: '',
    awards: [],
    cast: [
      { name: 'Alina Rodríguez', role: 'María Antonia' },
      { name: 'Alexis Valdés', role: 'Julián' },
    ],
  },
  {
    id: 'caravana',
    title: 'Caravana',
    year: 1990,
    director: 'Rogelio París',
    poster: posterCaravana,
    duration: '100 min',
    genre: ['Bélico', 'Aventuras'],
    synopsis:
      'Durante la guerra de Angola, una caravana militar cubana debe abastecer un puente aislado, enfrentándose a emboscadas y tensiones internas.',
    videoUrl: '',
    trailerUrl: '',
    awards: [],
    cast: [
      { name: 'Manuel Porto', role: 'El Jefe' },
      { name: 'Patricio Wood', role: 'Soldado' },
    ],
  },
  {
    id: 'alicia-en-el-pueblo-de-maravillas',
    title: 'Alicia en el pueblo de Maravillas',
    year: 1991,
    director: 'Daniel Díaz Torres',
    poster: posterAlicia,
    duration: '93 min',
    genre: ['Sátira', 'Comedia'],
    synopsis:
      'Una instructora de teatro llega a un pueblo donde ocurren sucesos absurdos y burocráticos. Una sátira mordaz sobre la sociedad cubana.',
    videoUrl: '',
    trailerUrl: '',
    awards: [{ name: 'Festival de Berlín', year: 1991, category: 'Premio Caligari' }],
    cast: [
      { name: 'Thais Valdés', role: 'Alicia' },
      { name: 'Reynaldo Miravalles', role: 'El Director' },
    ],
  },
  {
    id: 'adorables-mentiras',
    title: 'Adorables mentiras',
    year: 1991,
    director: 'Gerardo Chijona',
    poster: posterAdorablesMentiras,
    duration: '108 min',
    genre: ['Comedia', 'Romance'],
    synopsis:
      "Jorge Luis y Sissy construyen una relación basada en mentiras sobre sus éxitos profesionales, hasta que la realidad amenaza con desmoronar todo.",
    awards: [],
    cast: [
      { name: 'Isabel Santos', role: 'Nancy' },
      { name: 'Luis Alberto García', role: 'Lombardi' },
    ],
  },
  {
    id: 'fresa-chocolate-1993',
    title: 'Fresa y Chocolate',
    year: 1993,
    director: 'Tomás Gutiérrez Alea, Juan Carlos Tabío',
    poster: posterFresa,
    duration: '110 min',
    genre: ['Drama', 'Comedia'],
    synopsis:
      'Diego, un artista homosexual, y David, un joven comunista, construyen una amistad improbable que desafía la intolerancia en La Habana de los 90.',
    videoUrl: '', // Pendiente de Archive.org
    trailerUrl: 'https://www.youtube.com/embed/ygR1OTyVr7I',
    awards: [
      { name: 'Oso de Plata', year: 1994, category: 'Gran Premio del Jurado' },
      { name: 'Nominación al Oscar', year: 1995, category: 'Mejor Película Extranjera' },
    ],
    cast: [
      { name: 'Jorge Perugorría', role: 'Diego' },
      { name: 'Vladimir Cruz', role: 'David' },
    ],
    backdrop: heroFresa,
  },
  {
    id: 'madagascar',
    title: 'Madagascar',
    year: 1994,
    director: 'Fernando Pérez',
    poster: posterMadagascar,
    duration: '52 min',
    genre: ['Drama'],
    synopsis:
      'Durante el Período Especial, una madre y su hija viven una relación tensa. La hija sueña obsesivamente con viajar a Madagascar como vía de escape.',
    awards: [],
    cast: [{ name: 'Laura de la Uz', role: 'Laura' }],
  },
  {
    id: 'elefante-bicicleta',
    title: 'El elefante y la bicicleta',
    year: 1994,
    director: 'Juan Carlos Tabío',
    poster: posterElefanteBicicleta,
    duration: '85 min',
    genre: ['Comedia'],
    synopsis:
      "Un proyeccionista llega a la Isla de la Juventud con la película 'Robin Hood', revolucionando a los habitantes que empiezan a soñar con libertad.",
    awards: [],
    cast: [{ name: 'Luis Alberto García', role: 'Jefe' }],
  },
  {
    id: 'guantanamera',
    title: 'Guantanamera',
    year: 1995,
    director: 'Tomás Gutiérrez Alea, Juan Carlos Tabío',
    poster: posterGuantanamera,
    duration: '101 min',
    genre: ['Comedia'],
    synopsis:
      'Un cortejo fúnebre debe cruzar Cuba cumpliendo un absurdo plan estatal de transporte. Un viaje tragicómico sobre la burocracia.',
    videoUrl: "", 
    trailerUrl: "https://www.youtube.com/embed/RueAO8A7rdw",
    awards: [],
    cast: [
      { name: 'Carlos Cruz', role: 'Adolfo' },
      { name: 'Mirtha Ibarra', role: 'Gina' },
    ],
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
    videoUrl: "",
    trailerUrl: "",
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
    videoUrl: "",
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
    id: 'las-profecias-de-amanda',
    title: 'Las profecías de Amanda',
    year: 1999,
    director: 'Pastor Vega',
    poster: posterAmanda,
    duration: '90 min',
    genre: ['Drama'],
    synopsis:
      'Amanda tiene el don de ver el futuro, pero esto no le sirve para resolver los conflictos de su propia vida y familia.',
    videoUrl: '',
    trailerUrl: '',
    awards: [],
    cast: [
      { name: 'Daisy Granados', role: 'Amanda' },
      { name: 'Laura Moras', role: 'Hija' },
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
    videoUrl: "",
    trailerUrl: "",
    awards: [],
    cast: [
      { name: "Peter Lohmeyer", role: "Klaus" },
      { name: "Vladimir Cruz", role: "Herman" },
      { name: "Coralia Veloz", role: "Mireya" }
    ]
  },
  {
    id: 'lista-espera',
    title: 'Lista de espera',
    year: 2000,
    director: 'Juan Carlos Tabío',
    poster: posterListaEspera,
    duration: '112 min',
    genre: ['Comedia', 'Drama'],
    synopsis:
      'Pasajeros varados en una terminal de autobuses deciden reparar el vehículo ellos mismos, creando una pequeña comunidad utópica.',
    awards: [
      { name: 'Festival de La Habana', year: 2000, category: 'Gran Premio Coral' },
    ],
    cast: [{ name: 'Vladimir Cruz', role: 'Emilio' }],
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
    videoUrl: "",
    trailerUrl: "",
    awards: [
      { name: "Festival de Sundance", year: 1999, category: "Premio del Jurado" },
      { name: "Premio Goya", year: 1999, category: "Mejor Película Extranjera" }
    ],
    cast: [{ name: "Luis Alberto García", role: "Elpidio" }, { name: "Coralia Veloz", role: "Julia" }]
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
      { name: "Festival de La Habana", year: 1990, category: "Gran Premio Coral" }
    ],
    cast: [
      { name: "Laura de la Uz", role: "Larita" },
      { name: "Raúl Paz", role: "Víctor" }
    ],
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
    cast: [
      { name: "Thais Valdés", role: "Stacy" },
      { name: "Vladimir Cruz", role: "Sergito" },
    ]
  },
];

// ============================================================================
// DÉCADA DE 2000
// ============================================================================

const movies2000s: Movie[] = [
  {
    id: 'nada',
    title: 'Nada',
    year: 2001,
    director: 'Juan Carlos Cremata',
    poster: posterNada,
    duration: '92 min',
    genre: ['Drama', 'Comedia'],
    synopsis:
      'Carla reescribe cartas tristes en la oficina de correos para alegrar a los destinatarios mientras espera irse a vivir a Miami.',
    videoUrl: '',
    trailerUrl: '',
    awards: [
      { name: 'Festival de La Habana', year: 2001, category: 'Mejor Ópera Prima' },
      { name: 'Premios Goya', year: 2002, category: 'Nominada Mejor Película Extranjera' },
    ],
    cast: [
      { name: 'Thais Valdés', role: 'Carla' },
      { name: 'Nacha Guevara', role: 'La Administradora' },
    ],
  },
  {
    id: 'entre-ciclones',
    title: 'Entre ciclones',
    year: 2003,
    director: 'Enrique Colina',
    poster: posterEntreCiclones,
    duration: '112 min',
    genre: ['Comedia'],
    synopsis:
      'Tomás intenta sobrevivir en La Habana, pero un ciclón, su novia y su hermano delincuente convierten su vida en un torbellino cómico.',
    videoUrl: '',
    trailerUrl: '',
    awards: [],
    cast: [
      { name: 'Mijail Mulkay', role: 'Tomás' },
      { name: 'Indira Valdés', role: 'La novia' },
    ],
  },
  {
    id: 'suite-habana-2003',
    title: 'Suite Habana',
    year: 2003,
    director: 'Fernando Pérez',
    poster: posterSuite,
    duration: '84 min',
    genre: ['Documental'],
    synopsis:
      'Un día en la vida de varios habitantes de La Habana. Sin diálogos, una sinfonía visual sobre la realidad cubana.',
    videoUrl: '', // Pendiente de Archive.org
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    awards: [
      { name: 'Festival de San Sebastián', year: 2003, category: 'Premio FIPRESCI' },
    ],
    cast: [],
  },
  {
    id: 'frutas-en-el-cafe',
    title: 'Frutas en el café',
    year: 2005,
    director: 'Humberto Padrón',
    poster: posterFrutas,
    duration: '95 min',
    genre: ['Drama', 'Suspense'],
    synopsis:
      'Tres historias se entrelazan en La Habana: una prostituta, un pintor y un político. Un thriller sobre decisiones límite.',
    videoUrl: '',
    trailerUrl: '',
    awards: [],
    cast: [
      { name: 'Jorge Perugorría', role: 'El Pintor' },
      { name: 'Mario Limonta', role: 'El Político' },
    ],
  },
  {
    id: 'rey-habana',
    title: 'Un rey en La Habana',
    year: 2005,
    director: 'Alexis Valdés',
    poster: posterReyHabana,
    duration: '97 min',
    genre: ['Comedia'],
    synopsis:
      'Papito se hace pasar por un millonario español fallecido para reclamar una herencia, desencadenando enredos disparatados.',
    awards: [],
    cast: [{ name: 'Alexis Valdés', role: 'Papito' }],
  },
  {
    id: 'cuerno-abundancia',
    title: 'El cuerno de la abundancia',
    year: 2008,
    director: 'Juan Carlos Tabío',
    poster: posterCuernoAbundancia,
    duration: '110 min',
    genre: ['Comedia'],
    synopsis:
      'Una herencia millonaria revoluciona un pueblo. Todos los de apellido Castiñeiras intentan probar su linaje, desatando la codicia.',
    awards: [],
    cast: [{ name: 'Jorge Perugorría', role: 'Bernardito' }],
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
    awards: [{ name: "Festival de La Habana", year: 2001, category: "Premio Coral" }],
    cast: [{ name: "Enrique Molina", role: "Padre" }, { name: "Verónica Lynn", role: "Madre" }],
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
    videoUrl: "", // Pendiente de Archive.org
    trailerUrl: "https://www.youtube.com/embed/5lEAnDR46zo", 
    awards: [
      { name: "Premios Goya", year: 2006, category: "Mejor Música Original" },
    ],
    cast: [
      { name: "Alberto Yoel", role: "Ruy" }, 
      { name: "Roberto Sanmartín", role: "Tito" },
    ],
    backdrop: heroHabana,
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
    videoUrl: "",
    trailerUrl: "",
    awards: [
      { name: "Festival de La Habana", year: 2008, category: "Premio del Público" },
    ],
    cast: [
      { name: "Silvia Águila", role: "Laura" }, 
      { name: "Carlos Ever Fonseca", role: "Alberto" },
    ],
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
      { name: "Festival de Sevilla", year: 2001, category: "Premio del Público" }
    ],
    cast: [
      { name: "Jorge Perugorría", role: "Roberto" },
      { name: "Isabel Santos", role: "Pilar" },
    ],
  },
];

// ============================================================================
// DÉCADA DE 2010
// ============================================================================

const movies2010s: Movie[] = [
  {
    id: 'marti-2010',
    title: 'José Martí: El Ojo del Canario',
    year: 2010,
    director: 'Fernando Pérez',
    poster: posterMarti,
    duration: '120 min',
    genre: ['Drama', 'Histórico'],
    synopsis:
      'Una inmersión profunda en la infancia y adolescencia de José Martí, mostrando al niño sensible que se convertiría en libertador.',
    videoUrl: '', // Pendiente de Archive.org
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    awards: [
      { name: 'Festival de La Habana', year: 2010, category: 'Gran Premio Coral' },
    ],
    cast: [{ name: 'Daniel Romero', role: 'José Martí' }],
  },
  {
    id: 'memoria-2010',
    title: 'Memorias del Desarrollo',
    year: 2010,
    director: 'Miguel Coyula',
    poster: posterMemoria,
    duration: '112 min',
    genre: ['Drama', 'Experimental'],
    synopsis:
      'Un intelectual cubano en el exilio vive desconectado de la sociedad. Un collage visual sobre la alienación.',
    videoUrl: '', // Pendiente de Archive.org
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    awards: [
      { name: 'Festival de Tribeca', year: 2010, category: 'Mejor Película (New York)' },
    ],
    cast: [{ name: 'Ron Blair', role: 'Sergio' }],
  },
  {
    id: 'conducta-2014',
    title: 'Conducta',
    year: 2014,
    director: 'Ernesto Daranas',
    poster: posterChala,
    duration: '108 min',
    genre: ['Drama'],
    synopsis:
      'Chala, un niño problemático, y Carmela, su maestra, enfrentan una batalla moral cuando el sistema intenta enviarlo a una escuela de conducta.',
    videoUrl: '', // Pendiente de Archive.org
    trailerUrl: 'https://www.youtube.com/embed/uBPfo4exDZM',
    awards: [
      { name: 'Premio Goya', year: 2015, category: 'Mejor Película Iberoamericana' },
    ],
    cast: [
      { name: 'Armando Valdés Freire', role: 'Chala' },
      { name: 'Alina Rodríguez', role: 'Carmela' },
    ],
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
    videoUrl: "", // Pendiente de Archive.org
    trailerUrl: "https://www.youtube.com/embed/mhcIBEqczpg",
    awards: [{ name: "Premio Goya", year: 2012, category: "Mejor Película Iberoamericana" }],
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
    videoUrl: "",
    trailerUrl: "",
    awards: [
      { name: "Festival de Traverse City", year: 2011, category: "Premio del Público" }
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
    videoUrl: "",
    trailerUrl: "",
    awards: [
      { name: "Festival de Málaga", year: 2018, category: "Mejor Película Iberoamericana" }
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
    ],
    cast: [
      { name: "Yasmany Guerrero", role: "Fermín Valdés Domínguez" }, 
      { name: "Luis Manuel Álvarez", role: "Estudiante" }
    ]
  },
];

// ============================================================================
// DÉCADA DE 2020 (VACÍA POR AHORA PARA EVITAR ERRORES)
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