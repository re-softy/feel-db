import Link from "next/link";

import MediaCard from "../media/MediaCard";
import { useFavorites } from "@/contexts/FavoritesContext";

export default function Favorites() {
    const { favorites } = useFavorites();

    const displayedFavorites = favorites.slice(0, 4);
    const hasMoreFavorites = favorites.length > 4;
    return (
        <div>
            <div className="mt-4 flex justify-between items-center">
                <p className="text-sm text-gray-600">
                    {favorites.length} {favorites.length === 1 ? 'favorite' : 'favorites'}
                </p>
                {hasMoreFavorites && (
                    <Link
                        href="/favorites"
                        className="text-orange text-md transition-colors"
                    >
                        See all
                    </Link>
                )}
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,320px))] justify-center gap-y-10 gap-x-6 my-6">
                {displayedFavorites.map((mediaItem) => (
                    <Link
                        key={mediaItem.id}
                        href={`/media/${mediaItem.id}`}
                        className="group transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-lg"
                    >
                        <MediaCard media={mediaItem} />
                    </Link>
                ))}
            </div>
        </div>
    )
}