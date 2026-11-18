import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { build, type Plugin } from "esbuild";
import { genreIds } from "../../src/data/routeIds";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");

/** Los pósters importados pasan a ser su ruta: aquí solo importan los géneros de cada película. */
const assetPathPlugin: Plugin = {
  name: "asset-path",
  setup(b) {
    b.onLoad({ filter: /\.(jpe?g|png|webp|gif|avif|svg)$/i }, (args) => ({
      contents: `export default ${JSON.stringify(args.path)};`,
      loader: "js",
    }));
  },
};

/**
 * Slugs de los géneros que tienen al menos una película, calculados con el catálogo real.
 * Comparten prerender (vite.config.ts) y sitemap (generate-sitemap.ts). El catálogo importa imágenes,
 * que ni vite.config ni tsx saben cargar: se empaqueta con esbuild.
 * Falla si una película usa un género cuyo slug no está en genreIds (routeIds.ts): sin ruta no habría página.
 */
export async function getPopulatedGenreIds(): Promise<string[]> {
  const result = await build({
    stdin: {
      contents: [
        'export { movies } from "@/data/movies";',
        'export { genreSlug } from "@/data/movies/genres";',
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
    define: { "import.meta.env": "{}" },
    logLevel: "error",
  });
  const mod = { exports: {} as Record<string, unknown> };
  new Function("module", "exports", result.outputFiles[0].text)(mod, mod.exports);
  const { movies, genreSlug } = mod.exports as {
    movies: { genre: string[] }[];
    genreSlug: (g: string) => string;
  };

  const used = new Set(movies.flatMap((m) => m.genre.map(genreSlug)));
  const missing = [...used].filter((slug) => !genreIds.includes(slug));
  if (missing.length) {
    console.error(
      "✗ Hay películas con géneros sin ruta de prerender/sitemap (genreIds en src/data/routeIds.ts).\n" +
        `  - ${missing.join(", ")}\n` +
        "  Añade el género a GENRES (src/data/movies/genres.ts) y vuelve a ejecutar el build."
    );
    process.exit(1);
  }
  return genreIds.filter((slug) => used.has(slug));
}
