import Banner from "@/components/banner/Banner";
import DashboardLayout from "./DashboardLayout";
import MediaList from "@/components/media/MediaList";

function page() {
  return (
    <DashboardLayout>
      <main className="w-[90%] md:w-[85%] lg:w-[80%] xl:w-[75%] flex flex-col mx-auto py-[25px]">
        <Banner isHomepage={true} />
        <MediaList />
      </main>
    </DashboardLayout>
  )
}

export default page;