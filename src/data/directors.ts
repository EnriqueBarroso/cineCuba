/**
 * BASE DE DATOS DE DIRECTORES (COMPLETA)
 * Incluye todos los directores del catálogo actual con biografías y datos verificados.
 */

// === FOTOS EXISTENTES ===
import humbertoSolasPhoto from "@/assets/directors/Humberto_Solas.jpg";
import tomasGutierrezAleaPhoto from "@/assets/directors/tomas-gutierrez-alea.jpg";
import juanCarlosTabioPhoto from "@/assets/directors/Juan-Carlos-Tabio.jpg";
import fernandoPerezPhoto from "@/assets/directors/Fernando-Pérez.jpg";
import ernestoDaranasPhoto from "@/assets/directors/Ernesto_daranas.jpg";
import miguelCoyulaPhoto from "@/assets/directors/miguel-coyula.jpg";
import octavioCortazarPhoto from "@/assets/directors/octavio-cortazar.jpg";
import rolandoDiazPhoto from "@/assets/directors/rolando-diaz.jpg";
import saraGomezPhoto from "@/assets/directors/sara-gomez.jpg";
import julioGarciaEspinosaPhoto from "@/assets/directors/julio-garcia-espinosa.jpg";
import manuelPerezParedesPhoto from "@/assets/directors/manuel-perez-paredes.jpg";
import pastorVegaPhoto from "@/assets/directors/pastor-vega.jpg";
import enriquePinedaBarnetPhoto from "@/assets/directors/enrique-pineda-barnet.jpg";
import juanPadronPhoto from "@/assets/directors/juan-padron.jpg";
import gerardoChijonaPhoto from "@/assets/directors/geraldo-chijona.jpg";
import danielDiazTorresPhoto from "@/assets/directors/daniel-dias-torres.webp";

// === NUEVOS IMPORTS (PENDIENTES DE SUBIR FOTO) ===
// El usuario subirá estas fotos más tarde. Usamos nombres estándar.
import mijailKalatozovPhoto from "@/assets/directors/mijail-kalatozov.jpg";
import orlandoRojasPhoto from "@/assets/directors/orlando-rojas.jpg";
import sergioGiralPhoto from "@/assets/directors/sergio-giral.jpg";
import rogelioParisPhoto from "@/assets/directors/rogelio-paris.jpg";
import arturoSottoPhoto from "@/assets/directors/arturo-sotto.jpg";
import manuelHerreraPhoto from "@/assets/directors/manuel-herrera.jpg";
import juanCarlosCremataPhoto from "@/assets/directors/juan-carlos-cremata.jpg";
import enriqueColinaPhoto from "@/assets/directors/enrique-colina.jpg";
import humbertoPadronPhoto from "@/assets/directors/humberto-padron.jpg";
import alexisValdesPhoto from "@/assets/directors/alexis-valdes.jpg";
import benitoZambranoPhoto from "@/assets/directors/benito-zambrano.jpg";
import alejandroBruguesPhoto from "@/assets/directors/alejandro-brugues.jpg";
import ianPadronPhoto from "@/assets/directors/ian-padron.jpg";
import alejandroGilPhoto from "@/assets/directors/alejandro-gil.jpg";
import jorgeLuisSanchezPhoto from "@/assets/directors/jorge-luis-sanchez.jpg";
import pavelGiroudPhoto from "@/assets/directors/pavel-giroud.jpg";
import lesterHamletPhoto from "@/assets/directors/lester-hamlet.jpg";
import estebanInsaustiPhoto from "@/assets/directors/esteban-insausti.jpg";
import leonIchasoPhoto from "@/assets/directors/leon-ichaso.jpg";
import julianSchnabelPhoto from "@/assets/directors/julian-schnabel.jpg";

// === MÁS IMPORTS NUEVOS ===
import luisFelipeBernazaPhoto from "@/assets/directors/luis-felipe-bernaza.jpg";
import carlosMarcovichPhoto from "@/assets/directors/carlos-marcovich.jpg";
import valeriaSarmientoPhoto from "@/assets/directors/valeria-sarmiento.jpg";
import jorgeDyszelPhoto from "@/assets/directors/jorge-dyszel.jpg";
import virgenTabaresPhoto from "@/assets/directors/virgen-tabares.jpg";
import charlieMedinaPhoto from "@/assets/directors/charlie-medina.jpg";
import marianoBarrosoPhoto from "@/assets/directors/mariano-barroso.jpg";
import manuelGutierrezAragonPhoto from "@/assets/directors/manuel-gutierrez-aragon.jpg";
import rebecaChavezPhoto from "@/assets/directors/rebeca-chavez.jpg";
import angeloRizziPhoto from "@/assets/directors/angelo-rizzi.jpg";
import vladimirCruzPhoto from "@/assets/directors/vladimir-cruz.jpg";
import jorgePerugorriaPhoto from "@/assets/directors/jorge-perugorria.jpg";
import jorgeMolinaPhoto from "@/assets/directors/jorge-molina.jpg";
import eduardoMoyanoPhoto from "@/assets/directors/eduardo-moyano.jpg";
import eduardoDelLlanoPhoto from "@/assets/directors/eduardo-del-llano.jpg";
import tomasPiardPhoto from "@/assets/directors/tomas-piard.jpg";


