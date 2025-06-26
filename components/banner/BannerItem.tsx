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
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
}

function BannerItem({ 
  mediaData, 
  isMain, 
  showAdditionalInfo, 
  priority = false,
  loading = "eager",
  fetchPriority = "auto"
}: BannerItemProps) {
  const { id, cover_path, title_en, release_year, runtime, genres_names, imdb_rank } = mediaData;
  const topEmotions = getTopEmotions(mediaData, 3);
  
  const imageSizes = isMain 
    ? "(max-width: 768px) 100vw, (max-width: 1280px) 70vw, 800px"
    : "(max-width: 1280px) 0px, 300px";

  const bannerContent = (
    <div className={`relative rounded-[15px] w-full overflow-hidden cursor-pointer ${isMain ? "min-h-[580px] 3xl:min-h-[800px]" : "min-h-[180px] 3xl:min-h-[250px]"}`}>
      <div className="absolute inset-0">
        <Image
          src={cover_path || '/path/to/default/banner.jpg'}
          alt={title_en || "Banner image"}
          fill
          quality={isMain ? 85 : 70}
          priority={priority}
          loading={priority ? undefined : loading}
          fetchPriority={fetchPriority}
          className="object-cover object-center"
          sizes={imageSizes}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R6ignmLoJHbt9XKNC1Y68V4WY8PJ6fZv0R6jhRwN5cw7jEOdZ2z/9k="
        />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      
      <div className="absolute inset-0 p-5 flex flex-col justify-end gap-2 text-white">
        <h2 className={`${isMain ? "text-2xl md:text-3xl font-bold" : "text-lg font-bold"} drop-shadow-lg`}>
          {title_en || 'Untitled'}
        </h2>
        {showAdditionalInfo && (
          <div className="flex flex-col items-start md:flex-row md:items-center gap-2">
            <div className="flex justify-center gap-x-4">
              {imdb_rank && <span className="hidden md:flex text-xl drop-shadow">👍 {imdb_rank} • </span>}
              {release_year && <span className="text-lg md:text-xl drop-shadow">{release_year} • </span>}
              {runtime && <span className="text-lg md:text-xl drop-shadow">{runtime} • </span>}
            </div>
            {genres_names && (
              <div className="flex">
                <span className="text-lg md:text-xl drop-shadow">{genres_names}</span>
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
    <Link 
      href={`/media/${id}`} 
      className="flex-1 block"
      prefetch={isMain}
    >
      {bannerContent}
    </Link>
  );
}

export default BannerItem;