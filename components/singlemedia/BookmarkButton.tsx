'use client';

import Image from "next/image";
import { useState } from "react";
import Bookmark from '@/public/bookmark.svg';
import Bookmark2 from '@/public/bookmark2.svg';
import { toast } from "sonner";
import { useFavorites } from "@/contexts/FavoritesContext";
import { BookmarkButtonProps } from "@/types/types";

export default function BookmarkButton({ movieId, movieData }: BookmarkButtonProps) {
    const { isInFavorites, addToFavorites, removeFromFavorites } = useFavorites();
    const [isUpdating, setIsUpdating] = useState(false);
    
    const isCurrentlyInFavorites = isInFavorites(movieId);

    const handleFavoriteToggle = async () => {
        if (isUpdating) return;
        
        setIsUpdating(true);
        
        try {
            if (isCurrentlyInFavorites) {
                const success = await removeFromFavorites(movieId);
                
                if (success) {
                    toast.success('Movie removed from favorites!');
                } else {
                    toast.error('Failed to remove movie from favorites');
                }
            } else {
                if (!movieData) {
                    toast.error('Movie data is required to add to favorites');
                    return;
                }
                
                const success = await addToFavorites(movieData);
                
                if (success) {
                    toast.success('Movie added to favorites!');
                } else {
                    toast.error('Failed to add movie to favorites');
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