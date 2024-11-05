import Image from "next/image";
import Avatar from "../assets/avatar-svgrepo-com.svg";

function LeaveComment() {
  return (
    <div className="flex flex-col flex-shrink-0 w-2/5 gap-5">
      <p className='text-2xl font-medium'>Leave Comment</p>
      <div className="relative w-full">
        <Image
          src={Avatar}
          alt="Avatar"
          className="absolute top-2 left-2 w-8 h-8 rounded-full"
        />
        <textarea
          className="bg-black border border-[#262626] rounded-lg p-2 pl-12 text-md focus:outline-none"
          placeholder="Write what you think..."
          rows={9}
          style={{ height: "auto", width: "100%" }}
        ></textarea>
      </div>
      <button className="bg-orange p-1 rounded-full transition duration-300 w-[28%] uppercase text-lg">
        publish
      </button>
    </div>
  );
}

export default LeaveComment;
