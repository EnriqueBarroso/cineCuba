import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import MovieGrid from "@/components/MovieGrid";
import { SEO } from "@/components/SEO";

const Movies = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Catálogo Completo"
        description="Explora el catálogo completo del cine cubano. Filtra por género, año o director y descubre más de cien películas de la cinematografía de Cuba."
        url="https://cine-cubano.com/peliculas"
      />
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container px-6 lg:px-12 mb-8 fade-in">
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">
            Catálogo Completo
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Explora nuestra colección. Utiliza los filtros para encontrar cine cubano por género, año o director.
          </p>
        </div>

        {/* Aquí renderizamos el Grid con filtros */}
        <MovieGrid />
      </main>

      <Footer />
    </div>
  );
};

export default Movies;