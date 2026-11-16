import type { SupabaseClient } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

/**
 * Cliente de Supabase sin esquema, para las tablas que todavía no figuran en integrations/supabase/types.ts
 * (generado automáticamente): user_favorites y sugerencias. Las filas se tipan con las interfaces de abajo.
 */
export const supabaseUntyped = supabase as unknown as SupabaseClient;

/** Fila de la tabla user_favorites. */
export interface UserFavoriteRow {
  user_id: string;
  movie_id: string;
}

/** Datos que se insertan en la tabla sugerencias desde el formulario "Sugerir". */
export interface SugerenciaInsert {
  user_id: string;
  titulo: string;
  anio: number | null;
  tipo: string;
  director: string | null;
  enlace_referencia: string | null;
  notas: string | null;
}
