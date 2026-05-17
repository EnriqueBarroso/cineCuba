import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { movieIds, directorIds, eraIds } from "./src/data/routeIds";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
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
    includedRoutes: () => [
      "/",
      "/peliculas",
      "/directores",
      "/epocas",
      "/acerca",
      "/terminos",
      ...movieIds.map((id) => `/pelicula/${id}`),
      ...directorIds.map((id) => `/director/${id}`),
      ...eraIds.map((id) => `/epoca/${id}`),
    ],
  },
}));
