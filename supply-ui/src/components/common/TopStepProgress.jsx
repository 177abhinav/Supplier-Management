// src/components/common/TopStepProgress.jsx
import React from 'react';

const TopStepProgress = ({ currentStep, goToStep }) => {
  const steps = [
    { id: 1, title: 'Supplier Details' },
    { id: 2, title: 'Contact Details' },
    { id: 3, title: 'Category & Info' },
    { id: 4, title: 'Upload Attachments' },
    { id: 5, title: 'Review & Submit' }
  ];

  return (
    <div className="mb-8">
      {/* Progress Line */}
      <div className="relative flex items-center">
        {/* Background Line */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 rounded-full -translate-y-1/2"></div>

        {/* Progress Fill Line */}
        <div
          className="absolute top-1/2 left-0 h-0.5 bg-blue-600 rounded-full -translate-y-1/2 transition-all duration-300 ease-out"
          style={{
            width: `${currentStep === 1 ? 0 : ((currentStep - 1) / (steps.length - 1)) * 100}%`
          }}
        ></div>

        {/* Step Indicators */}
        <div className="flex justify-between w-full relative z-10">
          {steps.map((step, index) => {
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;

            return (
              <div key={step.id} className="flex flex-col items-center">
                {/* Step Number */}
                <button
                  onClick={() => step.id <= currentStep && goToStep && goToStep(step.id)}
                  disabled={step.id > currentStep}
                  className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-200
                    ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-md'
                        : isCompleted
                          ? 'bg-green-500 text-white cursor-pointer hover:bg-green-600'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  aria-label={`Step ${step.id}`}
                >
                  {step.id}
                </button>

                {/* Step Title */}
                <span
                  className={`mt-2 text-xs md:text-sm font-medium text-center transition-colors duration-200
                    ${
                      isActive || isCompleted
                        ? 'text-blue-700'
                        : 'text-gray-500'
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