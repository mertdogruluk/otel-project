import React from "react";
import ProgressBar from "../../components/forms/ProgressBar";

const PaymentPage: React.FC = () => {
  return (
    <div>
      <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
        <div className="w-full max-w-3xl">
          <ProgressBar currentStep={3} />
        </div>
      </div>

      <div>
        <img
          src="/png-transparent-check-mark-computer-icons-icon-design-cheque-successful-angle-logo-grass-thumbnail.png"
          alt="Success"
        />
      </div>
    </div>
  );
};

export default PaymentPage;
