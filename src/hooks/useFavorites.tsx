import { useState, useEffect } from 'react';

export const useFavorites = () => {
  // 1. Cargamos los favoritos guardados al iniciar
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('cinecuba_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Error al cargar favoritos", e);
      return [];
    }
  });

  // 2. Cada vez que cambien, guardamos en el navegador
  useEffect(() => {
    localStorage.setItem('cinecuba_favorites', JSON.stringify(favorites));
  }, [favorites]);

  // 3. Función para añadir/quitar
  const toggleFavorite = (movieId: string) => {
    setFavorites(prev =>
      prev.includes(movieId)
        ? prev.filter(id => id !== movieId) // Si existe, lo quita
        : [...prev, movieId] // Si no existe, lo añade
    );
  };

  const isFavorite = (movieId: string) => favorites.includes(movieId);

  return { favorites, toggleFavorite, isFavorite };
};