import LogoutIcon from '@mui/icons-material/Logout';
import SignOutUser from '@/lib/actions/auth';

function LogoutButton() {
    return (
        <form action={SignOutUser}>
            <button type="submit">
                <LogoutIcon />
            </button>
        </form>
    )
}

export default LogoutButton;