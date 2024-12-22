import React, { useState } from 'react';
import { Target, Clock, PieChart, TrendingUp, LineChart, AlertCircle, Activity } from 'lucide-react';

interface RiskAssessmentProps {
  onDataChange?: (data: any) => void;
}

const RiskAssessment: React.FC<RiskAssessmentProps> = ({ onDataChange }) => {
  const [needMoneyReason, setNeedMoneyReason] = useState<string>('');
  const [showReasonField, setShowReasonField] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden" dir="rtl">
      <div className="p-8">
        {/* Logo and Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
              <Target className="w-6 h-6 text-orange-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">הערכת סיכונים</h2>
          </div>
          <img 
            src="/api/placeholder/120/40" 
            alt="Movne Logo" 
            className="h-12"
          />
        </div>

        <div className="space-y-8">
          {/* Main Investment Goal */}
          <div className="p-6 bg-gradient-to-br from-gray-50 to-orange-50 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
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
                    onChange={() => onDataChange?.({ mainGoal: goal })}
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
            <div className="flex items-center gap-3 mb-4">
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
                    onChange={() => onDataChange?.({ investmentPeriod: period })}
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

          {/* Market Experience */}
          <div className="p-6 bg-gradient-to-br from-gray-50 to-indigo-50 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <Activity className="w-5 h-5 text-indigo-600" />
              <h3 className="text-lg font-semibold text-gray-800">רמת הידע והניסיון בשוק ההון</h3>
              <span className="text-sm text-gray-500">(ניתן לבחור יותר מאחד)</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'אין ניסיון',
                'במסגרת לימודים',
                'עוקב ומכיר את שוק ההון',
                'משקיע בשוק ההון מעל 5 שנים',
                'השקעתי במוצרים מובנים',
                'יש לי השקעות אלטרנטיביות'
              ].map((experience) => (
                <label key={experience} className="relative">
                  <input 
                    type="checkbox" 
                    className="peer sr-only"
                    onChange={(e) => onDataChange?.({
                      experience: { [experience]: e.target.checked }
                    })}
                  />
                  <div className="p-4 border-2 border-gray-200 rounded-lg cursor-pointer
                              peer-checked:border-indigo-600 peer-checked:bg-indigo-50
                              hover:border-indigo-200 transition-all duration-300
                              flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-gray-300 rounded
                                peer-checked:bg-indigo-600 peer-checked:border-indigo-600" />
                    <span className="font-medium">{experience}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Investment Percentage */}
          <div className="p-6 bg-gradient-to-br from-gray-50 to-green-50 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
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
                    onChange={() => onDataChange?.({ investmentPercentage: percentage })}
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

          {/* Future Money Need */}
          <div className="p-6 bg-gradient-to-br from-gray-50 to-red-50 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <h3 className="text-lg font-semibold text-gray-800">האם בתקופה הנראית לעין יש צורך בכל הכסף או חלק ממנו?</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['לא', 'כן'].map((answer) => (
                <label key={answer} className="relative">
                  <input 
                    type="radio" 
                    name="needMoneyInFuture" 
                    className="peer sr-only"
                    onChange={(e) => {
                      setShowReasonField(answer === 'כן');
                      onDataChange?.({ needMoneyInFuture: answer });
                    }}
                  />
                  <div className="p-4 border-2 border-gray-200 rounded-lg cursor-pointer
                              peer-checked:border-red-600 peer-checked:bg-red-50
                              hover:border-red-200 transition-all duration-300">
                    <span className="block text-center font-medium">{answer}</span>
                  </div>
                </label>
              ))}
            </div>
            
            {showReasonField && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  פירוט סיבות אפשריות לצורך בכספים המושקעים
                </label>
                <textarea
                  className="w-full p-4 border-2 border-gray-200 rounded-lg
                           focus:ring-2 focus:ring-red-500 focus:border-red-500
                           transition-all duration-300 resize-none"
                  rows={3}
                  placeholder="לדוגמה: עזרה לילדים, חתונה, ניתוח"
                  value={needMoneyReason}
                  onChange={(e) => {
                    setNeedMoneyReason(e.target.value);
                    onDataChange?.({ needMoneyReason: e.target.value });
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskAssessment;
