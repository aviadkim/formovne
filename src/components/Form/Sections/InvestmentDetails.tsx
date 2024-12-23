import React from 'react';
import { Briefcase, CreditCard, Building2, ArrowUpRight, Target } from 'lucide-react';

interface InvestmentDetailsProps {
  onDataChange?: (data: any) => void;
}

const InvestmentDetails: React.FC<InvestmentDetailsProps> = ({ onDataChange }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden" dir="rtl">
      <div className="p-8">
        {/* Logo and Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">שאלון השקעות</h2>
          </div>
        </div>

        <div className="space-y-8">
          {/* Investment Amount */}
          <div className="p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <CreditCard className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-800">סכום מתוכנן להשקעה</h3>
            </div>
            <div className="relative">
              <input
                type="number"
                min="100000"
                className="w-full p-4 text-right border-2 border-gray-200 rounded-lg
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                         transition-all duration-300"
                placeholder="הכנס סכום (מינימום ₪100,000)"
                onChange={(e) => onDataChange?.({ investmentAmount: e.target.value })}
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2
                            text-sm font-medium text-gray-500">
                ₪
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-500 text-right">
              * סכום מינימלי להשקעה: ₪100,000
            </div>
          </div>

          {/* Bank Selection */}
          <div className="p-6 bg-gradient-to-br from-gray-50 to-green-50 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <Building2 className="w-5 h-5 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-800">בחירת בנק</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['לאומי', 'הפועלים', 'דיסקונט', 'מזרחי טפחות'].map((bank) => (
                <label key={bank} className="relative">
                  <input 
                    type="radio" 
                    name="bank" 
                    className="peer sr-only" 
                    onChange={() => onDataChange?.({ selectedBank: bank })}
                  />
                  <div className="p-4 border-2 border-gray-200 rounded-lg cursor-pointer
                              peer-checked:border-green-600 peer-checked:bg-green-50
                              hover:border-green-200 transition-all duration-300">
                    <span className="block text-center font-medium">{bank}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Reference Currencies */}
          <div className="p-6 bg-gradient-to-br from-gray-50 to-yellow-50 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <ArrowUpRight className="w-5 h-5 text-yellow-600" />
              <h3 className="text-lg font-semibold text-gray-800">מטבע ייחוס</h3>
              <span className="text-sm text-gray-500">(ניתן לבחור יותר מאחד)</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['שקל', 'דולר', 'יורו', 'ליש"ט'].map((currency) => (
                <label key={currency} className="relative">
                  <input 
                    type="checkbox" 
                    className="peer sr-only"
                    onChange={(e) => onDataChange?.({ 
                      currencies: { [currency]: e.target.checked } 
                    })}
                  />
                  <div className="p-4 border-2 border-gray-200 rounded-lg cursor-pointer
                              peer-checked:border-yellow-600 peer-checked:bg-yellow-50
                              hover:border-yellow-200 transition-all duration-300">
                    <span className="block text-center font-medium">{currency}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Investment Purpose */}
          <div className="p-6 bg-gradient-to-br from-gray-50 to-purple-50 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-800">ייעוד הכסף</h3>
              <span className="text-sm text-gray-500">(ניתן לבחור יותר מאחד)</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'רכישת נכס',
                'סיוע למשפחה',
                'פנסיה',
                'ירושה לילדים',
                'הכנסה שוטפת מהשקעה',
                'אין ייעוד לכספים כרגע'
              ].map((purpose) => (
                <label key={purpose} className="relative">
                  <input 
                    type="checkbox" 
                    className="peer sr-only"
                    onChange={(e) => onDataChange?.({
                      purposes: { [purpose]: e.target.checked }
                    })}
                  />
                  <div className="p-4 border-2 border-gray-200 rounded-lg cursor-pointer
                              peer-checked:border-purple-600 peer-checked:bg-purple-50
                              hover:border-purple-200 transition-all duration-300
                              flex items-center justify-start gap-3">
                    <div className="w-5 h-5 border-2 border-gray-300 rounded
                                peer-checked:bg-purple-600 peer-checked:border-purple-600" />
                    <span className="font-medium">{purpose}</span>
                  </div>
                </label>
              ))}
              {/* Custom Purpose Option */}
              <div className="md:col-span-2">
                <label className="relative">
                  <input type="checkbox" className="peer sr-only" />
                  <div className="p-4 border-2 border-gray-200 rounded-lg cursor-pointer
                              peer-checked:border-purple-600 peer-checked:bg-purple-50
                              hover:border-purple-200 transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <span className="font-medium">אחר:</span>
                      <input
                        type="text"
                        className="flex-1 border-b-2 border-gray-300 focus:border-purple-600
                                bg-transparent outline-none transition-colors duration-300
                                text-right"
                        placeholder="פרט..."
                        onChange={(e) => onDataChange?.({
                          otherPurpose: e.target.value
                        })}
                      />
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentDetails;
