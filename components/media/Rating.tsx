"use client"

import { useState } from "react";
import { getEmojiForEmotion } from '@/utils/emoji';

interface RatingProps {
  icon: string;
  percentage: number;
  count: number | string;
}

export default function Rating({ icon, percentage, count }: RatingProps) {
  const emoji = getEmojiForEmotion(icon);
  const [showTooltip, setShowTooltip] = useState(false);

  const emotionName = icon.charAt(0).toUpperCase() + icon.slice(1);

  return (
    <div
      className="flex items-center justify-center gap-1 relative min-w-[80px]"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {showTooltip && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
          {emotionName}: {percentage.toFixed()}%
        </div>
      )}
      <span className="w-[24px] 2xl:w-[30px] 3xl:w-[36px] text-xl lg:text-2xl 2xl:text-3xl flex items-center justify-center">
        {emoji}
      </span>
      <div className="flex items-center gap-0.5">
        <span className="text-md text-white">{percentage.toFixed()}%</span>
        <span className="text-gray-400 text-[12px] overflow-hidden text-ellipsis max-w-[50px]">({count})</span>
      </div>
    </div>
  );
}