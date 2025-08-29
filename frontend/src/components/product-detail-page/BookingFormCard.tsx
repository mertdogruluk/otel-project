"use client";

import { useState } from "react";
import { Minus, Plus, Star } from "lucide-react";
import Link from "next/link";
import { HotelData } from "@/types/hotel";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface BookingFormCardProps {
  hotelData?: HotelData;
}

export default function BookingFormCard({ hotelData }: BookingFormCardProps) {
  // Default data for demo purposes
  const defaultData = {
    title: "Riad Deluxe Hotel",
    location: "Marakes, Fas",
    rating: 4.7,
    reviews: 120,
    checkIn: "18/07/2025",
    checkOut: "22/07/2025",
    guests: 1,
    price: 40500,
    priceUnit: "TL",
    nights: 4,
  };

  const data = hotelData
    ? {
        title: hotelData.title,
        location: hotelData.location,
        rating: hotelData.rating,
        reviews: hotelData.reviews,
        checkIn: "18/07/2025",
        checkOut: "22/07/2025",
        guests: 1,
        price: parseInt(hotelData.price.replace(/[^\d]/g, "")),
        priceUnit: "TL",
        nights: 4,
      }
    : defaultData;
  const [guestCount, setGuestCount] = useState(data.guests || 1);

  const decrementGuests = () => {
    if (guestCount > 1) {
      setGuestCount(guestCount - 1);
    }
  };

  const incrementGuests = () => {
    setGuestCount(guestCount + 1);
  };

  // Render star rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      );
    }

    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }

    return stars;
  };

  return (
    <Card className="w-full shadow-xl border-0 p-4">
      <CardHeader className="pb-6">
        <h2 className="text-[28px] font-bold text-gray-800 mb-3">
          {data.title}
        </h2>
        <div className="flex flex-row items-center gap-2">
          <p className="text-lg text-gray-600">{data.location}</p>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <span className="font-semibold">{data.rating}</span>
              <div className="flex items-center">
                {renderStars(data.rating)}
              </div>
            </div>
            <span className="text-gray-500">({data.reviews})</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Date inputs - vertical layout */}
        <div className="space-y-4">
          <div>
            <Label
              htmlFor="checkin"
              className="text-base font-bold text-gray-800"
            >
              Giriş
            </Label>
            <Input
              id="checkin"
              type="text"
              value={data.checkIn}
              readOnly
              className="mt-2 h-12 text-base bg-gray-50 border-gray-300"
            />
          </div>
          <div>
            <Label
              htmlFor="checkout"
              className="text-base font-bold text-gray-800"
            >
              Çıkış
            </Label>
            <Input
              id="checkout"
              type="text"
              value={data.checkOut}
              readOnly
              className="mt-2 h-12 text-base bg-gray-50 border-gray-300"
            />
          </div>
        </div>

        {/* Person counter - smaller size */}
        <div>
          <Label className="block text-base font-medium text-gray-700 mb-2">
            Kişi
          </Label>
          <div className="flex items-center border border-gray-300 rounded-lg bg-white overflow-hidden w-32">
            <Button
              variant="ghost"
              size="sm"
              onClick={decrementGuests}
              className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-none border-0 p-0"
            >
              <Minus className="w-4 h-4 text-blue-600" />
            </Button>
            <div className="flex-1 text-center py-2">
              <span className="text-lg font-semibold text-gray-800">
                {guestCount}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={incrementGuests}
              className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-none border-0 p-0"
            >
              <Plus className="w-4 h-4 text-blue-600" />
            </Button>
          </div>
        </div>

        {/* Price display */}
        <div className="pt-2">
          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-bold text-blue-600">
              {data.price.toLocaleString()} {data.priceUnit}
            </span>
            <span className="text-gray-600 text-base">
              / {data.nights} gece
            </span>
          </div>
        </div>

        {/* Action buttons with spacing */}
        <div className="space-y-3 pt-2">
          <Link href="/booking/info" className="block">
            <Button className="bg-[#2F6FED] hover:bg-[white] hover:text-[#2F6FED] hover:border-[#2F6FED] border-1 text-white font-opensans font-bold w-full h-12 rounded-lg cursor-pointer">
              Rezervasyon yap
            </Button>
          </Link>
          <Button
            variant="outline"
            className="bg-white border border-[#2F6FED] hover:bg-[#2F6FED] hover:text-white text-[#2F6FED] font-opensans font-bold w-full h-12 rounded-lg cursor-pointer"
          >
            Detaylı bilgi al
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
