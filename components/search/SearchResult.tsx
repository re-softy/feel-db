import AllContent from "@/components/media/AllContent";
import Pagination from "@/components/media/Pagination";
import { searchMedia } from "@/lib/api";
import { PaginatedResponse } from "@/types/types";
import parseSearchParams from "@/utils/parseSearchParams";

type SearchResultsProps = {
  searchParams: Record<string, string | string[] | undefined>;
};

export default async function SearchResult({ searchParams }: SearchResultsProps) {
  const apiParams = parseSearchParams(searchParams);
  
  try {
    const searchResults: PaginatedResponse = await searchMedia(apiParams);
    const currentPage = apiParams.page || 1;

    if (searchResults.status !== "success" || !searchResults.data) {
      return (
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-xl mb-4">No results found for your search criteria.</p>
          <p>Try adjusting your filters or search with different keywords.</p>
        </div>
      );
    }

    let mediaItems: any[] = [];
    
    if (Array.isArray(searchResults.data)) {
      mediaItems = searchResults.data;
    } else if (searchResults.data.data && Array.isArray(searchResults.data.data)) {
      mediaItems = searchResults.data.data;
    } else {
      mediaItems = Object.values(searchResults.data);
    }

    if (mediaItems.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-xl mb-4">No results found for your search criteria.</p>
          <p>Try adjusting your filters or search with different keywords.</p>
        </div>
      );
    }

    return (
      <>
        
        <AllContent mediaItems={searchResults.data} />
        
        {searchResults.pagination?.last_page && searchResults.pagination.last_page > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={searchResults.pagination.last_page}
            searchParams={searchParams}
          />
        )}
      </>
    );
  } catch (error) {
    console.error('Error fetching search results:', error);
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-xl mb-4">Error loading search results.</p>
        <p>Please try again later.</p>
      </div>
    );
  }
}