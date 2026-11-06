import { Head } from 'vite-react-ssg';
import { absoluteUrl, SITE_URL } from '@/lib/seo';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string;
  /** Si es true, `title` se usa tal cual como <title> (sin añadir el sufijo "| CineCuba"). */
  exactTitle?: boolean;
  /** Valor de la meta robots (p. ej. "noindex, follow"). Si se informa, se omite el canonical. */
  robots?: string;
  /** Atajo de robots="noindex". */
  noindex?: boolean;
}

export const SEO = ({ title, description, image, url, type = 'website', exactTitle = false, robots, noindex = false }: SEOProps) => {
  const siteTitle = "CineCuba | Archivo del Cine Cubano";
  const fullTitle = exactTitle ? title : title === "Inicio" ? siteTitle : `${title} | CineCuba`;
  // Usamos la imagen del repositorio como fallback
  const defaultImage = "https://cine-cubano.com/og-image.jpg";
  const siteUrl = SITE_URL;
  const canonicalUrl = url || siteUrl;
  const robotsValue = robots ?? (noindex ? "noindex" : undefined);
  const ogImage = absoluteUrl(image) || defaultImage;

  return (
    <Head>
      {/* Estándar */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {robotsValue ? <meta name="robots" content={robotsValue} /> : <link rel="canonical" href={canonicalUrl} />}

      {/* Facebook / Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Head>
  );
};