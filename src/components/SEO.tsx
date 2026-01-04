import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
}

export const SEO = ({ title, description, image, url }: SEOProps) => {
  const siteTitle = "CineCuba | Archivo del Cine Cubano";
  const fullTitle = title === "Inicio" ? siteTitle : `${title} | CineCuba`;
  const defaultImage = "https://cinecuba.vercel.app/og-image.jpg"; // (Luego crearemos esta imagen genérica)
  const siteUrl = "https://cinecuba.vercel.app"; // Tu dominio temporal o final

  return (
    <Helmet>
      {/* Estándar */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      {/* Facebook / Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url || siteUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image || defaultImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image || defaultImage} />
    </Helmet>
  );
};