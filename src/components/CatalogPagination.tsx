import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export const PER_PAGE_OPTIONS = [12, 24, 48] as const;

type PageItem = number | "ellipsis-start" | "ellipsis-end";

/** Números a mostrar: siempre primera y última, y la actual con una vecina a cada lado (1 … 4 5 6 … 12). */
export const getPageItems = (page: number, totalPages: number): PageItem[] => {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);

  const items: PageItem[] = [1];
  const start = Math.max(2, page - 1);
  const end = Math.min(totalPages - 1, page + 1);

  if (start > 2) items.push("ellipsis-start");
  for (let p = start; p <= end; p++) items.push(p);
  if (end < totalPages - 1) items.push("ellipsis-end");
  items.push(totalPages);
  return items;
};

interface CatalogPaginationProps {
  variant: "compact" | "full";
  page: number;
  totalPages: number;
  perPage: number;
  onPageChange: (page: number) => void;
  onPerPageChange: (perPage: number) => void;
  disabled?: boolean;
  className?: string;
}

const navButtonClass =
  "text-muted-foreground hover:text-foreground hover:bg-secondary disabled:opacity-30";

export const CatalogPagination = ({
  variant,
  page,
  totalPages,
  perPage,
  onPageChange,
  onPerPageChange,
  disabled = false,
  className,
}: CatalogPaginationProps) => {
  const isFirst = page <= 1;
  const isLast = page >= totalPages;

  const prev = (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => onPageChange(page - 1)}
      disabled={isFirst || disabled}
      aria-label="Página anterior"
      className={navButtonClass}
    >
      <ChevronLeft className="w-5 h-5" />
    </Button>
  );

  const next = (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => onPageChange(page + 1)}
      disabled={isLast || disabled}
      aria-label="Página siguiente"
      className={navButtonClass}
    >
      <ChevronRight className="w-5 h-5" />
    </Button>
  );

  if (variant === "compact") {
    return (
      <nav
        aria-label="Paginación superior"
        className={cn("flex flex-wrap items-center justify-between gap-3", className)}
      >
        <div className="flex items-center gap-1">
          {prev}
          <span className="px-2 text-sm text-muted-foreground tabular-nums">
            Página {page} de {totalPages}
          </span>
          {next}
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="hidden sm:inline">Por página</span>
          <Select value={String(perPage)} onValueChange={(v) => onPerPageChange(Number(v))}>
            <SelectTrigger className="h-9 w-[72px]" aria-label="Elementos por página">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PER_PAGE_OPTIONS.map((n) => (
                <SelectItem key={n} value={String(n)}>
                  {n}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </nav>
    );
  }

  return (
    <nav
      aria-label="Paginación"
      className={cn("flex items-center justify-center gap-2", className)}
    >
      {prev}

      <div className="flex items-center gap-1">
        {getPageItems(page, totalPages).map((item) =>
          typeof item === "number" ? (
            <Button
              key={item}
              variant="ghost"
              size="sm"
              onClick={() => onPageChange(item)}
              disabled={disabled}
              aria-current={item === page ? "page" : undefined}
              className={cn(
                "w-10 h-10",
                item === page
                  ? "bg-gold text-primary-foreground hover:bg-gold/90"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary",
              )}
            >
              {item}
            </Button>
          ) : (
            <span
              key={item}
              aria-hidden
              className="flex w-8 h-10 items-center justify-center text-muted-foreground"
            >
              <MoreHorizontal className="w-4 h-4" />
            </span>
          ),
        )}
      </div>

      {next}
    </nav>
  );
};
