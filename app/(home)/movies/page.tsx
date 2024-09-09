import HomePageBanner from "@/components/banner/HomePageBanner";
import DashboardLayout from "../DashboardLayout";
import AllContent from "@/components/media/AllContent";

function page() {
  return (
    <DashboardLayout>
        <main className="w-[80%] md:w-[76%] mx-auto py-[25px]">
            <h1 className="text-3xl font-medium">Movies</h1>
        <HomePageBanner/>
        <AllContent />
        </main>
    </DashboardLayout>
  )
}

export default page;