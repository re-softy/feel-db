"use client";

import { useState, useCallback, memo } from "react";
import Image from "next/image";

import Rating from "./Rating";
import { MediaItem } from "@/types/types";
import { getTopEmotions, formatRuntime } from "@/utils/emotionUtils";

const MediaCard = memo(function MediaCard({ media }: { media: MediaItem }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  const topEmotions = getTopEmotions(media, 3);
  const genreList = typeof media.genres_names === 'string'
  ? media.genres_names.split(',').map(genre => genre.trim())
  : Array.isArray(media.genres_names)
    ? media.genres_names
    : [];
  const movieTitle = media?.title_en || 'Untitled';
  const releaseInfo = media.release_year + (media.runtime ? ` • ${formatRuntime(media.runtime)}` : '');

  if (!media) {
    return <div className="w-full h-full flex items-center justify-center">No media data available</div>;
  }

  return (
    <div
      className="relative w-full pb-[138.71%] rounded-md overflow-hidden cursor-pointer will-change-transform"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className={`absolute inset-0 transition-transform duration-300 ease-out ${
          isHovered ? "transform translate3d(0, -20%, 0) scale(1.05)" : "transform translate3d(0, 0, 0) scale(1)"
        }`}
        style={{ willChange: isHovered ? 'transform' : 'auto' }}
      >
        <Image
          src={media.poster_path || '/path/to/default/image.jpg'}
          alt={`${movieTitle || 'Movie'} movie poster`}
          fill
          className="object-cover object-bottom rounded-md"
          quality={90}
          loading="lazy"
          priority={false}
        />
      </div>
      
      <div 
        className="absolute bottom-0 w-full bg-[#2d2d2d] p-2 rounded-b-md z-10 flex flex-col justify-between will-change-transform"
        style={{ 
          transform: 'translate3d(0, 0, 0)', 
          backfaceVisibility: 'hidden'
        }}
      >
        <div className="flex items-center justify-between gap-x-2">
          {topEmotions.map((emotion) => (
            <Rating
              key={emotion.id}
              icon={emotion.name.toLowerCase()}
              percentage={emotion.percentage}
              count={emotion.count}
            />
          ))}
        </div>

        <div 
          className={`transition-all duration-200 ease-out will-change-transform ${
            isHovered 
              ? "opacity-100 transform translate3d(0, 0, 0) max-h-32" 
              : "opacity-0 transform translate3d(0, 10px, 0) max-h-0 overflow-hidden"
          }`}
        >
          <div className="flex justify-between items-center gap-3 mt-2">
            <div className="flex flex-col gap-3">
              <span className="text-md font-semibold text-white">{movieTitle}</span>
              <span className="text-sm text-gray-300">{releaseInfo}</span>
              <span className="text-sm text-gray-300">IMDB: {media.imdb_rank}</span>
            </div>
            <div className="flex items-center">
            <ul className="text-sm text-gray-300">
                {genreList.map((genre, index) => (
                  <li key={index}>{genre}</li>
                ))}
              </ul>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default MediaCard;