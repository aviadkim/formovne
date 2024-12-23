import React from 'react';

interface ThankYouProps {
  formId?: string;
}

const ThankYou: React.FC<ThankYouProps> = ({ formId }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 text-center" dir="rtl">
      <div className="mb-6">
        <div className="w-16 h-16 bg-green-100 rounded-full mx-auto flex items-center justify-center">
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-4">תודה רבה!</h2>
      <p className="text-gray-600 mb-4">פנייתך התקבלה במערכת בהצלחה</p>
      {formId && (
        <p className="text-sm text-gray-500">מספר פנייה: {formId}</p>
      )}
      <div className="mt-8">
        <p className="text-gray-700">נציג מובנה גלובל יצור עמך קשר בהקדם</p>
      </div>
    </div>
  );
};

export default ThankYou;