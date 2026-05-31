import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

const GitHubIcon = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const { signInWithGitHub } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleGitHub = async () => {
    setLoading(true);
    const { error } = await signInWithGitHub();
    if (error) {
      toast.error('Error al conectar con GitHub');
      setLoading(false);
    }
    // Si no hay error, el usuario es redirigido a GitHub — no reseteamos loading
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-card border border-hairline text-foreground max-w-sm p-0 overflow-hidden gap-0">
        {/* Cabecera */}
        <div className="px-8 pt-8 pb-6 text-center border-b border-hairline">
          <span className="font-serif text-2xl font-semibold tracking-tight">
            Cine<span className="text-gold">Cuba</span>
          </span>
          <DialogTitle className="font-serif text-lg font-medium text-foreground mt-4 mb-2">
            Accede a tu cuenta
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground font-light leading-relaxed">
            Guarda tus películas favoritas y accede a funciones exclusivas. Completamente gratuito.
          </DialogDescription>
        </div>

        {/* Botón GitHub */}
        <div className="px-8 py-8">
          <button
            onClick={handleGitHub}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-hairline bg-background hover:bg-white/5 hover:border-gold/40 text-foreground text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <GitHubIcon />
            {loading ? 'Conectando...' : 'Continuar con GitHub'}
          </button>
        </div>

        {/* Pie */}
        <div className="px-8 pb-8 text-center">
          <p className="text-xs text-muted-foreground font-light leading-relaxed">
            Al continuar aceptas nuestros{' '}
            <Link to="/terminos" onClick={onClose} className="text-gold/70 hover:text-gold transition-colors">
              términos de uso
            </Link>
            . La cuenta es opcional — el catálogo siempre es libre.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
