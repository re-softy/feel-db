"use client"

import { useState } from "react";

const Favorites = () => <div>Your favorite items</div>;
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
