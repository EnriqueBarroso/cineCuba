/**
 * CATÁLOGO DE PELÍCULAS DEL CINE CUBANO
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
  posterMielOshun
} from '@/assets/posters';

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
      'Un aristócrata venido a menos y su antiguo chófer buscan desesperadamente unos diamantes que fueron escondidos en una de las doce sillas de un juego de comedor antes de ser expropiadas por la Revolución. En su frenética búsqueda, se enfrentan a las nuevas realidades sociales de Cuba, creando situaciones hilarantes y críticas sobre la adaptación al cambio.',
    awards: [
      {
        name: 'Festival de Karlovy Vary',
        year: 1963,
        category: 'Mención Especial',
      },
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
      'Juan Quin Quín es un campesino buscavidas que, junto a su amigo Jachero y su amada Teresa, vive múltiples aventuras en la Cuba prerrevolucionaria. La película parodia los géneros del cine comercial (western, bélico) para narrar la toma de conciencia política de sus protagonistas, mezclando humor, acción y crítica social de manera innovadora.',
    videoUrl: 'https://www.youtube.com/embed/3vM_z4OqTkw',
    awards: [
      {
        name: 'Festival de Karlovy Vary',
        year: 1967,
        category: 'Premio Especial del Jurado',
      },
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
      'Un joven intenta recuperar el carnet laboral de su tío recién fallecido, el cual fue enterrado con él, para que su viuda pueda cobrar la pensión. Esto desata una cadena de trámites absurdos y situaciones kafkianas mientras lucha contra la ineficiencia y el formalismo de la burocracia. Una sátira brillante que rinde homenaje a la historia del cine cómico.',
    videoUrl: 'https://www.youtube.com/embed/ZqjeKGGE1Z4',
    awards: [
      {
        name: 'Festival de Karlovy Vary',
        year: 1966,
        category: 'Premio Especial del Jurado',
      },
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
      'Tres episodios, tres mujeres llamadas Lucía, tres momentos históricos: la guerra de independencia de 1895, la lucha contra Machado en los años 30 y la Revolución de los 60. A través de sus vidas, la película explora la evolución de la identidad cubana, el papel de la mujer y las tensiones entre el amor, la sociedad y la política en diferentes épocas.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
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
      'Sergio, un intelectual burgués, decide quedarse en Cuba tras el triunfo de la Revolución mientras su familia y amigos huyen a Miami. Solo y alienado, deambula por La Habana observando críticamente los vertiginosos cambios sociales, incapaz de integrarse pero tampoco de rechazar totalmente el nuevo proceso. Un estudio psicológico profundo sobre la identidad y la historia.',
    videoUrl: 'https://www.youtube.com/embed/yUUzGFLx7jY',
    awards: [
      {
        name: 'Festival de Karlovy Vary',
        year: 1968,
        category: 'Premio FIPRESCI',
      },
    ],
    cast: [
      { name: 'Sergio Corrieri', role: 'Sergio' },
      { name: 'Daisy Granados', role: 'Elena' },
    ],
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
      'Una coproducción cubano-soviética visualmente deslumbrante que narra cuatro historias sobre la vida en Cuba antes de la Revolución. Famosa por sus increíbles planos secuencia y su fotografía en blanco y negro, pasó del olvido a ser considerada una obra maestra del cine mundial.',
    videoUrl: 'https://www.youtube.com/embed/v=example', // Busca el link real
    awards: [{ name: 'Cannes Classics', year: 2004, category: 'Restauración' }],
    cast: [
      { name: 'Sergio Corrieri', role: 'Alberto' },
      { name: 'Salvador Wood', role: 'Campesino' },
    ],
    notes: 'Rescatada por Martin Scorsese y Francis Ford Coppola en los 90.',
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
      'Basada en hechos reales de la década de 1960. Alberto Delgado, administrador de una finca, opera como agente encubierto de la Seguridad del Estado infiltrado en las bandas contrarrevolucionarias del Escambray. La película narra su peligrosa doble vida y su sacrificio en un contexto de intensa lucha política y militar.',
    awards: [
      {
        name: 'Festival de Karlovy Vary',
        year: 1974,
        category: 'Premio Especial',
      },
    ],
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
      'Yolanda, una maestra de clase media, se enamora de Mario, un obrero de un barrio marginal en transformación. A través de su relación, la película (que mezcla ficción y documental) examina los conflictos de clase, el machismo, la religión y los desafíos de integrar a los sectores marginados en la nueva sociedad revolucionaria.',
    awards: [],
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
      'A finales del siglo XVIII, un conde intenta instruir religiosamente a sus esclavos invitando a doce de ellos a una cena el Jueves Santo, recreando la última cena de Cristo. Les promete un día de libertad, pero cuando al día siguiente los obliga a volver al trabajo brutal, estalla una rebelión violenta que revela la hipocresía del poder colonial.',
    awards: [
      { name: 'Festival de La Habana', year: 1976, category: 'Gran Premio' },
    ],
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
      'Teresa es una trabajadora textil, madre y dirigente sindical que se enfrenta a la doble moral de su esposo. Mientras él espera que ella cumpla con todos los roles domésticos tradicionales, ella lucha por su desarrollo personal y político. El conflicto marital estalla, convirtiéndose en un símbolo de la lucha de la mujer por su emancipación real en la sociedad.',
    awards: [
      {
        name: 'Festival de La Habana',
        year: 1979,
        category: 'Gran Premio Coral',
      },
    ],
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
      "Creyendo que la Revolución Cubana será un evento pasajero, una familia aristocrática decide encerrarse en su mansión y esperar a que 'las aguas vuelvan a su nivel'. Aislados del exterior, mantienen sus jerarquías y rituales, pero a medida que pasan los años y se agotan los recursos, la familia involuciona hacia un estado de barbarie primitiva.",
    videoUrl: 'https://www.youtube.com/embed/7qKSk9fpF8M',
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
      'Durante la Campaña de Alfabetización de 1961, un joven estudiante de La Habana llega a una zona rural remota cerca de la Ciénaga de Zapata para enseñar a leer a los campesinos. Allí debe enfrentarse no solo a la ignorancia y la desconfianza, sino también a la amenaza violenta de las bandas contrarrevolucionarias que operan en la zona.',
    awards: [
      { name: 'Festival de Moscú', year: 1978, category: 'Premio Especial' },
    ],
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
    synopsis: "El largometraje que consolidó al personaje más icónico de la animación cubana. Elpidio, un coronel mambí, lucha por la independencia de Cuba contra el ejército español y el General Resoplez, con mucho humor, ingenio y cubanía.",
    videoUrl: "https://www.youtube.com/embed/v=example",
    awards: [{ name: "Festival de Gijón", year: 1979, category: "Mejor Película Infantil" }],
    cast: [{ name: "Frank González", role: "Elpidio Valdés (voz)" }],
    notes: "Frases de esta película son parte del habla popular cubana."
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
      "Adaptación libre de la novela 'Cecilia Valdés'. En la Habana colonial del siglo XIX, Cecilia, una hermosa mestiza, y Leonardo, el hijo de un rico hacendado español, viven un apasionado y trágico romance. Desconocen que comparten el mismo padre, y su relación desencadena una serie de eventos fatales marcados por los prejuicios raciales y sociales de la época.",
    awards: [
      {
        name: 'Festival de La Habana',
        year: 1982,
        category: 'Gran Premio Coral',
      },
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
      "Javier es un joven ambicioso y seductor que se adapta camaleónicamente a los diferentes gobiernos corruptos de la Cuba republicana (1930-1959). Traicionando ideales y amigos para ascender socialmente, logra convertirse en un 'hombre de éxito', pero su oportunismo lo lleva a un vacío moral y personal inevitable.",
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
      'Dos jóvenes enamorados se ven atrapados en un conflicto inesperado cuando el padre de él (un hombre machista y tradicional) y la madre de ella comienzan su propio romance. Los hijos, paradójicamente, reaccionan con prejuicios conservadores ante la relación de sus padres, invirtiendo los roles generacionales en esta divertida comedia de costumbres.',
    videoUrl: 'https://www.youtube.com/embed/yUUzGFLx7jY',
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
      'Gloria, una costurera ambiciosa, mueve cielo y tierra para mudarse del barrio de Guanabacoa a una zona más exclusiva como el Vedado, creyendo que así mejorará la vida de su hija. Organiza una compleja cadena de permutas de casas que involucra a múltiples familias, generando un caos burocrático y situaciones disparatadas.',
    awards: [
      {
        name: 'Festival de La Habana',
        year: 1984,
        category: 'Premio del Público',
      },
    ],
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
      "Un científico vampiro crea el 'Vampisol', una fórmula que permite a los vampiros resistir la luz del sol. Su sobrino Pepito, un trompetista en La Habana de los años 30, desconoce su condición de vampiro y la importancia de la fórmula. Pronto se ve perseguido por la mafia de vampiros de Chicago y el grupo de vampiros europeos, desatando una hilarante guerra.",
    videoUrl: 'https://www.youtube.com/embed/1v0eKz9Z1z8',
    awards: [],
    cast: [{ name: 'Frank González', role: 'Drácula (voz)' }],
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
      'Mario, un pelotero estrella que se acerca al final de su carrera, debe enfrentar el momento del retiro. La película explora el mundo del béisbol cubano desde dentro, mostrando las presiones, la fama, y la difícil transición hacia una vida fuera del deporte de alto rendimiento, todo ello con un toque humano y nostálgico.',
    awards: [],
    cast: [{ name: 'Samuel Claxton', role: 'El entrenador' }],
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
      'La vida de un grupo de jóvenes que luchan en la clandestinidad urbana contra la dictadura de Batista en los años 50. La película se centra en la relación entre Ernesto y Nereida, mostrando el lado humano, los miedos, el amor y el sacrificio extremo de quienes vivieron esa época de peligro constante.',
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
      "Concha, una mujer supersticiosa y controladora, vive obsesionada con que alguien le lanza huevos contra su casa, aunque nunca ve quién es. Entre santería, problemas vecinales y la relación complicada con su nuera, la película satiriza los miedos irracionales y la inmovilidad social mediante un humor absurdo y 'huevazos' misteriosos.",
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
      'Inspirada en la vida del teatro musical cubano de los años 20 y 30. Rachel, una corista ambiciosa y talentosa, lucha por convertirse en la vedette principal del famoso Teatro Alhambra. Su ascenso está marcado por amores apasionados, desengaños y la turbulenta vida nocturna de una Habana fascinante y cruel.',
    awards: [
      {
        name: 'Premio Goya',
        year: 1990,
        category: 'Mejor Película Extranjera',
      },
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
      'En un grupo de teatro gobernado por una directora autoritaria, las intrigas y las relaciones de poder entre los actores reflejan las tensiones de la sociedad. Mirta, una actriz veterana relegada a papeles secundarios, lucha por mantener su dignidad y su arte en un ambiente asfixiante de control y oportunismo.',
    awards: [],
    cast: [{ name: 'Rosita Fornés', role: 'Actriz' }],
  },
];

// ============================================================================
// DÉCADA DE 1990
// ============================================================================

const movies1990s: Movie[] = [
  {
    id: 'adorables-mentiras',
    title: 'Adorables mentiras',
    year: 1991,
    director: 'Gerardo Chijona',
    poster: posterAdorablesMentiras,
    duration: '108 min',
    genre: ['Comedia', 'Romance'],
    synopsis:
      "Jorge Luis, un guionista fracasado, se hace pasar por un director de cine exitoso para impresionar a Sissy. Ella, a su vez, finge ser una actriz con una carrera prometedora. Ambos construyen una relación basada en 'adorables mentiras' para escapar de sus frustraciones, hasta que la realidad amenaza con desmoronar su castillo de naipes.",
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
      'Diego, un artista culto, homosexual y escéptico, entabla una amistad improbable con David, un joven estudiante universitario comunista y lleno de prejuicios. A través de conversaciones sobre arte, política y la vida en La Habana, ambos superan sus diferencias y construyen un vínculo profundo que desafía la intolerancia de su entorno.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    awards: [
      { name: 'Oso de Plata', year: 1994, category: 'Gran Premio del Jurado' },
      {
        name: 'Nominación al Oscar',
        year: 1995,
        category: 'Mejor Película Extranjera',
      },
    ],
    cast: [
      { name: 'Jorge Perugorría', role: 'Diego' },
      { name: 'Vladimir Cruz', role: 'David' },
    ],
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
      'Durante el duro Período Especial en Cuba, una madre y su hija adolescente viven una relación tensa y claustrofóbica. La hija sueña obsesivamente con viajar a Madagascar, un lugar mítico y lejano que representa todo lo que no tiene en su realidad cotidiana. Un filme poético sobre la evasión y la resistencia.',
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
      "Un joven proyeccionista ambulante llega a la Isla de la Juventud con un viejo proyector y una sola película: 'Robin Hood'. La magia del cine revoluciona la vida monótona de los habitantes, quienes empiezan a soñar con libertad y justicia, provocando situaciones absurdas y transformadoras en la comunidad.",
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
      'Para trasladar el cadáver de la tía Yoyita desde Guantánamo hasta La Habana, un cortejo fúnebre debe cumplir con un absurdo plan estatal de transporte que obliga a cambiar de coche en cada provincia. En este viaje tragicómico, antiguos amores se reencuentran y la burocracia se muestra en toda su ridiculez.',
    awards: [],
    cast: [
      { name: 'Carlos Cruz', role: 'Adolfo' },
      { name: 'Mirtha Ibarra', role: 'Gina' },
    ],
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
      'En una terminal de autobuses del centro de Cuba, un grupo de pasajeros queda varado cuando el único transporte disponible se rompe. Obligados a convivir, deciden reparar el vehículo ellos mismos y terminan creando una pequeña comunidad utópica y solidaria donde los sueños parecen posibles, al menos por un momento.',
    awards: [
      {
        name: 'Festival de La Habana',
        year: 2000,
        category: 'Gran Premio Coral',
      },
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
    synopsis: "En una Habana surrealista, tres personajes (una bailarina, un joven salvaje y una mujer obsesionada con la limpieza) buscan la felicidad mientras se cruzan con la misteriosa figura de Santa Bárbara. Una metáfora poética sobre la libertad y el miedo.",
    videoUrl: "https://www.youtube.com/embed/v=example",
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
    synopsis: "La Habana, 1956. Larita es una joven estudiante que sueña con conseguir una beca para estudiar en Estados Unidos. Es vecina del famoso escritor Ernest Hemingway, a quien observa desde la distancia, estableciendo un paralelismo entre su vida y la del viejo pescador de 'El viejo y el mar'.",
    awards: [
      { name: "Festival de La Habana", year: 1990, category: "Gran Premio Coral" }
    ],
    cast: [
      { name: "Laura de la Uz", role: "Larita" },
      { name: "Raúl Paz", role: "Víctor" }
    ],
    notes: "Debut cinematográfico de Laura de la Uz."
  },
  {
    id: "un-paraiso-bajo-estrellas",
    title: "Un paraíso bajo las estrellas",
    year: 1999,
    director: "Gerardo Chijona",
    poster: posterParaisoEstrellas,
    duration: "90 min",
    genre: ["Comedia"],
    synopsis: "Siso sueña con ser bailarín del Tropicana, pero el destino y los enredos amorosos se lo ponen difícil. Una comedia de enredos clásica que rinde homenaje al cabaret más famoso de Cuba y a la picaresca nacional.",
    awards: [],
    cast: [
      { name: "Thais Valdés", role: "Stacy" },
      { name: "Vladimir Cruz", role: "Sergito" },
      { name: "Enrique Molina", role: "Cándido" }
    ]
  },
];

// ============================================================================
// DÉCADA DE 2000
// ============================================================================

const movies2000s: Movie[] = [
  {
    id: 'suite-habana-2003',
    title: 'Suite Habana',
    year: 2003,
    director: 'Fernando Pérez',
    poster: posterSuite,
    duration: '84 min',
    genre: ['Documental'],
    synopsis:
      'Un día en la vida de varios habitantes de La Habana común. Sin diálogos y guiada solo por la música y los sonidos de la ciudad, la cámara sigue sus rutinas, sus alegrías modestas y sus luchas diarias, componiendo una sinfonía visual conmovedora sobre la realidad cubana contemporánea.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    awards: [
      {
        name: 'Festival de San Sebastián',
        year: 2003,
        category: 'Premio FIPRESCI',
      },
    ],
    cast: [],
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
      'Papito es un joven pícaro de un barrio marginal de La Habana que se enamora de una vecina rica. Cuando un millonario español muere accidentalmente en su casa, Papito se hace pasar por él para viajar a España y reclamar la herencia, desencadenando una serie de enredos disparatados.',
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
      'La noticia de que una herencia millonaria del siglo XVIII va a ser repartida entre los descendientes de apellido Castiñeiras revoluciona un pequeño pueblo cubano. Todos los que llevan el apellido inician trámites frenéticos para probar su linaje, desatando la codicia, las envidias y el caos familiar.',
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
    synopsis: "Una familia cubana se graba en video para enviarle un mensaje a su hijo que ha emigrado a Estados Unidos. Lo que empieza como un saludo alegre va revelando poco a poco las grietas, secretos y dolores de la familia y de la sociedad cubana actual.",
    videoUrl: "https://www.youtube.com/embed/v=example",
    awards: [{ name: "Festival de La Habana", year: 2001, category: "Premio Coral" }],
    cast: [{ name: "Enrique Molina", role: "Padre" }, { name: "Verónica Lynn", role: "Madre" }],
    notes: "Película de culto realizada con muy bajo presupuesto pero gran impacto emocional."
  },

  {
    id: "habana-blues",
    title: "Habana Blues",
    year: 2005,
    director: "Benito Zambrano",
    poster: posterHabanaBlues,
    duration: "115 min",
    genre: ["Drama", "Musical"],
    synopsis: "Ruy y Tito son dos jóvenes músicos cubanos que sueñan con triunfar con su grupo. Cuando unos productores españoles llegan a La Habana buscando talento, se enfrentan a un dilema: aceptar un contrato que les obliga a dejar atrás sus raíces o mantenerse fieles a su música y a su vida en Cuba.",
    videoUrl: "https://www.youtube.com/embed/v=link_real", 
    awards: [
      { name: "Premios Goya", year: 2006, category: "Mejor Música Original" },
      { name: "Festival de La Habana", year: 2005, category: "Premio Coral" }
    ],
    cast: [
      { name: "Alberto Yoel", role: "Ruy" }, 
      { name: "Roberto Sanmartín", role: "Tito" },
      { name: "Yailene Sierra", role: "Caridad" }
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
    synopsis: "Laura es una profesora universitaria que investiga la vida del famoso proxeneta cubano Alberto Yarini para su tesis de maestría. Su investigación la lleva a adentrarse en las zonas más oscuras y complejas de la Habana actual, donde el pasado y el presente se entrelazan peligrosamente.",
    videoUrl: "https://www.youtube.com/embed/v=link_real",
    awards: [
      { name: "Festival de La Habana", year: 2008, category: "Premio del Público" },
      { name: "Premios de la Crítica", year: 2008, category: "Mejor Película" }
    ],
    cast: [
      { name: "Silvia Águila", role: "Laura" }, 
      { name: "Carlos Ever Fonseca", role: "Alberto" },
      { name: "Héctor Noas", role: "Rosendo" }
    ]
  },

  {
    id: "hacerse-el-sueco",
    title: "Hacerse el sueco",
    year: 2001,
    director: "Daniel Díaz Torres",
    poster: posterHacerseSueco,
    duration: "105 min",
    genre: ["Comedia", "Crimen"],
    synopsis: "Un supuesto profesor de literatura sueco llega a La Habana. En realidad, es un ladrón de joyas retirado que busca robarse a sí mismo. Se aloja en casa de una familia cubana peculiar, desencadenando un choque cultural hilarante y situaciones inesperadas.",
    awards: [],
    cast: [
      { name: "Enrique Molina", role: "Amancio" },
      { name: "Peter Lohmeyer", role: "Bjorn (El Sueco)" },
      { name: "Coralia Veloz", role: "Marta" }
    ]
  },
  {
    id: "miel-para-oshun",
    title: "Miel para Oshún",
    year: 2001,
    director: "Humberto Solás",
    poster: posterMielOshun,
    duration: "110 min",
    genre: ["Drama", "Road Movie"],
    synopsis: "Un joven cubano-americano regresa a Cuba después de muchos años para buscar a la madre que nunca conoció. Junto a un taxista y su prima, emprende un viaje por toda la isla que se convierte en un redescubrimiento de su identidad y de su país.",
    awards: [
      { name: "Festival de Sevilla", year: 2001, category: "Premio del Público" }
    ],
    cast: [
      { name: "Jorge Perugorría", role: "Roberto" },
      { name: "Isabel Santos", role: "Pilar" },
      { name: "Mario Limonta", role: "Antonio" }
    ]
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
      'Una inmersión profunda en la infancia y adolescencia de José Martí, el Apóstol de la independencia cubana. Lejos de la estatua de bronce, la película muestra a un niño sensible y observador que sufre ante la injusticia de la esclavitud y el colonialismo, forjando el carácter que lo convertiría en libertador.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    awards: [
      {
        name: 'Festival de La Habana',
        year: 2010,
        category: 'Gran Premio Coral',
      },
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
      'Un intelectual cubano inadaptado vive en el exilio, desconectado de la política y de la sociedad de consumo que lo rodea. A través de un collage visual innovador, la película explora la alienación, la memoria fragmentada y la imposibilidad de pertenecer a ningún lugar.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    awards: [
      {
        name: 'Festival de Tribeca',
        year: 2010,
        category: 'Mejor Película (New York)',
      },
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
      'Chala, un niño de 11 años con una vida familiar difícil, cría palomas de pelea y es problemático en la escuela. Carmela, su veterana maestra, es la única que lo comprende y defiende. Cuando ella enferma y es sustituida, Chala es enviado a una escuela de conducta, lo que inicia una batalla moral y educativa por su futuro.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    awards: [
      {
        name: 'Premio Goya',
        year: 2015,
        category: 'Mejor Película Iberoamericana',
      },
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
    synopsis: "Una horda de zombis invade La Habana. El gobierno dice que son disidentes pagados por los Estados Unidos. Juan, un pícaro superviviente, decide hacer negocio: 'Juan de los Muertos, matamos a sus seres queridos'. Una sátira política hilarante y sangrienta.",
    videoUrl: "https://www.youtube.com/embed/v=example",
    awards: [{ name: "Premio Goya", year: 2012, category: "Mejor Película Iberoamericana" }],
    cast: [{ name: "Alexis Díaz de Villegas", role: "Juan" }, { name: "Jorge Molina", role: "Lázaro" }],
    notes: "La primera película de zombis del cine cubano."
  },

  {
    id: "habanastation",
    title: "Habanastation",
    year: 2011,
    director: "Ian Padrón",
    poster: posterHabanastation,
    duration: "95 min",
    genre: ["Drama", "Aventuras"],
    synopsis: "Dos niños cubanos de entornos sociales muy diferentes —uno hijo de un músico rico y otro de un barrio humilde— se ven obligados a pasar un 1 de mayo juntos tras perderse en una manifestación. A través de su aventura por La Habana profunda, descubren la realidad del otro y forjan una amistad inesperada.",
    videoUrl: "https://www.youtube.com/embed/v=link_real",
    awards: [
      { name: "Festival de Traverse City", year: 2011, category: "Premio del Público (Michael Moore)" }
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
    synopsis: "Año 1991. La URSS se desintegra y Cuba entra en el Período Especial. Sergio, un radioaficionado y profesor de marxismo en La Habana, contacta por casualidad con Serguéi, el último cosmonauta soviético, que ha quedado olvidado en la estación espacial Mir. Una amistad cósmica nace entre ambos mientras sus mundos se derrumban.",
    videoUrl: "https://www.youtube.com/embed/v=link_real",
    awards: [
      { name: "Festival de La Habana", year: 2017, category: "Premio del Público" },
      { name: "Festival de Málaga", year: 2018, category: "Mejor Película Iberoamericana" }
    ],
    cast: [
      { name: "Tomás Cao", role: "Sergio" }, 
      { name: "Héctor Noas", role: "Serguéi" },
      { name: "Ron Perlman", role: "Peter" }
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
    synopsis: "Basada en hechos reales ocurridos en 1871. Ocho estudiantes de medicina son injustamente acusados de profanar la tumba de un periodista español y condenados a muerte. 16 años después, Fermín Valdés Domínguez lucha por demostrar su inocencia y encontrar sus cuerpos, revelando una de las heridas más profundas de la historia colonial cubana.",
    videoUrl: "https://www.youtube.com/embed/v=link_real",
    awards: [
      { name: "Festival de La Habana", year: 2018, category: "Premio Especial del Jurado" },
      { name: "Premio del Público", year: 2018, category: "Festival de La Habana" }
    ],
    cast: [
      { name: "Yasmany Guerrero", role: "Fermín Valdés Domínguez" }, 
      { name: "Luis Manuel Álvarez", role: "Estudiante" }
    ]
  },
];

const movies2020s: Movie[] = [];

export const movies: Movie[] = [
  ...movies1960s,
  ...movies1970s,
  ...movies1980s,
  ...movies1990s,
  ...movies2000s,
  ...movies2010s,
  ...movies2020s,
];

export const moviesByDecade = {
  '1960s': movies1960s,
  '1970s': movies1970s,
  '1980s': movies1980s,
  '1990s': movies1990s,
  '2000s': movies2000s,
  '2010s': movies2010s,
  '2020s': movies2020s,
};
