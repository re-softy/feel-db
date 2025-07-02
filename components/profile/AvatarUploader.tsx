import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';

import { toast } from 'sonner';

import FileUploadIcon from '@mui/icons-material/FileUpload';
import CircularProgress from '@mui/material/CircularProgress';

import default_pfp from "@/components/assets/default_pfp.png";
import { uploadAvatarAction } from '@/lib/actions/avatar-actions';

type Avatar = {
  has_avatar: boolean;
  avatar_url: string;
  thumbnail_url: string;
};

type AvatarUploaderProps = {
  currentAvatar: Avatar;
  onAvatarUpdate: (newAvatar: Avatar) => void;
};

function AvatarUploader({ currentAvatar, onAvatarUpdate }: AvatarUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  const avatarSrc = previewUrl || (currentAvatar.has_avatar && currentAvatar.avatar_url && !imageError
    ? currentAvatar.avatar_url 
    : default_pfp);

  const handleAvatarClick = () => {
    if (!isUploading) {
      fileInputRef.current?.click();
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setPreviewUrl(URL.createObjectURL(file));
    setImageError(false);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('avatar', file);

      const result = await uploadAvatarAction(formData);

      if (result.success) {
        toast.success('Avatar uploaded successfully!', {
          description: 'Your profile picture has been updated.',
          duration: 4000,
        });
        
        if (result.data?.data?.avatar_url) {
          onAvatarUpdate({
            has_avatar: true,
            avatar_url: result.data.data.avatar_url,
            thumbnail_url: result.data.data.thumbnail_url
          });
        } else {
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        }
      } else {
        toast.error('Upload failed', {
          description: result.error,
          duration: 5000,
        });
      }
    } catch (error) {
      toast.error('Upload error', {
        description: 'An unexpected error occurred during upload.',
        duration: 5000,
      });
    } finally {
      setIsUploading(false);
      setPreviewUrl(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  useEffect(() => {
    if (previewUrl) {
      return () => {
        URL.revokeObjectURL(previewUrl);
      };
    }
  }, [previewUrl]);

  return (
    <div className={`flex-none w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden relative group ${isUploading ? 'cursor-wait' : 'cursor-pointer'}`}>
      <Image
        src={avatarSrc}
        alt="Avatar"
        width={240}
        height={240}
        className="rounded-full w-full h-full object-cover"
        onClick={handleAvatarClick}
        onError={handleImageError}
        unoptimized={currentAvatar.has_avatar && !previewUrl}
        priority={false}
      />
      
      <div 
        className={`absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center transition-opacity duration-200 ${
          isUploading 
            ? 'opacity-100' 
            : 'opacity-0 group-hover:opacity-100'
        }`}
        onClick={handleAvatarClick}
      >
        {isUploading ? (
          <CircularProgress size={24} className="text-white" />
        ) : (
          <FileUploadIcon className="text-white" fontSize="large" />
        )}
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept=".png,.jpg,.jpeg,.webp,image/*"
        onChange={handleFileChange}
        className="hidden"
        disabled={isUploading}
      />
    </div>
  );
}

export default AvatarUploader;