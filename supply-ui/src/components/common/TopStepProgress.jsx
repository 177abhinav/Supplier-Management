// src/components/common/TopStepProgress.jsx
import React from "react";

const TopStepProgress = ({
  currentStep,
  maxStepReached,
  goToStep,
  progressPercent,
}) => {
  const steps = [
    { id: 1, title: "Supplier Details" },
    { id: 2, title: "Contact Details" },
    { id: 3, title: "Category & Info" },
    { id: 4, title: "Upload Attachments" },
    { id: 5, title: "Review & Submit" },
  ];

  // ✅ Compute fillWidth
  const fillWidth =
    progressPercent !== undefined
      ? progressPercent
      : ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="mb-12">
      <div className="relative w-full">
        {/* Background Line */}
        <div className="absolute top-5 left-0 w-full h-1 bg-gray-200 rounded-full"></div>

        {/* Progress Fill Line */}
        <div
          className="absolute top-5 left-0 h-1 bg-blue-600 rounded-full transition-all duration-500 ease-out shadow-sm"
          style={{ width: `${fillWidth}%` }}
        ></div>

        {/* Steps */}
        <div className="flex justify-between w-full relative z-10">
          {steps.map((step) => {
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;

            return (
              <div
                key={step.id}
                className="flex flex-col items-center w-20 md:w-28"
              >
                {/* Step Circle */}
                <button
                  onClick={() => goToStep(step.id)}
                  disabled={step.id > maxStepReached}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 shadow-md
                    ${
                      isActive
                        ? "bg-blue-600 text-white ring-4 ring-blue-200 scale-110"
                        : step.id <= maxStepReached
                        ? "bg-green-500 text-white hover:bg-green-600"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  aria-label={`Step ${step.id}`}
                >
                  {step.id}
                </button>

                {/* Step Title (below) */}
                <span
                  className={`mt-3 text-xs md:text-sm font-medium text-center whitespace-nowrap transition-colors duration-300
                    ${
                      isActive
                        ? "text-blue-700 font-semibold"
                        : step.id <= maxStepReached
                        ? "text-green-700"
                        : "text-gray-500"
                    }`}
                >
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TopStepProgress;
