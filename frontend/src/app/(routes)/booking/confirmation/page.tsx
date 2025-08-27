import ProgressBar from "@/components/forms/ProgressBar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import HotelConfirmationCard from "@/components/booking/HotelConfirmationCard";
import ConfirmationDetailsCard from "@/components/booking/ConfirmationDetailsCard";
import Link from "next/link";

function ConfirmationPage() {
  return (
    <div className="min-h-screen">
      {/* Progress Bar */}
      <div className="w-full">
        <ProgressBar currentStep={3} />
      </div>

      {/* Main Content with Centered Layout */}
      <div className="flex flex-col items-center pt-8 pb-16 px-4">
        {/* Successfull Payment Icon and Texts */}
        <div className="flex flex-col items-center mb-12">
          <Image
            src="/images/check-icon.png"
            alt="Payment Successful"
            width={60}
            height={60}
          />

          <h3 className="mt-4 text-[26px] font-bold text-gray-600 text-center font-opensans">
            Rezervasyon No: 648369
          </h3>
          <p className="mt-3 text-[26px] text-gray-600 text-center font-opensans font-semibold">
            Tebrikler! Riad Deluxe Hotel için rezervasyonunuz başarıyla
            alınmıştır.
          </p>
          <p className="mt-3 text-gray-500 text-lg text-center font-opensans font-semibold">
            Konaklamanızla ilgili tüm detaylar aşağıda yer almaktadır:
          </p>

          <Link href="/">
            <Button
              type="button"
              className="bg-[#2F6FED] hover:bg-[white] hover:text-[#2F6FED] hover:border-[#2F6FED] border-1 text-white font-opensans font-bold p-6 rounded-lg cursor-pointer mt-4"
            >
              Ana sayfaya dön
            </Button>
          </Link>
        </div>

        {/* Cards Container with Max Width */}
        <div className="w-full max-w-7xl space-y-6">
          {/* Hotel Confirmation Card */}
          <HotelConfirmationCard />

          {/* Confirmation Details Card */}
          <ConfirmationDetailsCard />
        </div>
      </div>
    </div>
  );
}

export default ConfirmationPage;
