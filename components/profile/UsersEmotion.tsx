import EmojiChart from "../singlemedia/EmojiChart";
import RateMovie from "../singlemedia/RateMovie";

function UsersEmotion() {
  return (
    <section className="my-12">
      <div className="flex items-baseline justify-around gap-8 overflow-x-scroll">
        {/* <EmojiChart border={true} className="flex-[2]" />
        <RateMovie border={true} rows={2} showConfirm={false} cursorPointer={false} className="flex-1" /> */}
      </div>
    </section>
  );
}

export default UsersEmotion;
