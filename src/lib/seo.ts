export const SITE_URL = "https://cine-cubano.com";

/** Una ficha con menos texto que esto se considera "casi vacía": noindex y fuera del sitemap. */
export const MIN_BIO_LENGTH = 50;

export const hasThinBio = (biography?: string): boolean => (biography ?? "").trim().length < MIN_BIO_LENGTH;

/** Convierte rutas relativas (/images/...) en URLs absolutas. */
export const absoluteUrl = (path?: string): string | undefined => {
  if (!path) return undefined;
  if (/^(https?:)?\/\//.test(path) || path.startsWith("data:")) return path;
  return `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
};
