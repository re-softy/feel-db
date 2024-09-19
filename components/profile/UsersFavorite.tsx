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
        <section className="w-[90%] md:w-[85%] lg:w-[80%] xl:w-[75%] mx-auto py-10">
            <div className="flex flex-col">
                <div className="flex items-start gap-2">
                    {links.map((link) => (
                        <button
                            key={link.id}
                            onClick={() => setSelectedComponent(link.path)}
                            className="border border-[#262626] p-2 rounded-lg"
                        >
                            {link.title}
                        </button>
                    ))}
                </div>
                <div className="flex-col mt-4">
                    {renderComponent()}
                </div>
            </div>
        </section>
    );
}

export default UsersFavorite;
