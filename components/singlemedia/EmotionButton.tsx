import Image from 'next/image';
import { EmotionButtonProps } from '@/types/types';

function EmotionButton({
    svg,
    label,
    onClick,
    cursorPointer = true
}: EmotionButtonProps) {
    const imagePath = `/emotions/${svg}.svg`;
    return (
        <button
            className={`flex items-start justify-start gap-3 w-full p-2 my-1 border border-grey rounded-lg ${cursorPointer ? 'cursor-pointer hover:bg-[#262626]' : 'cursor-default text-md'}`}
            onClick={onClick}
        >
            <Image src={imagePath} alt={label} width={24} height={24} className="w-[22px] md:w-[24px] lg:w-[26px] xl:w-[28px] 2xl:w-[30px]" />
            <span className="text-white text-md xl:text-lg">{label}</span>
        </button>
    );
};

export default EmotionButton;
