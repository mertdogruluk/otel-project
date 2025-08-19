"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import Link from "next/link";
import { OtelData } from "@/types/hotel";

interface RezervasyonKartiProps {
  otelData?: OtelData;
}

export default function RezervasyonKarti({ otelData }: RezervasyonKartiProps) {
  const [kisiSayisi, setKisiSayisi] = useState(otelData?.kisiSayisi || 1);

  const kisiAzalt = () => {
    if (kisiSayisi > 1) {
      setKisiSayisi(kisiSayisi - 1);
    }
  };

  const kisiArtir = () => {
    setKisiSayisi(kisiSayisi + 1);
  };

  if (!otelData) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 w-full">
      {/* Otel Bilgileri */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          {otelData.isim}
        </h2>
        <p className="text-gray-600 mb-3">{otelData.konum}</p>
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <span className="text-yellow-400 text-lg">★★★★☆</span>
            <span className="ml-2 font-semibold">{otelData.puan}</span>
          </div>
          <span className="text-gray-500">({otelData.yorumSayisi})</span>
        </div>
      </div>

      {/* Rezervasyon Detayları */}
      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Giriş
            </label>
            <input
              type="text"
              value={otelData.girisTarihi}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Çıkış
            </label>
            <input
              type="text"
              value={otelData.cikisTarihi}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Kişi
          </label>
          <div className="flex items-center border border-gray-300 rounded-lg bg-white overflow-hidden">
            <button
              onClick={kisiAzalt}
              className="w-12 h-12 bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <Minus className="w-5 h-5 text-blue-600" />
            </button>
            <div className="flex-1 text-center py-3">
              <span className="text-lg font-semibold text-gray-800">{kisiSayisi}</span>
            </div>
            <button
              onClick={kisiArtir}
              className="w-12 h-12 bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <Plus className="w-5 h-5 text-blue-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Fiyat */}
      <div className="mb-6">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-blue-600">
            {otelData.fiyat.toLocaleString()} {otelData.paraBirimi}
          </span>
          <span className="text-gray-600 text-sm">
            / {otelData.geceSayisi} gece
          </span>
        </div>
      </div>

      {/* Butonlar */}
  <div className="space-y-6">
        <Link href="/bilgiler">
          <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Rezervasyon yap
          </button>
        </Link>
        <button className="w-full border border-blue-600 text-blue-600 py-3 px-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors mt-6">
          Detaylı bilgi al
        </button>
      </div>
    </div>
  );
}
