import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Info, ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

// Importamos lo básico para que no se rompa
import { 
  heroMemorias, 
  heroVampiros, 
  heroFresa, 
  heroHabana, 
  heroLucia,
  heroConducta
} from "@/assets/hero";

const HERO_MOVIES = [
  {
    id: "memorias-subdesarrollo",
    title: "Memorias del Subdesarrollo",
    year: "1968",
    director: "Tomás Gutiérrez Alea",
    image: heroMemorias, // Usa tu archivo local
    description: "La obra maestra del cine cubano. Un intelectual burgués intenta encontrar su lugar en una sociedad en plena revolución.",
    badge: "Clásico Imprescindible",
    objectPosition: "object-center"
  },
  {
    id: "lucia-1968",
    title: "Lucía",
    year: "1968",
    director: "Humberto Solás",
    // 👇 AQUÍ ESTÁ EL TRUCO: Enlace directo de internet
    image: heroLucia,
    description: "Tres mujeres, tres épocas, un mismo nombre. Una epopeya visual sobre la identidad femenina en la historia de Cuba.",
    badge: "Drama Histórico",
    objectPosition: "object-center"
  },
  {
    id: "vampiros-habana",
    title: "¡Vampiros en La Habana!",
    year: "1985",
    director: "Juan Padrón",
    image: heroVampiros, // Usa tu archivo local
    description: "Un científico vampiro ha creado una fórmula para resistir el sol. Mafias de Chicago y Europa luchan por el control en esta comedia de culto.",
    badge: "Animación de Culto",
    objectPosition: "object-center"
  },
  {
    id: "fresa-chocolate-1993",
    title: "Fresa y Chocolate",
    year: "1993",
    director: "T. G. Alea & J. C. Tabío",
    image: heroFresa, // Usa tu archivo local
    description: "La amistad improbable entre un joven comunista y un artista homosexual que desafió los prejuicios de una época.",
    badge: "Nominada al Oscar",
    objectPosition: "object-center"
  },
  {
    id: "habana-blues",
    title: "Habana Blues",
    year: "2005",
    director: "Benito Zambrano",
    image: heroHabana, // Usa tu archivo local
    description: "Música, dilemas y despedidas. Dos jóvenes músicos intentan triunfar sin perder su esencia en la Cuba de los 2000.",
    badge: "Musical / Drama",
    objectPosition: "object-top"
  },
  {
    id: "conducta-2014",
    title: "Conducta",
    year: "2014",
    director: "Ernesto Daranas",
    // 👇 AQUÍ ESTÁ EL TRUCO: Enlace directo de internet
    image: heroConducta,
    description: "Chala, un niño de 11 años, y Carmela, su maestra, enfrentan juntos los desafíos de un sistema educativo rígido y una vida dura.",
    badge: "Cine Contemporáneo",
    objectPosition: "object-top"
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

  return (
    <div className="relative w-full h-screen min-h-[600px] overflow-hidden bg-black text-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          {/* Imagen de Fondo */}
          <div className="absolute inset-0">
            <img
              src={movie.image}
              alt={movie.title}
              loading={currentIndex === 0 ? "eager" : "lazy"}
              fetchPriority="high"
              className={`w-full h-full object-cover ${movie.objectPosition}`}
            />
            {/* Gradientes */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          </div>

          {/* Contenido */}
          <div className="relative h-full container mx-auto px-6 flex flex-col justify-end pb-24 lg:pb-32 lg:justify-center lg:pt-20">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="max-w-2xl space-y-6"
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
                <Link to={`/pelicula/${movie.id}`}>
                  <Button size="lg" className="bg-white text-black hover:bg-gray-200 font-bold px-8 h-12 gap-2 text-base shadow-xl">
                    <Play className="w-5 h-5 fill-black" /> Ver Ahora
                  </Button>
                </Link>
                <Link to={`/pelicula/${movie.id}`}>
                  <Button variant="outline" size="lg" className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 h-12 px-8 gap-2 text-base">
                    <Info className="w-5 h-5" /> Más Info
                  </Button>
                </Link>
              </div>
            </motion.div>
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