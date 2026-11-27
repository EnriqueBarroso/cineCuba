export const SITE_URL = "https://cine-cubano.com";

/** Convierte rutas relativas (/images/...) en URLs absolutas. */
export const absoluteUrl = (path?: string): string | undefined => {
  if (!path) return undefined;
  if (/^(https?:)?\/\//.test(path) || path.startsWith("data:")) return path;
  return `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
};

/** Imagen por defecto para vistas previas (og:image, twitter:image) y datos estructurados. */
export const DEFAULT_SOCIAL_IMAGE = `${SITE_URL}/og-image.jpg`;

/**
 * Imagen para vistas previas y JSON-LD. Un SVG (p. ej. /placeholder.svg) no sirve para eso:
 * si el póster está vacío o es un SVG se usa la imagen por defecto del sitio.
 */
export const socialImage = (poster?: string): string => {
  const p = poster?.trim();
  if (!p || /\.svg(\?.*)?$/i.test(p)) return DEFAULT_SOCIAL_IMAGE;
  return absoluteUrl(p) ?? DEFAULT_SOCIAL_IMAGE;
};
