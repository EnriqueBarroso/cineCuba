import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { movieIds, directorIds, eraIds, serialIds, sagaIds, actorIds } from "../src/data/routeIds";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE_URL = "https://cine-cubano.com";
const today = new Date().toISOString().split("T")[0];

interface SitemapEntry {
  path: string;
  priority: string;
  changefreq: string;
}

const staticRoutes: SitemapEntry[] = [
  { path: "/",            priority: "1.0", changefreq: "weekly"  },
  { path: "/peliculas",   priority: "0.9", changefreq: "weekly"  },
  { path: "/directores",  priority: "0.9", changefreq: "weekly"  },
  { path: "/epocas",      priority: "0.8", changefreq: "monthly" },
  { path: "/seriales",    priority: "0.8", changefreq: "monthly" },
  { path: "/cortos",      priority: "0.8", changefreq: "monthly" },
  { path: "/actores",     priority: "0.8", changefreq: "monthly" },
  { path: "/acerca",      priority: "0.4", changefreq: "yearly"  },
  { path: "/terminos",    priority: "0.3", changefreq: "yearly"  },
];

const dynamicRoutes: SitemapEntry[] = [
  ...movieIds.map((id) => ({
    path:        `/pelicula/${id}`,
    priority:    "0.8",
    changefreq:  "monthly",
  })),
  ...directorIds.map((id) => ({
    path:        `/director/${id}`,
    priority:    "0.7",
    changefreq:  "monthly",
  })),
  ...eraIds.map((id) => ({
    path:        `/epoca/${id}`,
    priority:    "0.7",
    changefreq:  "monthly",
  })),
  ...serialIds.map((id) => ({
    path:        `/serial/${id}`,
    priority:    "0.7",
    changefreq:  "monthly",
  })),
  ...sagaIds.map((id) => ({
    path:        `/saga/${id}`,
    priority:    "0.7",
    changefreq:  "monthly",
  })),
  ...actorIds.map((id) => ({
    path:        `/actor/${id}`,
    priority:    "0.6",
    changefreq:  "monthly",
  })),
];

const allRoutes = [...staticRoutes, ...dynamicRoutes];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    ({ path, priority, changefreq }) => `  <url>
    <loc>${BASE_URL}${path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

const outputPath = resolve(__dirname, "../public/sitemap.xml");
writeFileSync(outputPath, xml, "utf-8");
console.log(`✓ sitemap.xml generado: ${allRoutes.length} URLs → ${outputPath}`);
