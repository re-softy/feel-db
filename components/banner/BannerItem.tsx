import React from "react";
import AddIcon from "@mui/icons-material/Add";
import Rating from "../media/Rating";

interface BannerItemProps {
  backgroundImage: string;
  title: string;
  isMain?: boolean;
  showAdditionalInfo?: boolean;
}

const BannerItem: React.FC<BannerItemProps> = ({
  backgroundImage,
  title,
  isMain = false,
  showAdditionalInfo = false,
}) => {
  return (
    <div
      className={`flex-1 rounded-[15px] w-full bg-cover bg-center p-5 flex ${
        isMain ? "flex-col justify-end gap-4" : "flex-row items-end gap-4"
      }`}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className={`flex ${isMain ? "flex-col gap-2" : "flex-col justify-end gap-2"}`}>
        <h2 className={`${isMain ? "text-3xl font-bold" : "text-lg font-bold"}`}>
          {title}
        </h2>
        {showAdditionalInfo && (
          <div className="flex items-center gap-2">
            <span className="text-md">👍 98% • </span>
            <span className="text-md">2021 • </span>
            <span className="text-md">PG-13 • </span>
            <span className="text-md">Action Thriller Sci-Fi</span>
          </div>
        )}
     
      <div className="flex items-center justify-between w-full">
        {isMain && (
          <button className="flex items-center gap-3 border-2 border-orange rounded-full py-2 px-4">
            <AddIcon /> Favorites
          </button>
        )}
        <div className="flex items-center gap-2">
          <Rating icon="anger" percentage={98} count={21} />
          <Rating icon="anger" percentage={98} count={20} />
          <Rating icon="anger" percentage={98} count={21} />
        </div>
      </div>
      </div>
      {!isMain && (
        <button className="flex items-center gap-3 border-2 border-orange rounded-full p-1">
          <AddIcon fontSize="small" />
    </button>
     )}
     </div>
  );
};

export default BannerItem;
