import Image from "next/image";
import MovieImage from "../assets/test.png";
import VideoPoster from "../assets/preview.png";
import RateMovie from "./RateMovie";

function SingleMediaDescription() {
    return (
        <section className="w-[90%] md:w-[85%] lg:w-[80%] xl:w-[75%] mx-auto">
            <div className="flex flex-col items-start my-10 gap-4">
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-regular uppercase">long legs</h1>
                    <div className="flex items-center gap-2">
                        <span className="text-xs">2021 • </span>
                        <span className="text-xs">PG-13 • </span>
                        <span className="text-xs">1 h 42 m</span>
                    </div>
                </div>
                <div className="flex">
                    <div className="flex flex-col items-start gap-y-6">
                        <div className="flex gap-8">
                            <div className="flex-1">
                                <div className="w-full h-[440px]">
                                    <Image
                                        src={MovieImage}
                                        alt="movieImage"
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                            </div>
                            <div className="flex-2">
                                <video
                                    width="100%"
                                    height="360px"
                                    preload="none"
                                    poster={VideoPoster.src}
                                    controls={false}
                                    className="object-cover w-full h-[360px] video::-webkit-media-controls, video::-moz-media-controls, video::-o-media-controls, video::-ms-media-controls {   display: none !important; }"
                                >
                                    <source src="/path/to/video.mp4" type="video/mp4" />
                                </video>
                            </div>
                        </div>
                        <div className="flex items-center justify-center gap-8">
                            <div className="flex items-center justify-center gap-1">
                                <span className="text-sm text-gray-400 font-normal tracking-wider">IMDB</span>
                                <span className="text-sm font-normal">7.2</span>
                            </div>
                            <div className="flex items-center justify-center gap-2">
                                <span className="text-sm text-gray-400 font-normal tracking-wider">Rotten Tomatoes</span>
                                <span className="text-sm font-normal">82%</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                            <span className="border rounded-3xl px-2 py-1 text-xs">Crime</span>
                            <span className="border rounded-3xl px-2 py-1 text-xs">Horror</span>
                            <span className="border rounded-3xl px-2 py-1 text-xs">Thriller</span>
                        </div>
                        <p className="text-lg">In pursuit of a serial killer, an FBI agent uncovers a series of occult clues that she must solve to end his terrifying killing spree.</p>
                    </div>
                    <RateMovie border={false} rows={1} showConfirm={true} cursorPointer={true} />
                </div>
            </div>
        </section>
    );
}

export default SingleMediaDescription;
