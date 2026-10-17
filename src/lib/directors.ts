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
