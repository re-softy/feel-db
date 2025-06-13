import AddIcon from "@mui/icons-material/Add";
import Rating from "../media/Rating";
import { MediaItem } from "@/types/types";
import { getTopEmotions, formatGenres } from "@/utils/emotionUtils";
import Image from "next/image";

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

  const year = mediaData?.release_year;
  const runtime = mediaData?.runtime;

  const genres = mediaData?.genres_names || "";

  const imdbRating = mediaData?.imdb_rank;

  const topEmotions = getTopEmotions(mediaData, 3);

  return (
    <div
      className={`relative flex-1 rounded-[15px] w-full overflow-hidden ${isMain ? "min-h-[580px] 3xl:min-h-[800px]" : "h-[150px]"
        }`}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <Image
          src={backgroundImage}
          alt={title}
          fill
          quality={90}
          loading="lazy"
          className="object-cover object-center"
          sizes="(max-width: 1024px) 100vw, 66vw"
        />
      </div>
      {/* {isMain && (
        <button className="flex self-end md:hidden items-center gap-3 border-2 border-white rounded-full p-2">
          <AddIcon fontSize="small" />
        </button>
      )} */}
      <div className="absolute inset-0 p-5 flex flex-col justify-end gap-2">
        <h2 className={`${isMain ? "text-2xl md:text-3xl font-bold" : "text-lg font-bold"}`}>
          {title}
        </h2>
        {showAdditionalInfo && (
          <div className="flex flex-col items-start md:flex-row md:items-center gap-2">
            <div className="flex justify-center gap-x-4">
              {imdbRating && <span className="hidden md:flex text-xl">👍 {imdbRating} &#x2022; </span>}
              {year && <span className="text-lg md:text-xl">{year} &#x2022; </span>}
              {runtime && <span className="text-lg md:text-xl">{runtime} &#x2022; </span>}
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
            <button className="hidden msd:flex items-center gap-3 border-2 border-orange rounded-full py-2 px-4">
              <AddIcon /> Favorites
            </button>
          )} */}
          <div className="flex px-2 md:px-0 items-center self-end gap-2 border-[3px] border-orange py-2 rounded-full md:border-none">
            {
              topEmotions.map((emotion) => (
                <Rating
                  key={emotion.id}
                  icon={emotion.name.toLowerCase()}
                  percentage={emotion.percentage}
                  count={emotion.count}
                />
              ))
            }
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
