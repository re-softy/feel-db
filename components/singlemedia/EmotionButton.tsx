interface EmotionButtonProps {
    emoji: string;
    label: string;
    onClick: () => void;
    cursorPointer?: boolean; 
}

function EmotionButton({ emoji, label, onClick, cursorPointer = true }: EmotionButtonProps) {
    return (
        <button
            className={`flex items-center justify-start gap-1 w-full text-sm p-2 my-1 border border-[#262626] rounded-lg ${
              cursorPointer ? 'cursor-pointer hover:bg-[#262626]' : 'cursor-default'}`}
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
