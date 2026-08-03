import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Info, ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getMovieById } from "@/data/movies";
import { getSagaById } from "@/data/sagas";
import {
  heroMemorias,
  heroLucia,
  heroVampiros,
  heroFresa,
  heroHabana,
  heroConducta,
  heroJuanDeLosMuertosEscena,
} from "@/assets/hero";

interface HeroEntry {
  id: string;
  title: string;
  year: string;
  director: string;
  description: string;
  badge: string;
  // Imagen de escena panorámica (opcional). Si no existe, se usa el poster como fallback.
  image?: string;
}

const HERO_MOVIES: HeroEntry[] = [
  {
    id: "memorias-subdesarrollo",
    title: "Memorias del Subdesarrollo",
    year: "1968",
    director: "Tomás Gutiérrez Alea",
    image: heroMemorias,
    description: "La obra maestra del cine cubano. Un intelectual burgués intenta encontrar su lugar en una sociedad en plena revolución.",
    badge: "Clásico Imprescindible"
  },
  {
    id: "lucia-1968",
    title: "Lucía",
    year: "1968",
    director: "Humberto Solás",
    image: heroLucia,
    description: "Tres mujeres, tres épocas, un mismo nombre. Una epopeya visual sobre la identidad femenina en la historia de Cuba.",
    badge: "Drama Histórico"
  },
  {
    id: "vampiros-habana",
    title: "¡Vampiros en La Habana!",
    year: "1985",
    director: "Juan Padrón",
    image: heroVampiros,
    description: "Un científico vampiro ha creado una fórmula para resistir el sol. Mafias de Chicago y Europa luchan por el control en esta comedia de culto.",
    badge: "Animación de Culto"
  },
  {
    id: "fresa-chocolate-1993",
    title: "Fresa y Chocolate",
    year: "1993",
    director: "T. G. Alea & J. C. Tabío",
    image: heroFresa,
    description: "La amistad improbable entre un joven comunista y un artista homosexual que desafió los prejuicios de una época.",
    badge: "Nominada al Oscar"
  },
  {
    id: "habana-blues",
    title: "Habana Blues",
    year: "2005",
    director: "Benito Zambrano",
    image: heroHabana,
    description: "Música, dilemas y despedidas. Dos jóvenes músicos intentan triunfar sin perder su esencia en la Cuba de los 2000.",
    badge: "Musical / Drama"
  },
  {
    id: "conducta-2014",
    title: "Conducta",
    year: "2014",
    director: "Ernesto Daranas",
    image: heroConducta,
    description: "Chala, un niño de 11 años, y Carmela, su maestra, enfrentan juntos los desafíos de un sistema educativo rígido y una vida dura.",
    badge: "Cine Contemporáneo"
  },
  {
    id: "juan-de-los-muertos",
    title: "Juan de los Muertos",
    year: "2011",
    director: "Alejandro Brugués",
    image: heroJuanDeLosMuertosEscena,
    description: "El primer zombie movie cubano. Juan y sus amigos sobreviven al apocalipsis de los no-muertos en La Habana con humor negro y mucha inventiva.",
    badge: "Terror / Comedia"
  },
  {
    id: "algo-mas-que-sonar",
    title: "Algo más que soñar",
    year: "1985",
    director: "Eduardo Moya",
    // Sin imagen de escena todavía — se usa el poster de la saga como fallback (ver getSagaById).
    description: "La serie que marcó a una generación. Cuatro jóvenes cadetes viven sus sueños, amores y la dura realidad de la guerra de Angola.",
    badge: "Serie Clásica"
  },
  {
    id: "nicanor-odonnell",
    title: "Los cuentos de Nicanor",
    year: "2004 — 2019",
    director: "Eduardo del Llano",
    // Sin imagen de escena todavía — se usa el poster de la saga como fallback (ver getSagaById).
    description: "15 cortometrajes sobre Nicanor O'Donnell, el intelectual habanero más irreverente del cine cubano independiente. Con Luis Alberto García.",
    badge: "Saga de Cortos"
  }
];

