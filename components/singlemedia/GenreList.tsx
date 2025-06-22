import { getGenresArray } from "@/utils/emotionUtils";
import { GenreListProps } from "@/types/types";

function GenreList({ genres }: GenreListProps) {
    const genreList = getGenresArray(genres);

    if (genreList.length === 0) return null;

    return (
        <div className="flex flex-wrap gap-2">
            {genreList.map((genre, index) => (
                <span
                    key={index}
                    className="px-6 py-2 text-sm lg:text-base xl:text-lg bg-gray-800 text-white rounded-full"
                >
                    {genre}
                </span>
            ))}
        </div>
    );
}

export default GenreList;