'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Trash2, Star } from 'lucide-react';

interface HotelCardProps {
  hotel: {
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
  };
  onDelete: (hotelId: string) => void;
  onEdit: (hotelId: string) => void;
  onView: (hotelId: string) => void;
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel, onDelete, onEdit, onView }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available':
        return 'text-green-600 bg-green-100 border-green-200';
      case 'Fully Booked':
        return 'text-orange-600 bg-orange-100 border-orange-200';
      default:
        return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Available':
        return '🟢';
      case 'Fully Booked':
        return '🟠';
      default:
        return '⚪';
    }
  };

  return (
    <tr className="hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100">
      {/* Product Info */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl flex items-center justify-center mr-4 border border-gray-200">
            <Image
              src={hotel.image}
              alt={hotel.name}
              className="w-10 h-10 object-cover rounded-lg"
              width={40}
              height={40}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/images/hotel-img.png'; // Fallback image
              }}
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-semibold text-gray-900 truncate">{hotel.name}</div>
            <div className="text-sm text-gray-500 truncate">{hotel.location}</div>
            <div className="flex items-center mt-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < hotel.stars ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="text-xs text-gray-500 ml-1">({hotel.stars})</span>
            </div>
          </div>
        </div>
      </td>

      {/* Product ID */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-mono text-gray-900 bg-gray-50 px-2 py-1 rounded border">
          {hotel.id}
        </div>
      </td>

      {/* Price */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-semibold text-green-600">
          {hotel.price}
        </div>
      </td>

      {/* Rooms */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900 font-medium">
          {hotel.rooms}
        </div>
      </td>

      {/* Occupancy */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${hotel.occupancy}%` }}
            ></div>
          </div>
          <span className="text-sm text-gray-900 font-medium">
            {hotel.occupancy}%
          </span>
        </div>
      </td>

      {/* Stock Status */}
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(hotel.status)}`}>
          <span className="mr-1">{getStatusIcon(hotel.status)}</span>
          {hotel.status}
        </span>
      </td>

      {/* Start Date */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">
          {hotel.startDate}
        </div>
      </td>

      {/* Actions */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-colors"
            onClick={() => onView(hotel.id)}
            title="View Details"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50 transition-colors"
            onClick={() => onEdit(hotel.id)}
            title="Edit Hotel"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors"
            onClick={() => onDelete(hotel.id)}
            title="Delete Hotel"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default HotelCard;
