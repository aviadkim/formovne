import React, { useState } from 'react';

interface DeclarationsProps {
  onDataChange: (data: Record<string, unknown>) => void;
  onSubmit?: () => void; // עשינו אותו אופציונלי
}

const Declarations: React.FC<DeclarationsProps> = ({ onDataChange, onSubmit }) => {
  const [openSection, setOpenSection] = useState<number | null>(null);

  const handleSectionClick = (index: number) => {
    setOpenSection(openSection === index ? null : index);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    onDataChange({
      [name]: checked
    });
  };

  const sections = [
    {
      title: 'מידע אודות החברה',
      content: (
        <div className="p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-4">
            מידע כללי על החברה ופעילותה בשוק ההון
          </p>
        </div>
      )
    },
    {
      title: 'הצהרת סיכון',
      content: (
        <div className="p-4 bg-yellow-50 rounded-lg">
          <div className="flex items-start space-x-2 rtl:space-x-reverse">
            <input
              type="checkbox"
              id="riskAcknowledgement"
              name="riskAcknowledgement"
              onChange={handleChange}
              className="mt-1"
            />
            <label htmlFor="riskAcknowledgement" className="text-sm text-gray-700">
              אני מאשר/ת כי קראתי והבנתי את כל הסיכונים הכרוכים בהשקעה
            </label>
          </div>
        </div>
      )
    },
    {
      title: 'תנאי שימוש',
      content: (
        <div className="p-4 bg-purple-50 rounded-lg">
          <div className="flex items-start space-x-2 rtl:space-x-reverse">
            <input
              type="checkbox"
              id="termsAcceptance"
              name="termsAcceptance"
              onChange={handleChange}
              className="mt-1"
            />
            <label htmlFor="termsAcceptance" className="text-sm text-gray-700">
              אני מסכים/ה לתנאי השימוש והמדיניות
            </label>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">הצהרות</h2>
      <div className="space-y-2">
        {sections.map((section, index) => (
          <div key={index} className="border rounded-lg overflow-hidden">
            <button
              className="w-full px-4 py-3 text-right bg-gray-50 hover:bg-gray-100 focus:outline-none flex justify-between items-center"
              onClick={() => handleSectionClick(index)}
            >
              <span className="font-medium">{section.title}</span>
              <span className="text-blue-500">
                {openSection === index ? '−' : '+'}
              </span>
            </button>
            {openSection === index && (
              <div className="border-t">
                {section.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Declarations;