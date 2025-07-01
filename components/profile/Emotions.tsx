import Link from "next/link";
import MediaCard from "../media/MediaCard";
import { useEmotions } from "@/contexts/EmotionsContext";

export default function Emotions() {
    const { votingHistory, isLoading } = useEmotions();

    if (isLoading) {
        return (
            <div className="p-8 text-center">
                <div className="max-w-md mx-auto">
                    <p>Loading emotions data...</p>
                </div>
            </div>
        );
    }

    if (votingHistory.length === 0) {
        return (
            <div className="p-8 text-center">
                <div className="max-w-md mx-auto">
                    <div className="mb-4">
                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No emotions tracked yet</h3>
                    <p className="text-sm text-gray-600">Start rating movies with emotions to see them here!</p>
                </div>
            </div>
        );
    }

    const displayedHistory = votingHistory.slice(0, 4);
    const hasMoreItems = votingHistory.length > 4;

    return (
        <div>
            <div className="mt-4 flex justify-between items-center">
                <p className="text-sm text-gray-600">
                    {votingHistory.length} {votingHistory.length === 1 ? 'item' : 'items'} with emotions
                </p>
                {hasMoreItems && (
                    <Link
                        href="/emotions"
                        className="text-orange text-md transition-colors"
                    >
                        See all
                    </Link>
                )}
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,320px))] justify-center gap-y-10 gap-x-6 my-6">
                {displayedHistory.map((mediaItem) => (
                    <div key={mediaItem.id} className="flex flex-col">
                        <Link
                            href={`/media/${mediaItem.id}`}
                            className="group transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-lg"
                        >
                            <MediaCard media={mediaItem} />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}