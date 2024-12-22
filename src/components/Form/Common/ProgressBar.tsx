import React from 'react';
import { Check } from 'lucide-react';

interface ProgressBarProps {
  steps: string[];
  currentStep: number;
  completedSteps: Record<string, boolean>;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  steps, 
  currentStep, 
  completedSteps 
}) => {
  return (
    <div className="py-4 px-6" dir="rtl">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step}>
            {/* Step Circle */}
            <div className="relative">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center
                         transition-all duration-300
                         ${index === currentStep 
                           ? 'bg-blue-600 text-white' 
                           : index < currentStep || completedSteps[step]
                             ? 'bg-green-600 text-white'
                             : 'bg-gray-200 text-gray-600'}`}
              >
                {index < currentStep || completedSteps[step] ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              
              {/* Step Title */}
              <div className="absolute -bottom-6 right-1/2 transform translate-x-1/2 whitespace-nowrap">
                <span className={`text-sm font-medium
                               ${index === currentStep 
                                 ? 'text-blue-600' 
                                 : index < currentStep || completedSteps[step]
                                   ? 'text-green-600'
                                   : 'text-gray-500'}`}>
                  {step}
                </span>
              </div>
            </div>

            {/* Connection Line */}
            {index < steps.length - 1 && (
              <div className="flex-1 h-0.5 mx-4">
                <div
                  className={`h-full transition-all duration-300
                           ${index < currentStep 
                             ? 'bg-green-600' 
                             : 'bg-gray-200'}`}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;