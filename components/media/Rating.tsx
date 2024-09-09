interface RatingProps {
    icon: string;
    percentage: number;
    count: number;
  }
function Rating({ icon, percentage, count }: RatingProps) {
  return (
    <div className="flex items-center gap-1">
      <span className="">{icon}</span>
      <span className="font-normal text-xs">{percentage}%</span>
      <span className="text-gray-400 text-xs">({count})</span>
    </div>
  );
}

export default Rating;