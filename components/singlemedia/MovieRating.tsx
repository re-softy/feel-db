"use client";

import { MovieRatingProps } from '@/types/types';
import { useState } from 'react';
import { getEmojiForEmotion } from '@/utils/emoji';

function MovieRating({ imdbRank, emotions }: MovieRatingProps) {
    const topEmotions = emotions?.slice(0, 5);
    const [hoveredEmotionId, setHoveredEmotionId] = useState<number | null>(null);

    // centralized emoji mapping moved to utils/emoji

    return (
        <div className="flex flex-col items-start gap-4 my-2 text-gray-400 xl:flex-row xl:items-center lg:gap-6">
            <div className="flex items-center gap-1">
                <span className="text-base lg:text-xl font-semibold tracking-wide">IMDB</span>
                <span className="text-base lg:text-xl font-normal text-white">
                    {imdbRank || 'N/A'}
                </span>
            </div>
            {topEmotions && topEmotions.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                    {topEmotions.map((emotion) => (
                        <div
                            key={emotion.id}
                            className="relative flex cursor-pointer items-center gap-1 xl:rounded-2xl xl:border xl:border-gray-600 xl:px-2 xl:py-1"
                            onMouseEnter={() => setHoveredEmotionId(emotion.id)}
                            onMouseLeave={() => setHoveredEmotionId(null)}
                        >
                            {hoveredEmotionId === emotion.id && (
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 transform whitespace-nowrap rounded bg-black bg-opacity-70 px-2 py-1 text-xs text-white">
                                    {emotion.percentage}% ({emotion.votes} votes)
                                </div>
                            )}
                            <span className="text-lg xl:text-2xl">{getEmojiForEmotion(emotion.name)}</span>
                            <span className="text-sm xl:text-base">{emotion.name}</span>
                            <span className="text-xs xl:text-sm text-gray-500">
                                ({emotion.percentage}%)
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MovieRating;