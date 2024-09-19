import UserInfo from "@/components/profile/UserInfo";
import DashboardLayout from "../DashboardLayout";
import UsersEmotion from "@/components/profile/UsersEmotion";
import UsersFavorite from "@/components/profile/UsersFavorite";

function ProfilePage() {
    return (
        <DashboardLayout>
            <UserInfo />
            <UsersEmotion />
            <UsersFavorite />
        </DashboardLayout>
    )
}

export default ProfilePage;