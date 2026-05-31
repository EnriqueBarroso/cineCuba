import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const LOCAL_KEY = 'cinecuba_favorites';

const readLocal = (): string[] => {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(LOCAL_KEY) ?? '[]');
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

      const { data, error } = await supabase
        .from('user_favorites' as any)
        .select('movie_id')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error al sincronizar favoritos:', error);
        setSyncing(false);
        return;
      }

      const remote: string[] = (data ?? []).map((r: any) => r.movie_id);
      const local = readLocal();
      const toInsert = local.filter(id => !remote.includes(id));

      if (toInsert.length > 0) {
        await supabase
          .from('user_favorites' as any)
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
      const { error } = await supabase
        .from('user_favorites' as any)
        .delete()
        .eq('user_id', user.id)
        .eq('movie_id', movieId);

      if (error) {
        setFavorites(prev => [...prev, movieId]);
        toast.error('Error al eliminar el favorito');
      }
    } else {
      const { error } = await supabase
        .from('user_favorites' as any)
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
