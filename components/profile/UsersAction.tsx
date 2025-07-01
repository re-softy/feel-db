"use client"

import { useState } from "react";
import MediaCard from "../media/MediaCard";
import Link from "next/link";
import { useFavorites } from "@/contexts/FavoritesContext";

const Favorites = () => {
    const { favorites, isLoading } = useFavorites();

    if (favorites.length === 0) {
        return (
            <div className="p-8 text-center">
                <div className="max-w-md mx-auto">
                    <div className="mb-4">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No favorites yet</h3>
                    <p className="text-sm text-gray-600 mb-4">Start browsing and add movies to your favorites!</p>
                </div>
            </div>
        );
    }

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
    );
};

const Emotions = () => (
    <div className="p-8 text-center">
        <div className="max-w-md mx-auto">
            <div className="mb-4">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Coming Soon</h3>
            <p className="text-sm text-gray-600">Track your emotional responses to movies and shows.</p>
        </div>
    </div>
);

const NAVIGATION_LINKS = [
    { id: 'favorites', title: 'Favorites', component: Favorites },
    { id: 'emotions', title: 'Emotions', component: Emotions },
] as const;

type TabId = typeof NAVIGATION_LINKS[number]['id'];

function UsersAction() {
    const [selectedTab, setSelectedTab] = useState<TabId>('favorites');

    const activeComponent = NAVIGATION_LINKS.find(link => link.id === selectedTab)?.component || Favorites;
    const ActiveComponent = activeComponent;

    return (
        <section className="mb-20">
            <div className="flex flex-col">
                <div className="flex items-start gap-2" role="tablist" aria-label="User profile sections">
                    {NAVIGATION_LINKS.map((link) => (
                        <button
                            key={link.id}
                            onClick={() => setSelectedTab(link.id)}
                            role="tab"
                            aria-selected={selectedTab === link.id}
                            aria-controls={`panel-${link.id}`}
                            className={`
                                border-x border-t border-[#262626] p-2 lg:p-3 rounded-t-lg 
                                text-md lg:text-xl transition-colors duration-200
                                focus:outline-none
                                ${selectedTab === link.id
                                    ? 'border-b-2 border-b-orange-500 bg-orange-50 text-orange-700'
                                    : 'hover:bg-gray-50 text-gray-700'
                                }
                            `}
                        >
                            {link.title}
                        </button>
                    ))}
                </div>

                <div
                    className="flex-col border-t-[1px] border-[#262626] min-h-[400px]"
                    role="tabpanel"
                    id={`panel-${selectedTab}`}
                    aria-labelledby={`tab-${selectedTab}`}
                >
                    <ActiveComponent />
                </div>
            </div>
        </section>
    );
}

export default UsersAction;