import { HeroSection } from "@/components/HeroSection";
import { SEO } from "@/components/SEO";
import { Footer } from "@/components/Footer";
import { MovieRow } from "@/components/catalog/MovieRow"; // Importamos el nuevo componente
import { Link } from "react-router-dom";
import { movies, moviesByDecade } from "@/data/movies"; // Importamos los datos ya organizados

// Nº real de películas (ids únicos); entra en la meta description de la home.
const movieCount = new Set(movies.map((m) => m.id)).size;

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Películas cubanas online gratis | cine-cubano.com"
        exactTitle
        description={`${movieCount} películas cubanas para ver online gratis: clásicos, comedias y dramas, con fichas de directores y actores. Del cine de los 60 a hoy.`}
        url="https://cine-cubano.com/"
      />
      <main>
        {/* El Hero Principal (Slider grande) */}
        <HeroSection />

        <section className="container mx-auto px-6 lg:px-12 pt-10 md:pt-14 max-w-4xl">
          <h1 className="font-serif text-3xl md:text-4xl font-medium text-white mb-4">
            Películas cubanas online y gratis
          </h1>
          <p className="text-base md:text-lg text-gray-300 leading-relaxed">
            CineCuba es un archivo gratuito de cine cubano con películas, series y cortos, acompañados de fichas de sus
            directores y actores. Recorre el{" "}
            <Link to="/peliculas" className="text-gold hover:underline">catálogo de películas</Link>, conoce a los{" "}
            <Link to="/directores" className="text-gold hover:underline">directores</Link> y los{" "}
            <Link to="/actores" className="text-gold hover:underline">actores</Link>, o sigue los{" "}
            <Link to="/seriales" className="text-gold hover:underline">seriales</Link> y los{" "}
            <Link to="/cortos" className="text-gold hover:underline">cortos</Link>.
          </p>
        </section>
        
        {/* ZONA DE FILAS (CARROUSELES) */}
        {/* La separación con el Hero va aquí (un único sitio): pt-6 / md:pt-10.
            Sin margen negativo, para que las filas no tapen los controles del carrusel. */}
        <div className="relative pt-6 md:pt-10 pb-20 space-y-2 md:space-y-6">
          
          {/* Década de los 60 */}
          {moviesByDecade['1960s'] && moviesByDecade['1960s'].length > 0 && (
            <MovieRow 
              title="Los años 60: Cine Revolucionario" 
              movies={moviesByDecade['1960s']} 
            />
          )}

          {/* Década de los 70 */}
          {moviesByDecade['1970s'] && moviesByDecade['1970s'].length > 0 && (
            <MovieRow 
              title="Los 70: Historia y Conflicto" 
              movies={moviesByDecade['1970s']} 
            />
          )}

          {/* Década de los 80 */}
          {moviesByDecade['1980s'] && moviesByDecade['1980s'].length > 0 && (
            <MovieRow 
              title="Los 80: Clásicos Inolvidables" 
              movies={moviesByDecade['1980s']} 
            />
          )}

          {/* Década de los 90 */}
          {moviesByDecade['1990s'] && moviesByDecade['1990s'].length > 0 && (
            <MovieRow 
              title="Los 90: Período Especial" 
              movies={moviesByDecade['1990s']} 
            />
          )}

          {/* Década de los 2000 */}
          {moviesByDecade['2000s'] && moviesByDecade['2000s'].length > 0 && (
            <MovieRow 
              title="Años 2000: Nuevo Milenio" 
              movies={moviesByDecade['2000s']} 
            />
          )}
          
          {/* Década de los 2010 */}
          {moviesByDecade['2010s'] && moviesByDecade['2010s'].length > 0 && (
            <MovieRow 
              title="Cine Contemporáneo" 
              movies={moviesByDecade['2010s']} 
            />
          )}
          
          {/* Década de los 2020 (Por si añades nuevas) */}
          {moviesByDecade['2020s'] && moviesByDecade['2020s'].length > 0 && (
            <MovieRow 
              title="Estrenos Recientes" 
              movies={moviesByDecade['2020s']} 
            />
          )}

        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;