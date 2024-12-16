import Image from "next/image";
import MovieImage from "../assets/test.png";
import VideoPoster from "../assets/preview.png";
import RateMovie from "./RateMovie";

function SingleMediaDescription() {
    return (
        <section>
            <div className="flex flex-col items-start gap-4 lg:gap-6">
                <div className="flex flex-col gap-2">
                    <h1 className="text-lg md:text-2xl lg:text-3xl font-medium uppercase">Long Legs</h1>
                    <div className="flex items-center gap-2 text-sm">
                        <span>2024</span>
                        <span>&#x2022;</span>
                        <span>R</span>
                        <span>&#x2022;</span>
                        <span>1 h 41 m</span>
                    </div>
                </div>
                <div className="flex flex-col gap-2 lg:flex-row lg:gap-x-10">
                    <div className="flex flex-col flex-[1.5] lg:items-start gap-y-4 rounded-xl">
                        <div className="flex gap-2 w-full">
                            <Image src={MovieImage.src} alt="Movie Poster" width={120} height={180} className="rounded-lg w-[35%] h-auto object-cover" />
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
                                <span className="text-sm lg:text-md font-normal text-white">7.2</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-md lg:text-lg  font-semibold tracking-wide">Rotten Tomatoes</span>
                                <span className="text-sm lg:text-md font-normal text-white">87%</span>
                            </div>
                        </div>
                        <div className="flex gap-2 text:xs md:text-sm lg:text-md">
                            <span className="border border-gray-500 rounded-full px-4 py-1">Crime</span>
                            <span className="border border-gray-500 rounded-full px-4 py-1">Horror</span>
                            <span className="border border-gray-500 rounded-full px-4 py-1">Thriller</span>
                        </div>
                        <p className="text-md w-full lg:text-lg text-gray-300">
                            In pursuit of a serial killer, an FBI agent uncovers a series of occult clues that she must solve to end his terrifying killing spree.
                        </p>
                    </div>
                   <div className="border border-grey lg:hidden my-4"></div>
                    <RateMovie border={false} rows={1} showConfirm={true} cursorPointer={true} />
                </div>
            </div>
        </section>
    );
}

export default SingleMediaDescription;
