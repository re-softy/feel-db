'use client';

import Image from "next/image";
import { addMovieToFavoritesAction } from "@/lib/actions/favorites-actions";
import Bookmark from '@/public/bookmark.svg';
import { toast } from "sonner";

interface BookmarkButtonProps {
    movieId: string;
}

export default function BookmarkButton({ movieId }: BookmarkButtonProps) {
    const handleAddToFavorites = async () => {
        console.log('Adding movie to favorites, movieId:', movieId);
        try {
            const result = await addMovieToFavoritesAction(movieId);
            
            if (result.success) {
                toast.success('Movie added to favorites successfully!');
            } else {
                toast.error(result.error || 'Failed to add movie to favorites');
            }
        } catch (error) {
            console.error('Failed to add movie to favorites:', error);
            toast.error('Failed to add movie to favorites. Please try again later.');
        }
    };

    return (
        <Image
            src={Bookmark}
            alt="Bookmark Icon"
            className="cursor-pointer absolute top-0 left-0 drop-shadow-lg p-0 m-0"
            // onClick={handleAddToFavorites}
        />
    );
} 