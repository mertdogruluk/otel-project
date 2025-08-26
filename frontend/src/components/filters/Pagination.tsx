"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  totalPages?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
}

function Pagination({
  totalPages = 12,
  currentPage: propCurrentPage = 1,
  onPageChange,
}: PaginationProps) {
  const [currentPage, setCurrentPage] = useState(propCurrentPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      onPageChange?.(page);
    }
  };

  const handlePrevious = () => {
    handlePageChange(currentPage - 1);
  };

  const handleNext = () => {
    handlePageChange(currentPage + 1);
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first page, current page area, and last page with ellipsis
      if (currentPage <= 3) {
        // Show: 1, 2, 3, ..., last
        pages.push(1, 2, 3);
        if (totalPages > 4) {
          pages.push("...");
          pages.push(totalPages);
        }
      } else if (currentPage >= totalPages - 2) {
        // Show: 1, ..., last-2, last-1, last
        pages.push(1);
        if (totalPages > 4) {
          pages.push("...");
        }
        for (let i = totalPages - 2; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Show: 1, ..., current-1, current, current+1, ..., last
        pages.push(1);
        pages.push("...");
        pages.push(currentPage - 1, currentPage, currentPage + 1);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex items-center gap-2">
      {/* Previous Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`w-12 h-12 rounded-full border-2 transition-colors cursor-pointer ${
          currentPage === 1
            ? "border-gray-200 text-gray-400 cursor-not-allowed"
            : "border-gray-300 text-gray-600 hover:border-gray-400 hover:text-gray-700"
        }`}
      >
        <ChevronLeft className="w-5 h-5" />
      </Button>

      {/* Page Numbers */}
      <div className="flex items-center gap-2">
        {getPageNumbers().map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-3 py-2 text-gray-400 font-medium"
              >
                ...
              </span>
            );
          }

          const pageNumber = page as number;
          const isActive = pageNumber === currentPage;

          return (
            <Button
              key={pageNumber}
              variant="ghost"
              onClick={() => handlePageChange(pageNumber)}
              className={`w-12 h-12 rounded-full font-medium transition-colors cursor-pointer ${
                isActive
                  ? "bg-[#2F6FED] text-white hover:bg-[#2F6FED]/90"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {pageNumber}
            </Button>
          );
        })}
      </div>

      {/* Next Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`w-12 h-12 rounded-full border-2 transition-colors cursor-pointer ${
          currentPage === totalPages
            ? "border-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-[#2F6FED] border-[#2F6FED] text-white hover:bg-[#2F6FED]/90 hover:border-[#2F6FED]/90"
        }`}
      >
        <ChevronRight className="w-5 h-5" />
      </Button>
    </div>
  );
}

export default Pagination;
