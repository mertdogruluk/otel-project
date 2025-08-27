import React from "react";

type ProgressBarProps = {
  currentStep: number;
};

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep }) => {
  const steps = ["Konaklama Bilgileri", "Ödeme Bilgileri", "Rezervasyon Onayı"];

  return (
    <div className="w-full max-w-5xl mx-auto py-8">
      <div className="flex items-center justify-center">
        {steps.map((step, index) => (
          <React.Fragment key={step}>
            <div className="flex items-center">
              {/* Step Circle */}
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold transition-colors ${
                  index + 1 <= currentStep 
                    ? "bg-[#2F6FED]" 
                    : index + 1 === currentStep + 1
                    ? "bg-gray-400"
                    : "bg-gray-300"
                }`}
              >
                {index + 1}
              </div>
              
              {/* Step Label */}
              <span 
                className={`ml-4 text-lg font-semibold font-opensans transition-colors ${
                  index + 1 <= currentStep 
                    ? "text-[#2F6FED]" 
                    : "text-gray-500"
                }`}
              >
                {step}
              </span>
            </div>

            {/* Connector Line */}
            {index !== steps.length - 1 && (
              <div className="flex-1 h-[2px] bg-gray-200 mx-8 min-w-[100px]"></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
