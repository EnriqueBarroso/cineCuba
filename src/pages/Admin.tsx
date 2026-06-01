import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Check, X, Clock, RefreshCw, ExternalLink } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const ADMIN_EMAIL = "enrique.barroso84@gmail.com";

type Estado = "pendiente" | "aprobada" | "rechazada";

interface Sugerencia {
  id: string;
  titulo: string;
  anio: number | null;
  tipo: string | null;
  director: string | null;
  enlace_referencia: string | null;
  notas: string | null;
  estado: Estado;
  created_at: string;
  user_id: string;
}

const estadoBadge: Record<Estado, string> = {
  pendiente: "bg-gold/15 text-gold border-gold/30",
  aprobada: "bg-green-500/15 text-green-400 border-green-500/30",
  rechazada: "bg-red-500/15 text-red-400 border-red-500/30",
};

const estadoLabel: Record<Estado, string> = {
  pendiente: "Pendiente",
  aprobada: "Aprobada",
  rechazada: "Rechazada",
};

const tipoLabel: Record<string, string> = {
  pelicula: "Película",
  serial: "Serial",
  corto: "Corto",
};

const Admin = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const [sugerencias, setSugerencias] = useState<Sugerencia[]>([]);
  const [fetching, setFetching] = useState(true);
  const [filtro, setFiltro] = useState<Estado | "todas">("pendiente");
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && (!user || user.email !== ADMIN_EMAIL)) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  const fetchSugerencias = useCallback(async () => {
    setFetching(true);
    const { data, error } = await (supabase as any)
      .from("sugerencias")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) setSugerencias(data as Sugerencia[]);
    setFetching(false);
  }, []);

  useEffect(() => {
    if (user?.email === ADMIN_EMAIL) fetchSugerencias();
  }, [user, fetchSugerencias]);

  const updateEstado = async (id: string, nuevoEstado: Estado) => {
    setUpdating(id);
    const { error } = await (supabase as any)
      .from("sugerencias")
      .update({ estado: nuevoEstado })
      .eq("id", id);

    if (error) {
      toast.error("Error al actualizar el estado");
    } else {
      setSugerencias((prev) =>
        prev.map((s) => (s.id === id ? { ...s, estado: nuevoEstado } : s))
      );
      toast.success(
        nuevoEstado === "aprobada" ? "Sugerencia aprobada" : "Sugerencia rechazada"
      );
    }
    setUpdating(null);
  };

  const filtered = sugerencias.filter(
    (s) => filtro === "todas" || s.estado === filtro
  );

  const counts = {
    pendiente: sugerencias.filter((s) => s.estado === "pendiente").length,
    aprobada: sugerencias.filter((s) => s.estado === "aprobada").length,
    rechazada: sugerencias.filter((s) => s.estado === "rechazada").length,
    todas: sugerencias.length,
  };

  if (loading || !user) return null;

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Admin — Sugerencias" description="" url="https://cine-cubano.com/admin" />
      <Navbar />

      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6 lg:px-12">

          {/* Cabecera */}
          <div className="flex items-start justify-between mb-10 gap-4 flex-wrap">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-gold" />
                </div>
                <span className="text-xs font-sans uppercase tracking-[0.2em] text-gold">Panel Admin</span>
              </div>
              <h1 className="font-serif text-4xl font-medium">Sugerencias</h1>
              <p className="text-muted-foreground text-sm mt-2">
                {sugerencias.length} sugerencias en total · {counts.pendiente} pendientes
              </p>
            </div>
            <Button
              onClick={fetchSugerencias}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 gap-2"
              disabled={fetching}
            >
              <RefreshCw className={`w-4 h-4 ${fetching ? "animate-spin" : ""}`} />
              Actualizar
            </Button>
          </div>

          {/* Filtros */}
          <div className="flex gap-2 mb-8 flex-wrap">
            {(["pendiente", "aprobada", "rechazada", "todas"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFiltro(f)}
                className={`px-4 py-2 text-xs uppercase tracking-wider rounded-full border transition-all duration-200 ${
                  filtro === f
                    ? "border-gold/60 bg-gold/10 text-gold"
                    : "border-white/10 text-muted-foreground hover:border-white/20 hover:text-white"
                }`}
              >
                {f === "todas" ? "Todas" : estadoLabel[f]} ({counts[f]})
              </button>
            ))}
          </div>

          {/* Tabla */}
          {fetching ? (
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-24 bg-white/5 rounded-sm animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <Clock className="w-10 h-10 text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground text-sm">No hay sugerencias en esta categoría</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((s) => (
                <div
                  key={s.id}
                  className="border border-white/8 bg-white/3 rounded-sm p-5 hover:border-white/15 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">

                    {/* Info principal */}
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="font-serif text-lg text-white font-medium">
                          {s.titulo}
                        </h3>
                        {s.tipo && (
                          <span className="text-xs px-2 py-0.5 rounded-full border border-white/10 text-muted-foreground">
                            {tipoLabel[s.tipo] ?? s.tipo}
                          </span>
                        )}
                        <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${estadoBadge[s.estado]}`}>
                          {estadoLabel[s.estado]}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                        {s.anio && <span>{s.anio}</span>}
                        {s.director && <span>Dir. {s.director}</span>}
                        <span className="text-xs">
                          {new Date(s.created_at).toLocaleDateString("es-ES", {
                            day: "2-digit", month: "short", year: "numeric",
                          })}
                        </span>
                      </div>

                      {s.notas && (
                        <p className="text-sm text-muted-foreground italic border-l-2 border-gold/30 pl-3">
                          {s.notas}
                        </p>
                      )}

                      {s.enlace_referencia && (
                        <a
                          href={s.enlace_referencia}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-gold hover:text-gold/80 transition-colors underline decoration-gold/30"
                        >
                          <ExternalLink className="w-3 h-3" />
                          Ver referencia
                        </a>
                      )}
                    </div>

                    {/* Acciones */}
                    {s.estado === "pendiente" && (
                      <div className="flex gap-2 shrink-0">
                        <Button
                          size="sm"
                          onClick={() => updateEstado(s.id, "aprobada")}
                          disabled={updating === s.id}
                          className="bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/30 gap-1.5 h-8 px-3 text-xs font-medium"
                        >
                          <Check className="w-3.5 h-3.5" />
                          Aprobar
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateEstado(s.id, "rechazada")}
                          disabled={updating === s.id}
                          className="border-red-500/30 text-red-400 hover:bg-red-500/10 gap-1.5 h-8 px-3 text-xs font-medium"
                        >
                          <X className="w-3.5 h-3.5" />
                          Rechazar
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Admin;
