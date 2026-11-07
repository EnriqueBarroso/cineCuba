export const SITE_URL = "https://cine-cubano.com";

/** Convierte rutas relativas (/images/...) en URLs absolutas. */
export const absoluteUrl = (path?: string): string | undefined => {
  if (!path) return undefined;
  if (/^(https?:)?\/\//.test(path) || path.startsWith("data:")) return path;
  return `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
};
