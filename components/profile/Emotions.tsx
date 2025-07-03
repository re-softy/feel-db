"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useEmotions } from "@/contexts/EmotionsContext";
import { MediaItem } from "@/types/types";
import MediaCard from "../media/MediaCard";
import Pagination from "../media/Pagination";
import { AllContentSkeleton } from "../search/SearchSkeletons";
import { getUserVotingHistoryAction } from "@/lib/actions/emotions-actions";

export default function Emotions() {
    const [currentPage, setCurrentPage] = useState(1);
    const [votingHistory, setVotingHistory] = useState<MediaItem[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const perPage = 8;

    const { totalItems, isLoading: statsLoading } = useEmotions();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const result = await getUserVotingHistoryAction(currentPage, perPage);
            if (result.success) {
                setVotingHistory(result.data);
                setTotalPages(result.pagination.last_page);
            } else {
                setVotingHistory([]);
                setTotalPages(1);
            }
            setIsLoading(false);
        };

        fetchData();
    }, [currentPage]);

    if (isLoading || statsLoading) return <AllContentSkeleton />;

    if (votingHistory.length === 0) {
        return (
            <div className="p-8 text-center">
                <p>No emotions tracked yet</p>
            </div>
        );
    }

    return (
        <div>
            <div className="mt-4 flex justify-between items-center">
                <p className="text-sm text-gray-600">
                    {totalItems} {totalItems === 1 ? "item" : "items"} with emotions
                </p>
                <p className="text-sm text-gray-500">
                    Page {currentPage} of {totalPages}
                </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,320px))] justify-center gap-y-10 gap-x-6 my-6">
                {votingHistory.map((mediaItem: MediaItem) => (
                    <Link key={mediaItem.id} href={`/media/${mediaItem.id}`}>
                        <MediaCard media={mediaItem} />
                    </Link>
                ))}
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                searchParams={{}}
                onPageChange={setCurrentPage}
            />
        </div>
    );
}