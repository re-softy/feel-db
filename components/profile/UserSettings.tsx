import { useState } from 'react';
import KeyIcon from '@mui/icons-material/Key';

import BioEditor from "./BioEditor";
import PasswordChangeDialog from "./PasswordChangeDialog";
import { UserSettingsProps } from '@/types/types';

function UserSettings({ user, currentBio, onBioUpdate }: UserSettingsProps) {
    const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);

    const handlePasswordChangeClick = () => {
        setIsPasswordDialogOpen(true);
    };

    const handlePasswordDialogClose = () => {
        setIsPasswordDialogOpen(false);
    };

    return (
        <div className="flex flex-col items-start border-y border-grey my-10 py-4 w-full">
            <BioEditor bio={currentBio} onBioUpdate={onBioUpdate} />
            <div 
                className="flex items-start gap-4 md:gap-x-10 p-4 w-full cursor-pointer hover:bg-gray-800/30 rounded-md transition-colors"
                onClick={handlePasswordChangeClick}
            >
                <KeyIcon />
                <div className='flex flex-col gap-2 md:flex-row md:gap-x-10'>
                    <p className="text-lg font-light">Change password</p>
                    <p className="text-lg font-normal text-[#989898]">********</p>
                </div>
            </div>
            
            <PasswordChangeDialog
                isOpen={isPasswordDialogOpen}
                onClose={handlePasswordDialogClose}
            />
        </div>
    );
}

export default UserSettings;
