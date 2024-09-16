import Image from "next/image";
import Avatar from "../assets/avatar-svgrepo-com.svg";

function LeaveComment() {
  return (
    <div className="flex flex-col gap-5 w-full">
      <p className='text-xl font-medium'>Leave Comment</p>
      <div className="relative w-full">
        <Image
          src={Avatar}
          alt="Avatar"
          className="absolute top-2 left-2 w-8 h-8 rounded-full"
        />
        <textarea
          className="bg-black border border-[#262626] rounded-lg p-2 pl-12 text-md focus:outline-none"
          placeholder="Write what you think..."
          rows={7}
          style={{ height: "auto", width: "100%" }}
        ></textarea>
      </div>
      <button className="bg-[#ff7f50] px-2 py-2 rounded-3xl transition duration-300 w-[36%] uppercase">
        publish
      </button>
    </div>
  );
}

export default LeaveComment;
