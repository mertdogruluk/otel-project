import PaymentForm from "@/components/forms/PaymentForm";
import ProgressBar from "@/components/forms/ProgressBar";
import ReservationSummary from "@/components/forms/ReservationSummary";
import React from "react";

function CheckOut() {
  return (
    <div className="min-h-screen mt-6 mb-12">
      {/* Progress Bar */}
      <div className="w-full">
        <ProgressBar currentStep={2} />
      </div>

      {/* Main Content Container */}
      <div className="flex flex-col gap-5 justify-center items-center mb-24">
        <div className="flex flex-row gap-28">
          <PaymentForm />
          <ReservationSummary />
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
