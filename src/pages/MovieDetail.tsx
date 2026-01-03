import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Heart, Play, Calendar, Clock, Film, Award, Users, Video, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useFavorites } from "@/hooks/useFavorites";
import { Movie, getMovieById, getRelatedMovies } from "@/data/movies"; 
import { getDirectorByName } from "@/data/directors";

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
                isFavorite ? 'fill-gold text-gold' : 'text-foreground hover:text-gold'
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
  const [playerMode, setPlayerMode] = useState<'trailer' | 'movie'>('trailer');

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    const foundMovie = getMovieById(id);
    setMovie(foundMovie);
    // Por defecto mostramos trailer si hay, si no nada
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

  const handleWatchMovie = () => {
    setPlayerMode('movie');
    scrollToPlayer();
  };

  const handleWatchTrailer = () => {
    setPlayerMode('trailer');
    scrollToPlayer();
  };

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-gold">Cargando...</div>;
  if (!movie) return null;

  const favorite = isFavorite(movie.id);
  const currentVideoUrl = playerMode === 'movie' ? movie.videoUrl : movie.trailerUrl;
  const showIframe = !!currentVideoUrl; 

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* === SECCIÓN DEL REPRODUCTOR === */}
      <section ref={playerRef} className="relative pt-24 pb-10 bg-black/50">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto aspect-video bg-black relative rounded-xl overflow-hidden shadow-2xl border border-white/10 group">
            {showIframe ? (
              <iframe
                key={playerMode} 
                src={currentVideoUrl}
                title={playerMode === 'movie' ? `Película: ${movie.title}` : `Trailer: ${movie.title}`}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="w-full h-full relative">
                {movie.backdrop ? (
                   <img src={movie.backdrop} alt="Fondo" className="w-full h-full object-cover opacity-50" />
                ) : (
                   <div className="w-full h-full bg-secondary/20" />
                )}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                  <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-4 backdrop-blur-md">
                    {playerMode === 'movie' ? <Film className="w-8 h-8 text-white/50" /> : <Video className="w-8 h-8 text-white/50" />}
                  </div>
                  <p className="text-muted-foreground font-medium text-lg">
                    {playerMode === 'movie' ? "Película completa no disponible aún" : "Tráiler no disponible"}
                  </p>
                </div>
              </div>
            )}
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
                <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /><span>{movie.year}</span></div>
                  <span className="text-hairline">•</span>
                  <div className="flex items-center gap-2"><Clock className="w-4 h-4" /><span>{movie.duration}</span></div>
                  <span className="text-hairline">•</span>
                  <div className="flex items-center gap-2"><Users className="w-4 h-4" /> <span>{movie.director}</span></div>
                </div>
              </div>

              {/* BOTONES */}
              <div className="flex flex-wrap gap-4">
                {movie.videoUrl ? (
                  <Button size="lg" className={`font-bold px-8 h-12 gap-2 text-base shadow-lg transition-all ${playerMode === 'movie' ? 'bg-white text-black hover:bg-gray-200' : 'bg-gold text-black hover:bg-gold/90'}`} onClick={handleWatchMovie}>
                    <Play className="w-5 h-5 fill-current" /> {playerMode === 'movie' ? 'Viendo Película' : 'Ver Película'}
                  </Button>
                ) : (
                  <Button disabled size="lg" className="bg-white/10 text-white/50 h-12 px-8 gap-2">
                    <Film className="w-5 h-5" /> Próximamente
                  </Button>
                )}
                {movie.trailerUrl && (
                  <Button variant="outline" size="lg" className="h-12 px-8 gap-2 text-base border-white/20 hover:bg-white/10" onClick={handleWatchTrailer}>
                    <Youtube className="w-5 h-5" /> Ver Tráiler
                  </Button>
                )}
                <Button variant="outline" size="lg" className={`h-12 px-4 gap-2 text-base border-white/20 hover:bg-white/10 ${favorite ? 'text-gold border-gold/50 bg-gold/10' : 'text-white'}`} onClick={() => toggleFavorite(movie.id)}>
                  <Heart className={`w-5 h-5 ${favorite ? 'fill-gold' : ''}`} />
                </Button>
              </div>

              {/* SINOPSIS */}
              <div className="space-y-4 border-t border-white/10 pt-8">
                <h2 className="font-serif text-2xl text-white">Sinopsis</h2>
                <p className="text-gray-300 leading-relaxed text-lg font-light">{movie.synopsis}</p>
              </div>
              
              {/* FICHA TÉCNICA RÁPIDA */}
              <div className="grid sm:grid-cols-2 gap-6 border-t border-white/10 pt-8">
                <div className="space-y-1">
                  <span className="text-xs uppercase tracking-wider text-gold/80">Director</span>
                  <p className="text-white font-medium">{movie.director}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs uppercase tracking-wider text-gold/80">Año</span>
                  <p className="text-white font-medium">{movie.year}</p>
                </div>
              </div>

              {/* === PREMIOS (AQUÍ ESTABA LO QUE FALTABA) === */}
              {movie.awards && movie.awards.length > 0 && (
                <div className="space-y-6 border-t border-white/10 pt-8">
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-gold" />
                    <h2 className="font-serif text-2xl text-white">Premios y Reconocimientos</h2>
                  </div>
                  <div className="grid gap-3">
                    {movie.awards.map((award, index) => (
                      <div 
                        key={index}
                        className="flex items-start gap-4 p-4 bg-white/5 border border-white/5 rounded-sm hover:border-gold/30 transition-colors"
                      >
                        <Award className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                        <div>
                          <p className="font-medium text-white">{award.name}</p>
                          <p className="text-sm text-gray-400">{award.category} ({award.year})</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ELENCO */}
              {movie.cast && movie.cast.length > 0 && (
                <div className="space-y-6 border-t border-white/10 pt-8">
                   <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-gold" />
                    <h2 className="font-serif text-2xl text-white">Elenco</h2>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {movie.cast.map((member, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-white/5 border border-white/5 rounded-sm">
                        <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center shrink-0 text-gold font-serif font-bold">
                          {member.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-white truncate">{member.name}</p>
                          <p className="text-sm text-gray-400 truncate">{member.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
          
           {/* RELACIONADOS */}
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