import Comment from "./Comment";

function AllComments() {
  return (
    <section className="w-[90%] md:w-[85%] lg:w-[80%] xl:w-[75%] mx-auto">
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