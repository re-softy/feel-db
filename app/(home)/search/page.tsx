import { Suspense } from 'react';
import { AllContentSkeleton } from "@/components/search/SearchSkeletons";
import DashboardLayout from "../DashboardLayout";
import SearchResult from '@/components/search/SearchResult';
import parseSearchParams from "@/utils/parseSearchParams";

type SearchPageProps = {
  searchParams: Record<string, string | string[] | undefined>;
};

export default function SearchPage({ searchParams }: SearchPageProps) {
  const apiParams = parseSearchParams(searchParams);

  return (
    <DashboardLayout>
      <main className="w-[90%] md:w-[85%] flex flex-col mx-auto my-4 gap-y-4">
        <h1 className="text-3xl font-medium">
          {apiParams.people ? `Movies with "${apiParams.people}"` :
           apiParams.keyword ? `Search results for "${apiParams.keyword}"` :
           "Search Results"}
        </h1>
        <Suspense fallback={<AllContentSkeleton />}>
          <SearchResult searchParams={searchParams} />
        </Suspense>
      </main>
    </DashboardLayout>
  );
}