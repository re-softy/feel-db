// import { fetchDayTop } from "@/lib/api";
import { fetchMainPageData } from "@/lib/api";
import DashboardLayout from "../DashboardLayout";
import AllContent from "@/components/media/AllContent";

async function page() {
    const dayTopData = await fetchMainPageData();
  return (
    <DashboardLayout>
        <main className="w-[90%] md:w-[85%] lg:w-[80%] xl:w-[75%] flex flex-col mx-auto py-[25px]">
         <AllContent mediaItems={dayTopData} />
         </main>
    </DashboardLayout>
  )
}

export default page;