import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft, Heart, Play, Calendar, Layers, Award, Users,
  Clock, CheckCircle, Film,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { SagaPosterPlaceholder } from "@/components/SagaPosterPlaceholder";
import { useFavorites } from "@/hooks/useFavorites";
import { getDirectorByName } from "@/data/directors";
import { getActorByName } from "@/data/actors";
import { sagas } from "@/data/sagas";
import type { Saga, Episodio } from "@/data/sagas";

const SagaDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();

  const [saga, setSaga] = useState<Saga | undefined>(() =>
    sagas.find((s) => s.id === id)
  );

  const firstWithVideo = saga?.episodios.find((e) => e.videoUrl);
  const [activeEpisode, setActiveEpisode] = useState<Episodio | undefined>(firstWithVideo);

  useEffect(() => {
    if (!id) return;
    const found = sagas.find((s) => s.id === id);
    setSaga(found);
    setActiveEpisode(found?.episodios.find((e) => e.videoUrl));
    if (typeof window !== "undefined") window.scrollTo(0, 0);
  }, [id]);

  if (!saga) return null;

  const favorite = isFavorite(saga.id);
  const directorObj = getDirectorByName(saga.director);

  const handleSelectEpisode = (ep: Episodio) => {
    if (!ep.videoUrl) return;
    setActiveEpisode(ep);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={saga.title}
        description={saga.synopsis}
        image={saga.poster || undefined}
        url={`https://cine-cubano.com/saga/${saga.id}`}
        type="video.movie"
      />
      <Navbar />

      {/* REPRODUCTOR */}
      <section className="relative pt-24 pb-10 bg-black/50">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto aspect-video bg-black relative rounded-xl overflow-hidden shadow-2xl border border-white/10">
            {activeEpisode?.videoUrl ? (
              <>
                <iframe
                  key={activeEpisode.videoUrl}
                  src={activeEpisode.videoUrl}
                  title={activeEpisode.titulo}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
                  <p className="text-white text-sm font-medium">
                    {saga.episodios.findIndex((e) => e.id === activeEpisode.id) + 1}. {activeEpisode.titulo}
                    <span className="text-muted-foreground ml-2 text-xs">{activeEpisode.anio}</span>
                  </p>
                </div>
              </>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-4 backdrop-blur-md">
                    <Film className="w-8 h-8 text-white/50" />
                  </div>
                  <p className="text-muted-foreground font-medium text-lg">
                    Vídeo no disponible aún
                  </p>
                  <p className="text-muted-foreground/60 text-sm mt-1">
                    Selecciona un episodio con video disponible
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* INFO */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Volver</span>
          </button>

          <div className="grid lg:grid-cols-[280px_1fr] gap-12">
            {/* POSTER */}
            <div className="hidden lg:block">
              <div className="sticky top-24">
                {saga.poster ? (
                  <div className="aspect-[2/3] overflow-hidden rounded-sm shadow-lg">
                    <img
                      src={saga.poster}
                      alt={`Poster de ${saga.title}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="rounded-sm overflow-hidden shadow-lg">
                    <SagaPosterPlaceholder
                      title={saga.title}
                      episodios={saga.episodios.length}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-10">
              {/* CABECERA */}
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {saga.genre.map((g) => (
                    <span
                      key={g}
                      className="text-xs uppercase tracking-wider px-3 py-1 border border-white/10 text-muted-foreground rounded-full"
                    >
                      {g}
                    </span>
                  ))}
                  <span className="text-xs uppercase tracking-wider px-3 py-1 border border-gold/20 text-gold/70 rounded-full">
                    Saga
                  </span>
                </div>

                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-white">
                  {saga.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{saga.anioInicio}–{saga.anioFin}</span>
                  </div>
                  <span className="text-hairline">•</span>
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4" />
                    <span>{saga.episodios.length} episodios</span>
                  </div>
                  <span className="text-hairline">•</span>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    {directorObj ? (
                      <Link
                        to={`/director/${directorObj.id}`}
                        className="hover:text-gold transition-colors underline decoration-gold/50 hover:decoration-gold"
                      >
                        {saga.director}
                      </Link>
                    ) : (
                      <span>{saga.director}</span>
                    )}
                  </div>
                </div>

                {saga.relatedSeasons && saga.relatedSeasons.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    {saga.relatedSeasons.map((related) => (
                      <Link
                        key={related.id}
                        to={`/saga/${related.id}`}
                        className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 bg-gold/10 border border-gold/30 text-gold rounded-full font-medium hover:bg-gold/20 transition-colors"
                      >
                        <Layers className="w-3 h-3" />
                        Ver {related.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* BOTONES */}
              <div className="flex flex-wrap gap-4">
                {firstWithVideo ? (
                  <Button
                    size="lg"
                    onClick={() => handleSelectEpisode(firstWithVideo)}
                    className="bg-gold text-black hover:bg-gold/90 font-bold px-8 h-12 gap-2 text-base shadow-lg"
                  >
                    <Play className="w-5 h-5 fill-current" /> Ver primer episodio
                  </Button>
                ) : (
                  <Button
                    disabled
                    size="lg"
                    className="bg-white/10 text-white/50 h-12 px-8 gap-2"
                  >
                    <Film className="w-5 h-5" /> Próximamente
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="lg"
                  className={`h-12 px-4 gap-2 text-base border-white/20 hover:bg-white/10 ${
                    favorite ? "text-gold border-gold/50 bg-gold/10" : "text-white"
                  }`}
                  onClick={() => toggleFavorite(saga.id)}
                >
                  <Heart className={`w-5 h-5 ${favorite ? "fill-gold" : ""}`} />
                </Button>
              </div>

              {/* SINOPSIS */}
              <div className="space-y-4 border-t border-white/10 pt-8">
                <h2 className="font-serif text-2xl text-white">Sinopsis</h2>
                <p className="text-gray-300 leading-relaxed text-lg font-light">
                  {saga.synopsis}
                </p>
              </div>

              {/* MÉTRICAS */}
              <div className="grid sm:grid-cols-3 gap-4 border-t border-white/10 pt-8">
                <div className="p-4 bg-white/5 border border-white/5 rounded-sm">
                  <p className="text-xs uppercase tracking-wider text-gold/80 mb-1">Episodios</p>
                  <p className="text-white font-medium text-2xl font-serif">{saga.episodios.length}</p>
                </div>
                <div className="p-4 bg-white/5 border border-white/5 rounded-sm">
                  <p className="text-xs uppercase tracking-wider text-gold/80 mb-1">Período</p>
                  <p className="text-white font-medium text-2xl font-serif">
                    {saga.anioFin - saga.anioInicio + 1} <span className="text-base font-sans text-muted-foreground">años</span>
                  </p>
                </div>
                <div className="p-4 bg-white/5 border border-white/5 rounded-sm">
                  <p className="text-xs uppercase tracking-wider text-gold/80 mb-1">Estado</p>
                  <div className="flex items-center gap-2 mt-1">
                    <CheckCircle className={`w-4 h-4 ${saga.estado === "completo" ? "text-green-400" : "text-gold"}`} />
                    <span className={`font-medium capitalize ${saga.estado === "completo" ? "text-green-400" : "text-gold"}`}>
                      {saga.estado}
                    </span>
                  </div>
                </div>
              </div>

              {/* EPISODIOS */}
              <div className="space-y-4 border-t border-white/10 pt-8">
                <div className="flex items-center gap-3 mb-6">
                  <Layers className="w-5 h-5 text-gold" />
                  <h2 className="font-serif text-2xl text-white">Episodios</h2>
                </div>

                <div className="space-y-2">
                  {saga.episodios.map((ep, index) => {
                    const isActive = activeEpisode?.id === ep.id;
                    const hasVideo = Boolean(ep.videoUrl);

                    return (
                      <div
                        key={ep.id}
                        className={`group flex items-start gap-4 p-4 rounded-sm border transition-all duration-200 ${
                          isActive
                            ? "border-gold/40 bg-gold/8"
                            : "border-white/5 bg-white/3 hover:border-white/10 hover:bg-white/5"
                        }`}
                      >
                        {/* Número */}
                        <div
                          className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-serif border ${
                            isActive
                              ? "bg-gold/20 border-gold/40 text-gold"
                              : "bg-white/5 border-white/10 text-muted-foreground"
                          }`}
                        >
                          {index + 1}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className={`font-medium text-sm ${isActive ? "text-gold" : "text-white"}`}>
                              {ep.titulo}
                            </h3>
                            <span className="text-xs text-muted-foreground">{ep.anio}</span>
                            {ep.duracionMinutos && (
                              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Clock className="w-3 h-3" />
                                {ep.duracionMinutos} min
                              </span>
                            )}
                            {isActive && (
                              <span className="text-xs px-2 py-0.5 rounded-full bg-gold/15 text-gold border border-gold/30 font-medium">
                                Reproduciendo
                              </span>
                            )}
                          </div>
                          {ep.sinopsis && (
                            <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                              {ep.sinopsis}
                            </p>
                          )}
                        </div>

                        {/* Botón */}
                        <div className="shrink-0">
                          {hasVideo ? (
                            <button
                              onClick={() => handleSelectEpisode(ep)}
                              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-medium border transition-all duration-200 ${
                                isActive
                                  ? "bg-gold text-black border-gold cursor-default"
                                  : "border-white/20 text-muted-foreground hover:border-gold/40 hover:text-gold hover:bg-gold/5"
                              }`}
                            >
                              <Play className={`w-3 h-3 ${isActive ? "fill-black" : ""}`} />
                              {isActive ? "Viendo" : "Ver"}
                            </button>
                          ) : (
                            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-medium border border-white/5 text-muted-foreground/40 cursor-not-allowed">
                              <Film className="w-3 h-3" />
                              Pronto
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* FICHA TÉCNICA */}
              <div className="grid sm:grid-cols-2 gap-6 border-t border-white/10 pt-8">
                <div className="space-y-1">
                  <span className="text-xs uppercase tracking-wider text-gold/80">Director</span>
                  <p className="text-white font-medium">
                    {directorObj ? (
                      <Link to={`/director/${directorObj.id}`} className="hover:text-gold transition-colors">
                        {saga.director}
                      </Link>
                    ) : (
                      saga.director
                    )}
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs uppercase tracking-wider text-gold/80">Años</span>
                  <p className="text-white font-medium">{saga.anioInicio}–{saga.anioFin}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs uppercase tracking-wider text-gold/80">Género</span>
                  <p className="text-white font-medium">{saga.genre.join(", ")}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs uppercase tracking-wider text-gold/80">Formato</span>
                  <p className="text-white font-medium">Saga de cortometrajes</p>
                </div>
              </div>

              {/* ELENCO */}
              {saga.cast && saga.cast.length > 0 && (
                <div className="space-y-6 border-t border-white/10 pt-8">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-gold" />
                    <h2 className="font-serif text-2xl text-white">Elenco</h2>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {saga.cast.map((member, i) => {
                      const actorObj = getActorByName(member.name);
                      const inner = (
                        <>
                          <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center shrink-0 text-gold font-serif font-bold">
                            {member.name.charAt(0)}
                          </div>
                          <div className="min-w-0">
                            <p className={`font-medium truncate text-sm ${actorObj ? "text-gold" : "text-white"}`}>{member.name}</p>
                            <p className="text-xs text-gray-400 truncate">{member.role}</p>
                          </div>
                        </>
                      );
                      return actorObj ? (
                        <Link
                          key={i}
                          to={`/actor/${actorObj.id}`}
                          className="flex items-center gap-3 p-3 bg-white/5 border border-white/5 rounded-sm hover:border-gold/30 transition-colors"
                        >
                          {inner}
                        </Link>
                      ) : (
                        <div key={i} className="flex items-center gap-3 p-3 bg-white/5 border border-white/5 rounded-sm">
                          {inner}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* PREMIOS */}
              {saga.awards && saga.awards.length > 0 && (
                <div className="space-y-6 border-t border-white/10 pt-8">
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-gold" />
                    <h2 className="font-serif text-2xl text-white">Premios y Reconocimientos</h2>
                  </div>
                  <div className="grid gap-3">
                    {saga.awards.map((award, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-4 p-4 bg-white/5 border border-white/5 rounded-sm hover:border-gold/30 transition-colors"
                      >
                        <Award className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                        <div>
                          <p className="font-medium text-white">{award.name}</p>
                          <p className="text-sm text-gray-400">{award.category} ({award.year})</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SagaDetail;
