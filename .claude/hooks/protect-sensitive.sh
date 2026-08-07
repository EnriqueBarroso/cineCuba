#!/bin/bash
# PreToolUse hook: bloquea ediciones directas a migraciones de Supabase
# ya aplicadas y a archivos de entorno/credenciales.
#
# Exit 2 = bloquea la operación y Claude ve el mensaje de stderr.
# Exit 0 = deja pasar la operación.

input=$(cat)
file=$(echo "$input" | jq -r '.tool_input.file_path // empty')

if [ -z "$file" ]; then
  exit 0
fi

if echo "$file" | grep -qE '\.env(\.|$)|supabase/migrations/.*\.sql$'; then
  echo "Este archivo requiere revisión manual (migración de Supabase o variable de entorno). Si el cambio es intencionado, edítalo tú directamente o confirma explícitamente que Claude debe continuar." >&2
  exit 2
fi

exit 0
