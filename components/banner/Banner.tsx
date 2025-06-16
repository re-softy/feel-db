import { fetchRandomPosters } from "@/lib/api";
import { MediaItem } from "@/types/types";
import BannerItem from "./BannerItem";

async function Banner() {
  const response = await fetchRandomPosters();
  
  if (!response || !response.data || !Array.isArray(response.data) || response.data.length === 0) {
    return (
      <section className="w-full flex mt-3 gap-4">
        <div className="flex items-center justify-center w-full h-[400px] bg-gray-800 rounded-lg">
          <p className="text-gray-400">No banner content available</p>
        </div>
      </section>
    );
  }

  const { data } = response;
  const mainItem = data[0];
  const sideItems = data.slice(1, 4);

  return (
    <section className="w-full flex mt-3 gap-4">
      <BannerItem
        isMain={true}
        showAdditionalInfo={true}
        mediaData={mainItem}
      />
      <div className="hidden xl:flex flex-col gap-y-4 w-[30%]">
        {sideItems.map((item: MediaItem) => (
          <BannerItem key={item.id} mediaData={item} />
        ))}
      </div>
    </section>
  );
}

export default Banner;