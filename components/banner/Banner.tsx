import { fetchRandomPosters } from "@/lib/api";
import { MediaItem } from "@/types/types";
import BannerItem from "./BannerItem";

async function Banner() {
  const { data } = await fetchRandomPosters();

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