#!/bin/bash
# SessionStart hook (matcher: startup).
# El stdout de este script se inyecta como contexto visible para Claude
# al arrancar una sesion nueva, para no tener que repetirlo cada vez.

cat <<'EOF'
CONTEXTO DEL PROYECTO CINECUBA:
- Stack: React 18 + TypeScript + Vite (vite-react-ssg), Tailwind, shadcn/ui.
- Backend: Supabase (auth + base de datos). Migraciones en supabase/migrations/.
- Deploy: Vercel.
- El catalogo (peliculas, actores, directores, sagas, series, cortos, epocas)
  vive en src/data/ como TypeScript estatico. Antes de anadir/editar contenido,
  confirma si debe ir en src/data/ o si corresponde una migracion de Supabase,
  para no desincronizar ambas fuentes.
- No edites migraciones ya aplicadas ni archivos .env sin confirmacion explicita.
- El build corre scripts/generate-sitemap.ts automaticamente.
EOF
exit 0
