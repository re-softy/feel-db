import BannerImage from "../assets/Banner.png";
import Rating from "../media/Rating";
import AddIcon from '@mui/icons-material/Add';
import React from "react";

interface BannerProps {
  isHomepage: boolean;
  newButtonText?: string;
}

function Banner({ isHomepage, newButtonText }: BannerProps) {
  return (
    <section className="w-full flex flex-col gap-2 mt-3 h-[320px]">
      <div
        className="flex-1 rounded-[15px] w-full bg-cover bg-center flex flex-col justify-end p-5 gap-4"
        style={{ backgroundImage: `url(${BannerImage.src})` }}
      >
        <h1 className="text-3xl font-medium">Godzilla X Kong</h1>
        <div className="flex items-center gap-2">
          <span className="text-md">👍 98% • </span>
          <span className="text-md">2021 • </span>
          <span className="text-md">PG-13 • </span>
          <span className="text-md">Action Thriller Sci-Fi</span>
        </div>
        <div className="flex items-end justify-between">
          <div className="flex items-center gap-3">
            {!isHomepage && newButtonText && (
              <button className="flex items-center gap-3 bg-[#ff7f50] rounded-full py-2 px-4">
                {newButtonText}
              </button>
            )}
            <button className="flex items-center gap-3 border-2 border-orange-600 rounded-full py-2 px-4">
              <AddIcon />Favorites
            </button>
          </div>

          {isHomepage && (
            <div className="flex items-center gap-2">
              <Rating icon="😈" percentage={24} count={12} />
              <Rating icon="🤡" percentage={24} count={12} />
              <Rating icon="😐" percentage={24} count={12} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Banner;
