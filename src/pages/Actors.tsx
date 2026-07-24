import { useState, useMemo, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, X } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { SEO } from "@/components/SEO";
import { actors, getActorByName, type Actor } from "@/data/actors";
import { movies } from "@/data/movies";
import { cn } from "@/lib/utils";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const stripAccents = (value: string) =>
  value.normalize("NFD").replace(/[̀-ͯ]/g, "");

const getLetter = (name: string) => stripAccents(name).charAt(0).toUpperCase();

// Datos estáticos: se calculan una sola vez cruzando actors.ts con catalog.ts
const sortedActors = [...actors].sort((a, b) =>
  stripAccents(a.name).localeCompare(stripAccents(b.name))
);

const movieCounts = new Map<string, number>(
  actors.map((actor) => {
    const count = movies.filter((m) =>
      m.cast?.some((c) => getActorByName(c.name)?.id === actor.id)
    ).length;
    return [actor.id, count];
  })
);

const groupsByLetter = new Map<string, Actor[]>();
for (const actor of sortedActors) {
  const letter = getLetter(actor.name);
  if (!groupsByLetter.has(letter)) groupsByLetter.set(letter, []);
  groupsByLetter.get(letter)!.push(actor);
}

const availableLetters = ALPHABET.filter((letter) => groupsByLetter.has(letter));

const ActorCard = ({ actor }: { actor: Actor }) => {
  const movieCount = movieCounts.get(actor.id) ?? 0;

  return (
    <Link to={`/actor/${actor.id}`} className="group block">
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
};

const Actors = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeLetter, setActiveLetter] = useState(availableLetters[0] ?? "");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const query = searchQuery.trim().toLowerCase();
  const isSearching = query.length > 0;

  const searchResults = useMemo(() => {
    if (!isSearching) return [];
    return sortedActors.filter((actor) => actor.name.toLowerCase().includes(query));
  }, [isSearching, query]);

  useEffect(() => {
    if (isSearching) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) return;
        const topmost = visible.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b
        );
        const letter = topmost.target.getAttribute("data-letter");
        if (letter) setActiveLetter(letter);
      },
      { rootMargin: "-140px 0px -60% 0px", threshold: 0 }
    );

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isSearching]);

  const scrollToLetter = (letter: string) => {
    sectionRefs.current[letter]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Actores"
        description="Fichas de los actores del cine cubano. Trayectorias y filmografías de las figuras más destacadas del cine de Cuba."
        url="https://cine-cubano.com/actores"
      />
      <Navbar />

      <div className="pt-32 pb-16">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6">
            <h1 className="font-serif text-4xl md:text-5xl font-bold">Actores</h1>

            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar actor..."
                className="pl-10 pr-9 bg-secondary border-hairline focus:border-gold transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {!isSearching && (
          <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-md border-y border-hairline py-3 mb-10">
            <div className="container mx-auto px-6 lg:px-12">
              <div className="flex flex-nowrap md:flex-wrap gap-1 overflow-x-auto md:justify-center">
                {ALPHABET.map((letter) => {
                  const hasActors = groupsByLetter.has(letter);
                  const isActive = activeLetter === letter;
                  return (
                    <button
                      key={letter}
                      disabled={!hasActors}
                      onClick={() => scrollToLetter(letter)}
                      className={cn(
                        "w-7 h-7 shrink-0 flex items-center justify-center text-sm font-medium rounded-sm transition-colors",
                        !hasActors && "text-muted-foreground/30 cursor-not-allowed",
                        hasActors && !isActive && "text-muted-foreground hover:text-gold cursor-pointer",
                        isActive && "text-gold bg-gold/10 font-bold"
                      )}
                    >
                      {letter}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        <div className="container mx-auto px-6 lg:px-12">
          {isSearching ? (
            searchResults.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
                {searchResults.map((actor) => (
                  <ActorCard key={actor.id} actor={actor} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-32 text-center">
                <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center mb-6">
                  <Search className="w-8 h-8 text-gold/30" />
                </div>
                <h2 className="font-serif text-2xl font-medium mb-3">Sin resultados</h2>
                <p className="text-muted-foreground text-sm max-w-sm">
                  No encontramos ningún actor que coincida con &ldquo;{searchQuery}&rdquo;.
                </p>
              </div>
            )
          ) : (
            <div className="space-y-16">
              {availableLetters.map((letter) => (
                <section
                  key={letter}
                  ref={(el) => (sectionRefs.current[letter] = el)}
                  data-letter={letter}
                  className="scroll-mt-36"
                >
                  <h2 className="font-serif text-4xl text-gold mb-6 border-b border-gold/20 pb-2">
                    {letter}
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
                    {groupsByLetter.get(letter)!.map((actor) => (
                      <ActorCard key={actor.id} actor={actor} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Actors;
