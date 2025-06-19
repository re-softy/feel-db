"use client";

import { MovieRatingProps } from '@/types/types';
import { useState } from 'react';

function MovieRating({ imdbRank, emotions }: MovieRatingProps) {
    const topEmotions = emotions?.slice(0, 5);
    const [hoveredEmotionId, setHoveredEmotionId] = useState<number | null>(null);

    const emotionToEmoji: { [key: string]: string } = {
        Joy: '😃',
        Sadness: '😭',
        Fear: '😱',
        Anger: '🤬',
        Disgust: '🤢',
        Surprise: '🤯',
        Anticipation: '🧐',
        Happiness: '😊',
        Melancholy: '😢',
        Curiosity: '🤔',
        Love: '🥰',
        Nostalgia: '🥺',
        Humor: '😂',
        Excitement: '🤩',
        Anxiety: '😨',
        Guilt: '😓',
        Hope: '🤞',
        Confusion: '😕',
        Disturbing: '😳',
        Inspiration: '😏',
        Envy: '😐',
        Empathy: '🥲',
        Relief: '😋',
        Satisfaction: '😊',
        Awe: '🤗',
      };

    return (
        <div className="flex items-center gap-8 text-gray-400">
            <div className="flex items-center gap-1">
                <span className="text-base lg:text-2xl font-semibold tracking-wide">IMDB</span>
                <span className="text-base lg:text-xl font-normal text-white">
                    {imdbRank || 'N/A'}
                </span>
            </div>
            {topEmotions && topEmotions.length > 0 && (
                <div className="flex items-center gap-4">
                    {topEmotions.map((emotion) => (
                        <div
                            key={emotion.id}
                            className="relative flex cursor-pointer items-center gap-2 rounded-2xl border border-grey px-4 py-1"
                            onMouseEnter={() => setHoveredEmotionId(emotion.id)}
                            onMouseLeave={() => setHoveredEmotionId(null)}
                        >
                            {hoveredEmotionId === emotion.id && (
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 transform whitespace-nowrap rounded bg-black bg-opacity-70 px-2 py-1 text-xs text-white">
                                    {emotion.percentage}% ({emotion.votes} votes)
                                </div>
                            )}
                            <span className="text-[28px]">{emotionToEmoji[emotion.name]}</span>
                            <span className="text-sm">{emotion.name}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MovieRating;