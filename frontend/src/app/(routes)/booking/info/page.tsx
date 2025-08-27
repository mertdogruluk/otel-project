import PersonalInfoForm from "@/components/forms/PersonalInfoForm";
import ProgressBar from "@/components/forms/ProgressBar";
import ReservationSummary from "@/components/forms/ReservationSummary";
import React from "react";

export default function InfoPage() {

  return (
    <div className="min-h-screen mt-6 mb-12">
      {/* Progress Bar */}
      <div className="w-full">
        <ProgressBar currentStep={1} />
      </div>

      {/* Main Content Container */}
      <div className="flex flex-col gap-5 justify-center items-center mb-24">
        <div className="flex flex-row gap-28">
          <PersonalInfoForm />
          <ReservationSummary />
        </div>
      </div>
    </div>
  );
}