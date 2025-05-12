"use client";

import { useState } from "react";
import Rating from "./Rating";
import { MediaItem } from "@/types/types";

const formatRuntime = (runtime: string) =>
  runtime.replace("hour", "h").replace("minutes", "m").replace(/\s+/g, " ");

function MediaCard({ media }: { media: MediaItem }) {
  const [isHovered, setIsHovered] = useState(false);
  const genreList = Array.isArray(media.genres)
    ? media.genres
    : typeof media.genres === "string"
      ? media.genres.split(",")
      : [];

  const topThreeEmotions = media.emotions ? 
    [...media.emotions]
      .sort((a, b) => b.count - a.count)
      .filter(emotion => emotion.count > 0)
      .slice(0, 3) 
    : [];
  
  const totalCount = media.emotions ? 
    media.emotions.reduce((sum, emotion) => sum + emotion.count, 0) : 0;

  if (!media) {
    return null;
  }

  return (
      <div
        className="relative w-[280px] h-[380px] rounded-md flex flex-col overflow-hidden transition-all duration-500 ease-in-out cursor-pointer"
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
          <div className="flex items-center justify-between">
            {topThreeEmotions.map((emotion, index) => {
              const percentage =
                totalCount > 0
                  ? (emotion.count / totalCount) * 100
                  : 0;

              return (
                <Rating
                  key={index}
                  icon={emotion.name.toLowerCase()}
                  percentage={percentage}
                  count={emotion.count}
                />
              );
            })}
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
                    <li key={index}>{genre.trim()}</li>
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