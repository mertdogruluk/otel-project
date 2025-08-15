import React from "react";

type ProgressBarProps = {
  currentStep: number;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep }) => {
  const steps = ["Konaklama Bilgileri", "Ödeme Bilgileri", "Rezervasyon Onayı"];

  return (
    <div className="flex items-center justify-between">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center flex-1">
          {/* Numara */}
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
              index + 1 <= currentStep ? "bg-blue-600" : "bg-gray-300"
            }`}
          >
            {index + 1}
          </div>

          {/* Label */}
          <span className="ml-2 text-sm font-medium">{step}</span>

          {/* Çizgi */}
          {index !== steps.length - 1 && (
            <div className="flex-1 h-[2px] bg-gray-300 mx-4"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;
