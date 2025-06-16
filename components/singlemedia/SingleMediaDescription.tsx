import Image from "next/image";

import RateMovie from "./RateMovie";
import { getEmotions } from "@/lib/api";
import { Emotion } from "@/types/types";

interface PersonData {
    id: number;
    name: string;
    surname: string;
    full_name: string;
    profession: string;
    image_path: string | null;
}

async function SingleMediaDescription({ media }: { media: any }) {
    if (!media || !media.movie) {
        return (
            <section>
                <div className="flex flex-col items-center justify-center py-12">
                    <p className="text-xl mb-4">Media information not available</p>
                </div>
            </section>
        );
    }

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
                    <h1 className="text-lg md:text-2xl lg:text-3xl font-medium uppercase">{movieData?.title_en || 'Untitled'}</h1>
                    <div className="flex items-center gap-2 text-sm">
                        <span>{movieData?.release_year || 'Unknown Year'}</span>
                        <span>&#x2022;</span>
                        <span>R</span>
                        <span>&#x2022;</span>
                    </div>
                </div>
                <div className="flex flex-col gap-2 lg:flex-row lg:gap-x-10">
                    <div className="flex flex-col flex-[1] lg:items-start gap-y-4 rounded-xl">
                        <div className="flex gap-2 w-full">
                            <Image
                                src={movieData?.cover_path || 'https://via.placeholder.com/200x180.png?text=No+Image+Available'}
                                alt="Movie Poster"
                                width={200}
                                height={180}
                                className="rounded-lg w-[300%] h-auto object-cover"
                                unoptimized
                            />
                        </div>
                        <div className="flex items-center gap-8 text-[#818181]">
                            <div className="flex items-center gap-1">
                                <span className="text-[16px] lg:text-2xl font-semibold tracking-wide">IMDB</span>
                                <span className="text-[16px] lg:text-xl font-normal text-white">{movieData?.imdb_rank || 'N/A'}</span>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {getGenresArray(movieData?.genres_names).map((genre: string, index: number) => (
                                <span
                                    key={index}
                                    className="px-6 py-2 text-lg bg-[#333] text-white rounded-full"
                                >
                                    {genre}
                                </span>
                            ))}
                        </div>
                        <p className="text-[22px] w-full lg:text-2xl text-gray-300 my-2">
                            {movieData?.description || 'No description available.'}
                        </p>

                        {(movieData?.directors_data && movieData.directors_data.length > 0) && (
                            <div className="flex items-center gap-8 my-4">
                                <h3 className="text-sm lg:text-2xl font-semibold text-white">
                                    {movieData.directors_data.length > 1 ? 'Directors' : 'Director'}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {movieData.directors_data.map((director: PersonData) => (
                                        <div
                                            key={director.id}
                                            className="flex items-center gap-2 px-3 py-2 bg-[#1a1a1a] text-gray-300 rounded-lg border border-gray-600"
                                        >
                                            <span className="text-[18px]">{director.full_name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {((movieData?.writers_data && movieData.writers_data.length > 0) && (movieData?.actors_data && movieData.actors_data.length > 0)) && (
                            <div className="border-grey border-[1px] w-[80%] lg:w-full"></div>
                        )} 

                        {(movieData?.writers_data && movieData.writers_data.length > 0) && (
                            <div className="flex items-center gap-8">
                                <h3 className="text-sm lg:text-2xl font-semibold text-white">
                                    {movieData.writers_data.length > 1 ? 'Writers' : 'Writer'}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {movieData.writers_data.map((writer: PersonData) => (
                                        <div
                                            key={writer.id}
                                            className="flex items-center gap-2 px-3 py-2 bg-[#1a1a1a] text-gray-300 rounded-lg border border-gray-600"
                                        >
                                            <span className="text-[18px]">{writer.full_name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {((movieData?.directors_data && movieData.directors_data.length > 0) && (movieData?.actors_data && movieData.actors_data.length > 0)) && (
                            <div className="border-grey border-[1px] w-[80%] lg:w-full"></div>
                        )} 

                        {(movieData?.actors_data && movieData.actors_data.length > 0) && (
                            <div className="flex items-center gap-8">
                                <h3 className="text-sm lg:text-2xl font-semibold text-white">
                                    {movieData.actors_data.length > 1 ? 'Actors' : 'Actor'}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {movieData.actors_data.map((actor: PersonData) => (
                                        <div
                                            key={actor.id}
                                            className="flex items-center gap-2 px-3 py-2 bg-[#1a1a1a] text-gray-300 rounded-lg border border-gray-600"
                                        >
                                            <span className="text-[18px]">{actor.full_name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-[1] lg:justify-end">
                        <RateMovie collectionId={movieData?.id || ''} emotions={emotions} />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SingleMediaDescription;
