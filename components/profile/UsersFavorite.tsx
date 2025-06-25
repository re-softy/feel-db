"use client"

import { useState } from "react";
import MediaCard from "../media/MediaCard";
import Link from "next/link";
import { useFavorites } from "@/contexts/FavoritesContext";

const Favorites = () => {
    const { favorites, isLoading } = useFavorites();
    
    if (isLoading) {
        return (
            <div className="p-8 text-center">
                <p className="text-lg">Loading your favorites...</p>
            </div>
        );
    }
    
    if (favorites.length === 0) {
        return (
            <div className="p-8 text-center">
                <p className="text-lg">You haven&apos;t added any favorites yet.</p>
                <p className="text-sm text-gray-600 mt-2">Start browsing and add movies to your favorites!</p>
            </div>
        );
    }

    return (
        <div className="p-4">
            <div className="grid grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))] gap-6">
                {favorites.map((mediaItem) => (
                    <Link
                        key={mediaItem.id}
                        href={`/media/${mediaItem.id}`}
                        className="group transition-transform transform hover:scale-105"
                    >
                        <MediaCard media={mediaItem} />
                    </Link>
                ))}
            </div>
        </div>
    );
};

const Emotions = () => <div>Your emotions</div>;
const Reviews = () => <div>Your reviews</div>;

const links = [
    { id: 1, title: "Favorites", path: "favorites" },
    { id: 2, title: "Emotions", path: "emotions" },
    { id: 3, title: "Reviews", path: "reviews" },
];

function UsersFavorite() {
    const [selectedComponent, setSelectedComponent] = useState<string>("favorites");

    const renderComponent = () => {
        switch (selectedComponent) {
            case "favorites":
                return <Favorites />;
            case "emotions":
                return <Emotions />;
            case "reviews":
                return <Reviews />;
            default:
                return null;
        }
    };

    return (
        <section className="mb-20">
            <div className="flex flex-col">
                <div className="flex items-start gap-2">
                    {links.map((link) => (
                        <button
                            key={link.id}
                            onClick={() => setSelectedComponent(link.path)}
                            className="border-x border-t border-[#262626] p-2 lg:p-3 rounded-t-lg focus:border-b-2 focus:border-b-orange text-md lg:text-xl"
                        >
                            {link.title}
                        </button>
                    ))}
                </div>
                <div className="flex-col border-t-[1px] border-[#262626]">
                    {renderComponent()}
                </div>
            </div>
        </section>
    );
}

export default UsersFavorite;
