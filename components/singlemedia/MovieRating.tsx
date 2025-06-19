import { MovieRatingProps } from '@/types/types';

function MovieRating({ imdbRank }: MovieRatingProps) {
    return (
        <div className="flex items-center gap-8 text-gray-400">
            <div className="flex items-center gap-1">
                <span className="text-base lg:text-2xl font-semibold tracking-wide">IMDB</span>
                <span className="text-base lg:text-xl font-normal text-white">
                    {imdbRank || 'N/A'}
                </span>
            </div>
        </div>
    );
}

export default MovieRating;