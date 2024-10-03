"use client";

import { useState } from "react";
import Rating from "./Rating";

type MediaCardProps = {
  title: string;
  year: number;
  rating: string;
  runtime: string;
  genres: string;
  imageUrl: string;
  ratings?: { icon: string; percentage: number; count: number }[];
};

function MediaCard({ title, year, rating, runtime, genres, imageUrl, ratings = [] }: MediaCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative w-[270px] h-[460px] rounded-md flex flex-col overflow-hidden transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`w-full h-full bg-cover bg-center rounded-md transition-transform duration-300 ${
          isHovered ? "transform translate-y-[-20%]" : ""
        }`}
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="absolute bottom-0 w-full bg-[#2d2d2d] p-2 rounded-b-md z-10 flex flex-col justify-between transition-all duration-300">
     
        {/* <div className="flex items-center justify-between">
          {ratings.map((ratingData, index) => (
            <Rating
              key={index}
              icon={ratingData.icon}
              percentage={ratingData.percentage}
              count={ratingData.count}
            />
          ))}
        </div> */}

        {isHovered && (
          <div className="flex justify-around items-center gap-3 mt-2">
            <div className="flex flex-col gap-3">
              <span className="text-md font-semibold">{title}</span>
              <span className="text-sm">{`${year} • ${rating} • ${runtime}`}</span>
            </div>
            <div className="flex items-center">
              <ul>
                <li className="text-sm">{genres}</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MediaCard;