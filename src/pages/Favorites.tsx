import { Link } from 'react-router-dom';
import { Heart, Film } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { useFavorites } from '@/hooks/useFavorites';
import { useAuth } from '@/hooks/useAuth';
import { movies } from '@/data/movies/catalog';
import { Movie } from '@/data/movies/types';

const FavoriteCard = ({ movie, onRemove }: { movie: Movie; onRemove: () => void }) => (
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
            onRemove();
          }}
          aria-label="Quitar de favoritos"
          className="absolute top-3 right-3 p-2 rounded-full bg-background/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-background/80"
        >
          <Heart className="w-4 h-4 fill-gold text-gold" />
        </button>
      </div>

      <div className="mt-4 space-y-1">
        <h3 className="font-serif text-lg font-medium text-foreground group-hover:text-gold transition-colors duration-300 line-clamp-1">
          {movie.title}
        </h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground font-light">
          <span>{movie.year}</span>
          <span className="text-hairline">•</span>
          <span className="truncate">{movie.director}</span>
        </div>
      </div>
    </article>
  </Link>
);

const SkeletonCard = () => (
  <div className="animate-pulse">
    <div className="aspect-[2/3] bg-secondary rounded-sm" />
    <div className="mt-4 space-y-2">
      <div className="h-5 bg-secondary rounded w-3/4" />
      <div className="h-4 bg-secondary rounded w-1/2" />
    </div>
  </div>
);

const Favorites = () => {
  const { favorites, toggleFavorite, syncing } = useFavorites();
  const { user } = useAuth();

  const favoriteMovies = movies.filter(m => favorites.includes(m.id));

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Mis Favoritos"
        description="Tu colección personal de películas del cine cubano."
        url="https://cine-cubano.com/favoritos"
      />
      <Navbar />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6 lg:px-12">

          {/* Cabecera */}
          <div className="mb-12">
            <span className="text-xs font-sans uppercase tracking-[0.2em] text-gold">
              {user ? 'Tu colección sincronizada' : 'Guardados en este dispositivo'}
            </span>
            <h1 className="font-serif text-4xl md:text-5xl font-medium mt-2">
              Mis Favoritos
            </h1>
            {!user && (
              <p className="text-muted-foreground mt-3 text-sm max-w-md">
                Inicia sesión para sincronizar tus favoritos entre dispositivos y no perderlos.
              </p>
            )}
          </div>

          {/* Cargando */}
          {syncing ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8">
              {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : favoriteMovies.length > 0 ? (
            <>
              <p className="text-muted-foreground text-sm mb-8">
                {favoriteMovies.length} {favoriteMovies.length === 1 ? 'película guardada' : 'películas guardadas'}
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8">
                {favoriteMovies.map((movie, index) => (
                  <div
                    key={movie.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 40}ms` }}
                  >
                    <FavoriteCard
                      movie={movie}
                      onRemove={() => toggleFavorite(movie.id)}
                    />
                  </div>
                ))}
              </div>
            </>
          ) : (
            /* Estado vacío */
            <div className="flex flex-col items-center justify-center py-32 text-center">
              <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-gold/30" />
              </div>
              <h2 className="font-serif text-2xl font-medium mb-3 text-foreground">
                Todavía no hay favoritos
              </h2>
              <p className="text-muted-foreground text-sm max-w-sm mb-8 leading-relaxed">
                Pulsa el corazón en cualquier película del catálogo para guardarla aquí.
              </p>
              <Link
                to="/peliculas"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-black text-sm font-bold hover:bg-gold/90 transition-colors"
              >
                <Film className="w-4 h-4" />
                Explorar el catálogo
              </Link>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Favorites;
