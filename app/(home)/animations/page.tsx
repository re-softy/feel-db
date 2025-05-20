import Banner from "@/components/banner/Banner";
import DashboardLayout from "../DashboardLayout";
import AllContent from "@/components/media/AllContent";
import Pagination from "@/components/media/Pagination";
import { fetchLastReleasedAnimation } from "@/lib/api";
import { PageProps, PaginatedResponse } from "@/types/types";
import parseSearchParams from "@/utils/parseSearchParams";

async function AnimationsPage({ searchParams }: PageProps) {
  const apiParams = parseSearchParams(searchParams);
  const currentPage = apiParams.page || 1;

  let paginatedData: PaginatedResponse | null = null;

  try {
    const animationsData = await fetchLastReleasedAnimation();
    paginatedData = {
      status: "success",
      data: animationsData,
      pagination: {
        current_page: currentPage,
        last_page: animationsData.last_page || 1,
        per_page: animationsData.per_page || 10,
        total: animationsData.total || animationsData.data?.length || 0,
      },
    };
  } catch (error) {
    console.error("Error fetching animations:", error);
  }

  return (
    <DashboardLayout>
      <main className="w-[90%] md:w-[85%] flex flex-col mx-auto my-4 gap-y-4">
        <h1 className="text-3xl font-medium">Animations</h1>
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
            <p className="text-xl mb-4">No animations found.</p>
          </div>
        )}
      </main>
    </DashboardLayout>
  );
}

export default AnimationsPage;