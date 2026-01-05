import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string; // <--- ¡ESTA ES LA LÍNEA QUE FALTABA PARA CORREGIR EL ERROR!
}

export const SEO = ({ title, description, image, url, type = 'website' }: SEOProps) => {
  const siteTitle = "CineCuba | Archivo del Cine Cubano";
  const fullTitle = title === "Inicio" ? siteTitle : `${title} | CineCuba`;
  // Usamos la imagen del repositorio como fallback
  const defaultImage = "https://cinecuba.vercel.app/og-image.jpg";
  const siteUrl = "https://cinecuba.vercel.app";

  return (
    <Helmet>
      {/* Estándar */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      {/* Facebook / Open Graph */}
      <meta property="og:type" content={type} />
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