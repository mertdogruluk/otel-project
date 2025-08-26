"use client";
import React from "react";
import OfferCard from "@/components/specialoffers/OfferCard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Button } from "../ui/button";

function HotelsList() {
  // Sample hotel data based on the image
  const hotelData = [
    {
      id: 1,
      image: "/images/riad-deluxe-hotel-img-1.png",
      title: "Riad Deluxe Hotel",
      location: "Marakeş, Fas",
      price: "40.000 TL",
      rating: 4.7,
      reviews: 120,
      tag: "%20 İndirim",
      amenities: ["Ücretsiz iptal", "Kahvaltı dahil", "Otopark"],
    },
    {
      id: 2,
      image: "/images/riad-deluxe-hotel-img-2.png",
      title: "Riad Deluxe Hotel",
      location: "Marakeş, Fas",
      price: "40.000 TL",
      rating: 4.7,
      reviews: 120,
      tag: "%20 İndirim",
      amenities: ["Ücretsiz iptal", "Kahvaltı dahil", "Otopark"],
    },
    {
      id: 3,
      image: "/images/riad-deluxe-hotel-img-3.png",
      title: "Riad Deluxe Hotel",
      location: "Marakeş, Fas",
      price: "40.000 TL",
      rating: 4.7,
      reviews: 120,
      tag: "%20 İndirim",
      amenities: ["Ücretsiz iptal", "Kahvaltı dahil", "Otopark"],
    },
    {
      id: 4,
      image: "/images/riad-deluxe-hotel-img-4.png",
      title: "Riad Deluxe Hotel",
      location: "Marakeş, Fas",
      price: "40.000 TL",
      rating: 4.7,
      reviews: 120,
      tag: "%20 İndirim",
      amenities: ["Ücretsiz iptal", "Kahvaltı dahil", "Otopark"],
    },
    {
      id: 5,
      image: "/images/riad-deluxe-hotel-img-5.png",
      title: "Riad Deluxe Hotel",
      location: "Marakeş, Fas",
      price: "40.000 TL",
      rating: 4.7,
      reviews: 120,
      tag: "%20 İndirim",
      amenities: ["Ücretsiz iptal", "Kahvaltı dahil", "Otopark"],
    },
    {
      id: 6,
      image: "/images/riad-deluxe-hotel-img-6.png",
      title: "Riad Deluxe Hotel",
      location: "Marakeş, Fas",
      price: "40.000 TL",
      rating: 4.7,
      reviews: 120,
      tag: "%20 İndirim",
      amenities: ["Ücretsiz iptal", "Kahvaltı dahil", "Otopark"],
    },
    {
      id: 7,
      image: "/images/riad-deluxe-hotel-img-7.png",
      title: "Riad Deluxe Hotel",
      location: "Marakeş, Fas",
      price: "40.000 TL",
      rating: 4.7,
      reviews: 120,
      tag: "%20 İndirim",
      amenities: ["Ücretsiz iptal", "Kahvaltı dahil", "Otopark"],
    },
    {
      id: 8,
      image: "/images/riad-deluxe-hotel-img-8.png",
      title: "Riad Deluxe Hotel",
      location: "Marakeş, Fas",
      price: "40.000 TL",
      rating: 4.7,
      reviews: 120,
      tag: "%20 İndirim",
      amenities: ["Ücretsiz iptal", "Kahvaltı dahil", "Otopark"],
    },
    {
      id: 9,
      image: "/images/riad-deluxe-hotel-img-1.png",
      title: "Riad Deluxe Hotel",
      location: "Marakeş, Fas",
      price: "40.000 TL",
      rating: 4.7,
      reviews: 120,
      tag: "%20 İndirim",
      amenities: ["Ücretsiz iptal", "Kahvaltı dahil", "Otopark"],
    },
  ];

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
