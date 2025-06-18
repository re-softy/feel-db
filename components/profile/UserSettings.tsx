import MailOutlineIcon from '@mui/icons-material/MailOutline';
import KeyIcon from '@mui/icons-material/Key';

import BioEditor from "./BioEditor";
import { UserSettingsProps } from '@/types/types';

function UserSettings({ user, currentBio, onBioUpdate }: UserSettingsProps) {
    return (
        <div className="flex flex-col items-start border-y border-grey my-10 py-6">
            <BioEditor bio={currentBio} onBioUpdate={onBioUpdate} />
            <div className="flex items-center gap-x-10 p-4">
                <MailOutlineIcon />
                <p className="text-lg font-light">Edit Your Email</p>
                <p className='text-lg font-normal text-[#989898]'>{user.data.user.email}</p>
            </div>
            <div className="flex items-center gap-x-10 p-4">
                <KeyIcon />
                <p className="text-lg font-light">Change password</p>
                <p className='text-lg font-normal text-[#989898]'>********</p>
            </div>
        </div>
    );
}

export default UserSettings;