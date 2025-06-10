import Banner from "@/components/banner/Banner";
import DashboardLayout from "../DashboardLayout";
import AllContent from "@/components/media/AllContent";
import Pagination from "@/components/media/Pagination";
import { fetchHighRated } from "@/lib/api";
import { PageProps, PaginatedResponse } from "@/types/types";
import parseSearchParams from "@/utils/parseSearchParams";

async function PopularPage({ searchParams }: PageProps) {
  const apiParams = parseSearchParams(searchParams);
  const currentPage = apiParams.page || 1;
  const perPage = apiParams.per_page || 20;

  let paginatedData: PaginatedResponse | null = null;

  try {
    const highRatedData = await fetchHighRated();

    paginatedData = {
      status: "success",
      data: highRatedData,
      pagination: {
        current_page: currentPage,
        last_page: highRatedData.last_page || 1,
        per_page: highRatedData.per_page || perPage,
        total: highRatedData.total || highRatedData.data?.length || 0,
      },
    };
  } catch (error) {
    console.error("Error fetching high-rated content:", error);
  }

  return (
    <DashboardLayout>
      <main className="w-[90%] md:w-[85%] flex flex-col mx-auto my-4 gap-y-4">
        <h1 className="text-3xl font-medium">Top 20 Most Popular</h1>
        {/* <Banner /> */}

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
            <p className="text-xl mb-4">No popular content found.</p>
          </div>
        )}
      </main>
    </DashboardLayout>
  );
}

export default PopularPage;