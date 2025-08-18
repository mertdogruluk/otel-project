import React from "react";
import Image from "next/image";
import ProgressBar from "../../components/forms/ProgressBar";

const PaymentPage: React.FC = () => {
  return (
    <div>
      <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
        <div className="w-full max-w-3xl mb-8">
          <ProgressBar currentStep={3} />
        </div>
        <div>
          <div className="flex flex-col items-center mt-4">
            <div className="flex justify-center mt-8">
              <Image
                src="/check.png"
                alt="Payment Successful"
                width={128}
                height={128}
              />
              <h1>Rezervasyon No:648369</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
