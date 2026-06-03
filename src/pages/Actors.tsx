import { useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { SEO } from "@/components/SEO";
import { actors } from "@/data/actors";
import { movies } from "@/data/movies";

const Actors = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = actors.filter((actor) =>
    actor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Actores"
        description="Fichas de los actores del cine cubano. Trayectorias y filmografías de las figuras más destacadas del cine de Cuba."
        url="https://cine-cubano.com/actores"
      />
      <Navbar />

      <div className="container mx-auto px-6 lg:px-12 pt-32 pb-16">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <h1 className="font-serif text-4xl md:text-5xl font-bold">Actores</h1>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar actor..."
              className="pl-10 bg-secondary border-hairline focus:border-gold transition-colors"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
          {filtered.map((actor) => {
            const movieCount = movies.filter((m) =>
              m.cast?.some(
                (c) => c.name.toLowerCase() === actor.name.toLowerCase()
              )
            ).length;

            return (
              <Link key={actor.id} to={`/actor/${actor.id}`} className="group block">
                <article className="space-y-4">
                  <div className="aspect-[3/4] overflow-hidden bg-secondary border border-hairline relative">
                    {actor.photo ? (
                      <img
                        src={actor.photo}
                        alt={actor.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gold/20 to-background flex items-center justify-center">
                        <span className="font-serif text-6xl text-gold/60">
                          {actor.name.charAt(0)}
                        </span>
                      </div>
                    )}

                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white border border-white/50 px-4 py-2 text-sm tracking-widest uppercase backdrop-blur-sm">
                        Ver Perfil
                      </span>
                    </div>
                  </div>

                  <div className="text-center">
                    <h3 className="font-serif text-xl font-medium group-hover:text-gold transition-colors">
                      {actor.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {movieCount} {movieCount === 1 ? "Película" : "Películas"}
                    </p>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Actors;
