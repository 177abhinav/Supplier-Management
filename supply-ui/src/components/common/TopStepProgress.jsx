// src/components/common/TopStepProgress.jsx
import React from "react";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { CheckCircle2 } from "lucide-react";

const TopStepProgress = ({ currentStep, maxStepReached, goToStep, progressPercent }) => {
  const ACCENT_COLOR_DARK = "#254a6a";

  const steps = [
    { id: 1, title: "Supplier Details" },
    { id: 2, title: "Contact Details" },
    { id: 3, title: "Category & Info" },
    { id: 4, title: "Upload Attachments" },
    { id: 5, title: "Review & Submit" },
  ];

  const fillWidth =
    progressPercent !== undefined
      ? progressPercent
      : ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="mb-4">
      <div className="
        relative px-4 md:px-8 lg:px-4 py-3
        bg-gradient-to-br from-gray-50 via-white to-gray-100
        border border-gray-200 shadow-md  rounded-xl
        backdrop-blur-sm
      ">
        <div className="relative max-w-6xl mx-auto">
          {/* Background track */}
          <div className="absolute top-5 left-0 w-full h-1 bg-gray-200 rounded-full"></div>

          {/* Progress bar with gradient + animation */}
          <motion.div
            className="absolute top-5 left-0 h-1  rounded-full shadow-sm"
            style={{
              background: `linear-gradient(90deg, ${ACCENT_COLOR_DARK}, #4f83b5)`,
            }}
            initial={{ width: 0 }}
            animate={{ width: `${fillWidth}%` }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />

          {/* Step indicators */}
          <div className="flex justify-between w-full relative z-10 gap-x-2 md:gap-x-4">
            {steps.map((step) => {
              const isActive = currentStep === step.id;
              const isCompleted = step.id < currentStep;
              const isClickable = step.id <= maxStepReached;

              return (
                <TooltipProvider key={step.id}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.div
                        whileHover={isClickable ? { scale: 1.1 } : {}}
                        whileTap={isClickable ? { scale: 0.95 } : {}}
                        className="flex flex-col items-center w-20 md:w-28 group"
                      >
                        <button
                          onClick={() => isClickable && goToStep(step.id)}
                          disabled={!isClickable}
                          className={`
    w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300
    ${isActive
                              ? "bg-gradient-to-br from-[#1e293b] via-[#334155] to-[#1e293b] text-white shadow-lg ring-4 ring-blue-500 scale-110"
                              : isCompleted
                                ? "bg-blue-500 text-white shadow-md"
                                : isClickable
                                  ? "bg-white text-[#1e293b] border border-gray-300 hover:border-[#1e293b] hover:shadow-sm"
                                  : "bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed"
                            }
  `}
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="w-5 h-5" />
                          ) : (
                            step.id
                          )}
                        </button>

                        {/* Step Title */}
                        <span
                          className={`mt-3 text-xs md:text-sm font-medium text-center whitespace-nowrap
                            ${isActive
                              ? "text-[#254a6a] font-semibold"
                              : isCompleted
                                ? "text-[#254a6a]"
                                : isClickable
                                  ? "text-gray-700 group-hover:text-[#254a6a]"
                                  : "text-gray-400"
                            }
                          `}
                        >
                          {step.title}
                        </span>
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="bg-white shadow-md text-gray-800 border border-gray-200">
                      {step.title}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopStepProgress;
