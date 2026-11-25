import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Info, ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isFirstPageLoad } from "@/components/PageTransition";
import { getMovieById } from "@/data/movies";
import { getSagaById } from "@/data/sagas";
import { MovieInfoModal, movieToInfo, sagaToInfo, type MovieInfo } from "@/components/MovieInfoModal";
import { HERO_ELIGIBLE, HERO_CONFIG } from "@/data/heroPool";
import { selectHeroEntries } from "@/lib/heroRotation";

/**
 * Destacadas de esta semana (rotación semanal determinista, ver src/lib/heroRotation.ts).
 *
 * IMPORTANTE: __HERO_WEEK__ lo fija vite.config.ts en el BUILD. El HTML prerenderizado y el JS
 * del cliente salen del mismo build, así que la selección es idéntica en servidor y cliente
 * (sin error de hidratación ni salto visual). Consecuencia: la rotación avanza con cada
 * despliegue; si no se despliega en una semana, el hero mantiene la selección del último build.
 */
const HERO_MOVIES = selectHeroEntries(HERO_ELIGIBLE, __HERO_WEEK__, HERO_CONFIG);

export const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [skipFirstEntrance] = useState(isFirstPageLoad);
  // "Más Info": el modal guarda su propia copia de la película activa al abrirse,
  // así que sigue mostrando la misma aunque el carrusel avance.
  const [infoOpen, setInfoOpen] = useState(false);
  const [info, setInfo] = useState<MovieInfo | null>(null);
  const infoButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (infoOpen) return; // autoplay en pausa mientras el modal está abierto
    const timer = setInterval(() => {
      handleNext();
    }, 8000);
    return () => clearInterval(timer);
  }, [currentIndex, infoOpen]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % HERO_MOVIES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + HERO_MOVIES.length) % HERO_MOVIES.length);
  };

  const movie = HERO_MOVIES[currentIndex];
  if (!movie) return null; // pool vacío: no se pinta el hero (no debería ocurrir)
  const saga = getSagaById(movie.id);
  const isSaga = Boolean(saga);
  const linkTo = isSaga ? `/saga/${movie.id}` : `/pelicula/${movie.id}`;
  const movieData = getMovieById(movie.id);
  // El título sale siempre de los datos (película o saga): una única fuente de verdad.
  const title = saga?.title ?? movieData?.title ?? "";
  const fallbackPoster = saga?.poster || movieData?.poster;
  const visual = movie.image || fallbackPoster;

  const openInfo = () => {
    setInfo(
      saga
        ? sagaToInfo(saga)
        : movieData
          ? movieToInfo(movieData)
          : { id: movie.id, title, year: movie.year, href: linkTo, synopsis: movie.description, director: movie.director }
    );
    setInfoOpen(true);
  };

  return (
    <div className="relative w-full overflow-hidden bg-background text-white lg:min-h-screen">
      {/* Glow dorado sutil, centrado en el lado izquierdo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-0 -translate-x-1/3 -translate-y-1/2 w-[700px] h-[700px] bg-gold/10 blur-[150px] rounded-full" />
      </div>

      {/* En la primera carga la diapositiva 0 nace en su estado final (visible en el prerender y sin error de hidratación);
          las siguientes diapositivas y las visitas posteriores a la portada animan como siempre. */}
      <AnimatePresence mode="wait" initial={skipFirstEntrance ? false : undefined}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="container mx-auto px-6 pt-28 pb-6 md:pb-24 lg:pt-32 lg:pb-24 lg:min-h-screen flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-10">
            {/* IMAGEN MÓVIL */}
            <div className="lg:hidden relative -mx-6 h-[250px] overflow-hidden">
              {visual && (
                <img
                  src={visual}
                  alt={`Escena de ${title} (${movie.year})`}
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

              <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-tight text-balance text-white drop-shadow-lg">
                {title}
              </h2>

              <p className="text-lg md:text-xl text-gray-200 line-clamp-3 md:line-clamp-none max-w-xl font-light leading-relaxed drop-shadow-md">
                {movie.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link to={linkTo}>
                  <Button size="lg" className="bg-white text-black hover:bg-gray-200 font-bold px-8 h-12 gap-2 text-base shadow-xl">
                    <Play className="w-5 h-5 fill-black" /> Ver Ahora
                  </Button>
                </Link>
                <Button
                  ref={infoButtonRef}
                  onClick={openInfo}
                  variant="outline"
                  size="lg"
                  className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 h-12 px-8 gap-2 text-base"
                >
                  <Info className="w-5 h-5" /> Más Info
                </Button>
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
                    alt={`Escena de ${title} (${movie.year})`}
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

      {/* Controles: en móvil van en el flujo, bajo los botones (puntos a la izquierda, flechas a la derecha);
          desde md: el envoltorio desaparece (contents) y cada grupo se posiciona sobre el hero como siempre. */}
      <div className="relative z-20 container mx-auto px-6 pb-8 flex items-center justify-between md:contents">
      {/* Flechas */}
      <div className="order-2 flex gap-2 z-20 md:order-none md:absolute md:bottom-8 md:right-8">
        <button onClick={handlePrev} aria-label="Anterior" className="h-10 w-10 p-0 flex items-center justify-center md:h-auto md:w-auto md:p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 transition-all active:scale-95">
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button onClick={handleNext} aria-label="Siguiente" className="h-10 w-10 p-0 flex items-center justify-center md:h-auto md:w-auto md:p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 transition-all active:scale-95">
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Indicadores */}
      <div className="order-1 flex gap-3 z-20 md:order-none md:absolute md:bottom-8 md:left-1/2 md:-translate-x-1/2">
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

      <MovieInfoModal open={infoOpen} onOpenChange={setInfoOpen} info={info} returnFocusRef={infoButtonRef} />
    </div>
  );
};
