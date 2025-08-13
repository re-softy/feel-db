import { getEmojiForEmotion } from '@/utils/emoji';
import { EmotionButtonProps } from '@/types/types';

function EmotionButton({
    svg,
    label,
    onClick,
    isSelected
}: EmotionButtonProps) {
    const emoji = getEmojiForEmotion(svg);

    return (
        <button
            className={`flex items-center justify-start gap-3 w-full my-1 border border-grey rounded-lg cursor-pointer 
            ${isSelected ? 'bg-orange' : 'hover:bg-grey '}`}
            onClick={onClick}
            aria-pressed={isSelected}
        >
            <span className="w-12 h-12 text-2xl flex items-center justify-center" aria-hidden="true">{emoji}</span>
            <span className="text-white text-base xl:text-xl">{label}</span>
        </button>
    );
}

export default EmotionButton;