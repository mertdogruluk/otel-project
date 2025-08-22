'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import HotelCard from './HotelCard';

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

interface HotelTableProps {
  hotels: Hotel[];
  onDelete: (hotelId: string) => void;
  onEdit: (hotelId: string) => void;
  onView: (hotelId: string) => void;
  isLoading?: boolean;
}

const HotelTable: React.FC<HotelTableProps> = ({ 
  hotels, 
  onDelete, 
  onEdit, 
  onView, 
  isLoading = false 
}) => {
  if (isLoading) {
    return (
      <Card className="border-0 shadow-sm bg-white">
        <CardContent className="p-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading hotels...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (hotels.length === 0) {
    return (
      <Card className="border-0 shadow-sm bg-white">
        <CardContent className="p-8">
          <div className="text-center">
            <div className="text-gray-400 text-6xl mb-4">🏨</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No hotels found</h3>
            <p className="text-gray-500">Try adjusting your search criteria or add a new hotel.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-sm bg-white overflow-hidden">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Hotel Information
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Hotel ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Rooms
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Occupancy
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Start Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {hotels.map((hotel) => (
                <HotelCard
                  key={hotel.id}
                  hotel={hotel}
                  onDelete={onDelete}
                  onEdit={onEdit}
                  onView={onView}
                />
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default HotelTable;
