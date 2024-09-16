import DashboardLayout from "../../DashboardLayout";
import SingleMediaDescription from '../../../../components/singlemedia/SingleMediaDescription';
import AddMediaReview from "@/components/singlemedia/AddMediaReview";

function page() {
  return (
    <DashboardLayout>
      <SingleMediaDescription />
      <AddMediaReview />
    </DashboardLayout>
  )
}

export default page;