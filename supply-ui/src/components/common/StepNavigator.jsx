// src/components/common/StepNavigator.jsx
import React from 'react';

const StepNavigator = ({
  currentStep,
  totalSteps = 5,
  onBack,
  onNext,
  onSubmit,
  goToStep,
  isFirstStep,
  isLastStep
}) => {
  return (
    <div className="mt-6">
      <div className="flex justify-center items-center flex-wrap gap-3 md:gap-6 px-6 py-4 bg-gradient-to-br from-gray-50 via-white to-gray-100 rounded-xl shadow-md border border-gray-200">
        
        {/* Back Button */}
        <button
          onClick={onBack}
          disabled={isFirstStep}
          className={`px-4 py-2 font-medium rounded-lg transition-all duration-200 flex items-center justify-center min-w-[80px]
            ${isFirstStep
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-700 hover:-translate-x-0.5 focus:outline-none focus:ring-1 focus:ring-[#1a365d] focus:shadow-[0_0_0_3px_rgba(26,54,93,0.2)]'}`}
        >
          ← Back
        </button>

        {/* Step Circles */}
        {[...Array(totalSteps)].map((_, index) => {
          const step = index + 1;
          const isActive = step === currentStep;
          const isFuture = step > currentStep;

          return (
            <button
              key={step}
              onClick={() => !isFuture && goToStep && goToStep(step)}
              disabled={isFuture}
              className={`w-10 h-10 rounded-full font-bold transition-all duration-200 flex items-center justify-center text-sm
                ${
                  isActive
                    ? 'bg-[#1a365d] text-white scale-110 border-2 border-[#1a365d] shadow-md focus:outline-none focus:ring-1 focus:ring-[#1a365d] focus:shadow-[0_0_0_3px_rgba(26,54,93,0.2)]'
                    : isFuture
                      ? 'bg-gray-50 text-gray-400 border-2 border-gray-300 cursor-not-allowed'
                      : 'bg-white text-[#1a365d] border-2 border-gray-200 hover:bg-gray-50 hover:text-[#1a365d] focus:outline-none focus:ring-1 focus:ring-[#1a365d] focus:shadow-[0_0_0_3px_rgba(26,54,93,0.2)]'
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
          className={`px-4 py-2 font-medium rounded-lg transition-all duration-200 flex items-center justify-center min-w-[80px]
            ${isLastStep
              ? 'bg-green-600 hover:bg-green-700 text-white hover:translate-x-0.5 shadow-md focus:outline-none focus:ring-1 focus:ring-green-700 focus:shadow-[0_0_0_3px_rgba(21,128,61,0.3)]'
              : 'bg-[#1a365d] hover:bg-[#162a4b] text-white hover:translate-x-0.5 shadow-md focus:outline-none focus:ring-1 focus:ring-[#1a365d] focus:shadow-[0_0_0_3px_rgba(26,54,93,0.2)]'
            }`}
        >
          {isLastStep ? 'Submit →' : 'Next →'}
        </button>
      </div>
    </div>
  );
};

export default StepNavigator;
