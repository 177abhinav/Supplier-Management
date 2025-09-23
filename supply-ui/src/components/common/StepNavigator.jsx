// src/components/common/StepNavigator.jsx
import React from 'react';

const StepNavigator = ({ currentStep, totalSteps = 5, onBack, onNext, onSubmit, goToStep, isFirstStep, isLastStep }) => {
  return (
    <div className="mt-8">
      {/* ✅ STEP BUTTONS + NAVIGATION — Progress bar REMOVED */}
      <div className="flex justify-center items-center flex-wrap gap-3 md:gap-6 px-4 py-4 bg-white rounded-lg shadow-sm border border-gray-100">
        {/* Back Button */}
        <button
          onClick={onBack}
          disabled={isFirstStep}
          className={`px-4 py-2 font-medium rounded-lg transition-all duration-300 flex items-center justify-center min-w-[80px] ${
            isFirstStep
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-700 hover:-translate-x-0.5'
          }`}
        >
          ← Back
        </button>

        {/* Step Numbers — ALL 5 always visible */}
        {[...Array(totalSteps)].map((_, index) => {
          const step = index + 1;
          const isActive = step === currentStep;
          const isFuture = step > currentStep;

          return (
            <button
              key={step}
              onClick={() => !isFuture && goToStep && goToStep(step)}
              disabled={isFuture}
              className={`w-10 h-10 rounded-full font-bold transition-all duration-300 flex items-center justify-center text-sm
                ${
                  isActive
                    ? 'bg-blue-600 text-white scale-110 shadow-md border-2 border-blue-700'
                    : isFuture
                      ? 'bg-gray-50 text-gray-400 border-2 border-gray-300 cursor-not-allowed hover:scale-100'
                      : 'bg-gray-200 text-gray-700 border-2 border-gray-300 hover:bg-gray-300 hover:text-gray-800'
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
          className={`px-4 py-2 font-medium rounded-lg transition-all duration-300 flex items-center justify-center min-w-[80px] ${
            isLastStep
              ? 'bg-green-600 hover:bg-green-700 text-white hover:translate-x-0.5'
              : 'bg-blue-600 hover:bg-blue-700 text-white hover:translate-x-0.5'
          }`}
        >
          {isLastStep ? 'Submit →' : 'Next →'}
        </button>
      </div>
    </div>
  );
};

export default StepNavigator;