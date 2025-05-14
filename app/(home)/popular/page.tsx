import Banner from "@/components/banner/Banner";
import DashboardLayout from "../DashboardLayout";
import AllContent from "@/components/media/AllContent";
import Pagination from "@/components/media/Pagination";
import { fetchHighRated } from "@/lib/api";
import { PageProps, PaginatedResponse } from "@/types/types";

async function PopularPage({ searchParams }: PageProps) {
  // Get popular/high-rated data
  const highRatedData = await fetchHighRated();
  
  // Format the data for AllContent component
  const paginatedData: PaginatedResponse = {
    current_page: 1,
    total: highRatedData?.data?.length || 0,
    per_page: highRatedData?.data?.length || 0,
    last_page: 1,
    hasNextPage: false,
    data: highRatedData?.data || []
  };

  return (
    <DashboardLayout>
      <main className="w-[90%] md:w-[85%] flex flex-col mx-auto my-4 gap-y-4">
        <h1 className="text-3xl font-medium">Top 20 Most Popular</h1>
        <Banner />
        <AllContent mediaItems={paginatedData} />
      </main>
    </DashboardLayout>
  );
}

export default PopularPage; 