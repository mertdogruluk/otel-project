"use client";
import React from "react";
import OfferCard from "@/components/specialoffers/HotelCard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import { mockHotels } from "@/data/hotels";

function HotelsList() {
  // Use centralized hotel data
  const hotelData = mockHotels;

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <h2 className="text-2xl font-bold font-opensans text-gray-900 mb-2 md:mb-0">
            Marakeş için 46 sonuç bulundu
          </h2>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="border border-gray-300 rounded-full px-3 py-1 text-sm bg-white flex items-center gap-2 hover:bg-gray-100 hover:text-gray-700 focus:bg-gray-100 focus:text-gray-700">
                  <span className="text-gray-600">Sırala</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>En Popüler</DropdownMenuItem>
                <DropdownMenuItem>Fiyat (Düşükten Yükseğe)</DropdownMenuItem>
                <DropdownMenuItem>Fiyat (Yüksekten Düşüğe)</DropdownMenuItem>
                <DropdownMenuItem>Değerlendirme</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Hotels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8 justify-items-center md:justify-items-start">
        {hotelData.map((hotel) => (
          <OfferCard
            key={hotel.id}
            image={hotel.image}
            title={hotel.title}
            location={hotel.location}
            price={hotel.price}
            rating={hotel.rating}
            reviews={hotel.reviews}
            tag={hotel.tag}
            amenities={hotel.amenities}
          />
        ))}
      </div>
    </div>
  );
}

export default HotelsList;
