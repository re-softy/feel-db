import DashboardLayout from "../../DashboardLayout";
import SingleMediaDescription from "@/components/singlemedia/SingleMediaDescription";
import AddMediaReview from "@/components/singlemedia/AddMediaReview";
import AllComments from "@/components/singlemedia/AllComments";
import { fetchSingleMedia } from "@/lib/api";

async function SingleTvSeries({ params }: { params: { id: string } }) {
  const mediaData = await fetchSingleMedia(params.id);

  // if (!mediaData) {
  //   return (
  //     <DashboardLayout>
  //       <main className="w-[86%] flex flex-col mx-auto px-[1vw] pb-8">
  //         <h1 className="text-3xl font-medium text-red-500">Media Not Found</h1>
  //       </main>
  //     </DashboardLayout>
  //   );
  // }

  return (
    <DashboardLayout>
      <main className="w-[86%] flex flex-col mx-auto px-[1vw] pb-8">
        <SingleMediaDescription media={mediaData} />
        <AddMediaReview media={mediaData} />
        <AllComments />
      </main>
    </DashboardLayout>
  );
}

export default SingleTvSeries;
