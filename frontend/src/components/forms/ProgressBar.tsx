import React from "react";

type ProgressBarProps = {
  currentStep: number;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep }) => {
  const steps = ["Konaklama Bilgileri", "Ödeme Bilgileri", "Rezervasyon Onayı"];

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center">
      <div className="flex items-center w-full">
        {steps.map((step, index) => (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                  index + 1 <= currentStep ? "bg-blue-600" : "bg-gray-300"
                }`}
              >
                {index + 1}
              </div>
              <span className="mt-2 text-sm font-medium text-center w-24">{step}</span>
            </div>
            {index !== steps.length - 1 && (
              <div className="flex-1 h-[2px] bg-gray-300 mx-4"></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
