import EmojiChart from "./EmojiChart";
import LeaveComment from "./LeaveComment";

import { MediaItem } from "@/types/types";

function AddMediaReview({ media }: { media: MediaItem }) {
  return (
    <section className="my-10 lg:my-24">
      <div className="flex flex-col lg:flex-row lg:items-center gap-8">
      <div className="border border-grey lg:hidden"></div>
          <EmojiChart className="w-full" media={media}/>
          <LeaveComment />
          <div className="border border-grey lg:hidden"></div>
      </div>
    </section>
  );
}

export default AddMediaReview;
