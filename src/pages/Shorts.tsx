import { Link } from 'react-router-dom';
import { Film, Clock, Layers } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { SagaPosterPlaceholder } from '@/components/SagaPosterPlaceholder';
import { shorts } from '@/data/shorts';
import { sagas } from '@/data/sagas';
import type { Movie } from '@/data/movies/types';
import type { Saga } from '@/data/sagas';

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

const SagaCard = ({ saga }: { saga: Saga }) => (
  <Link to={`/saga/${saga.id}`} className="group block">
    <article>
      <div className="relative overflow-hidden">
        {saga.poster ? (
          <div className="aspect-[2/3] overflow-hidden bg-secondary">
            <img
              src={saga.poster}
              alt={`Poster de ${saga.title}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="transition-transform duration-500 group-hover:scale-[1.02]">
            <SagaPosterPlaceholder title={saga.title} episodios={saga.episodios.length} />
          </div>
        )}
        <div className="absolute inset-0 bg-background/0 group-hover:bg-background/10 transition-colors duration-300 pointer-events-none" />
        <div className="absolute bottom-3 right-3">
          <span className="flex items-center gap-1 text-xs px-2 py-1 bg-black/70 backdrop-blur-sm text-gold border border-gold/20 rounded font-medium">
            <Layers className="w-3 h-3" />
            {saga.episodios.length} ep.
          </span>
        </div>
      </div>
      <div className="mt-3 space-y-1">
        <h3 className="font-serif text-lg font-medium text-foreground group-hover:text-gold transition-colors duration-300 line-clamp-1">
          {saga.title}
        </h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground font-light">
          <span>{saga.anioInicio}–{saga.anioFin}</span>
          <span className="text-hairline">•</span>
          <span className="truncate">{saga.director}</span>
        </div>
      </div>
    </article>
  </Link>
);

const Shorts = () => (
  <div className="min-h-screen bg-background">
    <SEO
      title="Cortos"
      description="Cortometrajes y sagas del cine cubano. Obras breves, mirada profunda."
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

        {/* SAGAS */}
        {sagas.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <Layers className="w-4 h-4 text-gold" />
              <h2 className="font-serif text-xl text-white">Sagas</h2>
              <span className="text-xs text-muted-foreground">Series de cortometrajes</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
              {sagas.map((saga, i) => (
                <div key={saga.id} className="animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
                  <SagaCard saga={saga} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CORTOS INDIVIDUALES */}
        {shorts.length > 0 && (
          <div>
            {sagas.length > 0 && (
              <div className="flex items-center gap-3 mb-6">
                <Film className="w-4 h-4 text-gold" />
                <h2 className="font-serif text-xl text-white">Cortometrajes</h2>
              </div>
            )}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
              {shorts.map((short, i) => (
                <div key={short.id} className="animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
                  <ShortCard short={short} />
                </div>
              ))}
            </div>
          </div>
        )}

        {shorts.length === 0 && sagas.length === 0 && (
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
