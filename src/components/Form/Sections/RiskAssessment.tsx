import React, { useState, useEffect, useCallback } from 'react';
import { Target, Clock, PieChart, TrendingUp } from 'lucide-react';

interface RiskAssessmentProps {
  onDataChange?: (data: any) => void;
}

const RiskAssessment: React.FC<RiskAssessmentProps> = ({ onDataChange }) => {
  const [formState, setFormState] = useState({
    mainGoal: '',
    investmentPeriod: '',
    investmentPercentage: ''
  });

  const handleChange = useCallback((field: string, value: string) => {
    setFormState(prev => {
      const newState = {
        ...prev,
        [field]: value
      };
      if (onDataChange) {
        onDataChange(newState);
      }
      return newState;
    });
  }, [onDataChange]);

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden" dir="rtl">
      <div className="p-8">
        {/* Section Header */}
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
            <Target className="w-6 h-6 text-orange-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">הערכת סיכונים</h2>
        </div>

        <div className="space-y-8">
          {/* Main Investment Goal */}
          <div className="p-6 bg-gradient-to-br from-gray-50 to-orange-50 rounded-xl">
            <div className="flex items-center space-x-3 mb-4">
              <TrendingUp className="w-5 h-5 text-orange-600" />
              <h3 className="text-lg font-semibold text-gray-800">המטרה העיקרית של ההשקעה</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'לשמור על הכסף שלי',
                'לחסוך לטווח ארוך',
                'שמירה על נזילות',
                'להגדיל את ההון'
              ].map((goal) => (
                <label key={goal} className="relative">
                  <input 
                    type="radio" 
                    name="mainGoal" 
                    className="peer sr-only"
                    value={goal}
                    checked={formState.mainGoal === goal}
                    onChange={(e) => handleChange('mainGoal', e.target.value)}
                  />
                  <div className="p-4 border-2 border-gray-200 rounded-lg cursor-pointer
                              peer-checked:border-orange-600 peer-checked:bg-orange-50
                              hover:border-orange-200 transition-all duration-300">
                    <span className="block text-right font-medium">{goal}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Investment Period */}
          <div className="p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl">
            <div className="flex items-center space-x-3 mb-4">
              <Clock className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-800">טווח ההשקעה הצפוי</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'עד שנתיים',
                'שנתיים עד חמש שנים',
                'מעל חמש שנים',
                'לא מוגבל בזמן'
              ].map((period) => (
                <label key={period} className="relative">
                  <input 
                    type="radio" 
                    name="investmentPeriod" 
                    className="peer sr-only"
                    value={period}
                    checked={formState.investmentPeriod === period}
                    onChange={(e) => handleChange('investmentPeriod', e.target.value)}
                  />
                  <div className="p-4 border-2 border-gray-200 rounded-lg cursor-pointer
                              peer-checked:border-blue-600 peer-checked:bg-blue-50
                              hover:border-blue-200 transition-all duration-300">
                    <span className="block text-right font-medium">{period}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Investment Percentage */}
          <div className="p-6 bg-gradient-to-br from-gray-50 to-green-50 rounded-xl">
            <div className="flex items-center space-x-3 mb-4">
              <PieChart className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-800">אחוז מסך הנכסים המיועדים להשקעה</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'עד 10%',
                '10% עד 25%',
                '25%-50%',
                'מעל 50%'
              ].map((percentage) => (
                <label key={percentage} className="relative">
                  <input 
                    type="radio" 
                    name="investmentPercentage" 
                    className="peer sr-only"
                    value={percentage}
                    checked={formState.investmentPercentage === percentage}
                    onChange={(e) => handleChange('investmentPercentage', e.target.value)}
                  />
                  <div className="p-4 border-2 border-gray-200 rounded-lg cursor-pointer
                              peer-checked:border-green-600 peer-checked:bg-green-50
                              hover:border-green-200 transition-all duration-300">
                    <span className="block text-right font-medium">{percentage}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskAssessment;