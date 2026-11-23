/**
 * Ids de película antiguos que se han renombrado, con su id actual.
 *
 * Por qué existe: los favoritos se guardan por id de película (localStorage, clave `cinecuba_favorites`, y la tabla
 * `user_favorites` de Supabase). Si se corrige el id de una película, quien la tuviera guardada la perdería.
 * `useFavorites` aplica este mapa AL LEER (sin tocar la base de datos): el id antiguo se convierte en el nuevo,
 * se deduplica y, al guardar, se escribe el nuevo.
 *
 * Cómo añadir uno: cuando renombres un id en catalog.ts/routeIds.ts, añade aquí `"id-antiguo": "id-nuevo"`
 * (y la redirección 301 de la URL en vercel.json). No borres entradas: sirven mientras queden favoritos antiguos.
 */
export const LEGACY_MOVIE_IDS: Readonly<Record<string, string>> = {
  "hello-heminguey": "hello-hemingway",
  "ya-no-es-antes-2017": "ya-no-es-antes-2016",
};

/** Id actual de una película (si el id es antiguo, su sustituto; si no, el mismo). */
export const currentMovieId = (id: string): string => LEGACY_MOVIE_IDS[id] ?? id;

/** Convierte los ids antiguos de una lista en los actuales y elimina duplicados (conserva el orden). */
export const migrateMovieIds = (ids: readonly string[]): string[] => [...new Set(ids.map(currentMovieId))];

/** Todos los ids con los que puede estar guardada una película: el actual y los antiguos que apuntan a él. */
export const storedIdsOf = (id: string): string[] => [
  id,
  ...Object.entries(LEGACY_MOVIE_IDS).filter(([, current]) => current === id).map(([legacy]) => legacy),
];
