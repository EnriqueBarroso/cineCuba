/** Campo `director` de una película: un nombre, o varios para obras colectivas. */
export type DirectorField = string | string[];

export const directorList = (d: DirectorField): string[] => (Array.isArray(d) ? d : [d]);

/** Nombres unidos con coma, para tarjetas, alt, búsquedas y recuentos. */
export const directorLabel = (d: DirectorField): string => directorList(d).join(", ");

/** ¿Figura `name` (coincidencia parcial, sin distinguir mayúsculas) entre los directores? */
export const hasDirector = (d: DirectorField, name: string): boolean =>
  directorLabel(d).toLowerCase().includes(name.toLowerCase());

/** ¿Comparten al menos un director? */
export const shareDirector = (a: DirectorField, b: DirectorField): boolean => {
  const other = directorList(b);
  return directorList(a).some((n) => other.includes(n));
};

/** Películas (no sagas ni seriales) de una lista cuyo campo `director` incluye a `name`. La usan la ficha y el listado de directores. */
export const moviesOfDirector = <T extends { director: DirectorField }>(list: T[], name: string): T[] =>
  list.filter((m) => hasDirector(m.director, name));

/** Directores con su nº de películas, de más a menos; empate (y 0 películas) por nombre, con tildes ('es'). */
export const sortByMovieCount = <D extends { name: string }>(
  people: D[],
  list: { director: DirectorField }[]
): { director: D; movieCount: number }[] =>
  people
    .map((director) => ({ director, movieCount: moviesOfDirector(list, director.name).length }))
    .sort((a, b) => b.movieCount - a.movieCount || a.director.name.localeCompare(b.director.name, "es"));
