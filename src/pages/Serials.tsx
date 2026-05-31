import { Tv } from 'lucide-react';
import { SEO } from '@/components/SEO';

const Serials = () => (
  <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center px-6">
    <SEO title="Seriales" description="Seriales del cine y la televisión cubana." url="https://cine-cubano.com/seriales" />
    <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center mb-6">
      <Tv className="w-8 h-8 text-gold/50" />
    </div>
    <span className="text-xs font-sans uppercase tracking-[0.2em] text-gold mb-3">Próximamente</span>
    <h1 className="font-serif text-4xl md:text-5xl font-medium text-foreground mb-4">Seriales</h1>
    <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
      El catálogo de seriales del cine y la televisión cubana está en preparación.
    </p>
  </div>
);

export default Serials;
