"use client"
import React, { useState } from "react";
import Test from "../assets/test.png";
import Rating from "./Rating";

function MediaCard() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative w-[270px] h-[360px] rounded-md flex flex-col overflow-hidden transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`w-full h-full bg-cover bg-center rounded-md transition-transform duration-300 ${isHovered ? "transform translate-y-[-20%]" : ""
          }`}
        style={{
          backgroundImage: `url(${Test.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="absolute bottom-0 w-full bg-[#2d2d2d] p-2 rounded-b-md z-10 flex flex-col justify-between transition-all duration-300">
        <div className="flex items-center justify-between">
          <Rating icon="😈" percentage={24} count={12} />
          <Rating icon="🤡" percentage={24} count={12} />
          <Rating icon="😐" percentage={24} count={12} />
        </div>
        {isHovered && (
          <div className="flex justify-around items-center gap-3 mt-2">
            <div className="flex flex-col gap-3">
              <span className="text-md font-semibold">Deadpool & Wolverine</span>
              <span className="text-sm">2024 • R • 1h 44min</span>
            </div>
            <div className="flex items-center">
              <ul>
                <li className="text-sm">Action</li>
                <li className="text-sm">Thriller</li>
                <li className="text-sm">Sci-Fi</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MediaCard;
