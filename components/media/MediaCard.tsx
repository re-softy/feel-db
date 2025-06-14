"use client";

import { useState } from "react";
import Image from "next/image";

import Rating from "./Rating";
import { MediaItem } from "@/types/types";
import { getTopEmotions, formatRuntime } from "@/utils/emotionUtils";

function MediaCard({ media }: { media: MediaItem }) {
  const [isHovered, setIsHovered] = useState(false);

  const genreList = typeof media.genres_names === 'string'
    ? media.genres_names.split(',').map(genre => genre.trim())
    : Array.isArray(media.genres_names)
      ? media.genres_names
      : [];

  const topEmotions = getTopEmotions(media, 3);

  if (!media) {
    return <div className="w-full h-full flex items-center justify-center">No media data available</div>;
  }

  return (
    <div
      className="relative w-[300px] h-[430px] 2xl:w-[340px] 2xl:h-[480px] 3xl:w-[400px] 3xl:h-[650px] rounded-md flex flex-col overflow-hidden transition-all duration-500 ease-in-out cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={media.poster_path || '/path/to/default/image.jpg'}
        alt={`${media.title_en} movie poster`}
        fill
        className={`object-cover object-bottom rounded-md transition-all duration-500 ease-in-out ${isHovered ? "translate-y-[-20%] scale-105" : ""
          }`}
        quality={90}
        loading="lazy"
        priority={false}
        unoptimized={false}
      />

      <div className="absolute bottom-0 w-full bg-[#2d2d2d] p-2 rounded-b-md z-10 flex flex-col justify-between transition-all duration-500 ease-in-out">
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

        {isHovered && (
          <div className="flex justify-between items-center gap-3 mt-2">
            <div className="flex flex-col gap-3">
              <span className="text-md font-semibold">{media.title_en}</span>
              <span className="text-sm">
                {media.release_year}
                {media.runtime ? ` • ${formatRuntime(media.runtime)}` : ''}
              </span>
              <span className="text-sm">IMDB: {media.imdb_rank}</span>
            </div>
            <div className="flex items-center">
              <ul className="text-sm">
                {genreList.map((genre, index) => (
                  <li key={index}>{genre}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MediaCard;