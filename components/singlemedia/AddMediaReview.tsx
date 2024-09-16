import EmojiChart from "./EmojiChart";
import LeaveComment from "./LeaveComment";

function AddMediaReview() {
  return (
    <section className="w-[90%] md:w-[85%] lg:w-[80%] xl:w-[75%] mx-auto">
      <div className="flex items-start gap-8">
      <EmojiChart />
      <LeaveComment />
      </div>
    </section>
  )
}

export default AddMediaReview;