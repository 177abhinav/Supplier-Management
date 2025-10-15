// src/components/common/StepNavigator.jsx
import React from "react";

const StepNavigator = ({
  currentStep,
  totalSteps = 5,
  onBack,
  onNext,
  onSubmit,
  goToStep,
  isFirstStep,
  isLastStep,
  maxStepReached,
}) => {
  // Color Palette
  const ACCENT_COLOR_DARK = "#254a6a";
  const SUCCESS_COLOR = "#059669";

  return (
    <div className="mt-10">
      {/* Outer Card with consistent style */}
      <div
        className="flex justify-center items-center flex-wrap gap-4 md:gap-8 px-6 py-5
        bg-gradient-to-br from-gray-50 via-white to-gray-100
        border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl
        transition-all duration-300"
      >
        {/* Back Button */}
        <button
          onClick={onBack}
          disabled={isFirstStep}
          className={`px-5 py-2.5 text-sm font-semibold rounded-xl flex items-center justify-center min-w-[100px]
            transition-all duration-200
            ${
              isFirstStep
                ? "bg-gray-50 text-gray-400 cursor-not-allowed border border-gray-200"
                : `bg-[${ACCENT_COLOR_DARK}] hover:bg-[#1f405c] text-white hover:scale-[1.02]
                   focus:outline-none focus:ring-2 focus:ring-[${ACCENT_COLOR_DARK}] focus:ring-offset-2 focus:ring-offset-white`
            }`
            }
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back
        </button>

        {/* Step Circles */}
        {[...Array(totalSteps)].map((_, index) => {
          const step = index + 1;
          const isActive = step === currentStep;
          const isClickable = step <= maxStepReached;

          return (
            <button
              key={step}
              onClick={() => isClickable && goToStep && goToStep(step)}
              disabled={!isClickable}
              className={`w-11 h-11 rounded-full font-extrabold transition-all duration-300 flex items-center justify-center text-base shrink-0
                ${
                  isActive
                    ? "bg-gradient-to-br from-[#1e293b] via-[#334155] to-[#1e293b] text-white shadow-lg ring-4 ring-blue-500 scale-110"
                    : isClickable
                    ? `bg-white text-[${ACCENT_COLOR_DARK}] border-2 border-gray-300 hover:bg-gray-50
                       focus:outline-none focus:ring-2 focus:ring-[${ACCENT_COLOR_DARK}] focus:ring-opacity-20`
                    : "bg-gray-100 text-gray-400 border-2 border-gray-200 cursor-not-allowed"
                }`}
              aria-label={`Step ${step}`}
            >
              {step}
            </button>
          );
        })}

        {/* Next / Submit Button */}
        <button
          onClick={isLastStep ? onSubmit : onNext}
          className={`px-5 py-2.5 text-sm font-semibold rounded-xl flex items-center justify-center min-w-[100px]
            shadow-md transition-all duration-200
            ${
              isLastStep
                ? `bg-[${SUCCESS_COLOR}] hover:bg-green-700 text-white shadow-green-400/50 hover:scale-[1.02]
                   focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2 focus:ring-offset-white`
                : `bg-[${ACCENT_COLOR_DARK}] hover:bg-[#1f405c] text-white hover:scale-[1.02]
                   focus:outline-none focus:ring-2 focus:ring-[${ACCENT_COLOR_DARK}] focus:ring-offset-2 focus:ring-offset-white`
            }`}
        >
          {isLastStep ? (
            <>
              Submit
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </>
          ) : (
            <>
              Next
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default StepNavigator;
