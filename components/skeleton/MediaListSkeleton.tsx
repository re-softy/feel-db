import MediaCarouselSkeleton from "@/components/skeleton/MediaCarouselSkeleton";

interface MediaListSkeletonProps {
  title: string;
}

export default function MediaListSkeleton({ title }: MediaListSkeletonProps) {
  return (
    <section className="w-full">
      <div className="flex items-center my-6 justify-between border-l-4 pl-2 border-[#ff7f50]">
        <span className="text-xl lg:text-lg xl:text-2xl 2xl:text-3xl text-[#E2E2E9] uppercase">
          {title}
        </span>
      </div>
      <MediaCarouselSkeleton />
    </section>
  );
}