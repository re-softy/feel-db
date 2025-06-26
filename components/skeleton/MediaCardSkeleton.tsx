export default function MediaCardSkeleton() {
    return (
      <div className="relative w-full pb-[138.71%] rounded-md overflow-hidden">
        <div className="absolute inset-0 bg-grey rounded-md animate-pulse" />
        <div className="absolute bottom-0 w-full bg-[#2d2d2d] p-2 rounded-b-md z-10 flex flex-col justify-between h-10">
        </div>
      </div>
    );
  }