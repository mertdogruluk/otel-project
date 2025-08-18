import React from "react";
import Image from "next/image";

const PaymentSuccessPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      {/* Başarılı ikon ve animasyon */}
      <div className="flex flex-col items-center">
        <div className="bg-green-100 rounded-full p-6 animate-bounce">
          <Image
            src="/check.png"
            alt="Payment Successful"
            width={128}
            height={128}
          />
        </div>

        {/* Başarılı mesaj */}
        <h1 className="mt-6 text-3xl font-bold text-green-600">
          Payment Successful!
        </h1>
        <p className="mt-2 text-gray-700 text-center max-w-md">
          Thank you for your payment. Your transaction has been completed
          successfully.
        </p>

        {/* Butonlar */}
        <div className="mt-8 flex gap-4">
          <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
            Go to Dashboard
          </button>
          <button className="px-6 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-100 transition">
            View Receipt
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
