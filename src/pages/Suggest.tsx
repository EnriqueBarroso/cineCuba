import { useState, useEffect, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Lightbulb, Send, Film, Tv, Clapperboard } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type TipoContenido = "pelicula" | "serial" | "corto";

const tipoOptions: { value: TipoContenido; label: string; icon: React.ReactNode }[] = [
  { value: "pelicula", label: "Película", icon: <Film className="w-4 h-4" /> },
  { value: "serial", label: "Serial / Serie", icon: <Tv className="w-4 h-4" /> },
  { value: "corto", label: "Cortometraje", icon: <Clapperboard className="w-4 h-4" /> },
];

const inputClass =
  "w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/20 transition-all";

const labelClass = "block text-xs uppercase tracking-wider text-gold/80 mb-2";

const Suggest = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState("");
  const [anio, setAnio] = useState("");
  const [tipo, setTipo] = useState<TipoContenido>("pelicula");
  const [director, setDirector] = useState("");
  const [enlace, setEnlace] = useState("");
  const [notas, setNotas] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      toast.error("Debes iniciar sesión para hacer sugerencias");
      navigate("/");
    }
  }, [user, loading, navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!titulo.trim()) {
      toast.error("El título es obligatorio");
      return;
    }

    setSubmitting(true);
    const { error } = await (supabase as any)
      .from("sugerencias")
      .insert({
        user_id: user.id,
        titulo: titulo.trim(),
        anio: anio ? parseInt(anio) : null,
        tipo,
        director: director.trim() || null,
        enlace_referencia: enlace.trim() || null,
        notas: notas.trim() || null,
      });

    setSubmitting(false);

    if (error) {
      toast.error("Error al enviar la sugerencia. Inténtalo de nuevo.");
      return;
    }

    toast.success("¡Sugerencia enviada! La revisaremos pronto.", {
      description: `"${titulo}" ha sido registrada correctamente.`,
    });
    setSubmitted(true);
  };

  const handleReset = () => {
    setTitulo("");
    setAnio("");
    setTipo("pelicula");
    setDirector("");
    setEnlace("");
    setNotas("");
    setSubmitted(false);
  };

  if (loading || !user) return null;

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Sugerir Título"
        description="Sugiere una película, serial o cortometraje cubano para añadir al catálogo de CineCuba."
        url="https://cine-cubano.com/sugerir"
      />
      <Navbar />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6 lg:px-12 max-w-2xl">

          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-gold" />
              </div>
              <span className="text-xs font-sans uppercase tracking-[0.2em] text-gold">Comunidad</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-medium">Sugerir título</h1>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed max-w-md">
              ¿Conoces una película, serial o corto cubano que debería estar en el catálogo?
              Compártelo y lo estudiaremos para incluirlo.
            </p>
          </div>

          {submitted ? (
            <div className="border border-white/10 rounded-sm p-10 text-center space-y-6 bg-white/3">
              <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto">
                <Lightbulb className="w-8 h-8 text-gold" />
              </div>
              <div>
                <h2 className="font-serif text-2xl font-medium text-white mb-2">¡Gracias por tu aporte!</h2>
                <p className="text-muted-foreground text-sm">Tu sugerencia ha sido recibida y será revisada por el equipo.</p>
              </div>
              <div className="flex gap-3 justify-center">
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  Enviar otra sugerencia
                </Button>
                <Button
                  onClick={() => navigate("/peliculas")}
                  className="bg-gold text-black hover:bg-gold/90 font-bold"
                >
                  Ver catálogo
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Título */}
              <div>
                <label className={labelClass}>Título *</label>
                <input
                  type="text"
                  placeholder="Título de la obra"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  required
                  className={inputClass}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {/* Año */}
                <div>
                  <label className={labelClass}>Año</label>
                  <input
                    type="number"
                    placeholder="Ej: 1968"
                    min={1900}
                    max={2100}
                    value={anio}
                    onChange={(e) => setAnio(e.target.value)}
                    className={inputClass}
                  />
                </div>

                {/* Director */}
                <div>
                  <label className={labelClass}>Director / Directora</label>
                  <input
                    type="text"
                    placeholder="Nombre del director"
                    value={director}
                    onChange={(e) => setDirector(e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Tipo */}
              <div>
                <label className={labelClass}>Tipo de contenido</label>
                <div className="grid grid-cols-3 gap-3">
                  {tipoOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setTipo(opt.value)}
                      className={`flex items-center justify-center gap-2 py-3 px-4 rounded-sm border text-sm font-medium transition-all duration-200 ${
                        tipo === opt.value
                          ? "border-gold/60 bg-gold/10 text-gold"
                          : "border-white/10 bg-white/3 text-muted-foreground hover:border-white/20 hover:text-white"
                      }`}
                    >
                      {opt.icon}
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Enlace */}
              <div>
                <label className={labelClass}>Enlace de referencia</label>
                <input
                  type="url"
                  placeholder="https://www.imdb.com/..."
                  value={enlace}
                  onChange={(e) => setEnlace(e.target.value)}
                  className={inputClass}
                />
                <p className="text-xs text-muted-foreground mt-1.5">
                  IMDB, Wikipedia, YouTube u otra fuente
                </p>
              </div>

              {/* Notas */}
              <div>
                <label className={labelClass}>Notas adicionales</label>
                <textarea
                  placeholder="Por qué crees que debería incluirse, datos relevantes..."
                  value={notas}
                  onChange={(e) => setNotas(e.target.value)}
                  rows={4}
                  className={`${inputClass} resize-none`}
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={submitting || !titulo.trim()}
                  className="w-full bg-gold text-black hover:bg-gold/90 font-bold h-12 text-base gap-2"
                >
                  {submitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      Enviando…
                    </span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Enviar sugerencia
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Suggest;
