import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

function HotelConfirmationCard() {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : i < rating
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <Card className="w-full rounded-xl overflow-hidden shadow-sm border border-gray-100">
      <CardContent className="p-4">
        {/* Hotel Image */}
        <div className="relative w-full mb-6">
          <Image
            src="/images/confirmation-card.png"
            alt="Riad Deluxe Hotel"
            width={1200}
            height={300}
            className="w-full h-[300px] object-cover rounded-xl"
          />
        </div>

        {/* Hotel Information - Below Image */}
        <div className="flex justify-between items-end">
          {/* Left side - Hotel Name and Location */}
          <div>
            <p className="text-[28px] font-bold font-opensans text-gray-900 mb-2">
              Riad Deluxe Hotel
            </p>
            <p className="text-lg font-medium text-gray-400 font-opensans">
              Marakeş, Fas
            </p>
          </div>

          {/* Right side - Rating */}
          <div className="flex items-center gap-3 mb-10">
            <span className="text-2xl font-bold text-gray-900">4.7</span>
            <div className="flex items-center gap-1">{renderStars(4.7)}</div>
            <span className="text-base text-gray-500">(120)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default HotelConfirmationCard;
