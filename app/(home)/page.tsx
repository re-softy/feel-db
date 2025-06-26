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
  const cookieStore = cookies();
  const authToken = cookieStore.get('auth_token')?.value;


  const promises = [
    fetchHighRated(),
    fetchLastReleasedAnimation(),
    fetchLastReleasedSeries(),

    authToken ? fetchUserData(authToken) : Promise.resolve(null)
  ];

  const [
    highRatedResult,
    animationsResult,
    seriesResult,
    userDataResult
  ] = await Promise.allSettled(promises);

  const highRated = highRatedResult.status === 'fulfilled' 
    ? (highRatedResult.value?.data || []) 
    : [];

  const animations = animationsResult.status === 'fulfilled' 
    ? (animationsResult.value?.data || []) 
    : [];

  const series = seriesResult.status === 'fulfilled' 
    ? (seriesResult.value?.data || []) 
    : [];

  const userData = userDataResult.status === 'fulfilled' 
    ? userDataResult.value 
    : null;

  const isAuthenticated = !!userData?.data?.user?.id;

  return (
    <DashboardLayout>
      <main className="w-[90%] flex flex-col mx-auto px-[1vw] py-[25px]">
        <Banner />

        <MediaList title="Top 20 Most Popular" linkHref="/popular" linkText="See All">
          <MediaCarousel mediaItems={highRated} baseLinkHref="/popular" mediaType="popular"/>
        </MediaList>

        <FavoritesSection isAuthenticated={isAuthenticated} />

        <MediaList title="Last Released Series" linkHref="/tvseries" linkText="See All">
          <MediaCarousel mediaItems={series} baseLinkHref="/tvseries" mediaType="series"/>
        </MediaList>

        <MediaList title="Last Released Animations" linkHref="/animations" linkText="See All">
          <MediaCarousel mediaItems={animations} baseLinkHref="/animations" mediaType="animation"/>
        </MediaList>
      </main>
    </DashboardLayout>
  );
}

export default Page;