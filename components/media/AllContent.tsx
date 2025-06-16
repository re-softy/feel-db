import MediaCard from "./MediaCard";
import Link from "next/link";
import { AllContentProps, MediaItem } from "@/types/types";

function AllContent({ mediaItems }: AllContentProps) {
  const mediaItemsArray = Array.isArray(mediaItems) ? mediaItems : (mediaItems.data || []);

  return (
    <div className="grid grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))] 2xl:grid-cols-4 3xl:grid-cols-5 gap-y-10 gap-x-6 my-10 px-4 place-items-center">
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