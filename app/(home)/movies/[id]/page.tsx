import DashboardLayout from "../../DashboardLayout";
import SingleMediaDescription from '../../../../components/singlemedia/SingleMediaDescription';
import AddMediaReview from "@/components/singlemedia/AddMediaReview";
import AllComments from "@/components/singlemedia/AllComments";

function page() {
  return (
    <DashboardLayout>
      <main className="w-[86%] flex flex-col mx-auto px-[1vw] pb-8">
      <SingleMediaDescription />
      <AddMediaReview />
      {/* <AllComments /> */}
      </main>
    </DashboardLayout>
  )
}

export default page;