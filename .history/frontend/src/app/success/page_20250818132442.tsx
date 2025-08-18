import React from "react";
import Image from "next/image";
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
        <div className="flex justify-center mt-8">
          <Image
            src="frontend/public/success.png"
            alt="success"
            width={128}
            height={128}
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
