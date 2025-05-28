import Image from "next/image";

import VideoPoster from "../assets/preview.png";
import RateMovie from "./RateMovie";

import { MediaItem } from "@/types/types";

function SingleMediaDescription({ media }: { media: MediaItem }) {

    const formatRuntime = (runtime: string) =>
        runtime.replace("hour", "h").replace("minutes", "m").replace(/\s+/g, " ");

    return (
        <section>
            <div className="flex flex-col items-start gap-4 lg:gap-6">
                <div className="flex flex-col gap-2">
                    <h1 className="text-lg md:text-2xl lg:text-3xl font-medium uppercase">{media.title}</h1>
                    <div className="flex items-center gap-2 text-sm">
                        <span>{media.year}</span>
                        <span>&#x2022;</span>
                        <span>R</span>
                        <span>&#x2022;</span>
                        <span>{formatRuntime(media.runtime)}</span>
                    </div>
                </div>
                <div className="flex flex-col gap-2 lg:flex-row lg:gap-x-10">
                    <div className="flex flex-col flex-[1] lg:items-start gap-y-4 rounded-xl">
                        <div className="flex gap-2 w-full">
                            <Image
                                src={media.poster}
                                alt="Movie Poster"
                                width={120}
                                height={180}
                                className="rounded-lg w-[35%] h-auto object-cover"
                                unoptimized
                            />
                            <video
                                preload="none"
                                poster={VideoPoster.src}
                                controls={false}
                                className="w-[65%] xl:w-[70%] h-auto object-cover rounded-lg">
                                <source src="/path/to/video.mp4" type="video/mp4" />
                            </video>
                        </div>
                        <div className="flex items-center gap-8 text-[#818181]">
                            <div className="flex items-center gap-1">
                                <span className="text-md lg:text-lg font-semibold tracking-wide">IMDB</span>
                                <span className="text-sm lg:text-md font-normal text-white">{media.imdb}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-md lg:text-lg  font-semibold tracking-wide">Rotten Tomatoes</span>
                                <span className="text-sm lg:text-md font-normal text-white">{media.rating}</span>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {Array.isArray(media.genres)
                                ? media.genres.map((genre, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 text-sm bg-[#333] text-white rounded-full"
                                    >
                                        {genre.trim()}
                                    </span>
                                ))
                                : media.genres.split(",").map((genre, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 text-sm bg-[#333] text-white rounded-full"
                                    >
                                        {genre.trim()}
                                    </span>
                                ))}
                        </div>
                        <p className="text-md w-full lg:text-lg text-gray-300">
                            {media.description}
                        </p>
                    </div>
                    <div className="border border-grey lg:hidden my-4"></div>
                    <RateMovie border={false} rows={1} showConfirm={true} cursorPointer={true} className="flex-[0.3]" collectionId={media.id} />
                </div>
            </div>
        </section>
    );
}

export default SingleMediaDescription;
