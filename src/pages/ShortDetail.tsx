import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, Play, Calendar, Clock, Film, Award, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useFavorites } from "@/hooks/useFavorites";
import { getDirectorByName } from "@/data/directors";
import { SEO } from "@/components/SEO";
import { shorts } from "@/data/shorts";
import type { Movie } from "@/data/movies/types";

const ShortDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();

  const [short, setShort] = useState<Movie | undefined>(() =>
    shorts.find((s) => s.id === id)
  );

  useEffect(() => {
    if (!id) return;
    setShort(shorts.find((s) => s.id === id));
    window.scrollTo(0, 0);
  }, [id]);

  if (!short) return null;

  const favorite = isFavorite(short.id);
  const directorObj = getDirectorByName(short.director);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={short.title}
        description={short.synopsis}
        image={short.poster}
        url={`https://cine-cubano.com/corto/${short.id}`}
        type="video.movie"
      />
      <Navbar />

      {/* REPRODUCTOR */}
      <section className="relative pt-24 pb-10 bg-black/50">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto aspect-video bg-black relative rounded-xl overflow-hidden shadow-2xl border border-white/10">
            {short.videoUrl ? (
              <iframe
                src={short.videoUrl}
                title={short.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center">
                {short.backdrop && (
                  <img src={short.backdrop} alt="Fondo" className="absolute inset-0 w-full h-full object-cover opacity-30" />
                )}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-4 backdrop-blur-md">
                    <Film className="w-8 h-8 text-white/50" />
                  </div>
                  <p className="text-muted-foreground font-medium text-lg">Cortometraje no disponible aún</p>
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

          <div className="grid lg:grid-cols-[300px_1fr] gap-12">
            {/* POSTER */}
            <div className="hidden lg:block">
              <div className="aspect-[2/3] overflow-hidden bg-secondary sticky top-24 rounded-sm shadow-lg flex items-center justify-center">
                {short.poster ? (
                  <img src={short.poster} alt={`Poster de ${short.title}`} className="w-full h-full object-cover" />
                ) : (
                  <Film className="w-16 h-16 text-muted-foreground/20" />
                )}
              </div>
            </div>

            <div className="space-y-8">
              {/* CABECERA */}
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {short.genre.map((g) => (
                    <span key={g} className="text-xs uppercase tracking-wider px-3 py-1 border border-white/10 text-muted-foreground rounded-full">
                      {g}
                    </span>
                  ))}
                </div>
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-white">
                  {short.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /><span>{short.year}</span></div>
                  {short.duracionMinutos && (
                    <>
                      <span className="text-hairline">•</span>
                      <div className="flex items-center gap-2"><Clock className="w-4 h-4" /><span>{short.duracionMinutos} min</span></div>
                    </>
                  )}
                  <span className="text-hairline">•</span>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    {directorObj ? (
                      <Link to={`/director/${directorObj.id}`} className="hover:text-gold transition-colors underline decoration-gold/50 hover:decoration-gold">
                        {short.director}
                      </Link>
                    ) : (
                      <span>{short.director}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* BOTONES */}
              <div className="flex flex-wrap gap-4">
                {short.videoUrl ? (
                  <Button size="lg" className="bg-gold text-black hover:bg-gold/90 font-bold px-8 h-12 gap-2 text-base shadow-lg">
                    <Play className="w-5 h-5 fill-current" /> Ver Corto
                  </Button>
                ) : (
                  <Button disabled size="lg" className="bg-white/10 text-white/50 h-12 px-8 gap-2">
                    <Film className="w-5 h-5" /> Próximamente
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="lg"
                  className={`h-12 px-4 gap-2 text-base border-white/20 hover:bg-white/10 ${favorite ? 'text-gold border-gold/50 bg-gold/10' : 'text-white'}`}
                  onClick={() => toggleFavorite(short.id)}
                >
                  <Heart className={`w-5 h-5 ${favorite ? 'fill-gold' : ''}`} />
                </Button>
              </div>

              {/* SINOPSIS */}
              <div className="space-y-4 border-t border-white/10 pt-8">
                <h2 className="font-serif text-2xl text-white">Sinopsis</h2>
                <p className="text-gray-300 leading-relaxed text-lg font-light">{short.synopsis}</p>
              </div>

              {/* FICHA TÉCNICA */}
              <div className="grid sm:grid-cols-2 gap-6 border-t border-white/10 pt-8">
                <div className="space-y-1">
                  <span className="text-xs uppercase tracking-wider text-gold/80">Director</span>
                  <p className="text-white font-medium">
                    {directorObj ? (
                      <Link to={`/director/${directorObj.id}`} className="hover:text-gold transition-colors">
                        {short.director}
                      </Link>
                    ) : short.director}
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs uppercase tracking-wider text-gold/80">Año</span>
                  <p className="text-white font-medium">{short.year}</p>
                </div>
                {short.duracionMinutos && (
                  <div className="space-y-1">
                    <span className="text-xs uppercase tracking-wider text-gold/80">Duración</span>
                    <p className="text-white font-medium flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gold/60" />
                      {short.duracionMinutos} minutos
                    </p>
                  </div>
                )}
                <div className="space-y-1">
                  <span className="text-xs uppercase tracking-wider text-gold/80">Formato</span>
                  <p className="text-white font-medium">Cortometraje</p>
                </div>
              </div>

              {/* PREMIOS */}
              {short.awards && short.awards.length > 0 && (
                <div className="space-y-6 border-t border-white/10 pt-8">
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-gold" />
                    <h2 className="font-serif text-2xl text-white">Premios y Reconocimientos</h2>
                  </div>
                  <div className="grid gap-3">
                    {short.awards.map((award, i) => (
                      <div key={i} className="flex items-start gap-4 p-4 bg-white/5 border border-white/5 rounded-sm hover:border-gold/30 transition-colors">
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

              {/* ELENCO */}
              {short.cast && short.cast.length > 0 && (
                <div className="space-y-6 border-t border-white/10 pt-8">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-gold" />
                    <h2 className="font-serif text-2xl text-white">Elenco</h2>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {short.cast.map((member, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-white/5 border border-white/5 rounded-sm">
                        <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center shrink-0 text-gold font-serif font-bold">
                          {member.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-white truncate">{member.name}</p>
                          <p className="text-sm text-gray-400 truncate">{member.role}</p>
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

export default ShortDetail;
