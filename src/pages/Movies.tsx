import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MovieRow } from "@/components/catalog/MovieRow";
import { moviesByDecade } from "@/data/movies/catalog"; // Importamos las listas ya ordenadas

const Movies = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-20"> {/* pt-24 para que la barra de menú no tape el título */}
        
        {/* Cabecera de la página */}
        <div className="container px-6 lg:px-12 mb-10 fade-in">
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">
            Catálogo Completo
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Explora nuestra colección de cine cubano organizada cronológicamente. 
            Desde los clásicos revolucionarios hasta el cine contemporáneo.
          </p>
        </div>

        {/* LISTAS POR DÉCADAS (El mismo sistema que en el Home) */}
        <div className="space-y-4 md:space-y-8">
          
          {/* 1960s */}
          {moviesByDecade['1960s']?.length > 0 && (
            <MovieRow 
              title="Años 60: Cine Revolucionario" 
              movies={moviesByDecade['1960s']} 
            />
          )}

          {/* 1970s */}
          {moviesByDecade['1970s']?.length > 0 && (
            <MovieRow 
              title="Años 70: Historia y Conflicto" 
              movies={moviesByDecade['1970s']} 
            />
          )}

          {/* 1980s */}
          {moviesByDecade['1980s']?.length > 0 && (
            <MovieRow 
              title="Años 80: La Época Dorada" 
              movies={moviesByDecade['1980s']} 
            />
          )}

          {/* 1990s */}
          {moviesByDecade['1990s']?.length > 0 && (
            <MovieRow 
              title="Años 90: Período Especial" 
              movies={moviesByDecade['1990s']} 
            />
          )}

          {/* 2000s */}
          {moviesByDecade['2000s']?.length > 0 && (
            <MovieRow 
              title="Años 2000: Nuevo Milenio" 
              movies={moviesByDecade['2000s']} 
            />
          )}

          {/* 2010s */}
          {moviesByDecade['2010s']?.length > 0 && (
            <MovieRow 
              title="Años 2010: Cine Contemporáneo" 
              movies={moviesByDecade['2010s']} 
            />
          )}

          {/* 2020s */}
          {moviesByDecade['2020s']?.length > 0 && (
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

export default Movies;