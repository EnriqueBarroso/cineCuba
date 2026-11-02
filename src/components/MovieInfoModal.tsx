import type { RefObject } from "react";
import { Link } from "react-router-dom";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { directorLabel } from "@/lib/directors";
import type { Movie } from "@/data/movies";
import type { Saga } from "@/data/sagas";

/** Información que muestra el modal. Todo salvo id, título, enlace y año es opcional: si falta, no se pinta. */
export interface MovieInfo {
  id: string;
  title: string;
  year: string | number;
  href: string;
  poster?: string;
  synopsis?: string;
  duration?: string;
  episodes?: number;
  genre?: string[];
  director?: string;
  cast?: string[];
}

const MAX_CAST = 5;

export const movieToInfo = (movie: Movie): MovieInfo => ({
  id: movie.id,
  title: movie.title,
  year: movie.year,
  href: `/pelicula/${movie.id}`,
  poster: movie.poster,
  synopsis: movie.synopsis,
  duration: movie.duration,
  genre: movie.genre,
  director: directorLabel(movie.director),
  cast: movie.cast?.slice(0, MAX_CAST).map((c) => c.name),
});

export const sagaToInfo = (saga: Saga): MovieInfo => ({
  id: saga.id,
  title: saga.title,
  year: saga.anioFin && saga.anioFin !== saga.anioInicio ? `${saga.anioInicio}–${saga.anioFin}` : saga.anioInicio,
  href: `/saga/${saga.id}`,
  poster: saga.poster,
  synopsis: saga.synopsis,
  episodes: saga.episodios?.length,
  genre: saga.genre,
  director: saga.director,
  cast: saga.cast?.slice(0, MAX_CAST).map((c) => c.name),
});

interface MovieInfoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Se conserva aunque el modal se cierre, para que la animación de salida no pierda el contenido. */
  info: MovieInfo | null;
  /** Elemento que recibe el foco al cerrar (normalmente el botón que abrió el modal). */
  returnFocusRef?: RefObject<HTMLElement>;
}

const chipClass = "inline-flex items-center rounded-full border px-3 py-1 text-xs uppercase tracking-wider";
const closeIconClass =
  "absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold";

const footerClass = "shrink-0 border-t border-white/10 bg-zinc-900";

const InfoBody = ({
  info,
  Title,
  Description,
}: {
  info: MovieInfo;
  Title: typeof DialogTitle;
  Description: typeof DialogDescription;
}) => (
  <div className="flex flex-col gap-6 md:flex-row md:gap-8">
    {info.poster && (
      <img
        src={info.poster}
        alt={`Póster de ${info.title}`}
        className="mx-auto aspect-[2/3] w-36 shrink-0 self-start rounded-2xl object-cover shadow-xl shadow-black/50 md:mx-0 md:w-56"
      />
    )}

    <div className="min-w-0 flex-1 space-y-5">
      <div className="space-y-3 pr-10">
        <Title className="font-serif text-3xl font-medium leading-tight text-white md:text-4xl">{info.title}</Title>
        <div className="flex flex-wrap gap-2">
          <span className={`${chipClass} border-white/15 text-white/80`}>{info.year}</span>
          {info.duration?.trim() && <span className={`${chipClass} border-white/15 text-white/80`}>{info.duration}</span>}
          {info.episodes !== undefined && info.episodes > 0 && (
            <span className={`${chipClass} border-white/15 text-white/80`}>
              {info.episodes} {info.episodes === 1 ? "episodio" : "episodios"}
            </span>
          )}
          {info.genre?.map((g) => (
            <span key={g} className={`${chipClass} border-gold/40 text-gold`}>
              {g}
            </span>
          ))}
        </div>
      </div>

      {info.director?.trim() && (
        <p className="text-sm text-white/80">
          <span className="mr-2 text-xs font-medium uppercase tracking-widest text-gold">Dirección</span>
          {info.director}
        </p>
      )}

      {info.cast && info.cast.length > 0 && (
        <p className="text-sm text-white/80">
          <span className="mr-2 text-xs font-medium uppercase tracking-widest text-gold">Reparto</span>
          {info.cast.join(", ")}
        </p>
      )}

      {info.synopsis?.trim() && (
        <Description className="text-base font-light leading-relaxed text-gray-200">{info.synopsis}</Description>
      )}
    </div>
  </div>
);

/** Pie fijo, fuera del área con scroll: las acciones siempre están a la vista. */
const InfoFooter = ({
  info,
  Close,
  onNavigate,
  className,
}: {
  info: MovieInfo;
  Close: typeof DialogClose;
  onNavigate: () => void;
  className: string;
}) => (
  <div className={`${footerClass} ${className}`}>
    <div className="flex flex-wrap gap-3">
      <Button asChild size="lg" className="h-11 gap-2 bg-white px-8 text-base font-bold text-black hover:bg-gray-200">
        <Link to={info.href} onClick={onNavigate}>
          <Play className="h-5 w-5 fill-black" /> Ver Ahora
        </Link>
      </Button>
      <Close asChild>
        <Button
          variant="outline"
          size="lg"
          className="h-11 border-white/30 bg-white/10 px-8 text-base text-white hover:bg-white/20 hover:text-white"
        >
          Cerrar
        </Button>
      </Close>
    </div>
  </div>
);

export const MovieInfoModal = ({ open, onOpenChange, info, returnFocusRef }: MovieInfoModalProps) => {
  const isMobile = useIsMobile();

  if (!info) return null;

  const returnFocus = (e: Event) => {
    if (returnFocusRef?.current) {
      e.preventDefault();
      returnFocusRef.current.focus();
    }
  };
  const close = () => onOpenChange(false);

  // Móvil: Drawer inferior. El contenido hace scroll interno sin arrastrar el drawer.
  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent
          onCloseAutoFocus={returnFocus}
          className="max-h-[92vh] rounded-t-2xl border-white/10 bg-zinc-900 text-white"
        >
          <div className="relative flex min-h-0 flex-1 flex-col">
            <DrawerClose className={closeIconClass} aria-label="Cerrar">
              <X className="h-5 w-5" />
            </DrawerClose>
            <div data-vaul-no-drag className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-5">
              <InfoBody
                info={info}
                Title={DrawerTitle as typeof DialogTitle}
                Description={DrawerDescription as typeof DialogDescription}
              />
            </div>
            <InfoFooter
              info={info}
              Close={DrawerClose as typeof DialogClose}
              onNavigate={close}
              className="px-5 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]"
            />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  // Escritorio: Dialog centrado. Se compone con las piezas de shadcn para poder poner una X de 40 px.
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
          onCloseAutoFocus={returnFocus}
          className="fixed left-[50%] top-[50%] z-50 w-[calc(100%-2rem)] max-w-3xl translate-x-[-50%] translate-y-[-50%] overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 text-white shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]"
        >
          <div className="relative flex max-h-[85vh] flex-col">
            <DialogClose className={closeIconClass} aria-label="Cerrar">
              <X className="h-5 w-5" />
            </DialogClose>
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-8">
              <InfoBody info={info} Title={DialogTitle} Description={DialogDescription} />
            </div>
            <InfoFooter info={info} Close={DialogClose} onNavigate={close} className="px-8 py-4" />
          </div>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
};
