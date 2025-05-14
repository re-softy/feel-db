import Banner from "@/components/banner/Banner";
import DashboardLayout from "../DashboardLayout";
import AllContent from "@/components/media/AllContent";
import Pagination from "@/components/media/Pagination";
import { fetchLastReleasedSeries } from "@/lib/api";
import { PageProps, PaginatedResponse } from "@/types/types";

async function TVSeriesPage({ searchParams }: PageProps) {
  const seriesData = await fetchLastReleasedSeries();
  
  const paginatedData: PaginatedResponse = {
    current_page: 1,
    total: seriesData?.data?.length || 0,
    per_page: seriesData?.data?.length || 0,
    last_page: 1,
    hasNextPage: false,
    data: seriesData?.data || []
  };

  return (
    <DashboardLayout>
      <main className="w-[90%] md:w-[85%] flex flex-col mx-auto my-4 gap-y-4">
        <h1 className="text-3xl font-medium">TV Series</h1>
        <Banner />
        <AllContent mediaItems={paginatedData} />
      </main>
    </DashboardLayout>
  );
}

export default TVSeriesPage; 