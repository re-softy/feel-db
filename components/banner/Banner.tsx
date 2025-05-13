import BannerItem from "./BannerItem";
import { MediaItem } from "@/types/types";
import { fetchMainPageData } from "@/lib/api";

function getRandomItems(array: MediaItem[], count: number) {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

async function Banner() {
  const data = await fetchMainPageData();
  
  const allMedia = [
    ...(data.movies || []),
    ...(data.tvseries || []),
    ...(data.animations || [])
  ];
  
  const randomItems = getRandomItems(allMedia, 4);
  const mainItem = randomItems[0];
  const sideItems = randomItems.slice(1, 4);

  return (
    <section className="w-full flex mt-3 h-[470px] gap-4">
      <BannerItem
        backgroundImage={mainItem.poster}
        title={mainItem.title || ''}
        isMain={true}
        showAdditionalInfo={true}
        mediaData={mainItem}
      />
      <div className="hidden lg:flex flex-col gap-y-4">
        {sideItems.map((item) => (
          <BannerItem 
            key={item.id} 
            backgroundImage={item.poster}
            title={item.title || ''}
            mediaData={item}
          />
        ))}
      </div>
    </section>
  );
}

export default Banner;