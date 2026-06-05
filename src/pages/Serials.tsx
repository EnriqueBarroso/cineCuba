import { Link } from 'react-router-dom';
import { Tv, Layers } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { serials } from '@/data/serials';
import { sagas } from '@/data/sagas';
import type { Movie } from '@/data/movies/types';
import type { Saga } from '@/data/sagas';

const StatusBadge = ({ estado }: { estado?: string }) => {
  if (!estado) return null;
  return (
    <span className={`inline-flex text-xs px-2 py-0.5 rounded-full font-medium border ${
      estado === 'completo'
        ? 'bg-green-500/15 text-green-400 border-green-500/30'
        : 'bg-gold/15 text-gold border-gold/30'
    }`}>
      {estado === 'completo' ? 'Completo' : 'Parcial'}
    </span>
  );
};

const SerialCard = ({ serial }: { serial: Movie }) => (
  <Link to={`/serial/${serial.id}`} className="group block">
    <article>
      <div className="relative aspect-[2/3] overflow-hidden bg-secondary">
        {serial.poster ? (
          <img
            src={serial.poster}
            alt={`Poster de ${serial.title}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-secondary">
            <Tv className="w-12 h-12 text-muted-foreground/20" />
          </div>
        )}
        <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors duration-300" />
        {serial.episodios && (
          <div className="absolute bottom-3 left-3">
            <span className="text-xs px-2 py-1 bg-black/70 backdrop-blur-sm text-white rounded font-medium">
              {serial.episodios} ep.
            </span>
          </div>
        )}
      </div>
      <div className="mt-3 space-y-2">
        <h3 className="font-serif text-lg font-medium text-foreground group-hover:text-gold transition-colors duration-300 line-clamp-1">
          {serial.title}
        </h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground font-light">
          <span>{serial.year}</span>
          <span className="text-hairline">•</span>
          <span className="truncate">{serial.director}</span>
        </div>
        <StatusBadge estado={serial.estado} />
      </div>
    </article>
  </Link>
);

const SagaSerialCard = ({ saga }: { saga: Saga }) => (
  <Link to={`/saga/${saga.id}`} className="group block">
    <article>
      <div className="relative aspect-[2/3] overflow-hidden bg-secondary">
        {saga.poster ? (
          <img
            src={saga.poster}
            alt={`Poster de ${saga.title}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-secondary">
            <Tv className="w-12 h-12 text-muted-foreground/20" />
          </div>
        )}
        <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors duration-300" />
        <div className="absolute bottom-3 left-3">
          <span className="flex items-center gap-1 text-xs px-2 py-1 bg-black/70 backdrop-blur-sm text-gold border border-gold/20 rounded font-medium">
            <Layers className="w-3 h-3" />
            {saga.episodios.length} ep.
          </span>
        </div>
      </div>
      <div className="mt-3 space-y-2">
        <h3 className="font-serif text-lg font-medium text-foreground group-hover:text-gold transition-colors duration-300 line-clamp-1">
          {saga.title}
        </h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground font-light">
          <span>{saga.anioInicio}</span>
          <span className="text-hairline">•</span>
          <span className="truncate">{saga.director}</span>
        </div>
        <span className={`inline-flex text-xs px-2 py-0.5 rounded-full font-medium border ${
          saga.estado === 'completo'
            ? 'bg-green-500/15 text-green-400 border-green-500/30'
            : 'bg-gold/15 text-gold border-gold/30'
        }`}>
          {saga.estado === 'completo' ? 'Completo' : 'Parcial'}
        </span>
      </div>
    </article>
  </Link>
);

const Serials = () => {
  const serialSagas = sagas.filter((s) => s.tipo === 'serial');
  const allSerials = [...serials, ...serialSagas];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Seriales"
        description="Catálogo de series y producciones seriadas del cine y la televisión cubana."
        url="https://cine-cubano.com/seriales"
      />
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="mb-12">
            <span className="text-xs font-sans uppercase tracking-[0.2em] text-gold">Televisión &amp; Cine</span>
            <h1 className="font-serif text-4xl md:text-5xl font-medium mt-2">Seriales</h1>
            <p className="text-muted-foreground mt-3 text-sm max-w-md leading-relaxed">
              Series y producciones seriadas del cine y la televisión cubana.
            </p>
          </div>

          {allSerials.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
              {serials.map((serial, i) => (
                <div key={serial.id} className="animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
                  <SerialCard serial={serial} />
                </div>
              ))}
              {serialSagas.map((saga, i) => (
                <div key={saga.id} className="animate-fade-in" style={{ animationDelay: `${(serials.length + i) * 60}ms` }}>
                  <SagaSerialCard saga={saga} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-32 text-center">
              <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center mb-6">
                <Tv className="w-8 h-8 text-gold/30" />
              </div>
              <h2 className="font-serif text-2xl font-medium mb-3">Próximamente</h2>
              <p className="text-muted-foreground text-sm max-w-sm">El catálogo de seriales está en preparación.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Serials;
