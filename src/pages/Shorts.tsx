import { Film } from 'lucide-react';
import { SEO } from '@/components/SEO';

const Shorts = () => (
  <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center px-6">
    <SEO title="Cortos" description="Cortometrajes del cine cubano." url="https://cine-cubano.com/cortos" />
    <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center mb-6">
      <Film className="w-8 h-8 text-gold/50" />
    </div>
    <span className="text-xs font-sans uppercase tracking-[0.2em] text-gold mb-3">Próximamente</span>
    <h1 className="font-serif text-4xl md:text-5xl font-medium text-foreground mb-4">Cortos</h1>
    <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
      El catálogo de cortometrajes del cine cubano está en preparación.
    </p>
  </div>
);

export default Shorts;
