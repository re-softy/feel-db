import DashboardLayout from "./DashboardLayout";
import Banner from "@/components/banner/Banner";
import MediaList from "@/components/media/MediaList";
import MediaCarousel from "@/components/media/MediaCarousel";
import FavoritesSection from "@/components/media/FavoritesSection";
import {
  fetchHighRated,
  fetchLastReleasedAnimation,
  fetchLastReleasedSeries,
  fetchUserData,
} from "@/lib/api";

import { cookies } from 'next/headers';

async function Page() {
  const highRatedData = await fetchHighRated();
  const animationsData = await fetchLastReleasedAnimation();
  const seriesData = await fetchLastReleasedSeries();

  const cookieStore = cookies();
  const authToken = cookieStore.get('auth_token')?.value;

  let userData = null;

  if (authToken) {
    try {
      userData = await fetchUserData(authToken);
    } catch (error) {
      userData = null;
    }
  }

  const isAuthenticated = !!userData?.data?.user?.id;

  const highRated = highRatedData?.data || [];
  const animations = animationsData?.data || [];
  const series = seriesData?.data || [];

  return (
    <DashboardLayout>
      <main className="w-[90%] flex flex-col mx-auto px-[1vw] py-[25px]">
        <Banner />

        <MediaList title="Top 20 Most Popular" linkHref="/popular" linkText="See All">
          <MediaCarousel mediaItems={highRated} baseLinkHref="/popular" />
        </MediaList>

        <FavoritesSection isAuthenticated={isAuthenticated} />

        <MediaList title="Last Released Series" linkHref="/tvseries" linkText="See All">
          <MediaCarousel mediaItems={series} baseLinkHref="/tvseries" />
        </MediaList>

        <MediaList title="Last Released Animations" linkHref="/animations" linkText="See All">
          <MediaCarousel mediaItems={animations} baseLinkHref="/animations" />
        </MediaList>
      </main>
    </DashboardLayout>
  );
}

export default Page;