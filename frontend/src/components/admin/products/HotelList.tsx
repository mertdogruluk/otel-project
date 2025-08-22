'use client';

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import HotelSearch from './HotelSearch';
import HotelTable from './HotelTable';

interface Hotel {
  id: string;
  name: string;
  location: string;
  stars: number;
  price: string;
  rooms: number;
  occupancy: number;
  status: string;
  startDate: string;
  image: string;
}

interface HotelListProps {
  hotels: Hotel[];
  onDelete: (hotelId: string) => void;
  onEdit: (hotelId: string) => void;
  onView: (hotelId: string) => void;
  isLoading?: boolean;
}

const HotelList: React.FC<HotelListProps> = ({ 
  hotels, 
  onDelete, 
  onEdit, 
  onView, 
  isLoading = false 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Memoized filtered hotels
  const filteredHotels = useMemo(() => {
    if (!searchTerm) return hotels;
    
    const searchLower = searchTerm.toLowerCase();
    return hotels.filter(hotel =>
      hotel.name.toLowerCase().includes(searchLower) ||
      hotel.location.toLowerCase().includes(searchLower) ||
      hotel.id.toLowerCase().includes(searchLower) ||
      hotel.status.toLowerCase().includes(searchLower)
    );
  }, [hotels, searchTerm]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredHotels.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const currentHotels = filteredHotels.slice(startIndex, endIndex);

  // Reset to first page when search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, entriesPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleEntriesChange = (value: number) => {
    setEntriesPerPage(value);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  // Generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter Section */}
      <HotelSearch
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        entriesPerPage={entriesPerPage}
        onEntriesChange={handleEntriesChange}
        onClearSearch={handleClearSearch}
        totalResults={filteredHotels.length}
      />

      {/* Hotel Table */}
      <HotelTable
        hotels={currentHotels}
        onDelete={onDelete}
        onEdit={onEdit}
        onView={onView}
        isLoading={isLoading}
      />

      {/* Enhanced Pagination */}
      {!isLoading && filteredHotels.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          {/* Results Info */}
          <div className="text-sm text-gray-700">
            Showing <span className="font-semibold">{startIndex + 1}</span> to{' '}
            <span className="font-semibold">{Math.min(endIndex, filteredHotels.length)}</span> of{' '}
            <span className="font-semibold">{filteredHotels.length}</span> hotels
          </div>
          
          {/* Pagination Controls */}
          <div className="flex items-center space-x-2">
            {/* First Page */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              className="h-8 w-8 p-0"
              title="First Page"
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>

            {/* Previous Page */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="h-8 w-8 p-0"
              title="Previous Page"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            {/* Page Numbers */}
            {getPageNumbers().map((page, index) => (
              <React.Fragment key={index}>
                {page === '...' ? (
                  <span className="px-2 text-gray-500">...</span>
                ) : (
                  <Button
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(page as number)}
                    className="h-8 w-8 p-0"
                  >
                    {page}
                  </Button>
                )}
              </React.Fragment>
            ))}
            
            {/* Next Page */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="h-8 w-8 p-0"
              title="Next Page"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>

            {/* Last Page */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
              className="h-8 w-8 p-0"
              title="Last Page"
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* No Results Message */}
      {!isLoading && filteredHotels.length === 0 && searchTerm && (
        <div className="text-center py-8">
          <div className="text-gray-400 text-4xl mb-4">🔍</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hotels found</h3>
          <p className="text-gray-500 mb-4">
            No hotels match your search for &ldquo;{searchTerm}&rdquo;
          </p>
          <Button
            variant="outline"
            onClick={handleClearSearch}
            className="px-4"
          >
            Clear Search
          </Button>
        </div>
      )}
    </div>
  );
};

export default HotelList;
