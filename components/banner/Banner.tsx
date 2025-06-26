import { getCachedBannerData } from "@/lib/bannerCache";
import { MediaItem } from "@/types/types";
import BannerItem from "./BannerItem";

async function Banner() {
  const data = await getCachedBannerData();
  
  if (!data || data.length === 0) {
    return (
      <section className="w-full flex mt-3 gap-4">
        <div className="flex items-center justify-center w-full h-[400px] rounded-lg">
          <p className="text-gray-400">No banner content available</p>
        </div>
      </section>
    );
  }

  const mainItem = data[0];
  const sideItems = data.slice(1, 4);

  return (
    <>
      {mainItem?.cover_path && (
        <link
          rel="preload"
          as="image"
          href={mainItem.cover_path}
          fetchPriority="high"
        />
      )}
      
      <section className="w-full flex mt-3 gap-4">
        <BannerItem
          isMain={true}
          showAdditionalInfo={true}
          mediaData={mainItem}
          priority={true}
          fetchPriority="high"
        />
        <div className="hidden xl:flex flex-col gap-y-4 w-[30%]">
          {sideItems.map((item: MediaItem, index: number) => (
            <BannerItem 
              key={item.id} 
              mediaData={item} 
              priority={false}
              loading="lazy"
              fetchPriority="low"
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default Banner;