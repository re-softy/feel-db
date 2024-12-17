import Comment from "./Comment";

function AllComments() {
  return (
    <section>
      <div className="flex flex-col items-start gap-4 mb-8">
        <p className="text-xl lg:text-2xl font-medium my-4">Comments</p>
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <button className="text-sm md:text-xl mt-4">See More</button>
      </div>
      <div className="border border-grey lg:hidden"></div>
    </section>
  )
}

export default AllComments;