export const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 8000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % HERO_MOVIES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + HERO_MOVIES.length) % HERO_MOVIES.length);
  };

  const movie = HERO_MOVIES[currentIndex];
  const saga = getSagaById(movie.id);
  const isSaga = Boolean(saga);
  const linkTo = isSaga ? `/saga/${movie.id}` : `/pelicula/${movie.id}`;
  const fallbackPoster = saga?.poster || getMovieById(movie.id)?.poster;
  const visual = movie.image || fallbackPoster;

  return (
    <div className="relative w-full overflow-hidden bg-background text-white lg:min-h-screen">
      {/* Glow dorado sutil, centrado en el lado izquierdo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-0 -translate-x-1/3 -translate-y-1/2 w-[700px] h-[700px] bg-gold/10 blur-[150px] rounded-full" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="container mx-auto px-6 pt-28 pb-24 lg:pt-32 lg:pb-24 lg:min-h-screen flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-10">
            {/* IMAGEN MÓVIL */}
            <div className="lg:hidden relative -mx-6 h-[250px] overflow-hidden">
              {visual && (
                <img
                  src={visual}
                  alt={movie.title}
                  loading={currentIndex === 0 ? "eager" : "lazy"}
                  fetchPriority="high"
                  style={{ filter: "brightness(0.9) contrast(1.1)" }}
                  className="w-full h-full object-cover"
                />
              )}
              {/* Viñeta radial sutil para disimular la falta de resolución */}
              <div
                className="absolute inset-0"
                style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            </div>

            {/* TEXTO */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="relative z-10 w-full lg:w-[55%] space-y-6"
            >
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-gold text-black text-xs font-bold uppercase tracking-wider rounded-sm">
                  {movie.badge}
                </span>
                <span className="text-white/80 text-sm font-medium border px-2 py-0.5 rounded border-white/20">
                  {movie.year}
                </span>
              </div>

              <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-tight text-balance text-white drop-shadow-lg">
                {movie.title}
              </h1>

              <p className="text-lg md:text-xl text-gray-200 line-clamp-3 md:line-clamp-none max-w-xl font-light leading-relaxed drop-shadow-md">
                {movie.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link to={linkTo}>
                  <Button size="lg" className="bg-white text-black hover:bg-gray-200 font-bold px-8 h-12 gap-2 text-base shadow-xl">
                    <Play className="w-5 h-5 fill-black" /> Ver Ahora
                  </Button>
                </Link>
                <Link to={linkTo}>
                  <Button variant="outline" size="lg" className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 h-12 px-8 gap-2 text-base">
                    <Info className="w-5 h-5" /> Más Info
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* IMAGEN ESCRITORIO */}
            <div className="hidden lg:flex lg:w-[45%] justify-center">
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15, duration: 0.6 }}
                className="relative w-full max-w-lg h-[420px] rounded-lg overflow-hidden shadow-2xl shadow-black/70"
              >
                {visual && (
                  <img
                    src={visual}
                    alt={movie.title}
                    loading={currentIndex === 0 ? "eager" : "lazy"}
                    fetchPriority="high"
                    style={{ filter: "brightness(0.9) contrast(1.1)" }}
                    className="w-full h-full object-cover"
                  />
                )}
                {/* Viñeta radial sutil para disimular la falta de resolución */}
                <div
                  className="absolute inset-0"
                  style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)" }}
                />
                {/* Difumina el borde izquierdo de la imagen hacia el fondo */}
                <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-background to-transparent" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controles */}
      <div className="absolute bottom-8 right-8 flex gap-2 z-20">
        <button onClick={handlePrev} className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 transition-all active:scale-95">
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button onClick={handleNext} className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 transition-all active:scale-95">
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Indicadores */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {HERO_MOVIES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === currentIndex ? "w-8 bg-gold" : "w-2 bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
