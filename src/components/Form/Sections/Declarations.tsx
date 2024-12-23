import React, { useState, useRef } from 'react';
import { FileText, Check, AlertCircle, PenTool } from 'lucide-react';
import SignaturePad from '../../Common/SignaturePad';

interface DeclarationsProps {
  onDataChange?: (data: any) => void;
  onSubmit?: () => Promise<void>;
}

const Declarations: React.FC<DeclarationsProps> = ({ onDataChange, onSubmit }) => {
  const [readSections, setReadSections] = useState<Record<number, boolean>>({});
  const [finalConfirmation, setFinalConfirmation] = useState(false);
  const signatureRef = useRef(null);

  const declarations = [
    {
      title: 'מבוא ופרשנות',
      content: `הסכם זה נחתם בין חברת מובנה ("החברה") לבין הלקוח. 
      ההסכם מגדיר את תנאי ההתקשרות בין הצדדים לצורך קבלת שירותי שיווק השקעות.
      כל המונחים בהסכם זה יפורשו בהתאם להגדרתם בחוק הסדרת העיסוק בייעוץ השקעות, 
      בשיווק השקעות ובניהול תיקי השקעות, התשנ"ה-1995.`
    },
    {
      title: 'גילוי נאות',
      content: `החברה מצהירה כי היא בעלת רישיון לשיווק השקעות מאת רשות ניירות ערך.
      החברה עוסקת בשיווק השקעות ולא בייעוץ השקעות, ועשויה להעדיף נכסים פיננסיים 
      שלגופים המוסדיים המנפיקים אותם יש זיקה אליהם. הלקוח מאשר כי הובהר לו שהחברה 
      משווקת השקעות ולא מייעצת.`
    },
    {
      title: 'הצהרת הלקוח',
      content: `אני מצהיר כי כל הפרטים שמסרתי בטופס זה הם נכונים, מדויקים ומלאים.
      אני מתחייב להודיע לחברה על כל שינוי בפרטים אלו. אני מאשר כי קראתי את כל 
      תנאי ההסכם, הבנתי אותם, ואני מסכים להם.`
    }
  ];

  const handleSaveSignature = (signatureData: string) => {
    onDataChange?.({ signature: signatureData });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden" dir="rtl">
      <div className="p-8">
        {/* Section Header */}
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
            <FileText className="w-6 h-6 text-purple-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">הצהרות וחתימה</h2>
        </div>

        <div className="space-y-8">
          {/* Declarations Accordion */}
          <div className="space-y-4">
            {declarations.map((section, index) => (
              <div key={index} className="border-2 border-gray-200 rounded-xl overflow-hidden">
                <div className="bg-gray-50 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-gray-800">{section.title}</h3>
                    {readSections[index] && (
                      <span className="bg-green-100 text-green-600 text-sm px-3 py-1 rounded-full flex items-center gap-1">
                        <Check size={14} />
                        נקרא
                      </span>
                    )}
                  </div>
                  <button 
                    onClick={() => {
                      const newSections = { ...readSections, [index]: true };
                      setReadSections(newSections);
                      onDataChange?.(newSections);
                    }}
                    className="text-purple-600 hover:text-purple-700 font-medium"
                  >
                    קרא עוד
                  </button>
                </div>
                <div className={`max-h-0 overflow-hidden transition-all duration-300 ${readSections[index] ? 'max-h-96 p-4' : ''}`}>
                  <div className="prose prose-sm text-gray-600">
                    {section.content}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Final Declaration */}
          <div className="p-6 bg-gradient-to-br from-gray-50 to-purple-50 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-5 h-5 text-purple-600 shrink-0" />
              <h3 className="text-lg font-semibold text-gray-800">הצהרה סופית</h3>
            </div>
            
            <div className="prose prose-sm max-w-none text-gray-600 mb-4 leading-relaxed">
              <p>בחתימתי על מסמך זה הריני להצהיר, כל מידע אשר נתבקשתי למסור אולם נמנעתי מלמסרו, 
              הינו מידע אשר אין ברצוני שישמש את החברה במסגרת מילוי תפקידם על-פי הסכם זה ואני מוותר בזאת על כל טענה 
              ו/או טרוניה ו/או זכות כלשהי בדבר שיווק השקעות ללא שימוש במידע זה.</p>
              
              <p>ידוע לי כי במידה ולא אמסור פרט או פרטים מאלה המצוינים בשאלון זה יקשה על החברה 
              ליתן לי את השרות המבוקש במסגרת הסכם זה.</p>
            </div>

            <label className="flex items-center gap-3 p-4 border-2 border-purple-200 rounded-lg
                           bg-purple-50 cursor-pointer">
              <input 
                type="checkbox"
                checked={finalConfirmation}
                onChange={(e) => {
                  setFinalConfirmation(e.target.checked);
                  onDataChange?.({ finalConfirmation: e.target.checked });
                }}
                className="w-5 h-5 border-2 border-purple-300 rounded
                         checked:bg-purple-600 checked:border-purple-600
                         focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              />
              <span className="font-medium text-gray-800">
                קראתי והבנתי את כל האמור לעיל ואני מאשר את נכונות הפרטים
              </span>
            </label>
          </div>

          {/* Digital Signature */}
          <SignaturePad 
            onSave={handleSaveSignature}
            signatureRef={signatureRef}
          />
        </div>
      </div>

      {/* Final Submit Button - Fixed at Bottom */}
      <div className="fixed bottom-8 left-8 flex flex-col items-end gap-4">
        <div className="bg-white rounded-2xl shadow-lg p-4 text-center">
          <div className="text-sm font-medium text-gray-600 mb-1">סטטוס הטופס</div>
          <div className="text-lg font-bold text-purple-600">
            {Object.keys(readSections).length}/3 סעיפים נקראו
          </div>
        </div>
        <button
          onClick={onSubmit}
          disabled={!finalConfirmation || Object.keys(readSections).length < 3}
          className={`px-8 py-4 rounded-full shadow-lg text-white font-medium
            ${finalConfirmation && Object.keys(readSections).length === 3 
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700' 
              : 'bg-gray-400'}
            transition duration-300 ease-in-out transform hover:scale-105`}
        >
          שלח טופס
        </button>
      </div>
    </div>
  );
};

export default Declarations;