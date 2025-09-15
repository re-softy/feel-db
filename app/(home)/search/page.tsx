import { Suspense } from 'react';
import { AllContentSkeleton } from "@/components/search/SearchSkeletons";
import DashboardLayout from "../DashboardLayout";
import SearchResult from '@/components/search/SearchResult';
import ActiveFilters from '@/components/search/ActiveFilters';
import parseSearchParams from "@/utils/parseSearchParams";

type SearchPageProps = {
  searchParams: Record<string, string | string[] | undefined>;
};

export default function SearchPage({ searchParams }: SearchPageProps) {
  const apiParams = parseSearchParams(searchParams);

  return (
    <DashboardLayout>
      <main className="w-[96%] md:w-[94%] lg:w-[90%] flex flex-col mx-auto my-8 gap-y-4">
        <h1 className="text-2xl 3xl:text-3xl font-medium mx-2">
          {apiParams.people ? `Movies with "${apiParams.people}"` :
           apiParams.keyword ? `Search results for "${apiParams.keyword}"` :
           "Search Results"}
        </h1>
        
        <ActiveFilters searchParams={searchParams} />
        
        <Suspense fallback={<AllContentSkeleton />}>
          <SearchResult searchParams={searchParams} />
        </Suspense>
      </main>
    </DashboardLayout>
  );
}