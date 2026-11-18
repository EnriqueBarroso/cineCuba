import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabaseUntyped, type UserFavoriteRow } from '@/lib/supabaseTables';
import { toast } from 'sonner';
import { migrateMovieIds, storedIdsOf } from '@/data/legacyIds';

const LOCAL_KEY = 'cinecuba_favorites';

const readLocal = (): string[] => {
  if (typeof window === 'undefined') return [];
  try {
    // Ids antiguos (renombrados) → actuales y sin duplicados; no se reescribe el almacenamiento hasta el siguiente guardado.
    return migrateMovieIds(JSON.parse(localStorage.getItem(LOCAL_KEY) ?? '[]'));
  } catch {
    return [];
  }
};

const writeLocal = (ids: string[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LOCAL_KEY, JSON.stringify(ids));
};

export const useFavorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<string[]>(readLocal);
  const [syncing, setSyncing] = useState(false);

  // Sincroniza con Supabase cuando el usuario inicia sesión.
  // Al login: fusiona favoritos locales con los de la BD y limpia localStorage.
  // Al logout: vuelve a leer de localStorage.
  useEffect(() => {
    if (!user) {
      setFavorites(readLocal());
      return;
    }

    const sync = async () => {
      setSyncing(true);

      const { data, error } = await supabaseUntyped
        .from('user_favorites')
        .select('movie_id')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error al sincronizar favoritos:', error);
        setSyncing(false);
        return;
      }

      // Mismo mapa de ids antiguos que en local; no se modifica la base de datos.
      const remote: string[] = migrateMovieIds((data ?? []).map((r: UserFavoriteRow) => r.movie_id));
      const local = readLocal();
      const toInsert = local.filter(id => !remote.includes(id));

      if (toInsert.length > 0) {
        await supabaseUntyped
          .from('user_favorites')
          .insert(toInsert.map((movie_id: string) => ({ user_id: user.id, movie_id })));
      }

      writeLocal([]);
      setFavorites([...new Set([...remote, ...local])]);
      setSyncing(false);
    };

    sync();
  }, [user?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleFavorite = async (movieId: string) => {
    const isCurrentlyFavorite = favorites.includes(movieId);

    // Modo sin sesión: localStorage únicamente
    if (!user) {
      const next = isCurrentlyFavorite
        ? favorites.filter(id => id !== movieId)
        : [...favorites, movieId];
      setFavorites(next);
      writeLocal(next);
      if (!isCurrentlyFavorite) {
        toast('Guardado en este dispositivo', {
          description: 'Inicia sesión para sincronizarlo entre dispositivos',
        });
      }
      return;
    }

    // Modo con sesión: actualización optimista + Supabase
    setFavorites(prev =>
      isCurrentlyFavorite ? prev.filter(id => id !== movieId) : [...prev, movieId]
    );

    if (isCurrentlyFavorite) {
      const { error } = await supabaseUntyped
        .from('user_favorites')
        .delete()
        .eq('user_id', user.id)
        // Borra también la fila si quedó guardada con un id antiguo de esta película.
        .in('movie_id', storedIdsOf(movieId));

      if (error) {
        setFavorites(prev => [...prev, movieId]);
        toast.error('Error al eliminar el favorito');
      }
    } else {
      const { error } = await supabaseUntyped
        .from('user_favorites')
        .insert({ user_id: user.id, movie_id: movieId });

      if (error) {
        setFavorites(prev => prev.filter(id => id !== movieId));
        toast.error('Error al guardar el favorito');
      }
    }
  };

  const isFavorite = (movieId: string) => favorites.includes(movieId);

  return { favorites, toggleFavorite, isFavorite, syncing };
};
