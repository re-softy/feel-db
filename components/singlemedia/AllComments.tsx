import Comment from "./Comment";

function AllComments() {
  return (
    <section>
      <div className="flex flex-col items-start gap-4">
        <p className="text-xl lg:text-2xl font-medium my-4">Comments</p>
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
      </div>
    </section>
  )
}

export default AllComments;