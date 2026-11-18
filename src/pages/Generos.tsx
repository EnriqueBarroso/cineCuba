import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { getGenreGroups } from "@/lib/genres";

// Datos estáticos: se calculan una sola vez (también en el prerender).
const groups = getGenreGroups();
const totalMovies = new Set(groups.flatMap((g) => g.movies.map((m) => m.id))).size;

const Generos = () => (
  <div className="min-h-screen bg-background">
    <SEO
      title="Películas cubanas por géneros | cine-cubano.com"
      exactTitle
      description={`${totalMovies} películas cubanas organizadas en ${groups.length} géneros: drama, comedia, romance, histórico y más. Elige un género y ve online gratis el mejor cine cubano.`}
      url="https://cine-cubano.com/generos"
    />

    <main className="pt-24">
      <div className="container mx-auto px-6 lg:px-12 pb-8">
        <h1 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-4">Películas cubanas por géneros</h1>
        <p className="text-muted-foreground max-w-3xl text-lg leading-relaxed">
          El cine cubano ordenado por géneros, del más numeroso al más escaso. Elige uno y recorre sus películas. Si prefieres un
          recorrido por años, visita las{" "}
          <Link to="/decadas" className="text-gold hover:underline">
            películas por décadas
          </Link>
          .
        </p>
      </div>

      <div className="container mx-auto px-6 lg:px-12 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
          {groups.map((g) => (
            <Link
              key={g.slug}
              to={`/genero/${g.slug}`}
              className="group block rounded-lg border border-hairline bg-card p-6 transition-colors hover:border-gold/50"
            >
              <h2 className="font-serif text-2xl text-foreground group-hover:text-gold transition-colors">{g.genre}</h2>
              <p className="text-sm text-muted-foreground mt-2">
                {g.movies.length} {g.movies.length === 1 ? "película" : "películas"}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>

    <Footer />
  </div>
);

export default Generos;
