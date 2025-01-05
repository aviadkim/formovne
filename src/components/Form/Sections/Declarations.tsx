import React from 'react';

interface DeclarationsProps {
  onSubmit?: () => void;
  onDataChange: (data: Record<string, unknown>) => void;
}

const Declarations: React.FC<DeclarationsProps> = ({ onDataChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    onDataChange({
      [name]: checked
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">הצהרות</h2>
      <div className="space-y-4">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="terms"
              name="termsAccepted"
              type="checkbox"
              onChange={handleChange}
              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
          </div>
          <div className="mr-3 text-sm">
            <label htmlFor="terms" className="font-medium text-gray-700">
              אני מסכים/ה לתנאי השימוש
            </label>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="risk"
              name="riskAcknowledged"
              type="checkbox"
              onChange={handleChange}
              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
          </div>
          <div className="mr-3 text-sm">
            <label htmlFor="risk" className="font-medium text-gray-700">
              אני מבין/ה את הסיכונים הכרוכים בהשקעה
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Declarations;