import DashboardLayout from "@/app/(home)/DashboardLayout";
import SingleMediaDescription from "@/components/singlemedia/SingleMediaDescription";
import EmojiChart from "@/components/singlemedia/EmojiChart";
import { fetchSingleMedia } from "@/lib/api";

async function SingleMoviePage({ params }: { params: { id: string } }) {
  const mediaData = await fetchSingleMedia(params.id);

  return (
    <DashboardLayout>
      <main className="w-[86%] flex flex-col mx-auto px-[1vw] pb-8">
        <SingleMediaDescription media={mediaData} />
        <EmojiChart className="w-full mt-10 lg:mt-24" media={mediaData} />
      </main>
    </DashboardLayout>
  );
}

export default SingleMoviePage;