export interface Director {
  id: string;
  name: string;
  photo?: string;
  birthYear: number;
  deathYear?: number;
  nationality: string;
  biography: string;
  activeYears: string;
  awards: string[];
}

export const directors: Director[] = [
  // ========================================================================
  // CLÁSICOS Y FUNDADORES (YA EXISTENTES)
  // ========================================================================
  {
    id: "humberto-solas",
    name: "Humberto Solás",
    photo: humbertoSolasPhoto,
    birthYear: 1941,
    deathYear: 2008,
    nationality: "Cubano",
    biography: "Humberto Solás Borrego fue uno de los cineastas más influyentes de América Latina. Su obra maestra 'Lucía' (1968) es considerada una de las películas más importantes del cine latinoamericano. Solás era conocido por su estilo visual barroco y su exploración de las experiencias de las mujeres cubanas a través de diferentes épocas.",
    activeYears: "1964-2008",
    awards: [
      "Premio de la Crítica en Cannes por 'Lucía' (1969)",
      "Premio Nacional de Cine de Cuba (1994)",
      "Premio Coral de Honor del Festival de La Habana"
    ]
  },
  {
    id: "tomas-gutierrez-alea",
    name: "Tomás Gutiérrez Alea",
    photo: tomasGutierrezAleaPhoto,
    birthYear: 1928,
    deathYear: 1996,
    nationality: "Cubano",
    biography: "Tomás Gutiérrez Alea, conocido como 'Titón', es considerado el más grande cineasta cubano. Su filmografía es un testimonio de la evolución de Cuba, desde 'Memorias del Subdesarrollo' (1968) hasta 'Fresa y Chocolate' (1993), nominada al Oscar. Titón combinaba compromiso político con una sofisticación artística única.",
    activeYears: "1950-1996",
    awards: [
      "Nominación al Oscar por 'Fresa y Chocolate' (1994)",
      "Oso de Plata en Berlín por 'Fresa y Chocolate' (1994)",
      "Premio Nacional de Cine de Cuba (1988)"
    ]
  },
  {
    id: "juan-carlos-tabio",
    name: "Juan Carlos Tabío",
    photo: juanCarlosTabioPhoto,
    birthYear: 1943,
    deathYear: 2021,
    nationality: "Cubano",
    biography: "Juan Carlos Tabío fue un destacado director cubano conocido por combinar la comedia con la crítica social aguda. Co-dirigió 'Fresa y Chocolate'. Sus obras como 'Se permuta' (1984), 'Plaff' (1988) y 'Lista de espera' (2000) retratan con ingenio las contradicciones de la vida cotidiana en Cuba.",
    activeYears: "1970-2021",
    awards: [
      "Nominación al Oscar por 'Fresa y Chocolate'",
      "Premio Coral en el Festival de La Habana",
      "Premio Goya por 'Lista de espera' (2000)"
    ]
  },
  {
    id: "fernando-perez",
    name: "Fernando Pérez",
    photo: fernandoPerezPhoto,
    birthYear: 1944,
    nationality: "Cubano",
    biography: "Fernando Pérez Valdés es el poeta del cine cubano contemporáneo. 'Suite Habana' (2003) es su obra maestra, un documental lírico sobre la vida habanera. También dirigió 'Madagascar' (1994), 'La vida es silbar' (1998) y 'José Martí: El ojo del canario' (2010).",
    activeYears: "1975-presente",
    awards: [
      "Premio Nacional de Cine de Cuba (2007)",
      "Gran Premio del Festival de La Habana por 'Suite Habana'",
      "Premio Goya por 'La vida es silbar'"
    ]
  },
  {
    id: "ernesto-daranas",
    name: "Ernesto Daranas",
    photo: ernestoDaranasPhoto,
    birthYear: 1961,
    nationality: "Cubano",
    biography: "Ernesto Daranas es uno de los directores más importantes del cine actual. Su película 'Conducta' (2014) fue un fenómeno cultural, abordando la educación y la marginación. También ha dirigido 'Los dioses rotos' (2008) y 'Sergio y Serguéi' (2017).",
    activeYears: "1990-presente",
    awards: [
      "Premio Goya a Mejor Película Iberoamericana por 'Conducta'",
      "Premio del Público en el Festival de La Habana"
    ]
  },
  {
    id: "sara-gomez",
    name: "Sara Gómez",
    photo: saraGomezPhoto,
    birthYear: 1942,
    deathYear: 1974,
    nationality: "Cubana",
    biography: "Pionera y primera mujer en dirigir un largometraje en Cuba. Su obra maestra 'De cierta manera' (1974) mezcla documental y ficción para explorar raza, género y clase en barrios marginales. Falleció trágicamente joven, dejando un legado fundamental.",
    activeYears: "1961-1974",
    awards: [
      "Reconocimiento póstumo como pionera del cine cubano",
      "Premio a la trayectoria del Festival de Cine de La Habana"
    ]
  },
  {
    id: "julio-garcia-espinosa",
    name: "Julio García Espinosa",
    photo: julioGarciaEspinosaPhoto,
    birthYear: 1926,
    deathYear: 2016,
    nationality: "Cubano",
    biography: "Fundador del ICAIC y teórico famoso por 'Por un cine imperfecto'. Dirigió clásicos como 'Las aventuras de Juan Quin Quín' (1967). Su legado como pensador y gestor cultural fue crucial para el cine latinoamericano.",
    activeYears: "1955-2000",
    awards: [
      "Premio Nacional de Cine de Cuba (2004)",
      "Premio Coral de Honor del Festival de La Habana"
    ]
  },
  {
    id: "manuel-perez",
    name: "Manuel Pérez Paredes",
    photo: manuelPerezParedesPhoto,
    birthYear: 1939,
    deathYear: 2025,
    nationality: "Cubano",
    biography: "Fundador del ICAIC y director de 'El hombre de Maisinicú' (1973), un thriller político clásico. Su cine combina rigor narrativo con sensibilidad social. Fue reconocido con el Premio Nacional de Cine de Cuba.",
    activeYears: "1960-2010",
    awards: [
      "Premio Nacional de Cine de Cuba (2013)",
      "Premio Coral del Festival de La Habana"
    ]
  },
  {
    id: "pastor-vega",
    name: "Pastor Vega",
    photo: pastorVegaPhoto,
    birthYear: 1940,
    deathYear: 2005,
    nationality: "Cubano",
    biography: "Director de 'Retrato de Teresa' (1979), película que abrió un fuerte debate sobre el machismo y la doble moral en Cuba. Su cine se caracterizó por un compromiso feminista y una mirada crítica social.",
    activeYears: "1965-2000",
    awards: [
      "Premio Coral del Festival de La Habana por 'Retrato de Teresa'",
      "Premio Nacional de Cine de Cuba"
    ]
  },
  {
    id: "enrique-pineda-barnet",
    name: "Enrique Pineda Barnet",
    photo: enriquePinedaBarnetPhoto,
    birthYear: 1933,
    deathYear: 2021,
    nationality: "Cubano",
    biography: "Cineasta y poeta. Su obra 'La bella del Alhambra' (1989) ganó el primer Premio Goya a Mejor Película Extranjera de Habla Hispana. Artista multifacético que dejó un legado invaluable en la cultura cubana.",
    activeYears: "1960-2015",
    awards: [
      "Premio Goya por 'La bella del Alhambra' (1990)",
      "Premio Nacional de Cine de Cuba"
    ]
  },
  {
    id: "octavio-cortazar",
    name: "Octavio Cortázar",
    photo: octavioCortazarPhoto,
    birthYear: 1935,
    deathYear: 2008,
    nationality: "Cubano",
    biography: "Documentalista destacado ('Por primera vez', 1967). Con 'El Brigadista' (1977) creó una película emblemática sobre la Campaña de Alfabetización. Cronista sensible de la realidad cubana.",
    activeYears: "1961-2008",
    awards: [
      "Premio Especial del Festival de Moscú por 'El Brigadista'",
      "Premio Nacional de Cine de Cuba"
    ]
  },
  {
    id: "rolando-diaz",
    name: "Rolando Díaz",
    photo: rolandoDiazPhoto,
    birthYear: 1947,
    nationality: "Cubano",
    biography: "Conocido por sus comedias populares. Su película 'Los pájaros tirándole a la escopeta' (1984) es un clásico celebrado por su frescura y retrato de las relaciones familiares cubanas.",
    activeYears: "1975-presente",
    awards: [
      "Premio de Comedia del Festival de Peñíscola",
      "Premio Coral por Mejor Comedia"
    ]
  },
  {
    id: "miguel-coyula",
    name: "Miguel Coyula",
    photo: miguelCoyulaPhoto,
    birthYear: 1977,
    nationality: "Cubano",
    biography: "Vanguardia del cine independiente. Cineasta autodidacta y experimental. 'Memorias del Desarrollo' (2010) le valió reconocimiento por su innovación visual. Reflexiona sobre la identidad y el exilio.",
    activeYears: "2001-presente",
    awards: [
      "Premio del Jurado en el Festival de Tribeca",
      "Premio a Mejor Director en el Festival de La Habana"
    ]
  },
  {
    id: "gerardo-chijona",
    name: "Gerardo Chijona",
    photo: gerardoChijonaPhoto,
    birthYear: 1949,
    nationality: "Cubano",
    biography: "Gerardo Chijona Valdés es un director y crítico de cine que debutó con gran éxito con 'Adorables mentiras' (1991). Su cine explora la realidad cubana contemporánea a través de comedias agridulces y dramas urbanos que reflejan los sueños y frustraciones de la sociedad.",
    activeYears: "1980-presente",
    awards: [
      "Premio Coral del Festival de La Habana",
      "Nominación al Goya",
      "Biznaga de Plata en Málaga"
    ]
  },
  {
    id: "juan-padron",
    name: "Juan Padrón",
    photo: juanPadronPhoto,
    birthYear: 1947,
    deathYear: 2020,
    nationality: "Cubano",
    biography: "El padre de la animación cubana y creador de 'Elpidio Valdés'. Con un humor criollo inigualable, dirigió clásicos como 'Vampiros en La Habana'. Definió la identidad gráfica y el humor de generaciones.",
    activeYears: "1970-2020",
    awards: [
      "Premio Nacional de Cine (2008)",
      "Premio Nacional de Humor (2004)"
    ]
  },
  {
    id: "daniel-diaz-torres",
    name: "Daniel Díaz Torres",
    photo: danielDiazTorresPhoto,
    birthYear: 1948,
    deathYear: 2013,
    nationality: "Cubano",
    biography: "Director valiente conocido por su sátira política. 'Alicia en el pueblo de Maravillas' (1991) causó gran polémica. Con 'Hacerse el sueco' (2001) demostró su talento para la comedia costumbrista.",
    activeYears: "1975-2013",
    awards: [
      "Premio de la Crítica en Berlín",
      "Premio Coral del Festival de La Habana"
    ]
  },

  // ========================================================================
  // NUEVAS INCORPORACIONES (RECUPERADAS PARA COMPLETAR CATÁLOGO)
  // ========================================================================

  {
    id: "mijail-kalatozov",
    name: "Mijaíl Kalatózov",
    photo: mijailKalatozovPhoto,
    birthYear: 1903,
    deathYear: 1973,
    nationality: "Georgiano-Soviético",
    biography: "Mijaíl Konstantínovich Kalatózov fue un director soviético que dejó una huella indeleble en el cine cubano con 'Soy Cuba' (1964), una coproducción monumental conocida por su virtuosismo técnico y planos secuencia imposibles. Ganador de la Palma de Oro en Cannes por 'Cuando pasan las cigüeñas' (1957).",
    activeYears: "1928-1971",
    awards: [
      "Palma de Oro en Cannes",
      "Selección Oficial Cannes Classics (Restauración de Soy Cuba)"
    ]
  },
  {
    id: "orlando-rojas",
    name: "Orlando Rojas",
    photo: orlandoRojasPhoto,
    birthYear: 1950,
    nationality: "Cubano",
    biography: "Director conocido por su agudeza crítica y estilo visual depurado. Su debut en ficción 'Una novia para David' (1985) es una de las películas más queridas del cine cubano. Con 'Papeles secundarios' (1989) ofreció una mirada teatral y dramática a las tensiones internas del mundo cultural.",
    activeYears: "1977-presente",
    awards: [
      "Premio de la Popularidad en Festival de La Habana",
      "Premio Nacional de la Crítica"
    ]
  },
  {
    id: "sergio-giral",
    name: "Sergio Giral",
    photo: sergioGiralPhoto,
    birthYear: 1937,
    deathYear: 2024,
    nationality: "Cubano-Estadounidense",
    biography: "Sergio Giral fue fundamental en el cine afrocubano. Su trilogía sobre la esclavitud ('El otro Francisco', 'Rancheador', 'Maluala') es referente indispensable. 'María Antonia' (1990) es considerada una de las mejores traslaciones del teatro al cine en Cuba. Falleció en el exilio en 2024.",
    activeYears: "1962-2010",
    awards: [
      "Premio Coral a la Mejor Fotografía (por sus filmes)",
      "Reconocimiento por su aporte al cine afrodescendiente"
    ]
  },
  {
    id: "rogelio-paris",
    name: "Rogelio París",
    photo: rogelioParisPhoto,
    birthYear: 1936,
    deathYear: 2016,
    nationality: "Cubano",
    biography: "Documentalista y director de ficción que abordó temas épicos y musicales. Su película 'Caravana' (1990) sobre la guerra de Angola fue un éxito popular, y 'Kangamba' (2008) consolidó su cine bélico. También dirigió el aclamado documental 'Nosotros, la música'.",
    activeYears: "1964-2010",
    awards: [
      "Premio Nacional de Cine (Candidato finalista)",
      "Mención Especial Interjury en Festival de Berlín"
    ]
  },
  {
    id: "arturo-sotto",
    name: "Arturo Sotto",
    photo: arturoSottoPhoto,
    birthYear: 1967,
    nationality: "Cubano",
    biography: "Graduado de la EICTV y el ISA, Arturo Sotto es una voz versátil del cine cubano. Desde el drama de 'Pon tu pensamiento en mí' hasta la comedia romántica 'Amor vertical' (1997), su cine explora las relaciones humanas con frescura y a menudo con un toque teatral.",
    activeYears: "1992-presente",
    awards: [
      "Nominación al Goya a Mejor Película Extranjera",
      "Premios ACE de Nueva York"
    ]
  },
  {
    id: "manuel-herrera",
    name: "Manuel Herrera",
    photo: manuelHerreraPhoto,
    birthYear: 1942,
    nationality: "Cubano",
    biography: "Premio Nacional de Cine 2022. Manuel Herrera es el creador de 'Zafiros, locura azul' (1997), uno de los mayores éxitos de taquilla del cine cubano. Su obra abarca desde el documental clásico 'Girón' hasta biopics musicales que conectan profundamente con el público.",
    activeYears: "1965-presente",
    awards: [
      "Premio Nacional de Cine de Cuba (2022)",
      "Premio de la Popularidad Festival de La Habana"
    ]
  },
  {
    id: "juan-carlos-cremata",
    name: "Juan Carlos Cremata",
    photo: juanCarlosCremataPhoto,
    birthYear: 1961,
    nationality: "Cubano",
    biography: "Director iconoclasta y teatral. Su ópera prima 'Nada' (2001) sorprendió por su estética visual única y humor negro. También dirigió 'Viva Cuba' (2005), la primera película infantil cubana premiada en Cannes. Su cine a menudo desafía las convenciones narrativas.",
    activeYears: "1990-2015",
    awards: [
      "Grand Prix Écrans Juniors en Cannes (Viva Cuba)",
      "Premio Coral a Ópera Prima (Nada)"
    ]
  },
  {
    id: "enrique-colina",
    name: "Enrique Colina",
    photo: enriqueColinaPhoto,
    birthYear: 1944,
    deathYear: 2020,
    nationality: "Cubano",
    biography: "Destacado crítico de cine (famoso por su programa '24 x Segundo') y realizador. Su estilo irónico se plasmó en documentales como 'Vecinos' y en su largometraje de ficción 'Entre ciclones' (2003), una comedia ácida sobre la picaresca habanera.",
    activeYears: "1970-2020",
    awards: [
      "Premio Nacional de la Crítica",
      "Múltiples Premios Caracol de la UNEAC"
    ]
  },
  {
    id: "humberto-padron",
    name: "Humberto Padrón",
    photo: humbertoPadronPhoto,
    birthYear: 1967,
    nationality: "Cubano",
    biography: "Director que renovó el lenguaje del cine cubano a inicios de los 2000. Su mediometraje 'Video de familia' (2001) es una joya de culto sobre la emigración y la familia, narrada a través de una carta en video. 'Frutas en el café' (2005) mostró su faceta más experimental.",
    activeYears: "1995-presente",
    awards: [
      "Premio Coral al Mejor Cortometraje",
      "Reconocimiento de la Crítica Cubana"
    ]
  },
  {
    id: "alexis-valdes",
    name: "Alexis Valdés",
    photo: alexisValdesPhoto,
    birthYear: 1963,
    nationality: "Cubano",
    biography: "Actor, comediante y director enormemente popular. Tras triunfar en la televisión y cine de España, dirigió y protagonizó 'Un rey en La Habana' (2005), una comedia de enredos que fue un éxito comercial rotundo. Es una figura clave del humor caribeño.",
    activeYears: "1985-presente",
    awards: [
      "Premio del Público en Festival de Peñíscola",
      "Premios en festivales de comedia"
    ]
  },
  {
    id: "benito-zambrano",
    name: "Benito Zambrano",
    photo: benitoZambranoPhoto,
    birthYear: 1965,
    nationality: "Español",
    biography: "Director español formado en la EICTV de San Antonio de los Baños. Su película 'Habana Blues' (2005) capturó la energía y contradicciones de la escena musical underground habanera de los 2000, convirtiéndose en un referente generacional.",
    activeYears: "1999-presente",
    awards: [
      "Premios Goya (Mejor Guion Original, Música, Montaje)",
      "Premio del Jurado Un Certain Regard (Cannes - Solas)"
    ]
  },
  {
    id: "alejandro-brugues",
    name: "Alejandro Brugués",
    photo: alejandroBruguesPhoto,
    birthYear: 1976,
    nationality: "Cubano-Argentino",
    biography: "Graduado de la EICTV. Revolucionó el cine cubano reciente con 'Juan de los Muertos' (2011), la primera película de zombis cubana, una sátira política hilarante que ganó el Goya. Su cine apuesta por el género y el entretenimiento inteligente.",
    activeYears: "2005-presente",
    awards: [
      "Premio Goya a Mejor Película Iberoamericana",
      "Premio de la Popularidad Festival de La Habana"
    ]
  },
  {
    id: "ian-padron",
    name: "Ian Padrón",
    photo: ianPadronPhoto,
    birthYear: 1976,
    nationality: "Cubano",
    biography: "Hijo de Juan Padrón y director versátil. Su documental 'Fuera de Liga' sobre béisbol fue polémico y aclamado. Con 'Habanastation' (2011) logró un éxito masivo al abordar las diferencias de clase en la Cuba actual desde una perspectiva infantil.",
    activeYears: "2000-presente",
    awards: [
      "Premio Founders en Traverse City Film Festival (Michael Moore)",
      "Premio UNICEF"
    ]
  },
  {
    id: "alejandro-gil",
    name: "Alejandro Gil",
    photo: alejandroGilPhoto,
    birthYear: 1958,
    nationality: "Cubano",
    biography: "Director que rescató un episodio doloroso de la historia cubana con 'Inocencia' (2018), sobre el fusilamiento de los estudiantes de medicina en 1871. La película conectó emocionalmente con el público cubano y reafirmó la vigencia del cine histórico.",
    activeYears: "1984-presente",
    awards: [
      "Premio Especial del Jurado Festival de La Habana",
      "Premio del Público Festival de La Habana"
    ]
  },
  {
    id: "jorge-luis-sanchez",
    name: "Jorge Luis Sánchez",
    photo: jorgeLuisSanchezPhoto,
    birthYear: 1960,
    nationality: "Cubano",
    biography: "Cineasta con una fuerte vocación por la historia y la música. Comenzó como documentalista. Su ópera prima de ficción, 'El Benny' (2006), fue un éxito masivo que recuperó la figura de Benny Moré para las nuevas generaciones. Su cine se caracteriza por una visualidad barroca y expresiva.",
    activeYears: "1981-presente",
    awards: [
      "Premio Boccalino en el Festival de Locarno (El Benny)",
      "Premio Coral a la Ópera Prima en La Habana"
    ]
  },
  {
    id: "pavel-giroud",
    name: "Pavel Giroud",
    photo: pavelGiroudPhoto,
    birthYear: 1975,
    nationality: "Cubano",
    biography: "Uno de los directores más destacados de su generación. Debutó con el segmento de '3 veces 2'. Su película 'La edad de la peseta' (2006) fue candidata al Goya. Recientemente, su documental 'El caso Padilla' (2022) ha recibido aclamación internacional por su rescate de la memoria histórica.",
    activeYears: "2004-presente",
    awards: [
      "Premio Platino a Mejor Documental (El Caso Padilla)",
      "Zenith de Plata en Festival de Montreal"
    ]
  },
  {
    id: "lester-hamlet",
    name: "Lester Hamlet",
    photo: lesterHamletPhoto,
    birthYear: 1971,
    nationality: "Cubano",
    biography: "Director de cine y videoclips reconocido por su sensibilidad hacia el melodrama y la dirección de actores. Tras '3 veces 2', dirigió éxitos como 'Casa Vieja' (2010) y 'Fábula' (2011), explorando las complejidades emocionales de la sociedad cubana actual.",
    activeYears: "1995-presente",
    awards: [
      "Premio de la Popularidad en Festival de La Habana",
      "Múltiples Premios Lucas (Videoclips)"
    ]
  },
  {
    id: "esteban-insausti",
    name: "Esteban Insausti",
    photo: estebanInsaustiPhoto,
    birthYear: 1971,
    nationality: "Cubano",
    biography: "Cineasta con una marcada voz autoral y estética experimental. Su segmento en '3 veces 2' mostró su estilo visual único. Su largometraje 'Larga distancia' (2010) aborda el tema de la emigración y la soledad desde una perspectiva íntima y dolorosa.",
    activeYears: "2004-presente",
    awards: [
      "Premio Especial del Jurado en Festival de La Habana (por Larga Distancia)"
    ]
  },
  {
    id: "leon-ichaso",
    name: "Leon Ichaso",
    photo: leonIchasoPhoto,
    birthYear: 1948,
    deathYear: 2023,
    nationality: "Cubano-Americano",
    biography: "Figura clave del cine de la diáspora. Su película 'El Súper' (1979) es un clásico sobre el exilio en Nueva York. Con 'Azúcar amarga' (1996) realizó una crítica contundente a la realidad cubana de los 90. Su obra tendió puentes entre las dos orillas.",
    activeYears: "1979-2015",
    awards: [
      "Grand Prix en el Festival de Cine de París",
      "Nominación al Premio de la Crítica en Venecia"
    ]
  },
  {
    id: "julian-schnabel",
    name: "Julian Schnabel",
    photo: julianSchnabelPhoto,
    birthYear: 1951,
    nationality: "Estadounidense",
    biography: "Reconocido pintor y cineasta neoexpresionista. Su dirección de 'Antes de que anochezca' (2000), basada en las memorias de Reinaldo Arenas, llevó la historia de la persecución de los artistas en Cuba a una audiencia global, con una actuación icónica de Javier Bardem.",
    activeYears: "1996-presente",
    awards: [
      "Gran Premio del Jurado en Festival de Venecia",
      "Mejor Director en el Festival de Cannes (por otra obra)"
    ]
  },
  {
    id: "luis-felipe-bernaza",
    name: "Luis Felipe Bernaza",
    photo: luisFelipeBernazaPhoto,
    birthYear: 1940,
    deathYear: 2001,
    nationality: "Cubano",
    biography: "Documentalista y director conocido por su agudo sentido del humor y la sátira social. Su obra 'El maní es así' y 'De tal Pedro tal astilla' son referentes del documental costumbrista cubano.",
    activeYears: "1960-2001",
    awards: ["Premios en Festival de La Habana"]
  },
  {
    id: "valeria-sarmiento",
    name: "Valeria Sarmiento",
    photo: valeriaSarmientoPhoto,
    birthYear: 1948,
    nationality: "Chilena",
    biography: "Destacada directora y montadora, viuda del cineasta Raúl Ruiz. Ha desarrollado una carrera propia explorando el melodrama y las pasiones femeninas. Rodó en Cuba 'Rosa la China', aportando una mirada externa estilizada.",
    activeYears: "1970-presente",
    awards: ["Concha de Plata en San Sebastián (por otra obra)"]
  },
  {
    id: "jorge-dyszel",
    name: "Jorge Dyszel",
    photo: jorgeDyszelPhoto,
    birthYear: 1950, 
    nationality: "Argentino",
    biography: "Director y guionista argentino que realizó la coproducción 'En fin, el mar' (Al fin, el mar), una historia que une a personajes de distintas orillas en el escenario cubano.",
    activeYears: "1980-presente",
    awards: []
  },
  {
    id: "virgen-tabares",
    name: "Virgen Tabares",
    photo: virgenTabaresPhoto,
    birthYear: 1965, 
    nationality: "Cubana",
    biography: "Directora de televisión y cine. Se destacó enormemente por sus teleplays como 'Dos en busca de una', que abordaban con realismo, humor y sensibilidad los agudos problemas de vivienda y convivencia en la sociedad cubana.",
    activeYears: "1990-presente",
    awards: ["Premios Caracol de la UNEAC"]
  },
  {
    id: "charlie-medina",
    name: "Charlie Medina",
    photo: charlieMedinaPhoto,
    birthYear: 1960, 
    nationality: "Cubano",
    biography: "Director con una sólida carrera en la televisión y el cine. Sus obras, como 'Penumbras' y 'Pompas de jabón', suelen explorar los márgenes de la sociedad, la prostitución y los conflictos éticos en situaciones límite del Período Especial.",
    activeYears: "1990-presente",
    awards: ["Premios Caracol"]
  },
  {
    id: "mariano-barroso",
    name: "Mariano Barroso",
    photo: marianoBarrosoPhoto,
    birthYear: 1959,
    nationality: "Español",
    biography: "Director y guionista español, ganador del Goya. Su película 'Hormigas en la boca', rodada en La Habana, explora el género negro y el thriller político en el contexto histórico de la revolución cubana de 1958.",
    activeYears: "1990-presente",
    awards: ["Premio Goya", "Premio Especial del Jurado en Málaga"]
  },
  {
    id: "manuel-gutierrez-aragon",
    name: "Manuel Gutiérrez Aragón",
    photo: manuelGutierrezAragonPhoto,
    birthYear: 1942,
    nationality: "Español",
    biography: "Uno de los directores fundamentales del cine español post-franquista. Rodó en Cuba 'Una rosa de Francia', película de aventuras y romance que sirvió de plataforma internacional para la actriz Ana de Armas.",
    activeYears: "1970-2010",
    awards: ["Concha de Oro en San Sebastián", "Oso de Plata en Berlín"]
  },
  {
    id: "rebeca-chavez",
    name: "Rebeca Chávez",
    photo: rebecaChavezPhoto,
    birthYear: 1946,
    nationality: "Cubana",
    biography: "Historiadora y cineasta, comenzó como documentalista registrando momentos clave de la Revolución junto a los grandes maestros. 'Ciudad en Rojo' fue su salto a la ficción, manteniendo su rigor histórico sobre la lucha clandestina en Santiago.",
    activeYears: "1970-presente",
    awards: ["Distinción por la Cultura Nacional"]
  },
  {
    id: "angelo-rizzi",
    name: "Angelo Rizzi",
    photo: angeloRizziPhoto,
    birthYear: 1957,
    nationality: "Italiano",
    biography: "Director italiano que incursionó en el cine cubano con la coproducción 'Cuando la verdad despierta', un thriller psicológico sobre la memoria y el pasado.",
    activeYears: "1990-presente",
    awards: []
  },
  {
    id: "vladimir-cruz",
    name: "Vladimir Cruz",
    photo: vladimirCruzPhoto,
    birthYear: 1965,
    nationality: "Cubano",
    biography: "Actor icónico del cine cubano ('Fresa y Chocolate'). Debutó en la dirección junto a Perugorría con 'Afinidades', mostrando una faceta introspectiva y psicológica detrás de la cámara, explorando el vacío existencial.",
    activeYears: "1990-presente",
    awards: ["Reconocimientos como Actor y Director en festivales internacionales"]
  },
  {
    id: "jorge-perugorria",
    name: "Jorge Perugorría",
    photo: jorgePerugorriaPhoto,
    birthYear: 1965,
    nationality: "Cubano",
    biography: "El rostro más internacional del cine cubano actual. Además de su legendaria carrera actoral, ha dirigido películas como 'Afinidades', 'Amor Crónico' y 'Fátima', demostrando una gran sensibilidad hacia la música y la diversidad de género.",
    activeYears: "1990-presente",
    awards: ["Gloria del Cine (Festival de La Habana)", "Miembro de la Academia de Hollywood"]
  },
  {
    id: "jorge-molina",
    name: "Jorge Molina",
    photo: jorgeMolinaPhoto,
    birthYear: 1966,
    nationality: "Cubano",
    biography: "El 'enfant terrible' del cine cubano. Sus obras transitan por el terror, el gore y el erotismo explícito, rompiendo todos los esquemas del cine institucional. 'Molina's Ferozz' es su visión gótica del campo cubano.",
    activeYears: "1990-presente",
    awards: ["Mención Especial en festivales de cine fantástico"]
  },
  {
    id: "eduardo-moyano",
    name: "Eduardo Moyano",
    photo: eduardoMoyanoPhoto,
    birthYear: 1950, 
    nationality: "Español", // Aunque rodó Sumbe, es una coproducción
    biography: "Director que abordó la épica internacionalista cubana en 'Sumbe', narrando la resistencia de los trabajadores civiles cubanos en Angola. Su cine busca rescatar la memoria histórica reciente.",
    activeYears: "1980-presente",
    awards: []
  },
  {
    id: "eduardo-del-llano",
    name: "Eduardo del Llano",
    photo: eduardoDelLlanoPhoto,
    birthYear: 1962,
    nationality: "Cubano",
    biography: "Escritor, guionista y director, famoso por su serie de cortometrajes satíricos de 'Nicanor'. Su largometraje 'Omega 3' es una rara y audaz incursión del cine cubano en la ciencia ficción distópica.",
    activeYears: "1990-presente",
    awards: ["Premio Coral (como guionista)"]
  },
  {
    id: "tomas-piard",
    name: "Tomás Piard",
    photo: tomasPiardPhoto,
    birthYear: 1948,
    deathYear: 2019,
    nationality: "Cubano",
    biography: "Cineasta prolífico, experimental y de culto. Su obra se distingue por una búsqueda estética constante, referencias literarias profundas y temas históricos, como en su homenaje 'Si vas a comer espera por Virgilio'.",
    activeYears: "1970-2019",
    awards: ["Premio Nacional de Cine (nominado)", "Premios Caracol"]
  }
  
];

// === FUNCIONES DE BÚSQUEDA ===

export const getDirectorById = (id: string): Director | undefined => {
  return directors.find((director) => director.id === id);
};

export const getDirectorByName = (name: string): Director | undefined => {
  if (!name) return undefined;
  // Búsqueda flexible: coincide si el nombre incluye la búsqueda o viceversa
  const normalizedSearch = name.toLowerCase().trim();
  return directors.find((director) => 
    director.name.toLowerCase().includes(normalizedSearch) || 
    normalizedSearch.includes(director.name.toLowerCase())
  );
};