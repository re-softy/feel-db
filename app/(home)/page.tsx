import HomePageBanner from "@/components/banner/HomePageBanner";
import DashboardLayout from "./DashboardLayout";

function page() {
  return (
    <DashboardLayout>
      <main className="w-[90%] md:w-[85%] mx-auto py-[25px]">
      <HomePageBanner />
      </main>
    </DashboardLayout>
  )
}

export default page;