import { MediaCardSkeleton } from "../search/SearchSkeletons";

export default function UsersDashboardSkeleton() {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))] 2xl:grid-cols-4 3xl:grid-cols-5 gap-y-10 gap-x-6 my-10 px-4 place-items-center">
      {[...Array(8)].map((_, index) => (
        <div
          key={index}
          className="w-full transition-transform transform"
        >
          <MediaCardSkeleton />
        </div>
      ))}
    </div>
  );
};
