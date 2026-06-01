import type { RouteObject } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import { PageTransition } from "./components/PageTransition";
import Index from "./pages/Index";
import Movies from "./pages/Movies";
import Directors from "./pages/Directors";
import DirectorDetail from "./pages/DirectorDetail";
import Eras from "./pages/Eras";
import EraDetail from "./pages/EraDetail";
import MovieDetail from "./pages/MovieDetail";
import About from "./pages/About";
import Terms from "./pages/Terms";
import Favorites from "./pages/Favorites";
import SagaDetail from "./pages/SagaDetail";
import Serials from "./pages/Serials";
import SerialDetail from "./pages/SerialDetail";
import Shorts from "./pages/Shorts";
import ShortDetail from "./pages/ShortDetail";
import Suggest from "./pages/Suggest";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <PageTransition><Index /></PageTransition>,
      },
      {
        path: "peliculas",
        element: <PageTransition><Movies /></PageTransition>,
      },
      {
        path: "directores",
        element: <PageTransition><Directors /></PageTransition>,
      },
      {
        path: "director/:id",
        element: <PageTransition><DirectorDetail /></PageTransition>,
      },
      {
        path: "epocas",
        element: <PageTransition><Eras /></PageTransition>,
      },
      {
        path: "epoca/:id",
        element: <PageTransition><EraDetail /></PageTransition>,
      },
      {
        path: "pelicula/:id",
        element: <PageTransition><MovieDetail /></PageTransition>,
      },
      {
        path: "favoritos",
        element: <PageTransition><Favorites /></PageTransition>,
      },
      {
        path: "saga/:id",
        element: <PageTransition><SagaDetail /></PageTransition>,
      },
      {
        path: "seriales",
        element: <PageTransition><Serials /></PageTransition>,
      },
      {
        path: "serial/:id",
        element: <PageTransition><SerialDetail /></PageTransition>,
      },
      {
        path: "cortos",
        element: <PageTransition><Shorts /></PageTransition>,
      },
      {
        path: "corto/:id",
        element: <PageTransition><ShortDetail /></PageTransition>,
      },
      {
        path: "sugerir",
        element: <PageTransition><Suggest /></PageTransition>,
      },
      {
        path: "admin",
        element: <PageTransition><Admin /></PageTransition>,
      },
      {
        path: "acerca",
        element: <PageTransition><About /></PageTransition>,
      },
      {
        path: "terminos",
        element: <PageTransition><Terms /></PageTransition>,
      },
      {
        path: "*",
        element: <PageTransition><NotFound /></PageTransition>,
      },
    ],
  },
];
