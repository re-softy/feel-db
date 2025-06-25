import Image from 'next/image';
import BookmarkButton from "./BookmarkButton";
import { MoviePosterProps } from "@/types/types";

function MoviePoster({ coverPath, title, movieId, movieData }: MoviePosterProps) {
    const bookmarkMovieData = movieData || {
        id: movieId,
        title_en: title,
        cover_path: coverPath,
    };

    return (
      <div className="relative w-fit">
        <Image
          src={coverPath || '/placeholder-movie.png'}
          alt={`${title} Poster`}
          width={600}
          height={540}
          className="rounded-lg w-full h-auto object-cover"
          unoptimized
        />
        <BookmarkButton movieId={movieId} movieData={bookmarkMovieData} />
      </div>
    );
}

export default MoviePoster;