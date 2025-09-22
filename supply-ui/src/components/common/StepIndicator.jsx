import React from 'react';

const StepIndicator = ({ step, title, active }) => {
  return (
    <div className={`flex items-center space-x-2 transition-colors duration-300 ${active ? 'text-blue-600' : 'text-gray-400'}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-colors duration-300 ${active ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
        {step}
      </div>
      <span className="text-sm md:text-base font-medium whitespace-nowrap hidden sm:block">{title}</span>
    </div>
  );
};

export default StepIndicator;