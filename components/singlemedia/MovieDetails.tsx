import MoviePoster from "./MoviePoster";
import MovieRating from "./MovieRating";
import GenreList from "./GenreList";
import PersonList from "./PersonList";
import { MovieDetailsProps, PersonData } from "@/types/types";

function MovieDetails({ movie, emotions }: MovieDetailsProps) {
    const shouldShowDivider = (current: PersonData[], next: PersonData[]) => {
      return current?.length > 0 && next?.length > 0;
    };
  
    return (
        <div className="flex flex-col lg:items-start gap-y-4 rounded-xl">
        <MoviePoster 
          coverPath={movie.cover_path} 
          title={movie.title_en} 
          movieId={movie.id}
          movieData={movie}
        />
        
        <MovieRating imdbRank={movie.imdb_rank} emotions={emotions} />
        
        <GenreList genres={movie.genres_names} />
        
        <p className="text-md w-full lg:text-lg text-gray-300 my-2">
          {movie.emotions_description || 'No description available.'}
        </p>
  
        <div className="space-y-6">
          <PersonList people={movie.directors_data} title="Director" />
          
          {shouldShowDivider(movie.directors_data, movie.writers_data) && (
            <hr className="border-gray-600 w-full" />
          )}
          
          <PersonList people={movie.writers_data} title="Writer" />
          
          {shouldShowDivider(movie.writers_data, movie.actors_data) && (
            <hr className="border-gray-600 w-full" />
          )}
          
          <PersonList people={movie.actors_data} title="Actor" />
        </div>
      </div>
    );
  }

export default MovieDetails;