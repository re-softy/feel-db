interface EmotionButtonProps {
    emoji: string;
    label: string;
    onClick: () => void;
}

function EmotionButton({ emoji, label, onClick }: EmotionButtonProps) {
    return (
        <button
            className="flex items-center justify-start gap-1 w-full text-sm p-2 my-1 border border-[#262626] rounded-lg hover:bg-[#262626]"
            onClick={onClick}
        >
            <span className="flex items-center">
                {emoji}
            </span>
            <span className="flex items-center">
                {label}
            </span>
        </button>
    );
};

export default EmotionButton;
