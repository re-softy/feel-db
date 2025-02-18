import Banner from "@/components/banner/Banner";
import DashboardLayout from "../DashboardLayout";
import AllContent from "@/components/media/AllContent";
import Pagination from "@/components/media/Pagination";
import { fetchCollection } from "@/lib/api";
import { PaginatedResponse, PageProps } from "@/types/types";

async function MoviesPage({ searchParams }: PageProps) {
  const currentPage = Math.max(1, Number(searchParams.page) || 1);
  const mediaData: PaginatedResponse = await fetchCollection(currentPage);

  const totalPages = mediaData?.hasNextPage ? currentPage + 1 : currentPage;

  return (
    <DashboardLayout>
      <main className="w-[90%] md:w-[85%] flex flex-col mx-auto my-4 gap-y-4">
        <h1 className="text-3xl font-medium">Movies</h1>
        <Banner />
        <AllContent mediaItems={mediaData} />
        {mediaData?.data?.length > 0 && (
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages}
            searchParams={searchParams}
          />
        )}
      </main>
    </DashboardLayout>
  );
}

export default MoviesPage;