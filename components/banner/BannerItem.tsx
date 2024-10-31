import AddIcon from "@mui/icons-material/Add";

import Rating from "../media/Rating";

interface BannerItemProps {
  backgroundImage: string;
  title: string;
  isMain?: boolean;
  showAdditionalInfo?: boolean;
}

function BannerItem({
  backgroundImage,
  title,
  isMain = false,
  showAdditionalInfo = false,
}: BannerItemProps) {
  return (
    <div
      className={`flex-1 rounded-[15px] w-full bg-cover bg-center p-5 flex ${isMain ? "flex-col justify-between md:justify-end gap-4" : "flex-row items-end gap-4"
        }`}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {isMain && (
        <button className="flex self-end md:hidden items-center gap-3 border-2 border-white rounded-full p-2">
          <AddIcon fontSize="small" />
        </button>
      )}
      <div className={`flex ${isMain ? "flex-col gap-2" : "flex-col justify-end gap-2"}`}>
        <h2 className={`${isMain ? "text-2xl md:text-3xl font-bold" : "text-lg font-bold"}`}>
          {title}
        </h2>
        {showAdditionalInfo && (
          <div className="flex flex-col items-start md:flex-row md:items-center gap-2">
            <div className="flex gap-x-4">
              <span className="hidden md:flex text-lg">👍 98% &#x2022;</span>
              <span className="text-lg md:text-xl">2021 &#x2022; </span>
              <span className="text-lg md:text-xl">PG-13 &#x2022; </span>
            </div>
            <div className="flex">
              <span className="text-lg md:text-xl">Action &#x2022; Thriller &#x2022; Sci-Fi</span>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between w-full mt-2 md:mt-0">
          {isMain && (
            <button className="hidden md:flex items-center gap-3 border-2 border-orange rounded-full py-2 px-4">
              <AddIcon /> Favorites
            </button>
          )}
          <div className="flex items-center gap-2 border-[3px] border-orange px-4 py-2 rounded-full md:border-none">
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
