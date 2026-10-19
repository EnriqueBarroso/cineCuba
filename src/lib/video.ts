/**
 * ¿La URL apunta a un archivo de vídeo directo (reproducible con <video>)?
 * Las URLs de archive.org/embed/... son páginas de reproductor, aunque terminen
 * en .mp4, y deben seguir cargándose en un iframe.
 */
export const isDirectVideoFile = (url: string): boolean =>
  url.includes("archive.org/download/") || (/\.mp4(\?.*)?$/i.test(url) && !url.includes("/embed/"));
