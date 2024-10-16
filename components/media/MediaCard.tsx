"use client";

import { useState } from "react";

import Rating from "./Rating";

type MediaCardProps = {
  title: string;
  year: number;
  runtime: string;
  genres: string;
  imageUrl: string;
  feelsTotalCount: number; 
  ratings?: { name: string; count: number }[];
};

const formatRuntime = (runtime: string) => {
  return runtime
    .replace("hour", "h")
    .replace("minutes", "m")
    .replace(/\s+/g, " ");
};

function MediaCard({ title, year, runtime, genres, imageUrl, ratings = [], feelsTotalCount }: MediaCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const genreList = genres.split(",");

  return (
    <div
      className="relative w-[270px] h-[460px] rounded-md flex flex-col overflow-hidden transition-all duration-300 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`w-full h-full bg-cover bg-center rounded-md transition-transform duration-300 ${isHovered ? "transform translate-y-[-20%]" : ""
          }`}
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="absolute bottom-0 w-full bg-[#2d2d2d] p-2 rounded-b-md z-10 flex flex-col justify-between transition-all duration-300">

        <div className="flex items-center justify-between">
          {ratings.map((ratingData, index) => {
            const percentage = feelsTotalCount > 0 ? (ratingData.count / feelsTotalCount) * 100 : 0; 

            return (
              <Rating
                key={index}
                icon={ratingData.name.toLowerCase()}
                percentage={percentage}
                count={ratingData.count}
              />
            );
          })}
        </div>

        {isHovered && (
          <div className="flex justify-between items-center gap-3 mt-2">
            <div className="flex flex-col gap-3">
              <span className="text-md font-semibold">{title}</span>
              <span className="text-sm">{`${year} • R • ${formatRuntime(runtime)}`}</span>
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