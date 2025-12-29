/**
 * BASE DE DATOS DE DIRECTORES
 * Versión Final: Biografías detalladas + Gerardo Chijona y nuevos directores.
 */

// === IMPORTACIONES DE FOTOS ===
// Asegúrate de que las fotos existan en src/assets/directors/
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

// === NUEVOS (Asegúrate de tener estas fotos) ===
import juanPadronPhoto from "@/assets/directors/juan-padron.jpg";
import gerardoChijonaPhoto from "@/assets/directors/geraldo-chijona.jpg";
import danielDiazTorresPhoto from "@/assets/directors/daniel-dias-torres.webp";

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
  // --- CLÁSICOS (Datos detallados) ---
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

  // --- NUEVAS INCORPORACIONES (Incluido Gerardo Chijona) ---

  {
    id: "gerardo-chijona",
    name: "Gerardo Chijona",
    photo: gerardoChijonaPhoto,
    birthYear: 1949,
    nationality: "Cubano",
    biography: "Gerardo Chijona Valdés es un director y crítico de cine que debutó con gran éxito con 'Adorables mentiras' (1991). Su cine explora la realidad cubana contemporánea a través de comedias agridulces y dramas urbanos que reflejan los sueños y frustraciones de la sociedad, como en 'Un paraíso bajo las estrellas' (1999) y 'Boleto al paraíso' (2010).",
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
  }
];

export const getDirectorById = (id: string): Director | undefined => {
  return directors.find((director) => director.id === id);
};

export const getDirectorByName = (name: string): Director | undefined => {
  return directors.find((director) => 
    director.name === name || name.includes(director.name) || director.name.includes(name)
  );
};