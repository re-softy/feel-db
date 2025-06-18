'use client';

import { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { BioEditorProps } from "@/types/types";
import { updateBioAction } from "@/lib/actions/bio-actions";
import { toast } from "sonner";

function BioEditor({ bio, onBioUpdate, disabled = false }: BioEditorProps) {
    const [bioDialogOpen, setBioDialogOpen] = useState(false);
    const [bioText, setBioText] = useState(bio || '');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleBioDialogOpen = () => {
        setBioDialogOpen(true);
        setBioText(bio || '');
        setError(null);
    };

    const handleBioDialogClose = () => {
        setBioDialogOpen(false);
        setError(null);
    };

    const handleBioSave = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const result = await updateBioAction(bioText);

            if (result.success) {
                if (onBioUpdate) {
                    onBioUpdate(bioText);
                    toast.success('Bio updated successfully!');
                }
                setBioDialogOpen(false);
            } else {
                setError(result.error || 'Failed to save bio. Please try again.');
                toast.error(result.error || 'Failed to save bio. Please try again.');
            }
        } catch (error: any) {
            console.error('Failed to save bio:', error);
            setError('Failed to save bio. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await handleBioSave();
    };

    return (
        <>
            <button
                onClick={handleBioDialogOpen}
                disabled={disabled}
                className="flex items-center gap-x-10 p-4 hover:bg-grey rounded-lg transition-colors w-full text-left"
                aria-label="Edit bio"
            >
                <EditIcon aria-hidden="true" />
                <span className="text-lg font-light">Edit Your Bio</span>
                <span className="text-lg font-normal text-gray-500 truncate">
                    {bio || "No bio added yet"}
                </span>
            </button>
            <Dialog open={bioDialogOpen} onOpenChange={setBioDialogOpen}>
                <form onSubmit={handleSubmit} className="w-full h-full">
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Edit Your Bio</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <textarea
                                    id="bio"
                                    placeholder="Tell us about yourself..."
                                    value={bioText}
                                    onChange={(e) => setBioText(e.target.value)}
                                    className="min-h-[100px] border rounded px-3 py-2 bg-black resize-none"
                                    disabled={isLoading}
                                />
                                {error && (
                                    <p className="text-red-500 text-sm mt-1">{error}</p>
                                )}
                            </div>
                        </div>
                        <DialogFooter>
                            <div className="flex gap-x-4">
                                <button
                                    onClick={handleBioDialogClose}
                                    disabled={isLoading}
                                    className="px-4 py-2 border rounded-lg disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleBioSave}
                                    className="px-4 py-2 bg-orange rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Saving...' : 'Save Bio'}
                                </button>
                            </div>
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Dialog>
        </>
    );
}

export default BioEditor;