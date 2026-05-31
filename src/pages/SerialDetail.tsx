import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, Play, Calendar, Film, Award, Users, Tv, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useFavorites } from "@/hooks/useFavorites";
import { getDirectorByName } from "@/data/directors";
import { SEO } from "@/components/SEO";
import { serials } from "@/data/serials";
import type { Movie } from "@/data/movies/types";

const SerialDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();

  const [serial, setSerial] = useState<Movie | undefined>(() =>
    serials.find((s) => s.id === id)
  );

  useEffect(() => {
    if (!id) return;
    setSerial(serials.find((s) => s.id === id));
    window.scrollTo(0, 0);
  }, [id]);

  if (!serial) return null;

  const favorite = isFavorite(serial.id);
  const directorObj = getDirectorByName(serial.director);

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={serial.title}
        description={serial.synopsis}
        image={serial.poster}
        url={`https://cine-cubano.com/serial/${serial.id}`}
        type="video.movie"
      />
      <Navbar />

      {/* REPRODUCTOR */}
      <section className="relative pt-24 pb-10 bg-black/50">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto aspect-video bg-black relative rounded-xl overflow-hidden shadow-2xl border border-white/10">
            {serial.videoUrl ? (
              <iframe
                src={serial.videoUrl}
                title={serial.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center">
                {serial.backdrop && (
                  <img src={serial.backdrop} alt="Fondo" className="absolute inset-0 w-full h-full object-cover opacity-30" />
                )}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-4 backdrop-blur-md">
                    <Tv className="w-8 h-8 text-white/50" />
                  </div>
                  <p className="text-muted-foreground font-medium text-lg">Vídeo no disponible aún</p>
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
                {serial.poster ? (
                  <img src={serial.poster} alt={`Poster de ${serial.title}`} className="w-full h-full object-cover" />
                ) : (
                  <Tv className="w-16 h-16 text-muted-foreground/20" />
                )}
              </div>
            </div>

            <div className="space-y-8">
              {/* CABECERA */}
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {serial.genre.map((g) => (
                    <span key={g} className="text-xs uppercase tracking-wider px-3 py-1 border border-white/10 text-muted-foreground rounded-full">
                      {g}
                    </span>
                  ))}
                </div>
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-white">
                  {serial.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /><span>{serial.year}</span></div>
                  {serial.episodios && (
                    <>
                      <span className="text-hairline">•</span>
                      <div className="flex items-center gap-2"><Tv className="w-4 h-4" /><span>{serial.episodios} episodios</span></div>
                    </>
                  )}
                  <span className="text-hairline">•</span>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    {directorObj ? (
                      <Link to={`/director/${directorObj.id}`} className="hover:text-gold transition-colors underline decoration-gold/50 hover:decoration-gold">
                        {serial.director}
                      </Link>
                    ) : (
                      <span>{serial.director}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* BOTONES */}
              <div className="flex flex-wrap gap-4">
                {serial.videoUrl ? (
                  <Button size="lg" className="bg-gold text-black hover:bg-gold/90 font-bold px-8 h-12 gap-2 text-base shadow-lg">
                    <Play className="w-5 h-5 fill-current" /> Ver Serial
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
                  onClick={() => toggleFavorite(serial.id)}
                >
                  <Heart className={`w-5 h-5 ${favorite ? 'fill-gold' : ''}`} />
                </Button>
              </div>

              {/* SINOPSIS */}
              <div className="space-y-4 border-t border-white/10 pt-8">
                <h2 className="font-serif text-2xl text-white">Sinopsis</h2>
                <p className="text-gray-300 leading-relaxed text-lg font-light">{serial.synopsis}</p>
              </div>

              {/* TEMPORADAS Y EPISODIOS */}
              <div className="space-y-4 border-t border-white/10 pt-8">
                <div className="flex items-center gap-3">
                  <Tv className="w-5 h-5 text-gold" />
                  <h2 className="font-serif text-2xl text-white">Temporadas y Episodios</h2>
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  {serial.temporadas && (
                    <div className="p-4 bg-white/5 border border-white/5 rounded-sm">
                      <p className="text-xs uppercase tracking-wider text-gold/80 mb-1">Temporadas</p>
                      <p className="text-white font-medium text-2xl font-serif">{serial.temporadas}</p>
                    </div>
                  )}
                  {serial.episodios && (
                    <div className="p-4 bg-white/5 border border-white/5 rounded-sm">
                      <p className="text-xs uppercase tracking-wider text-gold/80 mb-1">Episodios</p>
                      <p className="text-white font-medium text-2xl font-serif">{serial.episodios}</p>
                    </div>
                  )}
                  {serial.estado && (
                    <div className="p-4 bg-white/5 border border-white/5 rounded-sm">
                      <p className="text-xs uppercase tracking-wider text-gold/80 mb-1">Estado</p>
                      <div className="flex items-center gap-2 mt-1">
                        <CheckCircle className={`w-4 h-4 ${serial.estado === 'completo' ? 'text-green-400' : 'text-gold'}`} />
                        <span className={`font-medium capitalize ${serial.estado === 'completo' ? 'text-green-400' : 'text-gold'}`}>
                          {serial.estado}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* FICHA TÉCNICA */}
              <div className="grid sm:grid-cols-2 gap-6 border-t border-white/10 pt-8">
                <div className="space-y-1">
                  <span className="text-xs uppercase tracking-wider text-gold/80">Director</span>
                  <p className="text-white font-medium">
                    {directorObj ? (
                      <Link to={`/director/${directorObj.id}`} className="hover:text-gold transition-colors">
                        {serial.director}
                      </Link>
                    ) : serial.director}
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs uppercase tracking-wider text-gold/80">Año</span>
                  <p className="text-white font-medium">{serial.year}</p>
                </div>
              </div>

              {/* PREMIOS */}
              {serial.awards && serial.awards.length > 0 && (
                <div className="space-y-6 border-t border-white/10 pt-8">
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-gold" />
                    <h2 className="font-serif text-2xl text-white">Premios y Reconocimientos</h2>
                  </div>
                  <div className="grid gap-3">
                    {serial.awards.map((award, i) => (
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
              {serial.cast && serial.cast.length > 0 && (
                <div className="space-y-6 border-t border-white/10 pt-8">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-gold" />
                    <h2 className="font-serif text-2xl text-white">Elenco</h2>
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {serial.cast.map((member, i) => (
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

export default SerialDetail;
