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

  const handleSubmitClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const formEvent = new Event('submit', { bubbles: true, cancelable: true });
    e.currentTarget.form?.dispatchEvent(formEvent);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="p-8">
        <SectionHeader icon={FileText} title="הצהרות וחתימה" color="purple" />

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
      </div>
    </div>
  );
};

export default Declarations;