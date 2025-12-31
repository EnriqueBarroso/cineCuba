import { useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, PlayCircle } from "lucide-react";
import { Movie } from "@/data/movies";

interface MovieRowProps {
  title: string;
  movies: Movie[];
}

export const MovieRow = ({ title, movies }: MovieRowProps) => {
  const rowRef = useRef<HTMLDivElement>(null);

  // Funciones para las flechas de desplazamiento
  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { current } = rowRef;
      const scrollAmount = direction === 'left' 
        ? -current.offsetWidth / 1.5 
        : current.offsetWidth / 1.5;
      
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (movies.length === 0) return null;

  return (
    <section className="py-8 border-b border-white/5 last:border-0 animate-fade-in">
      {/* Cabecera de la Fila */}
      <div className="container px-6 lg:px-12 mb-4 flex items-end justify-between">
        <h2 className="font-serif text-2xl md:text-3xl text-white font-medium">
          {title}
          <span className="ml-3 text-sm font-sans text-gold/60 font-normal tracking-widest uppercase">
            {movies.length} Películas
          </span>
        </h2>
        
        {/* Flechas de navegación (solo visibles en desktop si hay muchas pelis) */}
        <div className="hidden md:flex gap-2">
          <button 
            onClick={() => scroll('left')}
            className="p-2 rounded-full bg-white/5 hover:bg-gold hover:text-black transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="p-2 rounded-full bg-white/5 hover:bg-gold hover:text-black transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Contenedor del Slider */}
      <div className="relative group">
        <div 
          ref={rowRef}
          className="flex gap-4 overflow-x-auto px-6 lg:px-12 pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} // Ocultar barra de scroll nativa
        >
          {movies.map((movie) => (
            <Link 
              key={movie.id} 
              to={`/pelicula/${movie.id}`}
              className="flex-none w-[160px] md:w-[220px] snap-start group/card"
            >
              <div className="relative aspect-[2/3] rounded-sm overflow-hidden bg-secondary mb-3 transition-transform duration-300 group-hover/card:scale-105 group-hover/card:shadow-xl">
                <img 
                  src={movie.poster} 
                  alt={movie.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                
                {/* Overlay Hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <PlayCircle className="w-12 h-12 text-gold opacity-90 scale-75 group-hover/card:scale-100 transition-transform" />
                </div>
              </div>

              <h3 className="text-sm font-medium text-white truncate group-hover/card:text-gold transition-colors">
                {movie.title}
              </h3>
              <p className="text-xs text-muted-foreground">{movie.year}</p>
            </Link>
          ))}
        </div>
        
        {/* Degradados laterales para indicar que hay más contenido */}
        <div className="absolute top-0 bottom-0 left-0 w-12 bg-gradient-to-r from-background to-transparent pointer-events-none md:hidden" />
        <div className="absolute top-0 bottom-0 right-0 w-12 bg-gradient-to-l from-background to-transparent pointer-events-none md:hidden" />
      </div>
    </section>
  );
};