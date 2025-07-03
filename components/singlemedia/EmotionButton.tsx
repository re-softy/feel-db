import Image from 'next/image';
import { EmotionButtonProps } from '@/types/types';

function EmotionButton({
    svg,
    label,
    onClick,
    isSelected
}: EmotionButtonProps) {
    const imagePath = `/emotions/${svg.toLowerCase()}.svg`;

    return (
        <button
            className={`flex items-start justify-start gap-3 w-full p-2 my-1 border border-grey rounded-lg cursor-pointer 
            ${isSelected ? 'bg-orange' : 'hover:bg-grey '}`}
            onClick={onClick}
            aria-pressed={isSelected}
        >
            <Image
                src={imagePath}
                alt={label}
                width={24}
                height={24}
                className="w-6 h-6"
                loading="lazy"
            />
            <span className="text-white text-base xl:text-xl">{label}</span>
        </button>
    );
}

export default EmotionButton;