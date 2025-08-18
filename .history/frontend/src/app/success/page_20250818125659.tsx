import React from "react";
import ProgressBar from "../../components/forms/ProgressBar";

const PaymentPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6 flex  items-center justify-center">
      {/* Progress Bar */}
      <ProgressBar currentStep={3} />
    </div>
  );
};

export default PaymentPage;
