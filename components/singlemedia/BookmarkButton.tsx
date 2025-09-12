'use client';

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Bookmark from '@/public/bookmark.svg';
import Bookmark2 from '@/public/bookmark2.svg';
import { toast } from "sonner";
import { useFavorites } from "@/contexts/FavoritesContext";
import { addMovieToFavoritesAction, removeMovieFromFavoritesAction } from "@/lib/actions/favorites-actions";
import { BookmarkButtonProps } from "@/types/types";
import AuthButton from "@/components/header/AuthButton";

export default function BookmarkButton({ movieId, movieData }: BookmarkButtonProps) {
    const { isInFavorites, addToFavoritesState, removeFromFavoritesState } = useFavorites();
    const [isUpdating, setIsUpdating] = useState(false);
    const [showAuthDialog, setShowAuthDialog] = useState(false);
    const router = useRouter();
    
    const isCurrentlyInFavorites = isInFavorites(movieId);

    useEffect(() => {
        const handleAuthSuccess = () => {
            setShowAuthDialog(false);

            setTimeout(() => {
                router.refresh();
            }, 500);
        };
        
        document.addEventListener('closeAuthModal', handleAuthSuccess);
        
        return () => {
            document.removeEventListener('closeAuthModal', handleAuthSuccess);
        };
    }, [router]);

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
                    if (errorMessage.includes("Authentication is required")) {
                        setShowAuthDialog(true);
                    } else {
                        toast.error(errorMessage);
                    }
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
                    if (errorMessage.includes("Authentication is required")) {
                        setShowAuthDialog(true);
                    } else {
                        toast.error(errorMessage);
                    }
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
            {showAuthDialog && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div 
                        className="absolute inset-0 bg-black bg-opacity-50" 
                        onClick={() => setShowAuthDialog(false)}
                    ></div>
                    <div className="relative z-10 bg-black p-6 rounded-lg shadow-xl max-w-md w-full">
                        <button 
                            className="absolute top-4 right-4 text-gray-400 hover:text-white"
                            onClick={() => setShowAuthDialog(false)}
                        >
                            ✕
                        </button>
                        <div className="text-center mb-6">
                            <h3 className="text-xl font-bold">Authentication Required</h3>
                            <p className="text-gray-300 mt-2">You need to sign in to add items to favorites</p>
                        </div>
                        <AuthButton
                            initialMode="signin"
                            triggerElement={
                                <button className="mx-auto block bg-[#ff7f50] text-white px-10 py-2 rounded-lg hover:bg-orange-600">
                                    Sign In
                                </button>
                            }
                            isAuthenticated={false}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}