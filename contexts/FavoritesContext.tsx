'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { MediaItem, PaginationInfo, FavoritesContextType } from '@/types/types';
import { 
  getUserFavoritesAction, 
  addMovieToFavoritesAction, 
  removeMovieFromFavoritesAction 
} from '@/lib/actions/favorites-actions';

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationInfo>({
    current_page: 1,
    last_page: 1,
    per_page: 8,
    total: 0,
  });

  const loadFavorites = useCallback(async (page = 1, perPage = 8) => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await getUserFavoritesAction(page, perPage);
      
      if (result.success) {
        setFavorites(result.data);
        setPagination(result.pagination);
      } else {
        setFavorites([]);
        setPagination({
          current_page: 1,
          last_page: 1,
          per_page: perPage,
          total: 0,
        });
        setError(result.error || 'Failed to load favorites');
      }
    } catch (err) {
      console.error('Error loading favorites:', err);
      setError('Failed to load favorites');
      setFavorites([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  const addToFavorites = async (media: MediaItem): Promise<boolean> => {
    try {
      const result = await addMovieToFavoritesAction(media.id);
      
      if (result.success) {
        setFavorites(prev => {
          if (!prev.some(fav => fav.id === media.id)) {
            return [...prev, media];
          }
          return prev;
        });
        
        setPagination(prev => ({
          ...prev,
          total: prev.total + 1,
        }));
        
        return true;
      } else {
        setError(result.error || 'Failed to add to favorites');
        return false;
      }
    } catch (err) {
      console.error('Error adding to favorites:', err);
      setError('Failed to add to favorites');
      return false;
    }
  };

  const removeFromFavorites = async (mediaId: string): Promise<boolean> => {
    try {
      const result = await removeMovieFromFavoritesAction(mediaId);
      
      if (result.success) {
        setFavorites(prev => prev.filter(fav => fav.id !== mediaId));

        setPagination(prev => ({
          ...prev,
          total: Math.max(0, prev.total - 1),
        }));
        
        return true;
      } else {
        setError(result.error || 'Failed to remove from favorites');
        return false;
      }
    } catch (err) {
      console.error('Error removing from favorites:', err);
      setError('Failed to remove from favorites');
      return false;
    }
  };

  const isInFavorites = (mediaId: string): boolean => {
    return favorites.some(fav => fav.id === mediaId);
  };

  const refreshFavorites = async (): Promise<void> => {
    await loadFavorites(pagination.current_page, pagination.per_page);
  };

  const goToPage = async (page: number): Promise<void> => {
    if (page >= 1 && page <= pagination.last_page) {
      await loadFavorites(page, pagination.per_page);
    }
  };

  useEffect(() => {
    if (error && favorites.length > 0) {
      setError(null);
    }
  }, [favorites, error]);

  const contextValue: FavoritesContextType = {
    favorites,
    isLoading,
    error,
    pagination,

    addToFavorites,
    removeFromFavorites,
    isInFavorites,
    loadFavorites,
    refreshFavorites,
    goToPage,
    currentPage: pagination.current_page,
    totalPages: pagination.last_page,
    totalItems: pagination.total,
  };

  return (
    <FavoritesContext.Provider value={contextValue}>
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