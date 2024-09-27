import Image from 'next/image';

interface EmotionButtonProps {
    svg: string;
    label: string;
    onClick: () => void;
    cursorPointer?: boolean;
}

const EmotionButton: React.FC<EmotionButtonProps> = ({
    svg,
    label,
    onClick,
    cursorPointer = true
}) => {
    return (
        <button
            className={`flex items-start justify-start gap-2 w-full text-sm p-2 my-1 border border-grey rounded-lg ${cursorPointer ? 'cursor-pointer hover:bg-[#262626]' : 'cursor-default'}`}
            onClick={onClick}
        >
            <Image src={svg} alt={label} width={20} height={20} />
            <span className="text-white text-md">{label}</span>
        </button>
    );
};

export default EmotionButton;
