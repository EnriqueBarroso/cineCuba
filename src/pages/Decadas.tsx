import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { MovieCard } from "@/components/MovieGrid";
import { useFavorites } from "@/hooks/useFavorites";
import { useScrollToHash } from "@/hooks/useScrollToHash";
import { getDecadeGroups } from "@/lib/decades";

// Datos estáticos: se calculan una sola vez.
const groups = getDecadeGroups();
const totalMovies = groups.reduce((sum, g) => sum + g.movies.length, 0);

const Decadas = () => {
  const { isFavorite, toggleFavorite } = useFavorites();

  // Si la URL trae #anos-80, vuelve a su bloque tras el scroll al inicio de ScrollToTop.
  useScrollToHash();

  const scrollToDecade = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Películas cubanas por décadas | cine-cubano.com"
        exactTitle
        description={`${totalMovies} películas cubanas agrupadas por décadas, de los años 60 a hoy: elige una época y ve online gratis los clásicos del cine cubano.`}
        url="https://cine-cubano.com/decadas"
      />

      <main className="pt-24">
        <div className="container mx-auto px-6 lg:px-12 pb-8">
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-4">Películas cubanas por décadas</h1>
          <p className="text-muted-foreground max-w-3xl text-lg leading-relaxed">
            El cine cubano ordenado por décadas, de la más antigua a la más reciente. Elige una y recorre sus películas año a año. Si
            prefieres un recorrido por períodos históricos, visita las{" "}
            <Link to="/epocas" className="text-gold hover:underline">
              épocas del cine cubano
            </Link>
            .
          </p>
        </div>

        {/* Chips de décadas: fijos bajo el navbar (h-16). En móvil, una sola fila con scroll horizontal. */}
        <nav
          aria-label="Décadas"
          className="sticky top-16 z-30 bg-background/95 backdrop-blur-md border-y border-hairline py-2 md:py-3 mb-10"
        >
          <div
            className="flex flex-nowrap gap-2 overflow-x-auto px-6 snap-x snap-proximity scroll-px-6 md:flex-wrap md:justify-center md:overflow-visible lg:px-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {groups.map((g) => (
              <button
                key={g.id}
                type="button"
                onClick={() => scrollToDecade(g.id)}
                className="snap-start shrink-0 rounded-full border border-white/10 bg-zinc-800/60 px-4 py-1.5 text-sm text-gray-200 transition-colors hover:border-gold/50 hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                {g.label}
              </button>
            ))}
          </div>
        </nav>

        <div className="container mx-auto px-6 lg:px-12 pb-20 space-y-16">
          {groups.map((g) => (
            <section key={g.id} id={g.id} className="scroll-mt-32">
              <h2 className="font-serif text-3xl md:text-4xl text-gold mb-6 border-b border-gold/20 pb-2">
                {g.label}
                <span className="ml-3 text-sm font-sans text-gold/60 font-normal tracking-widest uppercase">
                  {g.movies.length} {g.movies.length === 1 ? "película" : "películas"}
                </span>
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-10">
                {g.movies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    isFavorite={isFavorite(movie.id)}
                    onToggleFavorite={() => toggleFavorite(movie.id)}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Decadas;
