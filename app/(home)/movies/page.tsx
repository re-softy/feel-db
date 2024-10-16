import Banner from "@/components/banner/Banner";
import DashboardLayout from "../DashboardLayout";
import AllContent from "@/components/media/AllContent";
import { fetchCollection } from "@/lib/api";

async function page() {
  const mediaData = await fetchCollection();
  return (
    <DashboardLayout>
      <main className="w-[90%] md:w-[85%] lg:w-[80%] xl:w-[75%] flex flex-col mx-auto py-[25px]">
        <h1 className="text-3xl font-medium">Movies</h1>
        <Banner isHomepage={false} newButtonText="Learn More" />
        <AllContent mediaItems={mediaData}/>
      </main>
    </DashboardLayout>
  )
}

export default page;