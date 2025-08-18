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
      </div>

      {/* Rezervasyon Detay Kartı */}
      <div className="bg-white p-6 rounded-lg shadow mt-8 w-full max-w-3xl space-y-4">
        <div>
          <Image
            src="/Placeholder image.png"
            alt="Riad Deluxe"
            width={128}
            height={128}
            className="rounded-lg w-full h-96 object-cover"
          />
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Riad Deluxe</h2>
          <Rating value={4.7} size={20} />
        </div>

        <div>
          <p className="text-sm text-gray-600">Marakeş, Fas</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
