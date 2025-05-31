import DashboardLayout from "@/app/(home)/DashboardLayout";
import SingleMediaDescription from "@/components/singlemedia/SingleMediaDescription";
import AddMediaReview from "@/components/singlemedia/AddMediaReview";
import { fetchSingleMedia } from "@/lib/api";

async function SingleMoviePage({ params }: { params: { id: string } }) {
  const mediaData = await fetchSingleMedia(params.id);
  
  return (
    <DashboardLayout>
      <main className="w-[86%] flex flex-col mx-auto px-[1vw] pb-8">
        <SingleMediaDescription media={mediaData} />
        <AddMediaReview media={mediaData} />
      </main>
    </DashboardLayout>
  );
}

export default SingleMoviePage;
