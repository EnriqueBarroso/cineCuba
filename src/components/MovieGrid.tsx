import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { Heart } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom"; 
import { useFavorites } from "@/hooks/useFavorites";
import { movies as catalogMovies } from "@/data/movies/catalog";
import { Movie } from "@/data/movies/types";
import { MovieSearch } from "./MovieSearch";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { directorLabel } from "@/lib/directors";
import { useIsMobile } from "@/hooks/use-mobile";
import { CatalogPagination, PER_PAGE_OPTIONS } from "@/components/CatalogPagination";

const DEFAULT_PER_PAGE_DESKTOP = 24;
const DEFAULT_PER_PAGE_MOBILE = 12;

const MovieCardSkeleton = () => {
  return (
    <div className="animate-fade-in">
      <div className="space-y-4">
        <Skeleton className="aspect-[2/3] w-full bg-secondary" />
        <div className="space-y-2">
          <Skeleton className="h-5 w-3/4 bg-secondary" />
          <Skeleton className="h-4 w-1/2 bg-secondary" />
        </div>
      </div>
    </div>
  );
};

const MovieCard = ({ movie, isFavorite, onToggleFavorite }: {
  movie: Movie;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}) => {
  return (
    <Link to={`/pelicula/${movie.id}`} className="group block">
      <article>
        <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-zinc-800 shadow-lg shadow-black/40 transition-all duration-300 group-hover:shadow-xl group-hover:shadow-black/60">
          <img
            src={movie.poster}
            alt={`Poster de ${movie.title} (${movie.year}) - Dir. ${directorLabel(movie.director)}`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors duration-300" />
          
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleFavorite();
            }}
            className="absolute top-3 right-3 p-2 rounded-full bg-background/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-background/80"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${isFavorite
                  ? 'fill-gold text-gold'
                  : 'text-foreground hover:text-gold'
                }`}
            />
          </button>
        </div>

        <div className="mt-4 space-y-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-serif text-lg font-medium text-foreground group-hover:text-gold transition-colors duration-300">
              {movie.title}
            </h3>
            {isFavorite && (
              <Heart className="w-4 h-4 fill-gold text-gold flex-shrink-0 mt-1" />
            )}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground font-light">
            <span>{movie.year}</span>
            <span className="text-hairline">•</span>
            <span>{directorLabel(movie.director)}</span>
          </div>
        </div>
      </article>
    </Link>
  );
};

const MovieGrid = () => {
  const { isFavorite, toggleFavorite } = useFavorites();
  
  const movies = catalogMovies; 
  const loadingMovies = false;
  
  // 1. OBTENEMOS LOS PARÁMETROS Y LA FUNCIÓN PARA ACTUALIZARLOS
  const [searchParams, setSearchParams] = useSearchParams();
  const urlSearchQuery = searchParams.get("search");

  // 2. PÁGINA Y TAMAÑO DE PÁGINA VIENEN DE LA URL (?page=3&perPage=24)
  const isMobile = useIsMobile();
  const defaultPerPage = isMobile ? DEFAULT_PER_PAGE_MOBILE : DEFAULT_PER_PAGE_DESKTOP;
  const rawPage = searchParams.get("page");
  const requestedPage = parseInt(rawPage || "1", 10);
  const rawPerPage = Number(searchParams.get("perPage"));
  const perPage = (PER_PAGE_OPTIONS as readonly number[]).includes(rawPerPage) ? rawPerPage : defaultPerPage;

  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [isFiltering, setIsFiltering] = useState(false);

  const lastFilterSignature = useRef("");

  // === LÓGICA DE FILTRADO ===
  useEffect(() => {
    if (movies.length === 0) return;

    if (urlSearchQuery) {
      setIsFiltering(true);
      const query = urlSearchQuery.toLowerCase().trim();
      
      const results = movies.filter(movie => 
        movie.title.toLowerCase().includes(query) ||
        directorLabel(movie.director).toLowerCase().includes(query) ||
        movie.year.toString().includes(query) ||
        movie.genre.some(g => g.toLowerCase().includes(query))
      );
      
      setFilteredMovies(results);
      // Nota: No forzamos la página 1 aquí, asumimos que quien pone el ?search en la URL también pone el ?page=1 si es nueva búsqueda.
      
      const carteleraElement = document.getElementById("cartelera");
      if (carteleraElement) {
        carteleraElement.scrollIntoView({ behavior: "smooth" });
      }
      
      setTimeout(() => setIsFiltering(false), 300);
    } else {
      if (filteredMovies.length === 0 && !isFiltering) {
         setFilteredMovies(movies);
      }
    }
  }, [movies, urlSearchQuery]); 

  const handleFilteredMovies = useCallback((filtered: Movie[]) => {
    if (!urlSearchQuery) {
      const signature = filtered.map(m => m.id).join(',');

      if (signature !== lastFilterSignature.current) {
        // Detectamos si es la carga inicial para no resetear la página si vienes del historial
        const isFirstLoad = lastFilterSignature.current === "";
        lastFilterSignature.current = signature;
        
        setIsFiltering(true);
        setFilteredMovies(filtered);
        
        // Si el usuario cambia los filtros (no es la carga inicial), volvemos a página 1
        if (!isFirstLoad) {
           setSearchParams(prev => {
             const newParams = new URLSearchParams(prev);
             newParams.set("page", "1");
             return newParams;
           }, { replace: true });
        }

        setTimeout(() => setIsFiltering(false), 300);
      }
    }
  }, [urlSearchQuery, setSearchParams]);

  const totalPages = Math.ceil(filteredMovies.length / perPage);
  const currentPage = Number.isNaN(requestedPage)
    ? 1
    : Math.min(Math.max(requestedPage, 1), Math.max(totalPages, 1));

  // Página fuera de rango o no numérica: reemplazamos por la última página válida
  useEffect(() => {
    if (totalPages === 0 || rawPage === null) return;
    if (String(currentPage) === rawPage && currentPage > 0) return;
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      if (currentPage <= 1) newParams.delete("page");
      else newParams.set("page", currentPage.toString());
      return newParams;
    }, { replace: true });
  }, [totalPages, currentPage, rawPage, setSearchParams]);

  // Encuadre del grid: solo se recoloca la vista cuando el usuario cambia de página o de tamaño,
  // de forma instantánea (el scroll suave era lo que daba sensación de salto).
  const gridRef = useRef<HTMLDivElement>(null);
  const userNavigatedRef = useRef(false);
  const lastPositionRef = useRef<string | null>(null);

  useEffect(() => {
    const position = `${currentPage}|${perPage}`;
    const isFirstRender = lastPositionRef.current === null;
    lastPositionRef.current = position;
    if (isFirstRender || !userNavigatedRef.current) return;
    userNavigatedRef.current = false;
    gridRef.current?.scrollIntoView({ block: "start", behavior: "auto" });
  }, [currentPage, perPage]);

  // Altura de una página completa: se reserva en la última página (con menos películas)
  // para que el grid no cambie de sitio ni la paginación inferior suba.
  const [fullGridHeight, setFullGridHeight] = useState(0);

  useEffect(() => {
    const onResize = () => setFullGridHeight(0);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    setFullGridHeight(0);
  }, [perPage]);

  // 3. ACTUALIZAR URL AL CAMBIAR DE PÁGINA (sin perder search ni otros params)
  const handlePageChange = (page: number) => {
    setIsFiltering(true);

    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      if (page <= 1) newParams.delete("page");
      else newParams.set("page", page.toString());
      return newParams;
    });

    userNavigatedRef.current = true;
    setTimeout(() => setIsFiltering(false), 300);
  };

  const handlePerPageChange = (value: number) => {
    setIsFiltering(true);

    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      if (value === defaultPerPage) newParams.delete("perPage");
      else newParams.set("perPage", value.toString());
      newParams.delete("page");
      return newParams;
    });

    userNavigatedRef.current = true;
    setTimeout(() => setIsFiltering(false), 300);
  };

  const isLoading = loadingMovies || isFiltering;

  const paginatedMovies = useMemo(() => {
    const startIndex = (currentPage - 1) * perPage;
    return filteredMovies.slice(startIndex, startIndex + perPage);
  }, [filteredMovies, currentPage, perPage]);

  // Medimos el bloque del grid cuando la página está completa
  useEffect(() => {
    if (!isLoading && paginatedMovies.length === perPage && gridRef.current && fullGridHeight === 0) {
      setFullGridHeight(gridRef.current.offsetHeight);
    }
  }, [isLoading, paginatedMovies.length, perPage, currentPage, fullGridHeight]);

  const isPartialPage = !isLoading && paginatedMovies.length > 0 && paginatedMovies.length < perPage;

  const paginationProps = {
    page: currentPage,
    totalPages,
    perPage,
    onPageChange: handlePageChange,
    onPerPageChange: handlePerPageChange,
    disabled: isLoading,
  };

  return (
    <section id="cartelera" className="py-20 lg:py-28 pt-24 border-t border-hairline scroll-mt-24">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-end justify-between mb-8">
          <div className="space-y-2">
            <span className="text-xs font-sans uppercase tracking-[0.2em] text-gold">
              Colección
            </span>
            <div className="flex flex-col gap-1">
              <h2 className="font-serif text-3xl md:text-4xl font-medium">
                Cartelera
              </h2>
              {urlSearchQuery && (
                <p className="text-muted-foreground">
                  Resultados para: <span className="text-gold font-medium">"{urlSearchQuery}"</span>
                </p>
              )}
            </div>
          </div>
        </div>

        {!urlSearchQuery && (
          <div className="mb-12">
            <MovieSearch
              movies={movies}  
              onFilteredMovies={handleFilteredMovies}
            />
          </div>
        )}

        <div
          ref={gridRef}
          className="scroll-mt-24"
          style={isPartialPage && fullGridHeight ? { minHeight: fullGridHeight } : undefined}
        >
        {filteredMovies.length > PER_PAGE_OPTIONS[0] && (
          <CatalogPagination variant="compact" className="mb-6" {...paginationProps} />
        )}

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8">
            {Array.from({ length: perPage }).map((_, index) => (
              <MovieCardSkeleton key={index} />
            ))}
          </div>
        ) : paginatedMovies.length > 0 ? (
          <div
            key={currentPage}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8 animate-fade-in"
          >
            {paginatedMovies.map((movie, index) => (
              <div
                key={movie.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <MovieCard
                  movie={movie}
                  isFavorite={isFavorite(movie.id)}
                  onToggleFavorite={() => toggleFavorite(movie.id)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              No se encontraron películas que coincidan con "{urlSearchQuery || 'tu búsqueda'}".
            </p>
            {urlSearchQuery && (
               <Link to="/peliculas">
                 <Button variant="link" className="text-gold mt-2">
                   Ver todas las películas
                 </Button>
               </Link>
            )}
          </div>
        )}
        </div>

        {totalPages > 1 && (
          <CatalogPagination variant="full" className="mt-12" {...paginationProps} />
        )}
      </div>
    </section>
  );
};

export default MovieGrid;