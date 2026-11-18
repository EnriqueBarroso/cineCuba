import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { MovieCard } from "@/components/MovieGrid";
import { useFavorites } from "@/hooks/useFavorites";
import { genreFromSlug, genreInSentence } from "@/data/movies/genres";
import { getMoviesOfGenre } from "@/lib/genres";
import NotFound from "./NotFound";

const GenreDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { isFavorite, toggleFavorite } = useFavorites();

  const genre = genreFromSlug(id || "");
  // Género inexistente (o sin películas): la página 404 existente.
  const movies = genre ? getMoviesOfGenre(genre) : [];
  if (!genre || movies.length === 0) return <NotFound />;

  const name = genreInSentence(genre);
  const count = movies.length;

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={`Películas cubanas de ${name}`}
        description={`${count} ${count === 1 ? "película cubana" : "películas cubanas"} de ${name}: ${count === 1 ? "ficha y vídeo" : "fichas y vídeos"} para ver online gratis en el archivo de cine cubano de CineCuba.`}
        url={`https://cine-cubano.com/genero/${id}`}
      />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-6 lg:px-12 pb-8">
          <Link
            to="/generos"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-gold transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a Géneros
          </Link>
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-4">Películas cubanas de {name}</h1>
          <p className="text-muted-foreground text-lg">
            {count} {count === 1 ? "película" : "películas"}
          </p>
        </div>

        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-10">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                isFavorite={isFavorite(movie.id)}
                onToggleFavorite={() => toggleFavorite(movie.id)}
              />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default GenreDetail;
