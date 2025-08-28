"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import Link from "next/link";
import { HotelData } from "@/types/hotel";

interface BookingFormCardProps {
  hotelData?: HotelData;
}

export default function BookingFormCard({ hotelData }: BookingFormCardProps) {
  // Default data for demo purposes
  const defaultData = {
    isim: "Riad Deluxe Hotel",
    konum: "Marakes, Fas",
    puan: 4.7,
    yorumSayisi: 120,
    girisTarihi: "18/07/2025",
    cikisTarihi: "22/07/2025",
    kisiSayisi: 1,
    fiyat: 40500,
    paraBirimi: "TL",
    geceSayisi: 4
  };

  const data = hotelData ? {
    isim: hotelData.title,
    konum: hotelData.location,
    puan: hotelData.rating,
    yorumSayisi: hotelData.reviews,
    girisTarihi: "18/07/2025",
    cikisTarihi: "22/07/2025",
    kisiSayisi: 1,
    fiyat: parseInt(hotelData.price.replace(/[^\d]/g, '')),
    paraBirimi: "TL",
    geceSayisi: 4
  } : defaultData;
  const [kisiSayisi, setKisiSayisi] = useState(data.kisiSayisi || 1);

  const kisiAzalt = () => {
    if (kisiSayisi > 1) {
      setKisiSayisi(kisiSayisi - 1);
    }
  };

  const kisiArtir = () => {
    setKisiSayisi(kisiSayisi + 1);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">{data.isim}</h2>
        <p className="text-lg text-gray-600 mb-4">{data.konum}</p>
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <span className="text-yellow-400 text-lg">★★★★☆</span>
            <span className="ml-2 font-semibold">{data.puan}</span>
          </div>
          <span className="text-gray-500">({data.yorumSayisi})</span>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">Giriş</label>
            <input
              type="text"
              value={data.girisTarihi}
              readOnly
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-base"
            />
          </div>
          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">Çıkış</label>
            <input
              type="text"
              value={data.cikisTarihi}
              readOnly
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-base"
            />
          </div>
        </div>

        <div>
          <label className="block text-base font-medium text-gray-700 mb-2">Kişi</label>
          <div className="flex items-center border border-gray-300 rounded-lg bg-white overflow-hidden">
            <button onClick={kisiAzalt} className="w-14 h-14 bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
              <Minus className="w-6 h-6 text-blue-600" />
            </button>
            <div className="flex-1 text-center py-4">
              <span className="text-xl font-semibold text-gray-800">{kisiSayisi}</span>
            </div>
            <button onClick={kisiArtir} className="w-14 h-14 bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
              <Plus className="w-6 h-6 text-blue-600" />
            </button>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-bold text-blue-600">{data.fiyat.toLocaleString()} {data.paraBirimi}</span>
          <span className="text-gray-600 text-base">/ {data.geceSayisi} gece</span>
        </div>
      </div>

      <div className="space-y-4">
        <Link href="/booking/info">
          <button className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors">Rezervasyon yap</button>
        </Link>
        <button className="w-full border border-blue-600 text-blue-600 py-4 px-6 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors">Detaylı bilgi al</button>
      </div>
    </div>
  );
}


