import Rating from "../media/Rating";
import { MediaItem } from "@/types/types";
import { getTopEmotions } from "@/utils/emotionUtils";
import Image from "next/image";
import Link from "next/link";

interface BannerItemProps {
  mediaData: Partial<MediaItem>;
  isMain?: boolean;
  showAdditionalInfo?: boolean;
  priority?: boolean;
}

function BannerItem({ mediaData, isMain, showAdditionalInfo, priority=false }: BannerItemProps) {
  const { id, cover_path, title_en, release_year, runtime, genres_names, imdb_rank } = mediaData;
  const topEmotions = getTopEmotions(mediaData, 3);
  
  const bannerContent = (
    <div className={`relative rounded-[15px] w-full overflow-hidden cursor-pointer ${isMain ? "min-h-[580px] 3xl:min-h-[800px]" : "min-h-[180px] 3xl:min-h-[250px]"}`}>
      <div className="absolute inset-0">
        <Image
          src={cover_path || '/path/to/default/banner.jpg'}
          alt={title_en || ""}
          fill
          quality={80} 
          priority={priority}
          className="object-cover object-center"
          unoptimized={true}
          loading={priority ? "eager" : "lazy"}
        />
      </div>
      <div className="absolute inset-0 p-5 flex flex-col justify-end gap-2">
        <h2 className={`${isMain ? "text-2xl md:text-3xl font-bold" : "text-lg font-bold"}`}>
          {title_en}
        </h2>
        {showAdditionalInfo && (
          <div className="flex flex-col items-start md:flex-row md:items-center gap-2">
            <div className="flex justify-center gap-x-4">
              {imdb_rank && <span className="hidden md:flex text-xl">👍 {imdb_rank} • </span>}
              {release_year && <span className="text-lg md:text-xl">{release_year} • </span>}
              {runtime && <span className="text-lg md:text-xl">{runtime} • </span>}
            </div>
            {genres_names && (
              <div className="flex">
                <span className="text-lg md:text-xl">{genres_names}</span>
              </div>
            )}
          </div>
        )}
        <div className="flex w-full mt-2 md:mt-0">
          <div className="flex px-2 md:px-0 items-center self-end gap-2 border-[3px] border-orange py-2 rounded-full md:border-none">
            {topEmotions.map((emotion) => (
              <Rating
                key={emotion.id}
                icon={emotion.name.toLowerCase()}
                percentage={emotion.percentage}
                count={emotion.count}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Link href={`/media/${id}`} className="flex-1 block">
      {bannerContent}
    </Link>
  );
}

export default BannerItem;