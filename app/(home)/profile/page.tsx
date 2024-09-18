import UserInfo from "@/components/profile/UserInfo";
import DashboardLayout from "../DashboardLayout";
import UsersEmotion from "@/components/profile/UsersEmotion";

function ProfilePage() {
    return (
        <DashboardLayout>
            <UserInfo />
            <UsersEmotion />
        </DashboardLayout>
    )
}

export default ProfilePage;