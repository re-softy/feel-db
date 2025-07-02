import MailOutlineIcon from '@mui/icons-material/MailOutline';
import KeyIcon from '@mui/icons-material/Key';

import BioEditor from "./BioEditor";
import { UserSettingsProps } from '@/types/types';

function UserSettings({ user, currentBio, onBioUpdate }: UserSettingsProps) {
    return (
        <div className="flex flex-col items-start border-y border-grey my-10 py-4 w-full">
            <BioEditor bio={currentBio} onBioUpdate={onBioUpdate} />
            <div className="flex items-start gap-4 md:gap-x-10 p-4 w-full">
                <MailOutlineIcon />
                <div className='flex flex-col gap-2 md:flex-row md:gap-x-10'>
                    <p className="text-lg font-light">Edit Your Email</p>
                    <p className="text-lg font-normal text-[#989898]">{user.data.user.email}</p>
                </div>
            </div>

            <div className="flex items-start gap-4 md:gap-x-10 p-4 w-full">
                <KeyIcon />
                <div className='flex flex-col gap-2 md:flex-row md:gap-x-10'>
                <p className="text-lg font-light">Change password</p>
                <p className="text-lg font-normal text-[#989898]">********</p>
                </div>
            </div>
        </div>
    );
}

export default UserSettings;
