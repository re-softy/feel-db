import Link from "next/link";
import { PaginationProps } from "@/types/types";

function Pagination({ currentPage, totalPages, searchParams }: PaginationProps) {
  const createPageUrl = (page: number) => {
    const params = new URLSearchParams();

    Object.entries(searchParams).forEach(([key, value]) => {
      if (key === 'page') return;

      if (Array.isArray(value)) {
        value.forEach(v => {
          const paramKey = key.endsWith('[]') ? key : `${key}[]`;
          params.append(paramKey, v);
        });
      } else if (value !== undefined) {
        params.append(key, value);
      }
    });

    params.append('page', page.toString());

    return `/search?${params.toString()}`;
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 4;

    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = startPage + maxPagesToShow - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  if (totalPages <= 1) {
    return null;
  }

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center my-8 mx-auto">
      <nav className="inline-flex items-center gap-1">
        {currentPage > 1 && (
          <Link
            href={createPageUrl(1)}
            className="flex items-center justify-center w-10 h-10 rounded-md"
            aria-label="First page"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
              <path fillRule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
            </svg>
          </Link>
        )}

        {currentPage > 1 && (
          <Link
            href={createPageUrl(currentPage - 1)}
            className="flex items-center justify-center w-10 h-10 rounded-md"
            aria-label="Previous page"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
            </svg>
          </Link>
        )}

        {/* {pageNumbers[0] > 1 && (
          <span className="flex items-center justify-center w-10 h-10 text-gray-400">
            ...
          </span>
        )} */}

        {pageNumbers.map((pageNumber) => (
          <Link
            key={pageNumber}
            href={createPageUrl(pageNumber)}
            className={`flex items-center justify-center w-10 h-10 rounded-md ${pageNumber === currentPage
                ? 'border border-gray-100'
                : ''
              }`}
            aria-current={pageNumber === currentPage ? 'page' : undefined}
          >
            {pageNumber}
          </Link>
        ))}

        {/* {pageNumbers[pageNumbers.length - 1] < totalPages && (
          <span className="flex items-center justify-center w-10 h-10 text-gray-400">
            ...
          </span>
        )} */}

        {currentPage < totalPages && (
          <Link
            href={createPageUrl(currentPage + 1)}
            className="flex items-center justify-center w-10 h-10 rounded-md"
            aria-label="Next page"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </Link>
        )}

        {currentPage < totalPages && (
          <Link
            href={createPageUrl(totalPages)}
            className="flex items-center justify-center w-10 h-10 rounded-md"
            aria-label="Last page"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z" />
              <path fillRule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </Link>
        )}
      </nav>
    </div>
  );
}

export default Pagination;