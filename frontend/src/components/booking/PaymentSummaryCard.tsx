import React from "react";
import { Card, CardContent } from "@/components/ui/card";

function PaymentSummaryCard() {
  return (
    <Card className="w-full max-w-2xl bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
      <CardContent className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold font-opensans text-gray-900">
            Ödeme Özeti
          </h3>
        </div>

        {/* Payment Details */}
        <div className="space-y-4">
          {/* Duration and Base Price */}
          <div className="flex justify-between items-center">
            <span className="text-gray-500 font-opensans font-semibold text-lg">
              4 gece
            </span>
            <span className="text-gray-500 font-opensans font-semibold text-lg">
              30.000 TL
            </span>
          </div>

          {/* Taxes and Service Fee */}
          <div className="flex justify-between items-center">
            <span className="text-gray-500 font-opensans font-semibold text-lg">
              Vergiler ve Hizmet Bedeli
            </span>
            <span className="text-gray-500 font-opensans font-semibold text-lg">
              10.500 TL
            </span>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-6"></div>

          {/* Total */}
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold font-opensans text-gray-900">
              Toplam
            </span>
            <span className="text-xl font-bold font-opensans text-blue-600">
              40.500 TL
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default PaymentSummaryCard;
