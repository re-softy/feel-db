import { fetchRandomPosters } from "@/lib/api";
import BannerItem from "./BannerItem";
import { MediaItem } from "@/types/types";

async function Banner() {
  const mediaData = await fetchRandomPosters();
  
  const mainItem = mediaData.data[0];
  const sideItems = mediaData.data.slice(1, 4);
  return (
    <section className="w-full flex mt-3 h-[470px] gap-4">
      <BannerItem
        backgroundImage={mainItem.poster_path || ''}
        title={mainItem.title_en || ''}
        isMain={true}
        showAdditionalInfo={true}
        mediaData={mainItem}
      />
      <div className="hidden lg:flex flex-col gap-y-4 w-[30%]">
        {sideItems.map((item: Partial<MediaItem>) => (
          <BannerItem
            key={item.id}
            backgroundImage={item.poster_path || ''}
            title={item.title_en || ''}
            mediaData={item}
          />
        ))}
      </div>
    </section>
  );
}

export default Banner;