import React from 'react';

interface DeclarationsProps {
  onDataChange: (data: Record<string, unknown>) => void;
}

const Declarations: React.FC<DeclarationsProps> = ({ onDataChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onDataChange({
      [name]: value
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">הצהרות משקיע</h2>
      
      {/* מספר שנות ניסיון */}
      <div>
        <label className="block text-sm font-medium text-gray-700">מספר שנות נסיון</label>
        <input
          type="number"
          name="experienceYears"
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      {/* סכום רכישה */}
      <div>
        <label className="block text-sm font-medium text-gray-700">סכום רכישה</label>
        <input
          type="number"
          name="purchaseAmount"
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      {/* חתימה דיגיטלית */}
      <div>
        <label className="block text-sm font-medium text-gray-700">חתימה דיגיטלית</label>
        <div className="mt-1 p-4 border-2 border-dashed border-gray-300 rounded-lg">
          <div className="text-center">
            {/* כאן נוסיף את קומפוננטת החתימה */}
            <p className="text-sm text-gray-500">לחץ כאן לחתימה</p>
          </div>
        </div>
      </div>

      {/* אישורים */}
      <div className="space-y-4">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              type="checkbox"
              name="isInfoConfirmed"
              onChange={handleChange}
              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
          </div>
          <div className="mr-3 text-sm">
            <label className="font-medium text-gray-700">
              אני מאשר שכל המידע שמסרתי נכון ומדויק
            </label>
          </div>
        </div>

        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              type="checkbox"
              name="isTermsAccepted"
              onChange={handleChange}
              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
          </div>
          <div className="mr-3 text-sm">
            <label className="font-medium text-gray-700">
              אני מאשר את תנאי השימוש ומדיניות הפרטיות
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Declarations;