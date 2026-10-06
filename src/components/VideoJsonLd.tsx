import { absoluteUrl } from "@/lib/seo";

interface VideoJsonLdProps {
  name: string;
  description: string;
  thumbnail?: string;
  year: number;
  videoUrl: string;
  genre: string[];
  director: string;
}

export const VideoJsonLd = ({ name, description, thumbnail, year, videoUrl, genre, director }: VideoJsonLdProps) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "VideoObject",
        name,
        description: description.slice(0, 300),
        ...(thumbnail && { thumbnailUrl: absoluteUrl(thumbnail) }),
        uploadDate: `${year}-01-01`,
        contentUrl: videoUrl,
        embedUrl: videoUrl,
        inLanguage: "es",
        genre: genre.join(", "),
        director: { "@type": "Person", name: director },
      }),
    }}
  />
);
