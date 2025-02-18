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
      <main className="w-[90%] flex flex-col mx-auto px-[1vw] py-[25px]">
        <Banner />
        
        <MediaList title="Top 20 Most Popular" linkHref="/movies" linkText="See All">
        <MediaSwiper mediaItems={movies} swiperId="movies" baseLinkHref="/movies" />
        </MediaList>

        <MediaList title="Favorites" linkHref="/movies" linkText="See All">
          <FavoritesSignInCard />
        </MediaList>

        <MediaList title="Last Released Series" linkHref="/movies" linkText="See All">
        <MediaSwiper mediaItems={movies} swiperId="movies" baseLinkHref="/movies" />
        </MediaList>

        <MediaList title="Last Released Animations" linkHref="/movies" linkText="See All">
        <MediaSwiper mediaItems={movies} swiperId="movies" baseLinkHref="/movies" />
        </MediaList>
      </main>
    </DashboardLayout>
  );
}

export default Page;
