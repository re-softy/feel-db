import Image from "next/image";

interface RatingProps {
  icon: string;
  percentage: number;
  count: number;
}

export default function Rating({ icon, percentage, count }: RatingProps) {
  const imagePath = `/emotions/${icon}.svg`;

  return (
    <div className="flex items-center justify-center gap-1">
      <Image src={imagePath} alt={icon} width={20} height={20} className="w-[12px] md:w-[16px] lg:w-[20px]"/>
      <span className="text-sm">{percentage.toFixed()}%</span>
      <span className="text-gray-400 text-sm">({count})</span>
    </div>
  );
}