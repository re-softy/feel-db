"use client"

import Image from "next/image";
import { useState } from "react";

interface RatingProps {
  icon: string;
  percentage: number;
  count: number;
}

export default function Rating({ icon, percentage, count }: RatingProps) {
  const imagePath = `/emotions/${icon}.svg`;
  const [showTooltip, setShowTooltip] = useState(false);
  
  const emotionName = icon.charAt(0).toUpperCase() + icon.slice(1);

  return (
    <div 
      className="flex items-center justify-center gap-1 relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {showTooltip && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
          {emotionName}: {percentage.toFixed()}%
        </div>
      )}
        <Image 
        src={imagePath} 
        alt={icon} 
        width={20} 
        height={20} 
        className="w-[22px] md:w-[24px] lg:w-[26px] xl:w-[28px] 2xl:w-[30px] transition-all duration-200"
      />
      <div className="flex items-center gap-1">
      <span className="text-[16px]">{percentage.toFixed()}%</span>
      <span className="text-gray-400 text-[12px]">({count})</span>
      </div>
    </div>
  );
}