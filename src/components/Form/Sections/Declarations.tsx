import React, { useState, useRef } from 'react';
import { FileText, Check, AlertCircle } from 'lucide-react';
import SignaturePad from '../Common/SignaturePad';
import SectionHeader from '../../SectionHeader';

interface DeclarationsProps {
  onDataChange?: (data: Record<string, unknown>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

const Declarations: React.FC<DeclarationsProps> = ({ onDataChange, onSubmit }) => {
  const [readSections, setReadSections] = useState<Record<number, boolean>>({});
  const [finalConfirmation, setFinalConfirmation] = useState(false);
  const signatureRef = useRef(null);

  const declarations = [
    {
      title: 'מבוא ופרשנות',
      content: `הסכם זה נחתם בין חברת מובנה ("החברה") לבין הלקוח. ההסכם מגדיר את תנאי ההתקשרות בין הצדדים לצורך קבלת שירותי שיווק השקעות.`
    },
    {
      title: 'גילוי נאות',
      content: `החברה מצהירה כי היא בעלת רישיון לשיווק השקעות מאת רשות ניירות ערך. החברה עוסקת בשיווק השקעות ולא בייעוץ השקעות.`
    },
    {
      title: 'הצהרת הלקוח',
      content: `אני מצהיר כי כל הפרטים שמסרתי בטופס זה הם נכונים, מדויקים ומלאים.`
    }
  ];

  const handleSaveSignature = (signatureData: string) => {
    onDataChange?.({ signature: signatureData });
  };

  const allSectionsRead = Object.keys(readSections).length === declarations.length;

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="p-8">
        <SectionHeader icon={FileText} title="הצהרות וחתימה" color="purple" />

        <div className="space-y-8">
          {/* Declarations Status */}
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="text-sm font-medium text-gray-600 text-center">
              <span className="text-lg font-bold text-purple-600">
                {Object.keys(readSections).length}/{declarations.length}
              </span>
              {' '}
              סעיפים נקראו
            </div>
          </div>

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
                    type="button"
                    onClick={() => {
                      const newSections = { ...readSections, [index]: true };
                      setReadSections(newSections);
                      onDataChange?.({ readSections: newSections });
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
              <p>
                בחתימתי על מסמך זה הריני להצהיר, כי קראתי והבנתי את כל האמור לעיל.
              </p>
            </div>

            <label className="flex items-center gap-3 p-4 border-2 border-purple-200 rounded-lg bg-purple-50 cursor-pointer">
              <input 
                type="checkbox"
                checked={finalConfirmation}
                disabled={!allSectionsRead}
                onChange={(e) => {
                  setFinalConfirmation(e.target.checked);
                  onDataChange?.({ finalConfirmation: e.target.checked });
                }}
                className="w-5 h-5 border-2 border-purple-300 rounded checked:bg-purple-600 checked:border-purple-600 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
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

        {/* Submit Button */}
        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            onClick={(e) => onSubmit(e as any)}
            disabled={!finalConfirmation || !allSectionsRead}
            className={`px-8 py-4 rounded-full font-medium shadow-lg transition duration-300 ease-in-out transform hover:scale-105
              ${finalConfirmation && allSectionsRead 
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
          >
            שלח טופס
          </button>
        </div>
      </div>

      {/* Status Counter */}
      <div className="fixed bottom-8 left-8 flex flex-col items-end gap-4">
        <div className="bg-white rounded-2xl shadow-lg p-4 text-center">
          <div className="text-sm font-medium text-gray-600 mb-1">סטטוס הטופס</div>
          <div className="text-lg font-bold text-purple-600">
            {Object.keys(readSections).length}/3 סעיפים נקראו
          </div>
        </div>
      </div>
    </div>
  );
};

export default Declarations;