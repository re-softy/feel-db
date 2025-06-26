import DashboardLayout from "@/app/(home)/DashboardLayout";
import BannerSkeleton from "./BannerSkeleton";
import MediaListSkeleton from "./MediaListSkeleton";

export default function PageSkeleton() {
    return (
      <DashboardLayout>
        <main className="w-[90%] flex flex-col mx-auto px-[1vw] py-[25px]">
          <BannerSkeleton />
  
          <MediaListSkeleton title="Top 20 Most Popular" />
          <MediaListSkeleton title="Last Released Series" />
          <MediaListSkeleton title="Last Released Animations" />
        </main>
      </DashboardLayout>
    );
  }