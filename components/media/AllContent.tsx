import MediaCard from "./MediaCard";

function AllContent() {
  return (
    <section className="py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-8">
        <MediaCard />
        <MediaCard />
        <MediaCard />
        <MediaCard />
        <MediaCard />
        <MediaCard />
        <MediaCard />
        <MediaCard />
        <MediaCard />
        <MediaCard />
        <MediaCard />
        <MediaCard />
        <MediaCard />
        <MediaCard />
      </div>
    </section>
  );
}

export default AllContent;
