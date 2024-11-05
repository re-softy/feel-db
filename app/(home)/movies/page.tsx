import Banner from "@/components/banner/Banner";
import DashboardLayout from "../DashboardLayout";
import AllContent from "@/components/media/AllContent";
import { fetchCollection } from "@/lib/api";

async function page() {
  const mediaData = await fetchCollection();
  return (
    <DashboardLayout>
      <main className="w-[86%] flex flex-col mx-auto px-[1vw] py-[25px]">
        <h1 className="text-3xl font-medium">Movies</h1>
        <Banner />
        <AllContent mediaItems={mediaData}/>
      </main>
    </DashboardLayout>
  )
}

export default page;