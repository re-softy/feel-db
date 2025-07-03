"use client";

import Link from "next/link";
import { useEffect } from "react";

import { MediaItem } from "@/types/types";
import MediaCard from "../media/MediaCard";
import Pagination from "../media/Pagination";
import UsersDashboardSkeleton from "../skeleton/UsersDashboardSkeleton";
import { useFavorites } from "@/contexts/FavoritesContext";

export default function Favorites() {
    const {
        favorites,
        isLoading,
        error,
        currentPage,
        totalPages,
        totalItems,
        goToPage,
        loadFavorites,
    } = useFavorites();

    const perPage = 8;

    useEffect(() => {
        if (favorites.length === 0 || currentPage === 1) {
            loadFavorites(1, perPage);
        }
    }, []);

    const handlePageChange = async (page: number) => {
        await goToPage(page);
    };

    if (isLoading) return <UsersDashboardSkeleton />;

    if (error) {
        return (
            <div className="p-8 text-center">
                <p className="text-red-500">Error: {error}</p>
                <button
                    onClick={() => loadFavorites(currentPage, perPage)}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Retry
                </button>
            </div>
        );
    }

    if (favorites.length === 0) {
        return (
            <div className="p-8 text-center">
                <p>No favorites added yet</p>
            </div>
        );
    }

    return (
        <div>
            <div className="mt-4 flex justify-between items-center">
                <p className="text-sm text-gray-600">
                    {totalItems} {totalItems === 1 ? "favorite" : "favorites"}
                </p>
                <p className="text-sm text-gray-500">
                    Page {currentPage} of {totalPages}
                </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,320px))] justify-between gap-y-10 gap-x-6 my-6">
                {favorites.map((mediaItem: MediaItem) => (
                    <Link key={mediaItem.id} href={`/media/${mediaItem.id}`}>
                        <MediaCard media={mediaItem} />
                    </Link>
                ))}
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                searchParams={{}}
                onPageChange={handlePageChange}
            />
        </div>
    );
}