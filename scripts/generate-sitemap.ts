import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { build, type Plugin } from "esbuild";
import { movieIds, directorIds, eraIds, serialIds, sagaIds, actorIds } from "../src/data/routeIds";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const BASE_URL = "https://cine-cubano.com";
const today = new Date().toISOString().split("T")[0];

// ---------------------------------------------------------------------------
// Comprobación: todo id de los datos debe estar en routeIds (prerender y sitemap)
// ---------------------------------------------------------------------------

/** Los pósters y fotos importados pasan a ser su ruta: aquí solo importan los ids. */
const assetPathPlugin: Plugin = {
  name: "asset-path",
  setup(b) {
    b.onLoad({ filter: /\.(jpe?g|png|webp|gif|avif|svg)$/i }, (args) => ({
      contents: `export default ${JSON.stringify(args.path)};`,
      loader: "js",
    }));
  },
};

async function checkRouteIds(): Promise<void> {
  // El catálogo y los directores importan imágenes que tsx no sabe cargar: se empaquetan con esbuild.
  const result = await build({
    stdin: {
      contents: [
        'export { movies } from "@/data/movies";',
        'export { directors } from "@/data/directors";',
        'export { actors } from "@/data/actors";',
        'export { sagas } from "@/data/sagas";',
        'export { serials } from "@/data/serials";',
        'export { eras } from "@/data/eras";',
      ].join("\n"),
      resolveDir: ROOT,
      loader: "ts",
    },
    bundle: true,
    write: false,
    platform: "node",
    format: "cjs",
    alias: { "@": resolve(ROOT, "src") },
    plugins: [assetPathPlugin],
    logLevel: "error",
  });
  const mod = { exports: {} as Record<string, { id: string }[]> };
  new Function("module", "exports", result.outputFiles[0].text)(mod, mod.exports);
  const data = mod.exports;

  const checks: [string, { id: string }[], string[]][] = [
    ["películas (movieIds)", data.movies, movieIds],
    ["directores (directorIds)", data.directors, directorIds],
    ["actores (actorIds)", data.actors, actorIds],
    ["sagas (sagaIds)", data.sagas, sagaIds],
    ["seriales (serialIds)", data.serials, serialIds],
    ["épocas (eraIds)", data.eras, eraIds],
  ];

  const problems = checks.flatMap(([label, items, ids]) => {
    const missing = items.map((item) => item.id).filter((id) => !ids.includes(id));
    return missing.length ? [`  - ${label}: ${missing.join(", ")}`] : [];
  });
  if (problems.length) {
    console.error(
      "✗ Faltan ids en src/data/routeIds.ts: sin ellos la página no se prerenderiza ni entra en el sitemap.\n" +
        problems.join("\n") +
        "\n  Añádelos a la lista correspondiente de src/data/routeIds.ts y vuelve a ejecutar el build."
    );
    process.exit(1);
  }
}

await checkRouteIds();

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
