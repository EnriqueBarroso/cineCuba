interface SagaPosterPlaceholderProps {
  title: string;
  episodios: number;
  className?: string;
}

export const SagaPosterPlaceholder = ({
  title,
  episodios,
  className = "",
}: SagaPosterPlaceholderProps) => (
  <div
    className={`aspect-[2/3] w-full flex flex-col items-center justify-center bg-background border border-gold/20 relative overflow-hidden ${className}`}
  >
    {/* Fondo decorativo */}
    <div className="absolute inset-0 bg-gradient-to-b from-gold/5 via-transparent to-gold/10" />
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

    {/* Contenido */}
    <div className="relative z-10 flex flex-col items-center justify-center gap-4 px-4 text-center">
      <div className="w-10 h-10 rounded-full border border-gold/30 bg-gold/10 flex items-center justify-center">
        <span className="text-gold text-base font-serif font-bold">{episodios}</span>
      </div>
      <p className="font-serif text-gold font-medium leading-tight text-sm">
        {title}
      </p>
      <p className="text-muted-foreground text-xs uppercase tracking-widest">
        {episodios} episodios
      </p>
    </div>
  </div>
);
