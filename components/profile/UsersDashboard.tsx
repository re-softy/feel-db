"use client"

import { useState } from "react";
import Favorites from "./Favorites";
import Emotions from "./Emotions";


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