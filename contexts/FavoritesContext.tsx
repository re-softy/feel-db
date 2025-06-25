'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { MediaItem } from '@/types/types';
import { getUserFavoritesAction } from '@/lib/actions/favorites-actions';

interface FavoritesContextType {
  favorites: MediaItem[];
  isLoading: boolean;
  addToFavorites: (media: MediaItem) => void;
  removeFromFavorites: (mediaId: string) => void;
  isInFavorites: (mediaId: string) => boolean;
  refreshFavorites: () => Promise<void>;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchFavorites = async () => {
    try {
      setIsLoading(true);

      const result = await getUserFavoritesAction();
      
      if (result.success) {
        setFavorites(result.data);
      } else {
        setFavorites([]);
      }
    } catch (error) {
      console.error('🔍 FavoritesContext: Error fetching favorites:', error);
      setFavorites([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const addToFavorites = (media: MediaItem) => {
    setFavorites(prev => {
      if (!prev.some(fav => fav.id === media.id)) {
        const newFavorites = [...prev, media];
        return newFavorites;
      }
      return prev;
    });
  };

  const removeFromFavorites = (mediaId: string) => {
    setFavorites(prev => {
      const newFavorites = prev.filter(fav => fav.id !== mediaId);
      return newFavorites;
    });
  };

  const isInFavorites = (mediaId: string) => {
    const inFavorites = favorites.some(fav => fav.id === mediaId);
    return inFavorites;
  };

  const refreshFavorites = async () => {
    await fetchFavorites();
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isLoading,
        addToFavorites,
        removeFromFavorites,
        isInFavorites,
        refreshFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
} 