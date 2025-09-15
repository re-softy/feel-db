import MediaCard from "./MediaCard";
import Link from "next/link";
import { AllContentProps, MediaItem } from "@/types/types";

function AllContent({ mediaItems }: AllContentProps) {
  const mediaItemsArray = Array.isArray(mediaItems) ? mediaItems : (mediaItems.data || []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-6 justify-center gap-y-10 gap-x-6 my-10 px-4">
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