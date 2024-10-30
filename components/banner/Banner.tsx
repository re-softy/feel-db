import React from "react";
import BannerImage from "../assets/Banner.png";
import BannerItem from "./BannerItem";

function Banner() {
  return (
    <section className="w-full flex mt-3 h-[470px] gap-4">
      <BannerItem
        backgroundImage={BannerImage.src}
        title="Godzilla X Kong"
        isMain={true}
        showAdditionalInfo={true}
      />
      <div className="flex flex-col gap-y-4">
        <BannerItem backgroundImage={BannerImage.src} title="Uglies" />
        <BannerItem backgroundImage={BannerImage.src} title="Uglies" />
        <BannerItem backgroundImage={BannerImage.src} title="Uglies" />
      </div>
    </section>
  );
}

export default Banner;
