import { Link } from 'react-router-dom';
import { Film, Clock } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { shorts } from '@/data/shorts';
import type { Movie } from '@/data/movies/types';

const ShortCard = ({ short }: { short: Movie }) => (
  <Link to={`/corto/${short.id}`} className="group block">
    <article>
      <div className="relative aspect-[2/3] overflow-hidden bg-secondary">
        {short.poster ? (
          <img
            src={short.poster}
            alt={`Poster de ${short.title}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-secondary">
            <Film className="w-12 h-12 text-muted-foreground/20" />
          </div>
        )}
        <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors duration-300" />
        {short.duracionMinutos && (
          <div className="absolute bottom-3 left-3">
            <span className="flex items-center gap-1 text-xs px-2 py-1 bg-black/70 backdrop-blur-sm text-white rounded font-medium">
              <Clock className="w-3 h-3" />
              {short.duracionMinutos} min
            </span>
          </div>
        )}
      </div>
      <div className="mt-3 space-y-1">
        <h3 className="font-serif text-lg font-medium text-foreground group-hover:text-gold transition-colors duration-300 line-clamp-1">
          {short.title}
        </h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground font-light">
          <span>{short.year}</span>
          <span className="text-hairline">•</span>
          <span className="truncate">{short.director}</span>
        </div>
      </div>
    </article>
  </Link>
);

const Shorts = () => (
  <div className="min-h-screen bg-background">
    <SEO
      title="Cortos"
      description="Catálogo de cortometrajes del cine cubano."
      url="https://cine-cubano.com/cortos"
    />
    <Navbar />
    <main className="pt-32 pb-20">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="mb-12">
          <span className="text-xs font-sans uppercase tracking-[0.2em] text-gold">Formato Corto</span>
          <h1 className="font-serif text-4xl md:text-5xl font-medium mt-2">Cortos</h1>
          <p className="text-muted-foreground mt-3 text-sm max-w-md leading-relaxed">
            Cortometrajes del cine cubano. Obras breves, mirada profunda.
          </p>
        </div>

        {shorts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
            {shorts.map((short, i) => (
              <div key={short.id} className="animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
                <ShortCard short={short} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center mb-6">
              <Film className="w-8 h-8 text-gold/30" />
            </div>
            <h2 className="font-serif text-2xl font-medium mb-3">Próximamente</h2>
            <p className="text-muted-foreground text-sm max-w-sm">El catálogo de cortometrajes está en preparación.</p>
          </div>
        )}
      </div>
    </main>
    <Footer />
  </div>
);

export default Shorts;
