import Comment from "./Comment";

function AllComments() {
  return (
    <section className="">
      <div className="flex flex-col items-start gap-4">
        <p className="text-xl uppercase my-4">comments</p>
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