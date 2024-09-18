import EmojiChart from "../singlemedia/EmojiChart";
import RateMovie from "../singlemedia/RateMovie";

function UsersEmotion() {
  return (
    <section className="w-[90%] md:w-[85%] lg:w-[80%] xl:w-[75%] mx-auto py-10">
        <div className="flex items-center justify-between gap-10">
            <EmojiChart border={true} />
            <RateMovie border={true} rows={3} showConfirm={false} cursorPointer={false} />
        </div>
    </section>
  )
}

export default UsersEmotion;