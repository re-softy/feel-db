'use client';

import Image from "next/image";
import { addMovieToFavoritesAction, removeMovieFromFavoritesAction } from "@/lib/actions/favorites-actions";
import Bookmark from '@/public/bookmark.svg';
import Bookmark2 from '@/public/bookmark2.svg';
import { toast } from "sonner";
import { useFavorites } from "@/contexts/FavoritesContext";

interface BookmarkButtonProps {
    movieId: string;
    movieData?: {
        id: string;
        title_en: string;
        cover_path: string;
        [key: string]: any;
    };
}

export default function BookmarkButton({ movieId, movieData }: BookmarkButtonProps) {
    const { isInFavorites, addToFavorites, removeFromFavorites } = useFavorites();
    const isCurrentlyInFavorites = isInFavorites(movieId);

    const handleFavoriteToggle = async () => {    
        try {
            if (isCurrentlyInFavorites) {
                removeFromFavorites(movieId);
                toast.success('Movie removed from favorites!');

                const result = await removeMovieFromFavoritesAction(movieId);
                
                if (!result.success) {
                    if (movieData) {
                        addToFavorites(movieData as any);
                    }
                    toast.error(result.error || 'Failed to remove movie from favorites');
                }
            } else {
                if (movieData) {
                    addToFavorites(movieData as any);
                    toast.success('Movie added to favorites!');
                }
                
                const result = await addMovieToFavoritesAction(movieId);
                
                if (!result.success) {
                    removeFromFavorites(movieId);
                    toast.error(result.error || 'Failed to add movie to favorites');
                } else if (!movieData) {
                    toast.success('Movie added to favorites!');
                }
            }
        } catch (error) {
            console.error('🔍 BookmarkButton: Error in toggle:', error);
            toast.error('Failed to update favorites. Please try again later.');
            
            if (isCurrentlyInFavorites && movieData) {
                addToFavorites(movieData as any);
            } else {
                removeFromFavorites(movieId);
            }
        }
    };

    return (
        <Image
            src={isCurrentlyInFavorites ? Bookmark2 : Bookmark}
            alt={isCurrentlyInFavorites ? "Remove from Favorites" : "Add to Favorites"}
            className="cursor-pointer absolute top-0 left-0 drop-shadow-lg p-0 m-0 w-10 xl:w-14 3xl:w-20"
            onClick={handleFavoriteToggle}
        />
    );
} 