import Image from "next/image";
import Avatar from "../assets/avatar-svgrepo-com.svg";

function Comment() {
    return (
        <>
        <div className="w-full flex flex-col rounded-lg p-4 border gap-y-3 border-[#262626]">
            <div className="gap-2 flex items-center">
                <div className='w-[50px] h-[50px]'>
                    <Image
                        src={Avatar}
                        alt="Avatar"
                        className="rounded-full"
                    />
                </div>
                <div className="flex flex-col items-start justify-between">
                    <span className="text-sm md:text-md">Daduka Khukhunashvili</span>
                    <span className="text-xs md:text-sm text-gray-500">17 Aug 2024</span>
                </div>
            </div>
            <p className="text-sm md:text-md font-light">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque quae iusto tenetur, necessitatibus veniam ab excepturi sunt qui quidem dignissimos eum iste eligendi! Debitis perferendis, nemo quisquam cupiditate rem necessitatibus.
            </p>
        </div>
                    <div className="flex items-center gap-x-2">
                    <p className="text-xs md:text-sm">0</p>
                    <button className="focus:outline-none">👍</button>
                    <button className="focus:outline-none text-xs md:text-sm rounded-3xl px-4 py-2 bg-[#232323]">Replay</button>
                </div>
                </>
    )
}

export default Comment;