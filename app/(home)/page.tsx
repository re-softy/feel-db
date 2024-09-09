import HomePageBanner from "@/components/banner/HomePageBanner";
import DashboardLayout from "./DashboardLayout";
import MediaList from "@/components/media/MediaList";

function page() {
  return (
    <DashboardLayout>
      <main className="w-[90%] md:w-[85%] mx-auto py-[25px]">
      <HomePageBanner />
      <MediaList />
      </main>
    </DashboardLayout>
  )
}

export default page;