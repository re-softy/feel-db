import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  searchParams: { [key: string]: string | string[] | undefined };
}

const Pagination = ({ currentPage, totalPages, searchParams }: PaginationProps) => {

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams as Record<string, string>);
    params.set('page', pageNumber.toString());
    return `?${params.toString()}`;
  };

  const validTotalPages = Math.max(1, Math.floor(totalPages) || 1);
  const validCurrentPage = Math.min(Math.max(1, currentPage), validTotalPages);

  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= validTotalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {validCurrentPage > 1 && (
        <Link
          href={createPageURL(validCurrentPage - 1)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <ChevronLeft className="w-5 h-5" />
        </Link>
      )}
      
      {getPageNumbers().map((pageNumber) => (
        <Link
          key={pageNumber}
          href={createPageURL(pageNumber)}
          className={`px-4 py-2 rounded-lg ${
            validCurrentPage === pageNumber
              ? 'border-1 border-white text-white'
              : ''
          }`}
        >
          {pageNumber}
        </Link>
      ))}
      
      {validCurrentPage < validTotalPages && (
        <Link
          href={createPageURL(validCurrentPage + 1)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <ChevronRight className="w-5 h-5" />
        </Link>
      )}
    </div>
  );
};

export default Pagination;