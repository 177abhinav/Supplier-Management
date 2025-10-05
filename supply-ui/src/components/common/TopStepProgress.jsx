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

  // ✅ Compute progress width
  const fillWidth =
    progressPercent !== undefined
      ? progressPercent
      : ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="mb-8">
      <div className="px-6 py-5 rounded-xl shadow-md border border-gray-200 bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="relative w-full">
          {/* Background Line */}
          <div className="absolute top-5 left-0 w-full h-1 bg-gray-200 rounded-full"></div>

          {/* Progress Fill Line */}
          <div
            className="absolute top-5 left-0 h-1 bg-[#1a365d] rounded-full transition-all duration-500 ease-out shadow-sm"
            style={{ width: `${fillWidth}%` }}
          ></div>

          {/* Steps */}
          <div className="flex justify-between w-full relative z-10">
            {steps.map((step) => {
              const isActive = currentStep === step.id;
              const isCompleted = step.id < currentStep; // Only steps before current are "completed"

              return (
                <div
                  key={step.id}
                  className="flex flex-col items-center w-20 md:w-28"
                >
                  {/* Step Circle */}
                  <button
                    onClick={() => goToStep(step.id)}
                    disabled={step.id > maxStepReached}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 shadow-md border-2
                      ${
                        isCompleted || isActive
                          ? "bg-[#1a365d] text-white border-[#1a365d] " +
                            (isActive
                              ? "scale-110 focus:ring-1 focus:ring-[#1a365d] focus:shadow-[0_0_0_3px_rgba(26,54,93,0.2)]"
                              : "")
                          : step.id <= maxStepReached
                          ? "bg-white text-[#1a365d] border-gray-200 hover:bg-gray-50 hover:text-[#1a365d] focus:ring-1 focus:ring-[#1a365d] focus:shadow-[0_0_0_3px_rgba(26,54,93,0.2)]"
                          : "bg-gray-50 text-gray-400 border-gray-300 cursor-not-allowed"
                      }`}
                    aria-label={`Step ${step.id}: ${step.title}`}
                  >
                    {step.id}
                  </button>

                  {/* Step Title */}
                  <span
                    className={`mt-3 text-xs md:text-sm font-medium text-center whitespace-nowrap transition-colors duration-300
                      ${
                        isCompleted || isActive
                          ? "text-[#1a365d] font-semibold"
                          : step.id <= maxStepReached
                          ? "text-gray-700"
                          : "text-gray-400"
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
    </div>
  );
};

export default TopStepProgress;