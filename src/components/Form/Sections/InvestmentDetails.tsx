import React, { useState } from 'react';
import { Briefcase, CreditCard, Building2, ArrowUpRight, Target } from 'lucide-react';
import SectionHeader from '../../SectionHeader';

interface InvestmentDetailsProps {
  onDataChange?: (data: any) => void;
}

const InvestmentDetails: React.FC<InvestmentDetailsProps> = ({ onDataChange }) => {
  const [amount, setAmount] = useState('');
  const [formattedAmount, setFormattedAmount] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [showCustomBank, setShowCustomBank] = useState(false);
  const [customBank, setCustomBank] = useState('');

  const banks = [
    { id: 'leumi', name: 'בנק לאומי' },
    { id: 'poalim', name: 'בנק הפועלים' },
    { id: 'discount', name: 'בנק דיסקונט' },
    { id: 'mizrahi', name: 'בנק מזרחי טפחות' },
    { id: 'beinleumi', name: 'הבנק הבינלאומי' },
    { id: 'jerusalem', name: 'בנק ירושלים' },
    { id: 'ubank', name: 'יו בנק' },
    { id: 'other', name: 'בנק אחר' }
  ];

  const formatNumber = (value: string) => {
    const numericValue = value.replace(/,/g, '');
    if (numericValue === '') return '';
    return new Intl.NumberFormat('he-IL').format(Number(numericValue));
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, '');
    if (/^\d*$/.test(rawValue)) {
      setAmount(rawValue);
      setFormattedAmount(formatNumber(rawValue));
      onDataChange?.({ amount: rawValue });
    }
  };

  const handleBankChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedBank(value);
    setShowCustomBank(value === 'other');
    if (value !== 'other') {
      onDataChange?.({ bank: value });
    }
  };

  const handleCustomBankChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomBank(value);
    onDataChange?.({ bank: value });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="p-8">
        <SectionHeader icon={Briefcase} title="שאלון השקעות" color="indigo" />

        <div className="space-y-8">
          {/* Investment Amount */}
          <div className="p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <CreditCard className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-800">סכום מתוכנן להשקעה</h3>
            </div>
            <div className="relative">
              <input
                type="text"
                value={formattedAmount}
                onChange={handleAmountChange}
                className="w-full p-4 text-right border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="הכנס סכום (מינימום ₪100,000)"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-sm font-medium text-gray-500">
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
            <div className="space-y-4">
              <select 
                value={selectedBank}
                onChange={handleBankChange}
                className="w-full p-4 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
              >
                <option value="">בחר בנק</option>
                {banks.map(bank => (
                  <option key={bank.id} value={bank.id}>{bank.name}</option>
                ))}
              </select>

              {showCustomBank && (
                <input
                  type="text"
                  placeholder="הזן שם בנק"
                  value={customBank}
                  onChange={handleCustomBankChange}
                  className="w-full p-4 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
                />
              )}
            </div>
          </div>

          {/* Reference Currency */}
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
                  <div className="p-4 border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-yellow-600 peer-checked:bg-yellow-50 hover:border-yellow-200 transition-all duration-300">
                    <span className="block text-center font-medium">{currency}</span>
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

export default InvestmentDetails;