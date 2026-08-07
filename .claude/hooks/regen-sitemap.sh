#!/bin/bash
# PostToolUse hook: si Claude edita algo dentro de src/data/ (peliculas,
# actores, directores, sagas, series, cortos, epocas), regenera el sitemap
# para que no quede desactualizado respecto al catalogo.

input=$(cat)
file=$(echo "$input" | jq -r '.tool_input.file_path // empty')

if [ -z "$file" ]; then
  exit 0
fi

if echo "$file" | grep -q 'src/data/'; then
  cd "$CLAUDE_PROJECT_DIR" || exit 0
  npx tsx scripts/generate-sitemap.ts > /dev/null 2>&1 &
fi

exit 0
