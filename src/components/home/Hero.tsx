import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Play, Info, ChevronRight, ChevronLeft } from "lucide-react";
import { movies } from "@/data/movies"; // Tu catálogo
import { Button } from "@/components/ui/button";

export const Hero = () => {
  // Filtramos solo las películas que tienen imagen horizontal (backdrop)
  const featuredMovies = movies.filter((movie) => movie.backdrop);
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Cambio automático cada 6 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredMovies.length);
      setIsAnimating(false);
    }, 500); // Espera a que termine el fade-out para cambiar
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev === 0 ? featuredMovies.length - 1 : prev - 1));
      setIsAnimating(false);
    }, 500);
  };

  if (featuredMovies.length === 0) return null;

  const movie = featuredMovies[currentSlide];

  return (
    <section className="relative w-full h-[85vh] md:h-[95vh] overflow-hidden bg-black">
      {/* IMAGEN DE FONDO CON TRANSICIÓN */}
      <div 
        key={currentSlide} // La clave fuerza el re-render para la animación
        className="absolute inset-0 animate-fade-in duration-1000"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/30 to-transparent z-10" />
        
        <img
          src={movie.backdrop}
          alt={movie.title}
          className="w-full h-full object-cover object-top opacity-80"
        />
      </div>

      {/* CONTENIDO DEL TEXTO */}
      <div className="relative z-20 container mx-auto px-6 lg:px-12 h-full flex flex-col justify-center">
        <div className="max-w-2xl space-y-6 animate-slide-up">
          
          {/* Etiqueta destacada */}
          <span className="inline-block px-3 py-1 text-xs font-bold tracking-widest text-black bg-gold rounded-sm uppercase mb-2">
            Destacada
          </span>

          {/* Título */}
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-white leading-tight drop-shadow-lg">
            {movie.title}
          </h1>

          {/* Info meta */}
          <div className="flex items-center gap-4 text-gray-200 text-sm md:text-base font-light">
            <span className="text-gold font-medium">{movie.year}</span>
            <span>•</span>
            <span>{movie.duration}</span>
            <span>•</span>
            <span>{movie.genre[0]}</span>
          </div>

          {/* Sinopsis corta (limitada a 150 caracteres) */}
          <p className="text-lg text-gray-300 line-clamp-3 md:line-clamp-2 max-w-xl drop-shadow-md">
            {movie.synopsis}
          </p>

          {/* Botones de acción */}
          <div className="flex flex-wrap gap-4 pt-4">
            <Link to={`/pelicula/${movie.id}`}>
              <Button size="lg" className="bg-gold text-black hover:bg-gold/90 font-bold px-8 h-12 gap-2 text-base">
                <Play className="w-5 h-5 fill-current" />
                Ver Ahora
              </Button>
            </Link>
            
            <Link to={`/pelicula/${movie.id}`}>
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 hover:text-white h-12 px-8 gap-2 text-base backdrop-blur-sm">
                <Info className="w-5 h-5" />
                Más Información
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* INDICADORES (PUNTITOS) */}
      <div className="absolute bottom-10 right-6 lg:right-12 z-30 flex gap-2">
        {featuredMovies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentSlide ? "w-8 bg-gold" : "w-4 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* FLECHAS DE NAVEGACIÓN (Solo Desktop) */}
      <div className="absolute bottom-10 right-6 lg:right-12 z-30 flex gap-2 hidden"> 
        {/* He ocultado las flechas por defecto para usar solo los puntos, si las quieres descomenta 'hidden' */}
        <button onClick={handlePrev} className="p-2 rounded-full bg-white/10 hover:bg-gold hover:text-black transition-colors">
            <ChevronLeft size={24} />
        </button>
        <button onClick={handleNext} className="p-2 rounded-full bg-white/10 hover:bg-gold hover:text-black transition-colors">
            <ChevronRight size={24} />
        </button>
      </div>
    </section>
  );
};