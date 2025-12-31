import { useState, useMemo, useEffect } from "react";
import { Heart, ChevronLeft, ChevronRight, FilterX } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useFavorites } from "@/hooks/useFavorites";
// CAMBIO CLAVE: Importamos directamente del catálogo estático
import { movies as catalogMovies } from "@/data/movies/catalog";
import { MovieSearch } from "./MovieSearch";
import { Button } from "@/components/ui/button";

const MOVIES_PER_PAGE = 12; // Aumentado a 12 para que se vea mejor en desktop

const MovieCard = ({ movie, isFavorite, onToggleFavorite }: {
  movie: any; // Usamos any temporalmente para evitar conflictos de tipos si los hay
  isFavorite: boolean;
  onToggleFavorite: () => void;
}) => {
  return (
    <Link to={`/pelicula/${movie.id}`} className="group block h-full">
      <article className="h-full flex flex-col">
        <div className="relative aspect-[2/3] overflow-hidden bg-secondary rounded-sm">
          <img
            src={movie.poster}
            alt={`Poster de ${movie.title}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
          
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleFavorite();
            }}
            className="absolute top-2 right-2 p-2 rounded-full bg-black/40 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/60"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${isFavorite
                  ? 'fill-gold text-gold'
                  : 'text-white'
                }`}
            />
          </button>
        </div>

        <div className="mt-3 space-y-1 flex-1">
          <h3 className="font-medium text-white group-hover:text-gold transition-colors line-clamp-2 leading-tight">
            {movie.title}
          </h3>
          <p className="text-xs text-muted-foreground">{movie.year} • {movie.director}</p>
        </div>
      </article>
    </Link>
  );
};

export const MovieGrid = () => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [searchParams] = useSearchParams();
  const urlSearchQuery = searchParams.get("search");

  // Estado local de películas (Cargadas desde catalog.ts)
  const [filteredMovies, setFilteredMovies] = useState(catalogMovies);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFiltering, setIsFiltering] = useState(false);

  // Efecto para manejar la búsqueda desde la URL (Navbar)
  useEffect(() => {
    if (urlSearchQuery) {
      setIsFiltering(true);
      const query = urlSearchQuery.toLowerCase().trim();
      
      const results = catalogMovies.filter(movie => 
        movie.title.toLowerCase().includes(query) ||
        movie.director.toLowerCase().includes(query) ||
        movie.year.toString().includes(query) ||
        movie.genre.some(g => g.toLowerCase().includes(query))
      );
      
      setFilteredMovies(results);
      setCurrentPage(1);
      setTimeout(() => setIsFiltering(false), 300);
    } else {
      // Si no hay búsqueda en URL, dejamos que el componente MovieSearch maneje el estado inicial
      // o reseteamos a todas si venimos de una búsqueda
      setFilteredMovies(catalogMovies);
    }
  }, [urlSearchQuery]);

  // Manejador que recibe los resultados del componente MovieSearch
  const handleSearchResults = (results: any[]) => {
    if (!urlSearchQuery) {
      setFilteredMovies(results);
      setCurrentPage(1);
    }
  };

  // Lógica de Paginación
  const totalPages = Math.ceil(filteredMovies.length / MOVIES_PER_PAGE);
  const paginatedMovies = useMemo(() => {
    const startIndex = (currentPage - 1) * MOVIES_PER_PAGE;
    return filteredMovies.slice(startIndex, startIndex + MOVIES_PER_PAGE);
  }, [filteredMovies, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-10 animate-fade-in">
      <div className="container px-6 lg:px-12">
        
        {/* Encabezado y Buscador */}
        <div className="mb-10 space-y-6">
          {!urlSearchQuery && (
            <MovieSearch
              movies={catalogMovies}  
              onFilteredMovies={handleSearchResults}
            />
          )}

          {urlSearchQuery && (
            <div className="flex items-center gap-2 text-lg">
              <span className="text-muted-foreground">Resultados para:</span>
              <span className="text-gold font-medium">"{urlSearchQuery}"</span>
              <Link to="/peliculas" className="ml-4 text-xs text-white/50 hover:text-white flex items-center gap-1">
                <FilterX className="w-3 h-3" /> Limpiar búsqueda
              </Link>
            </div>
          )}
        </div>

        {/* Grid de Resultados */}
        <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-6 gap-y-10 min-h-[400px] transition-opacity duration-300 ${isFiltering ? 'opacity-50' : 'opacity-100'}`}>
          {paginatedMovies.length > 0 ? (
            paginatedMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                isFavorite={isFavorite(movie.id)}
                onToggleFavorite={() => toggleFavorite(movie.id)}
              />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                <FilterX className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-medium text-white mb-2">No encontramos películas</h3>
              <p className="text-muted-foreground max-w-md">
                Intenta ajustar los filtros o busca con otros términos.
              </p>
              <Button 
                variant="link" 
                className="text-gold mt-4"
                onClick={() => window.location.href = '/peliculas'}
              >
                Ver todo el catálogo
              </Button>
            </div>
          )}
        </div>

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="mt-16 flex justify-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="border-white/10 hover:bg-white/5"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            <span className="flex items-center px-4 text-sm text-muted-foreground font-medium">
              Página {currentPage} de {totalPages}
            </span>

            <Button
              variant="outline"
              size="icon"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="border-white/10 hover:bg-white/5"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};