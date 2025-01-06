import React from 'react';

interface DeclarationsProps {
  onDataChange: (data: Record<string, unknown>) => void;
}

const Declarations: React.FC<DeclarationsProps> = ({ onDataChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    const finalValue = isCheckbox ? (e.target as HTMLInputElement).checked : value;
    
    onDataChange({
      [name]: finalValue
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-center">הצהרות וחתימה</h2>

      {/* מידע אודות החברה */}
      <div className="bg-blue-50 rounded-lg p-4">
        <h3 className="text-lg font-medium mb-3">מידע אודות החברה</h3>
        <textarea
          name="companyInfo"
          rows={3}
          className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          placeholder="כאן יופיע מידע אודות החברה..."
          onChange={handleChange}
        />
      </div>

      {/* הצהרת סיכון */}
      <div className="bg-red-50 rounded-lg p-4">
        <h3 className="text-lg font-medium mb-3">הצהרת סיכון</h3>
        <div className="space-y-2">
          <div className="flex items-start">
            <input
              type="checkbox"
              id="riskAcknowledgement"
              name="riskAcknowledgement"
              className="mt-1 mr-2"
              onChange={handleChange}
            />
            <label htmlFor="riskAcknowledgement" className="text-sm">
              אני מצהיר/ה כי קראתי והבנתי את כל הסיכונים הכרוכים בהשקעה
            </label>
          </div>
        </div>
      </div>

      {/* תנאי שימוש */}
      <div className="bg-green-50 rounded-lg p-4">
        <h3 className="text-lg font-medium mb-3">תנאי שימוש</h3>
        <div className="space-y-2">
          <div className="flex items-start">
            <input
              type="checkbox"
              id="termsAcceptance"
              name="termsAcceptance"
              className="mt-1 mr-2"
              onChange={handleChange}
            />
            <label htmlFor="termsAcceptance" className="text-sm">
              אני מסכים/ה לתנאי השימוש
            </label>
          </div>
        </div>
      </div>

      {/* אזור חתימה */}
      <div className="bg-purple-50 rounded-lg p-4">
        <h3 className="text-lg font-medium mb-3">חתימה דיגיטלית</h3>
        <div 
          className="border-2 border-dashed border-purple-200 rounded-lg h-32 flex items-center justify-center"
        >
          אזור החתימה
        </div>
      </div>
    </div>
  );
};

export default Declarations;