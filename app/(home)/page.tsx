import DashboardLayout from "./DashboardLayout";
import Banner from "@/components/banner/Banner";
import MediaList from "@/components/media/MediaList";
import MediaSwiper from "@/components/media/MediaSwiper";
import { 
  fetchHighRated, 
  fetchLastReleasedAnimation, 
  fetchLastReleasedSeries,
  fetchUserData
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
  
  const isAuthor = userData?.id != null; 
  const hasFavorites = userData?.favorites && userData.favorites.length > 0;

  const { data } = highRatedData;
  const animations = animationsData?.data || [];
  const series = seriesData?.data || [];

  return (
    <DashboardLayout>
      <main className="w-[90%] flex flex-col mx-auto px-[1vw] py-[25px]">
        <Banner />
        
        <MediaList title="Top 20 Most Popular" linkHref="/popular" linkText="See All">
          <MediaSwiper mediaItems={data} swiperId="popular" baseLinkHref="/popular" />
        </MediaList>
        
        {isAuthor && hasFavorites ? (
          <MediaList title="Favorites" linkHref="/favorites" linkText="See All">
            <MediaSwiper mediaItems={userData.favorites} swiperId="favorites" baseLinkHref="/favorites" />
          </MediaList>
        ) : (
          <></>
        )}

        <MediaList title="Last Released Series" linkHref="/tvseries" linkText="See All">
          <MediaSwiper mediaItems={series} swiperId="tvseries" baseLinkHref="/tvseries" />
        </MediaList>

        <MediaList title="Last Released Animations" linkHref="/animations" linkText="See All">
          <MediaSwiper mediaItems={animations} swiperId="animations" baseLinkHref="/animations" />
        </MediaList>
      </main>
    </DashboardLayout>
  );
}

export default Page;