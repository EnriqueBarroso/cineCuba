import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { Footer } from "@/components/Footer";
import { MovieRow } from "@/components/catalog/MovieRow"; // Importamos el nuevo componente
import { moviesByDecade } from "@/data/movies"; // Importamos los datos ya organizados

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        {/* El Hero Principal (Slider grande) */}
        <HeroSection />
        
        {/* ZONA DE FILAS (CARROUSELES) */}
        {/* Usamos -mt-16 o -mt-20 y z-10 para que la primera fila se monte 
            un poquito encima del Hero, dando un efecto muy profesional */}
        <div className="relative z-10 -mt-16 pb-20 space-y-2 md:space-y-6">
          
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