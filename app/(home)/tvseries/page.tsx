import Banner from "@/components/banner/Banner";
import DashboardLayout from "../DashboardLayout";
import AllContent from "@/components/media/AllContent";
import Pagination from "@/components/media/Pagination";
import { fetchLastReleasedSeries } from "@/lib/api";
import { PageProps, PaginatedResponse } from "@/types/types";
import parseSearchParams from "@/utils/parseSearchParams";

async function TVSeriesPage({ searchParams }: PageProps) {
  const apiParams = parseSearchParams(searchParams);
  const currentPage = apiParams.page || 1;
  const perPage = apiParams.per_page || 20;

  let paginatedData: PaginatedResponse | null = null;

  try {
    const seriesData = await fetchLastReleasedSeries();

    paginatedData = {
      status: "success",
      data: seriesData,
      pagination: {
        current_page: currentPage,
        last_page: seriesData.last_page || 1,
        per_page: seriesData.per_page || perPage,
        total: seriesData.total || seriesData.data?.length || 0,
      },
    };
  } catch (error) {
    console.error("Error fetching TV series:", error);
  }

  return (
    <DashboardLayout>
      <main className="w-[96%] md:w-[94%] lg:w-[90%] flex flex-col mx-auto my-4 gap-y-4">
        <h1 className="text-3xl font-medium">TV Series</h1>
        <Banner />

        {paginatedData?.status === "success" && paginatedData?.data?.data?.length > 0 ? (
          <>
            <AllContent mediaItems={paginatedData.data} />
            {paginatedData.pagination.last_page > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={paginatedData.pagination.last_page}
                searchParams={searchParams}
              />
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-xl mb-4">No TV series found.</p>
          </div>
        )}
      </main>
    </DashboardLayout>
  );
}

export default TVSeriesPage;