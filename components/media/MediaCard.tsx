import Test from "../assets/test.png";
import Rating from "./Rating";

function MediaCard() {
  return (
    <div className="flex flex-col w-[320px] h-[380px] shadow-lg items-center justify-between rounded-lg py-[10px] px-[15px] cursor-pointer mx-auto">
      <div
        className="w-[260px] h-[340px] rounded-md flex items-end"
        style={{
          backgroundImage: `url(${Test.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex items-center justify-between w-full bg-[#2d2d2d] p-2 rounded-b-md">
          <Rating icon="😈" percentage={24} count={10} />
          <Rating icon="😈" percentage={24} count={10} />
          <Rating icon="😈" percentage={24} count={10} />
        </div>
      </div>
    </div>
  );
}

export default MediaCard;
