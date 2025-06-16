import LogoutIcon from '@mui/icons-material/Logout';
import SignOutUser from '@/lib/actions/auth';

function LogoutButton() {
    return (
        <form action={SignOutUser} className="w-full hover:bg-[#262626] p-4 rounded-md">
            <button type="submit">
                <LogoutIcon className="mr-2" />
                Logout
            </button>
        </form>
    )
}

export default LogoutButton;