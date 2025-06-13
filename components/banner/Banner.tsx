import { fetchRandomPosters } from "@/lib/api";
import BannerItem from "./BannerItem";
import { MediaItem } from "@/types/types";

async function Banner() {
  const mediaData = await fetchRandomPosters();
  
  const mainItem = mediaData.data[0];
  const sideItems = mediaData.data.slice(1, 4);
  return (
    <section className="w-full flex mt-3 gap-4">
      <BannerItem
        backgroundImage={mainItem.cover_path}
        title={mainItem.title_en || ''}
        isMain={true}
        showAdditionalInfo={true}
        mediaData={mainItem}
      />
      <div className="hidden xl:flex flex-col gap-y-4 w-[30%]">
        {sideItems.map((item: any) => (
          <BannerItem
            key={item.id}
            backgroundImage={item.cover_path}
            title={item.title_en || ''}
            mediaData={item}
          />
        ))}
      </div>
    </section>
  );
}

export default Banner;