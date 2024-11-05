// AddMediaReview.js
"use client";
import EmojiChart from "./EmojiChart";
import LeaveComment from "./LeaveComment";

function AddMediaReview() {
  return (
    <section className="my-24">
      <div className="flex items-start gap-8">
     
          <EmojiChart />
        
     
          <LeaveComment />
       
      </div>
    </section>
  );
}

export default AddMediaReview;
