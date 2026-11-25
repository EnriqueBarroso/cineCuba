import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { movieIds, directorIds, eraIds, serialIds, sagaIds, actorIds } from "./src/data/routeIds";
import { getPopulatedGenreIds } from "./scripts/lib/genreRoutes";
import { isoWeekKey } from "./src/lib/heroRotation";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  // Nº de películas para el contador del navbar; el build comprueba que movieIds coincide con el catálogo.
  // __HERO_WEEK__: semana ISO (UTC) del build; fija la rotación semanal del hero (ver src/lib/heroRotation.ts).
  // Servidor (prerender) y cliente comparten esta constante, así que no hay desajuste de hidratación.
  // La rotación avanza con cada despliegue; sin despliegue, el hero mantiene la selección del último build.
  // HERO_WEEK=AAAA-Www permite forzar una semana concreta para pruebas.
  define: {
    __MOVIE_COUNT__: JSON.stringify(new Set(movieIds).size),
    __HERO_WEEK__: JSON.stringify(process.env.HERO_WEEK || isoWeekKey(new Date())),
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    dedupe: ["react-helmet-async", "react", "react-dom", "react-router-dom"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  ssr: {
    noExternal: ["react-helmet-async"],
  },
  ssgOptions: {
    script: "async",
    formatting: "minify",
    includedRoutes: async () => [
      "/",
      "/peliculas",
      "/directores",
      "/epocas",
      "/decadas",
      "/generos",
      "/acerca",
      "/terminos",
      "/seriales",
      "/cortos",
      "/actores",
      "/favoritos",
      "/sugerir",
      "/admin",
      "/404", // casa con la ruta "*": genera dist/404.html con NotFound, que Vercel sirve en URLs inexistentes
      ...movieIds.map((id) => `/pelicula/${id}`),
      ...directorIds.map((id) => `/director/${id}`),
      ...eraIds.map((id) => `/epoca/${id}`),
      ...(await getPopulatedGenreIds()).map((slug) => `/genero/${slug}`), // solo géneros con películas
      ...serialIds.map((id) => `/serial/${id}`),
      ...sagaIds.map((id) => `/saga/${id}`),
      ...actorIds.map((id) => `/actor/${id}`),
    ],
  },
}));
