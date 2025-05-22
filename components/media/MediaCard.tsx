"use client";

import { useState } from "react";
import Rating from "./Rating";
import { MediaItem } from "@/types/types";
import { getTopEmotions, formatRuntime } from "@/utils/emotionUtils";

function MediaCard({ media }: { media: MediaItem }) {
  const [isHovered, setIsHovered] = useState(false);
  
  const genreList = typeof media.genres === 'string' 
    ? media.genres.split(',').map(genre => genre.trim())
    : Array.isArray(media.genres) 
      ? media.genres 
      : [];

  const topEmotions = getTopEmotions(media, 3);

  if (!media) {
    return null;
  }

  return (
      <div
        className="relative w-[300px] h-[420px] rounded-md flex flex-col overflow-hidden transition-all duration-500 ease-in-out cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className={`w-full h-full bg-cover bg-center rounded-md transform transition-transform duration-500 ease-in-out ${isHovered ? "translate-y-[-20%] scale-105" : ""
            }`}
          style={{
            backgroundImage: `url(${media.poster})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
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
                <span className="text-md font-semibold">{media.title}</span>
                <span className="text-sm">{`${media.year} • ${formatRuntime(
                  media.runtime
                )}`}</span>
                <span className="text-sm">IMDB: {media.imdb.toFixed(1)}</span>
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