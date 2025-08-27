import React from "react";
import { Card, CardContent } from "@/components/ui/card";

function ReservationDetailsCard() {
  return (
    <Card className="w-full max-w-2xl bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
      <CardContent className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold font-opensans text-gray-900">
            Rezervasyon Bilgileri
          </h3>
        </div>

        {/* Reservation Details */}
        <div className="space-y-4">
          {/* Check-in and Check-out Dates */}
          <div className="flex items-center justify-start">
            <div className="flex items-center my-5 gap-4">
              <div className="text-start">
                <div className="font-semibold text-base text-gray-900">
                  Giriş
                </div>
                <div className="font-bold text-xl font-opensans text-gray-900">
                  18 Temmuz 2025
                </div>
                <div className="text-[17px] font-normal text-gray-400">
                  14:00’dan itibaren
                </div>
              </div>

              {/* Vertical divider */}
              <div className="w-px h-16 bg-gray-300 mx-6"></div>

              <div className="text-start">
                <div className="font-semibold text-base text-gray-900">
                  Çıkış
                </div>
                <div className="font-bold text-xl font-opensans text-gray-900">
                  22 Temmuz 2025
                </div>
                <div className="text-[17px] font-normal text-gray-400">
                  12:00’a kadar
                </div>
              </div>
            </div>
          </div>

          {/* Room, duration, and guest info in a single line */}
          <div className="tex-start">
            <span className="text-gray-900 font-semibold text-lg">
              Deluxe Room / 4 gece, 2 misafir
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ReservationDetailsCard;
