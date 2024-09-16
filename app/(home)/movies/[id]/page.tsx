import DashboardLayout from "../../DashboardLayout";
import SingleMediaDescription from '../../../../components/singlemedia/SingleMediaDescription';
import AddMediaReview from "@/components/singlemedia/AddMediaReview";
import AllComments from "@/components/singlemedia/AllComments";

function page() {
  return (
    <DashboardLayout>
      <SingleMediaDescription />
      <AddMediaReview />
      <AllComments />
    </DashboardLayout>
  )
}

export default page;