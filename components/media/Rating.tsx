import Image from "next/image";

interface RatingProps {
  icon: string;
  percentage: number;
  count: number;
}

export default function Rating({ icon, percentage, count }: RatingProps) {
  const imagePath = `/emotions/${icon}.svg`;

  return (
    <div className="flex items-center justify-between gap-1">
      <Image src={imagePath} alt={icon} width={20} height={20} />
      <span className="font-medium text-xs">{percentage.toFixed()}%</span>
      <span className="text-gray-400 text-xs">({count})</span>
    </div>
  );
}