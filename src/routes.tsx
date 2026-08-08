import type { RouteObject } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import { PageTransition } from "./components/PageTransition";

// Cada ruta usa el campo `lazy` de react-router-dom (no React.lazy/Suspense):
// vite-react-ssg espera explícitamente `route.lazy()` antes de prerenderizar
// con renderToString, así que este es el único mecanismo de code-splitting
// por ruta compatible con su pipeline de SSG.
export const routes: RouteObject[] = [
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        lazy: () => import("./pages/Index").then((m) => ({
          Component: () => <PageTransition><m.default /></PageTransition>,
        })),
      },
      {
        path: "peliculas",
        lazy: () => import("./pages/Movies").then((m) => ({
          Component: () => <PageTransition><m.default /></PageTransition>,
        })),
      },
      {
        path: "directores",
        lazy: () => import("./pages/Directors").then((m) => ({
          Component: () => <PageTransition><m.default /></PageTransition>,
        })),
      },
      {
        path: "director/:id",
        lazy: () => import("./pages/DirectorDetail").then((m) => ({
          Component: () => <PageTransition><m.default /></PageTransition>,
        })),
      },
      {
        path: "actores",
        lazy: () => import("./pages/Actors").then((m) => ({
          Component: () => <PageTransition><m.default /></PageTransition>,
        })),
      },
      {
        path: "actor/:id",
        lazy: () => import("./pages/ActorDetail").then((m) => ({
          Component: () => <PageTransition><m.default /></PageTransition>,
        })),
      },
      {
        path: "epocas",
        lazy: () => import("./pages/Eras").then((m) => ({
          Component: () => <PageTransition><m.default /></PageTransition>,
        })),
      },
      {
        path: "epoca/:id",
        lazy: () => import("./pages/EraDetail").then((m) => ({
          Component: () => <PageTransition><m.default /></PageTransition>,
        })),
      },
      {
        path: "pelicula/:id",
        lazy: () => import("./pages/MovieDetail").then((m) => ({
          Component: () => <PageTransition><m.default /></PageTransition>,
        })),
      },
      {
        path: "favoritos",
        lazy: () => import("./pages/Favorites").then((m) => ({
          Component: () => <PageTransition><m.default /></PageTransition>,
        })),
      },
      {
        path: "saga/:id",
        lazy: () => import("./pages/SagaDetail").then((m) => ({
          Component: () => <PageTransition><m.default /></PageTransition>,
        })),
      },
      {
        path: "seriales",
        lazy: () => import("./pages/Serials").then((m) => ({
          Component: () => <PageTransition><m.default /></PageTransition>,
        })),
      },
      {
        path: "serial/:id",
        lazy: () => import("./pages/SerialDetail").then((m) => ({
          Component: () => <PageTransition><m.default /></PageTransition>,
        })),
      },
      {
        path: "cortos",
        lazy: () => import("./pages/Shorts").then((m) => ({
          Component: () => <PageTransition><m.default /></PageTransition>,
        })),
      },
      {
        path: "corto/:id",
        lazy: () => import("./pages/ShortDetail").then((m) => ({
          Component: () => <PageTransition><m.default /></PageTransition>,
        })),
      },
      {
        path: "sugerir",
        lazy: () => import("./pages/Suggest").then((m) => ({
          Component: () => <PageTransition><m.default /></PageTransition>,
        })),
      },
      {
        path: "admin",
        lazy: () => import("./pages/Admin").then((m) => ({
          Component: () => <PageTransition><m.default /></PageTransition>,
        })),
      },
      {
        path: "acerca",
        lazy: () => import("./pages/About").then((m) => ({
          Component: () => <PageTransition><m.default /></PageTransition>,
        })),
      },
      {
        path: "terminos",
        lazy: () => import("./pages/Terms").then((m) => ({
          Component: () => <PageTransition><m.default /></PageTransition>,
        })),
      },
      {
        path: "*",
        lazy: () => import("./pages/NotFound").then((m) => ({
          Component: () => <PageTransition><m.default /></PageTransition>,
        })),
      },
    ],
  },
];
