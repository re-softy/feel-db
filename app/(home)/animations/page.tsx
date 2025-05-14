import Banner from "@/components/banner/Banner";
import DashboardLayout from "../DashboardLayout";
import AllContent from "@/components/media/AllContent";
import Pagination from "@/components/media/Pagination";
import { fetchLastReleasedAnimation } from "@/lib/api";
import { PageProps, PaginatedResponse } from "@/types/types";

async function AnimationsPage({ searchParams }: PageProps) {
  const animationsData = await fetchLastReleasedAnimation();
  
  const paginatedData: PaginatedResponse = {
    current_page: 1,
    total: animationsData?.data?.length || 0,
    per_page: animationsData?.data?.length || 0,
    last_page: 1,
    hasNextPage: false,
    data: animationsData?.data || []
  };

  return (
    <DashboardLayout>
      <main className="w-[90%] md:w-[85%] flex flex-col mx-auto my-4 gap-y-4">
        <h1 className="text-3xl font-medium">Animations</h1>
        <Banner />
        <AllContent mediaItems={paginatedData} />
      </main>
    </DashboardLayout>
  );
}

export default AnimationsPage; 