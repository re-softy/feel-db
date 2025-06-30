import MediaCard from "./MediaCard";
import Link from "next/link";
import { AllContentProps, MediaItem } from "@/types/types";

function AllContent({ mediaItems }: AllContentProps) {
  const mediaItemsArray = Array.isArray(mediaItems) ? mediaItems : (mediaItems.data || []);

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,320px))] justify-center gap-y-10 gap-x-6 my-10 px-4">
      {mediaItemsArray.map((mediaItem: MediaItem) => (
        <Link 
          key={mediaItem.id} 
          href={`/media/${mediaItem.id}`} 
          className="w-full group transition-transform transform hover:scale-105"
        >
          <MediaCard media={mediaItem} />
        </Link>
      ))}
    </div>
  );
}

export default AllContent;