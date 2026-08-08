import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Award, MapPin, Heart, Users, Layers } from "lucide-react";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { getActorById, getActorByName } from "@/data/actors";
import { movies, Movie } from "@/data/movies";
import { sagas, Saga } from "@/data/sagas";
import { SagaPosterPlaceholder } from "@/components/SagaPosterPlaceholder";
import { useFavorites } from "@/hooks/useFavorites";

const ActorInitials = ({ name }: { name: string }) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="w-full h-full bg-gradient-to-br from-gold/20 to-background flex items-center justify-center">
      <span className="font-serif text-6xl md:text-8xl text-gold/60">{initials}</span>
    </div>
  );
};

const ActorFilmCard = ({
  movie,
  role,
  isFavorite,
  onToggleFavorite,
}: {
  movie: Movie;
  role: string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}) => (
  <Link to={`/pelicula/${movie.id}`} className="group block">
    <article>
      <div className="relative aspect-[2/3] overflow-hidden bg-secondary rounded-sm">
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
            onToggleFavorite();
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-background/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-background/80"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFavorite ? "fill-gold text-gold" : "text-foreground hover:text-gold"
            }`}
          />
        </button>
      </div>

      <div className="mt-4 space-y-1">
        <h3 className="font-serif text-lg font-medium text-foreground group-hover:text-gold transition-colors duration-300 line-clamp-1">
          {movie.title}
        </h3>
        <p className="text-sm text-muted-foreground">{movie.year}</p>
        {role && (
          <p className="text-xs text-gold/70 truncate">como {role}</p>
        )}
      </div>
    </article>
  </Link>
);

const ActorSagaCard = ({ saga, role }: { saga: Saga; role: string }) => (
  <Link to={`/saga/${saga.id}`} className="group block">
    <article>
      <div className="relative aspect-[2/3] overflow-hidden bg-secondary rounded-sm">
        {saga.poster ? (
          <img
            src={saga.poster}
            alt={`Poster de ${saga.title}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <SagaPosterPlaceholder title={saga.title} episodios={saga.episodios.length} />
        )}
        <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors duration-300" />
        <div className="absolute bottom-3 right-3">
          <span className="flex items-center gap-1 text-xs px-2 py-1 bg-black/70 backdrop-blur-sm text-gold border border-gold/20 rounded font-medium">
            <Layers className="w-3 h-3" />
            {saga.episodios.length} ep.
          </span>
        </div>
      </div>

      <div className="mt-4 space-y-1">
        <h3 className="font-serif text-lg font-medium text-foreground group-hover:text-gold transition-colors duration-300 line-clamp-1">
          {saga.title}
        </h3>
        <p className="text-sm text-muted-foreground">{saga.anioInicio}–{saga.anioFin}</p>
        {role && <p className="text-xs text-gold/70 truncate">como {role}</p>}
      </div>
    </article>
  </Link>
);

const ActorDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [photoError, setPhotoError] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setPhotoError(false);
  }, [id]);

  const actor = id ? getActorById(id) : undefined;

  const lifeYears = actor?.birthYear
    ? actor.deathYear
      ? `${actor.birthYear} - ${actor.deathYear}`
      : `n. ${actor.birthYear}`
    : undefined;

  const actorMovies = actor
    ? movies
        .filter((m) =>
          m.cast?.some((c) => getActorByName(c.name)?.id === actor.id)
        )
        .map((m) => ({
          movie: m,
          role: m.cast?.find((c) => getActorByName(c.name)?.id === actor.id)?.role ?? "",
        }))
        .sort((a, b) => a.movie.year - b.movie.year)
    : [];

  const actorSagas = actor
    ? sagas
        .filter((s) =>
          s.cast?.some((c) => getActorByName(c.name)?.id === actor.id)
        )
        .map((s) => ({
          saga: s,
          role: s.cast?.find((c) => getActorByName(c.name)?.id === actor.id)?.role ?? "",
        }))
        .sort((a, b) => a.saga.anioInicio - b.saga.anioInicio)
    : [];

  if (!actor) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-6 lg:px-12 py-32 text-center">
          <h1 className="font-serif text-3xl mb-4">Actor no encontrado</h1>
          <Link to="/actores" className="text-gold hover:underline">
            Volver a actores
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={actor.name}
        description={`Ficha y filmografía de ${actor.name}. ${actorMovies.length} ${actorMovies.length === 1 ? "película" : "películas"} en el catálogo de CineCuba.${actor.biography ? " " + actor.biography.slice(0, 100) + "..." : ""}`}
        image={actor.photo}
        url={`https://cine-cubano.com/actor/${actor.id}`}
      />

      {/* Schema.org Person */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: actor.name,
            nationality: actor.nationality,
            ...(actor.birthYear && { birthDate: String(actor.birthYear) }),
            ...(actor.deathYear && { deathDate: String(actor.deathYear) }),
            ...(actor.biography && { description: actor.biography }),
            ...(actor.photo && { image: actor.photo }),
          }),
        }}
      />

      <section className="pt-32 pb-16 lg:pb-24 animate-fade-in">
        <div className="container mx-auto px-6 lg:px-12">
          <Link
            to="/actores"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-12"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Volver a actores</span>
          </Link>

          <div className="grid lg:grid-cols-[320px_1fr] gap-12 lg:gap-16">
            {/* Foto sticky */}
            <div className="mx-auto lg:mx-0 w-full max-w-[320px] lg:sticky lg:top-32 self-start">
              <div className="aspect-[3/4] overflow-hidden bg-secondary border border-hairline shadow-xl">
                {actor.photo && !photoError ? (
                  <img
                    src={actor.photo}
                    alt={actor.name}
                    onError={() => setPhotoError(true)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ActorInitials name={actor.name} />
                )}
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <span className="text-xs uppercase tracking-[0.2em] text-gold">
                  Actor
                </span>
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium">
                  {actor.name}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{actor.nationality}</span>
                  </div>
                  {lifeYears && (
                    <>
                      <span className="text-hairline">•</span>
                      <span>{lifeYears}</span>
                    </>
                  )}
                  {actor.birthPlace && (
                    <>
                      <span className="text-hairline">•</span>
                      <span>{actor.birthPlace}</span>
                    </>
                  )}
                  <span className="text-hairline">•</span>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>
                      {actorMovies.length}{" "}
                      {actorMovies.length === 1 ? "película" : "películas"} en catálogo
                    </span>
                  </div>
                  {actorSagas.length > 0 && (
                    <>
                      <span className="text-hairline">•</span>
                      <div className="flex items-center gap-2">
                        <Layers className="w-4 h-4" />
                        <span>
                          {actorSagas.length}{" "}
                          {actorSagas.length === 1 ? "saga" : "sagas"} en catálogo
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {actor.biography && (
                <div className="space-y-4 border-t border-hairline pt-8">
                  <h2 className="font-serif text-2xl">Biografía</h2>
                  <p className="text-muted-foreground leading-relaxed text-lg font-light whitespace-pre-line">
                    {actor.biography}
                  </p>
                </div>
              )}

              {actor.awards.length > 0 && (
                <div className="space-y-4 border-t border-hairline pt-8">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-gold" />
                    <h2 className="font-serif text-2xl">Premios y Reconocimientos</h2>
                  </div>
                  <ul className="space-y-2">
                    {actor.awards.map((award, index) => (
                      <li
                        key={index}
                        className="text-muted-foreground pl-4 border-l-2 border-gold/30"
                      >
                        {award}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {actorMovies.length > 0 && (
        <section className="py-16 lg:py-24 border-t border-hairline bg-secondary/5">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="space-y-2 mb-12">
              <span className="text-xs font-sans uppercase tracking-[0.2em] text-gold">
                En nuestro catálogo
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-medium">
                Filmografía en CineCuba
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
              {actorMovies.map(({ movie, role }) => (
                <ActorFilmCard
                  key={movie.id}
                  movie={movie}
                  role={role}
                  isFavorite={isFavorite(movie.id)}
                  onToggleFavorite={() => toggleFavorite(movie.id)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {actorSagas.length > 0 && (
        <section className="py-16 lg:py-24 border-t border-hairline">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="space-y-2 mb-12">
              <span className="text-xs font-sans uppercase tracking-[0.2em] text-gold">
                Series de cortometrajes
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-medium">
                Sagas en CineCuba
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
              {actorSagas.map(({ saga, role }) => (
                <ActorSagaCard key={saga.id} saga={saga} role={role} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default ActorDetail;
