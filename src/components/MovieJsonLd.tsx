import { absoluteUrl, SITE_URL } from "@/lib/seo";
import type { Movie } from "@/data/movies";

export const MovieJsonLd = ({ movie }: { movie: Movie }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Movie",
        name: movie.title,
        description: movie.synopsis.slice(0, 300),
        dateCreated: movie.year.toString(),
        image: absoluteUrl(movie.poster),
        genre: movie.genre,
        director: { "@type": "Person", name: movie.director },
        actor: movie.cast?.map((m) => ({ "@type": "Person", name: m.name })) || [],
        url: `${SITE_URL}/pelicula/${movie.id}`,
      }),
    }}
  />
);
