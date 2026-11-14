import { moviesByDecade } from "@/data/movies";
import type { Movie } from "@/data/movies";

export interface DecadeGroup {
  /** Clave de moviesByDecade, p. ej. "1980s". */
  key: string;
  /** Nombre visible: "Años 80", "Años 2000". */
  label: string;
  /** Id del bloque y de la ancla: "anos-80", "anos-2000". */
  id: string;
  movies: Movie[];
}

const decadeLabel = (startYear: number) => (startYear < 2000 ? `Años ${startYear % 100}` : `Años ${startYear}`);

/**
 * Décadas con al menos una película, de la más antigua a la más reciente, con sus películas ordenadas por año.
 * Reutiliza moviesByDecade (la misma agrupación que usa la portada): una década nueva en el catálogo aparece sola.
 */
export const getDecadeGroups = (): DecadeGroup[] =>
  Object.entries(moviesByDecade)
    .map(([key, list]) => ({ key, startYear: parseInt(key, 10), list }))
    .filter(({ startYear, list }) => Number.isFinite(startYear) && list.length > 0)
    .sort((a, b) => a.startYear - b.startYear)
    .map(({ key, startYear, list }) => {
      const label = decadeLabel(startYear);
      return {
        key,
        label,
        id: `anos-${startYear < 2000 ? startYear % 100 : startYear}`,
        movies: [...list].sort((a, b) => a.year - b.year || a.title.localeCompare(b.title)),
      };
    });
