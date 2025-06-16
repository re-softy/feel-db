import Image from "next/image";

import RateMovie from "./RateMovie";
import { getEmotions } from "@/lib/api";
import { Emotion } from "@/types/types";

async function SingleMediaDescription({ media }: { media: any }) {
    const movieData = media.movie;
    const data = await getEmotions();
    const emotions: Emotion[] = data?.emotions ?? [];

    const getGenresArray = (genres: string | string[] | undefined): string[] => {
        if (!genres) return [];
        if (Array.isArray(genres)) return genres;
        return genres.split(',').map(genre => genre.trim()).filter(Boolean);
    };

    return (
        <section>
            <div className="flex flex-col items-start gap-4 lg:gap-6 my-4 lg:my-10">
                <div className="flex flex-col gap-2">
                    <h1 className="text-lg md:text-2xl lg:text-3xl font-medium uppercase">{movieData.title_en || 'N/A'}</h1>
                    <div className="flex items-center gap-2 text-sm">
                        <span>{movieData.release_year}</span>
                        <span>&#x2022;</span>
                        <span>R</span>
                        <span>&#x2022;</span>
                    </div>
                </div>
                <div className="flex flex-col gap-2 lg:flex-row lg:gap-x-10">
                    <div className="flex flex-col flex-[1] lg:items-start gap-y-4 rounded-xl">
                        <div className="flex gap-2 w-full">
                            <Image
                                src={movieData.cover_path ||'https://via.placeholder.com/200x180.png?text=No+Image+Available'}
                                alt="Movie Poster"
                                width={200}
                                height={180}
                                className="rounded-lg w-[300%] h-auto object-cover"
                                unoptimized
                            />
                        </div>
                        <div className="flex items-center gap-8 text-[#818181]">
                            <div className="flex items-center gap-1">
                                <span className="text-md lg:text-lg font-semibold tracking-wide">IMDB</span>
                                <span className="text-sm lg:text-md font-normal text-white">{movieData.imdb_rank}</span>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {getGenresArray(movieData.genres_names).map((genre: string, index: number) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 text-sm bg-[#333] text-white rounded-full"
                                >
                                    {genre}
                                </span>
                            ))}
                        </div>
                        <p className="text-md w-full lg:text-lg text-gray-300">
                            {movieData.description || 'No description available.'}
                        </p>
                    </div>
                    <div className="border border-grey lg:hidden my-4"></div>
                    <RateMovie border={false} rows={1} showConfirm={true} cursorPointer={true} className="flex-[0.3]" collectionId={movieData.id} emotions={emotions} />
                </div>
            </div>
        </section>
    );
}

export default SingleMediaDescription;
