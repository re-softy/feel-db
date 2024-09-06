import Test from "../assets/test.png";
import Rating from "./Rating";

function MediaCard() {
  return (
      <div
        className="w-[270px] h-[340px] rounded-md flex items-end"
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
      );
}

export default MediaCard;
