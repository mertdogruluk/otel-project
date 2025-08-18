import React from "react";
import Image from "next/image";
import ProgressBar from "../../components/forms/ProgressBar";
import Rating from "@/components/forms/Rating";

const PaymentPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      {/* Progress Bar */}
      <div className="w-full max-w-3xl mb-8">
        <ProgressBar currentStep={3} />
      </div>

      {/* Başarılı ödeme icon ve yazılar */}
      <div className="flex flex-col items-center mt-8">
        <Image
          src="/check.png"
          alt="Payment Successful"
          width={128}
          height={128}
        />

        <h1 className="mt-4 text-2xl font-semibold text-gray-800 text-center">
          Rezervasyon No: 648369
        </h1>
        <p className="mt-2 text-xl text-gray-600 text-center">
          Tebrikler! Riad Deluxe Hotel için rezervasyonunuz başarıyla
          alınmıştır.
        </p>
        <p className="mt-2 text-gray-600 text-center">
          Konaklamanızla ilgili tüm detaylar aşağıda yer almaktadır:
        </p>

        <button
          type="button"
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg"
        >
          Ana sayfaya dön
        </button>
      </div>

      {/* Rezervasyon Detay Kartı */}
      <div className="mb-6 bg-white rounded-lg shadow mt-8 w-full max-w-3xl overflow-hidden">
        {/* Yatay fotoğraf */}
        <div className="w-full h-64 relative">
          <Image
            src="/Placeholder image.png"
            alt="Riad Deluxe"
            fill
            className="object-cover"
          />
        </div>

        {/* Kart İçeriği */}
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Riad Deluxe</h2>
            <Rating value={4.7} size={20} />
          </div>

          <div>
            <p className="text-sm text-gray-600">Marakeş, Fas</p>
          </div>
        </div>
      </div>
      <div className=" bg-white p-6 rounded-lg shadow flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 mb-6 w-full max-w-4xl">
        {/* Rezervasyon Bilgileri */}
        <div className="flex-1 space-y-4">
          <h1 className="text-lg font-bold">Rezervasyon Bilgileri</h1>
          <div className="flex items-start">
            <div className="flex flex-col space-y-1 pr-4">
              <span>Giriş</span>
              <span className="font-semibold text-xl">18 Temmuz 2025</span>
              <span className="opacity-25">14:00 dan itibaren</span>
            </div>

            <div
              className="border-l border-gray-300 mx-4 self-center"
              style={{ height: "60px" }}
            ></div>

            <div className="flex flex-col space-y-1 pl-4">
              <span>Çıkış</span>
              <span className="font-semibold text-xl">22 Temmuz 2025</span>
              <span className="opacity-25">12:00 a kadar</span>
            </div>
          </div>
          <div>
            <h3>Deluxe Room / 4 gece, 2 misafir</h3>
          </div>
        </div>

        {/* Ödeme Özeti */}
        <div className="flex-1 space-y-4">
          <h1 className="text-lg font-bold">Ödeme Özeti</h1>
          <div className="flex items-start justify-between">
            <div className="flex flex-col space-y-5 pr-4">
              <span className="opacity-75">4 gece</span>
              <span className="opacity-75">Vergiler ve Hizmet Bedeli</span>
            </div>
            <div className="flex flex-col space-y-5 pr-4">
              <span className="opacity-75">30.000 TL</span>
              <span className="opacity-75">10.500 TL</span>
            </div>
          </div>
          <div className="border-t border-gray-300 my-4"></div>

          <div className="flex items-center justify-between">
            <span className="font-semibold">Toplam</span>
            <span className="font-semibold text-blue-900 text-xl">
              40.500 TL
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
