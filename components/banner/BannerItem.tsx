import AddIcon from "@mui/icons-material/Add";
import Rating from "../media/Rating";
import { MediaItem } from "@/types/types";
import { getTopEmotions, formatGenres } from "@/utils/emotionUtils";

interface BannerItemProps {
  backgroundImage: string;
  title: string;
  isMain?: boolean;
  showAdditionalInfo?: boolean;
  mediaData?: Partial<MediaItem>;
}

function BannerItem({
  backgroundImage,
  title,
  isMain = false,
  showAdditionalInfo = false,
  mediaData,
}: BannerItemProps) {
  const year = mediaData?.year;
  const rating = mediaData?.rating;
  
  const genres = formatGenres(mediaData?.genres);
  
  const imdbRating = mediaData?.imdb;
  
  const topEmotions = getTopEmotions(mediaData, 3);
  const hasEmotions = topEmotions.length > 0;

  return (
    <div
      className={`flex-1 rounded-[15px] w-full bg-cover bg-center p-5 flex ${
        isMain ? "flex-col justify-end gap-4" : "flex-row items-end gap-4"
      }`}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* {isMain && (
        <button className="flex self-end md:hidden items-center gap-3 border-2 border-white rounded-full p-2">
          <AddIcon fontSize="small" />
        </button>
      )} */}
      <div className={`flex ${isMain ? "flex-col gap-2" : "flex-col justify-end gap-2"}`}>
        <h2 className={`${isMain ? "text-2xl md:text-3xl font-bold" : "text-lg font-bold"}`}>
          {title}
        </h2>
        {showAdditionalInfo && (
          <div className="flex flex-col items-start md:flex-row md:items-center gap-2">
            <div className="flex gap-x-4">
              {imdbRating && <span className="hidden md:flex text-lg">👍 {imdbRating}% &#x2022;</span>}
              {year && <span className="text-lg md:text-xl">{year} &#x2022; </span>}
              {rating && <span className="text-lg md:text-xl">{rating} &#x2022; </span>}
            </div>
            {genres && (
              <div className="flex">
                <span className="text-lg md:text-xl">{genres}</span>
              </div>
            )}
          </div>
        )}

        <div className="flex w-full mt-2 md:mt-0">
          {/* {isMain && (
            <button className="hidden md:flex items-center gap-3 border-2 border-orange rounded-full py-2 px-4">
              <AddIcon /> Favorites
            </button>
          )} */}
          <div className="flex px-2 md:px-0 items-center self-end gap-2 border-[3px] border-orange py-2 rounded-full md:border-none">
            {hasEmotions ? (
              topEmotions.map((emotion) => (
                <Rating 
                  key={emotion.id} 
                  icon={emotion.name.toLowerCase()} 
                  percentage={emotion.percentage} 
                  count={emotion.count} 
                />
              ))
            ) : (
              <span className="text-sm px-2"></span>
            )}
          </div>
        </div>
      </div>
      {/* {!isMain && (
        <button className="flex items-center gap-3 border-2 border-orange rounded-full p-1">
          <AddIcon fontSize="small" />
        </button>
      )} */}
    </div>
  );
};

export default BannerItem;
