import DashboardLayout from "./DashboardLayout";
import Banner from "@/components/banner/Banner";
import MediaList from "@/components/media/MediaList";
import MediaSwiper from "@/components/media/MediaSwiper";
import FavoritesSignInCard from "@/components/media/FavoritesSignInCard";
import { fetchMainPageData } from "@/lib/api";

async function Page() {
  const data = await fetchMainPageData();

  const { movies, tvseries, animations } = data;

  return (
    <DashboardLayout>
      <main className="w-[90%] md:w-[85%] lg:w-[80%] xl:w-[75%] flex flex-col mx-auto py-[25px]">
        <Banner isHomepage={true} />
        
        <MediaList title="Top 20 Most Popular" linkHref="/" linkText="See All">
          <MediaSwiper mediaItems={movies} swiperId="movies"/>
        </MediaList>

        <MediaList title="Favorites" linkHref="/" linkText="See All">
          <FavoritesSignInCard />
        </MediaList>

        <MediaList title="Last Released Series" linkHref="/" linkText="See All">
          <MediaSwiper mediaItems={tvseries} swiperId="series"/>
        </MediaList>

        <MediaList title="Last Released Animations" linkHref="/" linkText="See All">
          <MediaSwiper mediaItems={animations}  swiperId="animations" />
        </MediaList>
      </main>
    </DashboardLayout>
  );
}

export default Page;
