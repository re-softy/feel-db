import Link from "next/link";
import MediaSwiper from "./MediaSwiper";

import 'swiper/css/navigation';
import 'swiper/css';


function MediaList() {

  return (
    <section className="w-full">
      <div className="flex items-center my-6 justify-between border-l-4 pl-2 border-[#ff7f50]">
        <span className="text-xl text-[#E2E2E9] uppercase">Top 20 Most Popular</span>
        <Link href={"#"} className="text-[#ff7f50]">
          See All
        </Link>
      </div> 
      <MediaSwiper />
    </section>
  );
}

export default MediaList;
