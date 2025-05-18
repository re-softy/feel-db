import AllContent from "@/components/media/AllContent";
import DashboardLayout from "../DashboardLayout";
import { searchMedia } from "@/lib/api";
import { PaginatedResponse } from "@/types/types";
import Pagination from "@/components/media/Pagination";
import parseSearchParams from "@/utils/parseSearchParams"


type SearchPageProps = {
  searchParams: Record<string, string | string[] | undefined>;
};

async function SearchPage({ searchParams }: SearchPageProps) {
    const apiParams = parseSearchParams(searchParams);
    const currentPage = apiParams.page || 1;

    let searchResults: PaginatedResponse | null = null;
    
    try {
        searchResults = await searchMedia(apiParams);
    } catch (error) {
        console.error("Error fetching search results:", error);
    }

    return (
        <DashboardLayout>
            <main className="w-[90%] md:w-[85%] flex flex-col mx-auto my-4 gap-y-4">
                <h1 className="text-3xl font-medium">
                    {apiParams.keyword ? `Search results for "${apiParams.keyword}"` : "Search Results"}
                </h1>
                
                {searchResults?.status === "success" && searchResults?.data?.data?.length > 0 ? (
                    <>
                        <AllContent mediaItems={searchResults.data} />
                        {searchResults.data.last_page > 1 && (
                            <Pagination 
                                currentPage={currentPage}
                                totalPages={searchResults.data.last_page} 
                                searchParams={searchParams}
                            />
                        )}
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center py-12">
                        <p className="text-xl mb-4">No results found for your search criteria.</p>
                        <p>Try adjusting your filters or search with different keywords.</p>
                    </div>
                )}
            </main>
        </DashboardLayout>
    );
}

export default SearchPage;