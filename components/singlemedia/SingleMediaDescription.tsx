import MovieDetails from "./MovieDetails";
import RateMovie from "./RateMovie";
import { Emotion } from "@/types/types";

async function SingleMediaDescription({ media }: { media: any }) {
    if (!media?.movie) {
      return (
        <section className="flex flex-col items-center justify-center py-12">
          <p className="text-xl mb-4">Media information not available</p>
        </section>
      );
    }
  
    const movieData = media.movie;
    const emotions: Emotion[] = Object.values(movieData.emotions || {});
  
    return (
      <section className="flex flex-col items-start gap-4 lg:gap-6 my-4 lg:my-10">
        <div className="flex flex-col gap-2">
          <h1 className="text-lg md:text-2xl lg:text-3xl font-medium uppercase">
            {movieData.title_en || 'Untitled'}
          </h1>
        </div>
  
        <div className="flex flex-col gap-y-16 lg:flex-row lg:gap-y-0 lg:gap-x-10">
        <MovieDetails movie={movieData} emotions={emotions} />
          <RateMovie collectionId={movieData.id} emotions={emotions} />
        </div>
      </section>
    );
  }

export default SingleMediaDescription;