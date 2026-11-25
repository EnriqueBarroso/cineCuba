/**
 * LISTA CURADA DE DESTACADAS DEL HERO (portada)
 *
 * Para añadir una destacada basta con añadir un objeto a HERO_POOL con su imagen apaisada
 * (guárdala en src/assets/hero/ y expórtala en src/assets/hero/index.ts).
 * No hace falta tocar nada más: la rotación semanal la incluye sola.
 *
 * Una entrada solo entra en la rotación si tiene `description` y `badge` (no vacíos)
 * y su `id` existe como película o saga. Si no tiene `image`, el hero usa el póster.
 *
 * Los títulos no se escriben aquí: salen siempre de los datos (película o saga).
 */
import { getMovieById } from "@/data/movies";
import { getSagaById } from "@/data/sagas";
import type { HeroRotationConfig } from "@/lib/heroRotation";
import {
  heroMemorias,
  heroLucia,
  heroVampiros,
  heroFresa,
  heroHabana,
  heroConducta,
  heroJuanDeLosMuertosEscena,
  heroElpidio,
  heroAlgoMasQueSonar,
  heroNicanor,
} from "@/assets/hero";

export interface HeroEntry {
  id: string;
  year: string;
  director: string;
  description: string;
  badge: string;
  // Imagen de escena panorámica (opcional). Si no existe, se usa el póster como fallback.
  image?: string;
  /** Si es true y HERO_CONFIG.usePinned está activo, aparece siempre en el hero. */
  pinned?: boolean;
}

export const HERO_CONFIG: HeroRotationConfig = {
  /** Nº de destacadas que se muestran cada semana. */
  count: 6,
  /** Entradas "fijas" siempre presentes (campo `pinned`). Desactivado por defecto. */
  usePinned: false,
};

export const HERO_POOL: HeroEntry[] = [
  {
    id: "memorias-subdesarrollo",
    year: "1968",
    director: "Tomás Gutiérrez Alea",
    image: heroMemorias,
    description: "La obra maestra del cine cubano. Un intelectual burgués intenta encontrar su lugar en una sociedad en plena revolución.",
    badge: "Clásico Imprescindible"
  },
  {
    id: "lucia-1968",
    year: "1968",
    director: "Humberto Solás",
    image: heroLucia,
    description: "Tres mujeres, tres épocas, un mismo nombre. Una epopeya visual sobre la identidad femenina en la historia de Cuba.",
    badge: "Drama Histórico"
  },
  {
    id: "vampiros-habana",
    year: "1985",
    director: "Juan Padrón",
    image: heroVampiros,
    description: "Un científico vampiro ha creado una fórmula para resistir el sol. Mafias de Chicago y Europa luchan por el control en esta comedia de culto.",
    badge: "Animación de Culto"
  },
  {
    id: "fresa-chocolate-1993",
    year: "1993",
    director: "T. G. Alea & J. C. Tabío",
    image: heroFresa,
    description: "La amistad improbable entre un joven comunista y un artista homosexual que desafió los prejuicios de una época.",
    badge: "Nominada al Oscar"
  },
  {
    id: "habana-blues",
    year: "2005",
    director: "Benito Zambrano",
    image: heroHabana,
    description: "Música, dilemas y despedidas. Dos jóvenes músicos intentan triunfar sin perder su esencia en la Cuba de los 2000.",
    badge: "Musical / Drama"
  },
  {
    id: "conducta-2014",
    year: "2014",
    director: "Ernesto Daranas",
    image: heroConducta,
    description: "Chala, un niño de 11 años, y Carmela, su maestra, enfrentan juntos los desafíos de un sistema educativo rígido y una vida dura.",
    badge: "Cine Contemporáneo"
  },
  {
    id: "juan-de-los-muertos",
    year: "2011",
    director: "Alejandro Brugués",
    image: heroJuanDeLosMuertosEscena,
    description: "El primer zombie movie cubano. Juan y sus amigos sobreviven al apocalipsis de los no-muertos en La Habana con humor negro y mucha inventiva.",
    badge: "Terror / Comedia"
  },
  {
    id: "algo-mas-que-sonar",
    year: "1985",
    director: "Eduardo Moya",
    image: heroAlgoMasQueSonar,
    description: "La serie que marcó a una generación. Cuatro jóvenes cadetes viven sus sueños, amores y la dura realidad de la guerra de Angola.",
    badge: "Serie Clásica"
  },
  {
    id: "nicanor-odonnell",
    year: "2004 — 2019",
    director: "Eduardo del Llano",
    image: heroNicanor,
    description: "15 cortometrajes sobre Nicanor O'Donnell, el intelectual habanero más irreverente del cine cubano independiente. Con Luis Alberto García.",
    badge: "Saga de Cortos"
  },
  {
    id: "elpidio-valdes-film",
    year: "1979",
    director: "Juan Padrón",
    image: heroElpidio,
    // TODO (Enrique): escribe la descripción y el badge. Mientras estén vacíos, esta entrada
    // NO entra en la rotación del hero (así no se muestra una diapositiva sin texto).
    description: "",
    badge: ""
  },
];

/** Entradas aptas para el hero: con texto completo y con película o saga existente. */
export const HERO_ELIGIBLE: HeroEntry[] = HERO_POOL.filter(
  (e) =>
    e.description.trim() !== "" &&
    e.badge.trim() !== "" &&
    Boolean(getSagaById(e.id) || getMovieById(e.id))
);
