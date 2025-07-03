'use client';

import Image from "next/image";
import { useState } from "react";
import Bookmark from '@/public/bookmark.svg';
import Bookmark2 from '@/public/bookmark2.svg';
import { toast } from "sonner";
import { useFavorites } from "@/contexts/FavoritesContext";
import { addMovieToFavoritesAction, removeMovieFromFavoritesAction } from "@/lib/actions/favorites-actions";
import { BookmarkButtonProps } from "@/types/types";

export default function BookmarkButton({ movieId, movieData }: BookmarkButtonProps) {
    const { isInFavorites, addToFavoritesState, removeFromFavoritesState } = useFavorites();
    const [isUpdating, setIsUpdating] = useState(false);
    
    const isCurrentlyInFavorites = isInFavorites(movieId);

    const handleFavoriteToggle = async () => {
        if (isUpdating) return;
        
        setIsUpdating(true);
        
        try {
            if (isCurrentlyInFavorites) {
                const result = await removeMovieFromFavoritesAction(movieId);
                
                if (result.success) {
                    removeFromFavoritesState(movieId);
                    toast.success('Movie removed from favorites!');
                } else {
                    const errorMessage = result.error || 'Failed to remove movie from favorites';
                    toast.error(errorMessage);
                }
            } else {
                if (!movieData) {
                    toast.error('Movie data is required to add to favorites');
                    return;
                }
                
                const result = await addMovieToFavoritesAction(movieData.id);
                
                if (result.success) {
                    addToFavoritesState(movieData);
                    toast.success('Movie added to favorites!');
                } else {
                    const errorMessage = result.error || 'Failed to add movie to favorites';
                    toast.error(errorMessage);
                }
            }
        } catch (error) {
            console.error('BookmarkButton: Error in toggle:', error);
            toast.error('Failed to update favorites. Please try again later.');
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div>
            <Image
                src={isCurrentlyInFavorites ? Bookmark2 : Bookmark}
                alt={isCurrentlyInFavorites ? "Remove from Favorites" : "Add to Favorites"}
                className={`cursor-pointer absolute top-0 left-0 drop-shadow-lg p-0 m-0 w-10 xl:w-14 3xl:w-20 transition-opacity ${
                    isUpdating ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
                }`}
                onClick={handleFavoriteToggle}
            />
        </div>
    );
}