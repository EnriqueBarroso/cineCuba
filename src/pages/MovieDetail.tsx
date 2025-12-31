import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Heart, Play, Calendar, Clock, Film, Award, Users, Video, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useFavorites } from "@/hooks/useFavorites";
import { Movie, getMovieById, getRelatedMovies } from "@/data/movies/catalog"; // Asegúrate que la ruta sea correcta
import { getDirectorByName } from "@/data/directors";

// Componente para tarjetas relacionadas
const RelatedMovieCard = ({ 
  movie, 
  isFavorite, 
  onToggleFavorite 
}: { 
  movie: Movie; 
  isFavorite: boolean;
  onToggleFavorite: () => void;
}) => {
  return (
    <Link to={`/pelicula/${movie.id}`} className="group block">
      <article>
        <div className="relative aspect-[2/3] overflow-hidden bg-secondary">
          <img
            src={movie.poster}
            alt={`Poster de ${movie.title}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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
              className={`w-4 h-4 transition-colors ${
                isFavorite 
                  ? 'fill-gold text-gold' 
                  : 'text-foreground hover:text-gold'
              }`} 
            />
          </button>
        </div>
        
        <div className="mt-4 space-y-1">
          <h3 className="font-serif text-lg font-medium text-foreground group-hover:text-gold transition-colors duration-300">
            {movie.title}
          </h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground font-light">
            <span>{movie.year}</span>
            <span className="text-hairline">•</span>
            <span>{movie.director}</span>
          </div>
        </div>
      </article>
    </Link>
  );
};

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { isFavorite, toggleFavorite } = useFavorites();
  const playerRef = useRef<HTMLDivElement>(null);
  
  const [movie, setMovie] = useState<Movie | undefined>(undefined);
  const [relatedMovies, setRelatedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  // ESTADO PARA CONTROLAR QUÉ VIDEO SE VE (Trailer o Película)
  // 'trailer' | 'movie' | 'none'
  const [playerMode, setPlayerMode] = useState<'trailer' | 'movie'>('trailer');

  useEffect(() => {
    if (!id) return;
    
    setLoading(true);
    const foundMovie = getMovieById(id);
    setMovie(foundMovie);
    
    // Al cargar nueva peli, reseteamos a Trailer por defecto
    setPlayerMode('trailer');
    
    if (foundMovie) {
      setRelatedMovies(getRelatedMovies(id, 4));
    }
    
    setLoading(false);
    window.scrollTo(0, 0);
  }, [id]);

  const scrollToPlayer = () => {
    if (playerRef.current) {
      playerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Función para activar la película completa
  const handleWatchMovie = () => {
    setPlayerMode('movie');
    scrollToPlayer();
  };

  // Función para activar el trailer
  const handleWatchTrailer = () => {
    setPlayerMode('trailer');
    scrollToPlayer();
  };

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-gold">Cargando...</div>;
  if (!movie) return null;

  const favorite = isFavorite(movie.id);

  // Lógica para decidir qué URL mostrar en el iframe
  const currentVideoUrl = playerMode === 'movie' ? movie.videoUrl : movie.trailerUrl;
  const showIframe = !!currentVideoUrl; // Solo mostramos iframe si hay URL para el modo actual

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* === SECCIÓN DEL REPRODUCTOR === */}
      <section ref={playerRef} className="relative pt-24 pb-10 bg-black/50">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto aspect-video bg-black relative rounded-xl overflow-hidden shadow-2xl border border-white/10 group">
            
            {showIframe ? (
              <iframe
                key={playerMode} // El key fuerza a recargar el iframe si cambiamos de trailer a peli
                src={currentVideoUrl}
                title={playerMode === 'movie' ? `Película: ${movie.title}` : `Trailer: ${movie.title}`}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              // Si no hay video para el modo seleccionado (ej: no hay trailer), mostramos backdrop o mensaje
              <div className="w-full h-full relative">
                {movie.backdrop ? (
                   <img src={movie.backdrop} alt="Fondo" className="w-full h-full object-cover opacity-50" />
                ) : (
                   <div className="w-full h-full bg-secondary/20" />
                )}
                
                {/* Mensaje superpuesto */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                  <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-4 backdrop-blur-md">
                    {playerMode === 'movie' ? <Film className="w-8 h-8 text-white/50" /> : <Video className="w-8 h-8 text-white/50" />}
                  </div>
                  <p className="text-muted-foreground font-medium text-lg">
                    {playerMode === 'movie' 
                      ? "Película completa no disponible aún" 
                      : "Tráiler no disponible"}
                  </p>
                </div>
              </div>
            )}

            {/* Etiqueta para saber qué estamos viendo */}
            <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider rounded border border-white/10 pointer-events-none">
              {playerMode === 'movie' ? '🎬 Película Completa' : '🍿 Tráiler Oficial'}
            </div>

          </div>
        </div>
      </section>

      {/* === INFO Y BOTONES === */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-6 lg:px-12">
          
          <Link to="/peliculas" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> <span className="text-sm">Volver al catálogo</span>
          </Link>

          <div className="grid lg:grid-cols-[300px_1fr] gap-12">
            <div className="hidden lg:block">
              <div className="aspect-[2/3] overflow-hidden bg-secondary sticky top-24 rounded-sm shadow-lg">
                <img src={movie.poster} alt={`Poster de ${movie.title}`} className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                 <div className="flex flex-wrap gap-2">
                  {movie.genre.map((g) => (
                    <span key={g} className="text-xs uppercase tracking-wider px-3 py-1 border border-white/10 text-muted-foreground rounded-full">
                      {g}
                    </span>
                  ))}
                </div>
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-white">
                  {movie.title}
                </h1>
                
                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /><span>{movie.year}</span></div>
                  <span className="text-hairline">•</span>
                  <div className="flex items-center gap-2"><Clock className="w-4 h-4" /><span>{movie.duration}</span></div>
                  <span className="text-hairline">•</span>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" /> <span>{movie.director}</span>
                  </div>
                </div>
              </div>

              {/* === BOTONES DE ACCIÓN === */}
              <div className="flex flex-wrap gap-4">
                
                {/* 1. BOTÓN VER PELÍCULA (Solo si hay link en videoUrl) */}
                {movie.videoUrl ? (
                  <Button 
                    size="lg" 
                    className={`font-bold px-8 h-12 gap-2 text-base shadow-lg transition-all ${
                      playerMode === 'movie' 
                        ? 'bg-white text-black hover:bg-gray-200' // Estilo activo
                        : 'bg-gold text-black hover:bg-gold/90'   // Estilo inactivo (llamativo)
                    }`}
                    onClick={handleWatchMovie}
                  >
                    <Play className={`w-5 h-5 ${playerMode === 'movie' ? 'fill-black' : 'fill-black'}`} />
                    {playerMode === 'movie' ? 'Viendo Película' : 'Ver Película'}
                  </Button>
                ) : (
                  <Button disabled size="lg" className="bg-white/10 text-white/50 h-12 px-8 gap-2">
                    <Film className="w-5 h-5" /> Próximamente
                  </Button>
                )}

                {/* 2. BOTÓN VER TRAILER (Si existe) */}
                {movie.trailerUrl && (
                  <Button 
                    variant="outline"
                    size="lg" 
                    className={`h-12 px-8 gap-2 text-base border-white/20 ${
                      playerMode === 'trailer'
                        ? 'bg-white/10 text-white border-white/40'
                        : 'hover:bg-white/10 text-white'
                    }`}
                    onClick={handleWatchTrailer}
                  >
                    <Youtube className="w-5 h-5" />
                    Ver Tráiler
                  </Button>
                )}

                {/* 3. BOTÓN FAVORITOS */}
                <Button 
                  variant="outline"
                  size="lg" 
                  className={`h-12 px-4 gap-2 text-base border-white/20 hover:bg-white/10 ${
                    favorite ? 'text-gold border-gold/50 bg-gold/10' : 'text-white'
                  }`}
                  onClick={() => toggleFavorite(movie.id)}
                >
                  <Heart className={`w-5 h-5 ${favorite ? 'fill-gold' : ''}`} />
                </Button>
              </div>

              <div className="space-y-4 border-t border-white/10 pt-8">
                <h2 className="font-serif text-2xl text-white">Sinopsis</h2>
                <p className="text-gray-300 leading-relaxed text-lg font-light">{movie.synopsis}</p>
              </div>

              {/* ... Resto de la ficha (Elenco, Premios, etc) igual que antes ... */}
              {/* Puedes dejar el resto del código que ya tenías aquí abajo */}
              
              {/* Para abreviar en el chat, aquí irían las secciones de Premios, Elenco y Relacionadas que ya tenías */}
              
            </div>
          </div>
          
           {/* Relacionados */}
            <section className="py-16 lg:py-24 border-t border-white/10 mt-12">
              <div className="mb-8">
                <h2 className="font-serif text-3xl md:text-4xl font-medium text-white">Películas Relacionadas</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
                {relatedMovies.map((rm) => (
                  <RelatedMovieCard key={rm.id} movie={rm} isFavorite={isFavorite(rm.id)} onToggleFavorite={() => toggleFavorite(rm.id)} />
                ))}
              </div>
            </section>

        </div>
      </section>
      <Footer />
    </div>
  );
};

export default MovieDetail;