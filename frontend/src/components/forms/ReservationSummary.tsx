import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { XCircle, Coffee, Car } from "lucide-react";
import Rating from "@/components/forms/Rating";

const ReservationSummary: React.FC = () => {
  return (
    <div>
      <div className="mb-6">
        <div className="bg-white p-6 rounded-lg shadow space-y-4">
          <div>
            <Image
              src="/Placeholder image.png"
              alt=""
              width={128}
              height={128}
              className="rounded-lg w-full h-96 object-cover"
            />{" "}
          </div>

          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Riad Deluxe</h2>
            <Rating value={4.7} size={20} />
          </div>

          <div>
            <p className="text-sm text-gray-600">Marakeş,Fas</p>
          </div>

          <div>
            <Badge className="mr-2 bg-red-100 text-red-800">
              <XCircle size={14} className="mr-1" /> Ücretsiz iptal
            </Badge>
            <Badge className="mr-2 bg-green-100 text-green-800">
              <Coffee size={14} className="mr-1" /> Kahvaltı dahil
            </Badge>
            <Badge className="bg-blue-100 text-blue-800">
              <Car size={14} className="mr-1" /> Otopark
            </Badge>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow space-y-4 mb-6">
        <h1 className="text-lg font-bold">Rezervasyon Bilgileri</h1>
        <div className="flex items-start  ">
          <div className="flex flex-col space-y-1 pr-4">
            <span>Giriş</span>
            <span className="font-semibold text-xl">18 Temmuz 2025</span>
            <span className="opacity-25">14:00'dan itibaren</span>
          </div>

          <div
            className="border-l border-gray-300 mx-4 self-center"
            style={{ height: "60px" }}
          ></div>

          <div className="flex flex-col space-y-1 pl-4">
            <span>Çıkış</span>
            <span className="font-semibold text-xl">22 Temmuz 2025</span>
            <span className="opacity-25">12:00'a kadar</span>
          </div>
        </div>
        <div>
          <h3>Deluxe Room / 4 gece, 2 misafir</h3>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <h1 className="text-lg font-bold">Ödeme Özeti</h1>
        <div className="flex items-start justify-between">
          <div className="flex flex-col space-y-5 pr-4 ">
            <span className="opacity-75">4 gece</span>
            <span className="opacity-75">Vergiler ve Hizmet Bedeli</span>
          </div>
          <div className="flex flex-col space-y-5 pr-4">
            <span className=" opacity-75">30.000 TL</span>
            <span className=" opacity-75">10.500 TL</span>
          </div>
        </div>
        <div className="border-t border-gray-300 my-4"></div>

        <div className="flex items-center justify-between">
          <span className="font-semibold">Toplam</span>
          <span className="font-semibold text-blue-900 text-xl">40.500 TL</span>
        </div>
      </div>
    </div>
  );
};

export default ReservationSummary;
