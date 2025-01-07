import React, { useRef, useState } from 'react';
import { DeclarationsProps } from '../../../types/props';
import { SectionHeader } from '../Common/SectionHeader';
import SignatureCanvas from 'react-signature-canvas';

const Declarations: React.FC<DeclarationsProps> = ({ data, onDataChange }) => {
  const signaturePadRef = useRef<SignatureCanvas>(null);
  const [showSignature, setShowSignature] = useState(false);

  const handleReadSection = (sectionNumber: number, isChecked: boolean) => {
    onDataChange({
      readSections: {
        ...data.readSections,
        [sectionNumber]: isChecked
      }
    });
  };

  const handleSignatureEnd = () => {
    if (signaturePadRef.current) {
      const signatureData = signaturePadRef.current.toDataURL();
      onDataChange({ signature: signatureData });
    }
  };

  const clearSignature = () => {
    if (signaturePadRef.current) {
      signaturePadRef.current.clear();
      onDataChange({ signature: undefined });
    }
  };

  return (
    <section className="bg-white rounded-lg shadow-sm p-6">
      <SectionHeader
        title="הצהרות וחתימה"
        subtitle="סעיפים נקראו 3/3"
      />

      <div className="space-y-6">
        {/* Section 1 */}
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h4 className="font-bold text-lg mb-2">מבוא ופרשנות</h4>
              <p className="text-gray-600">
                הסכם זה מהווה כי חברת מובנה ("החברה") לבין הלקוח הסכים מהיר את תנאי
                ההתקשרות בין הצדדים לצורך קבלת שירותי שוק השקעות.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-green-500 bg-green-50 px-3 py-1 rounded-full text-sm">נקרא</span>
              <button className="text-indigo-600 hover:text-indigo-800">קרא עוד</button>
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h4 className="font-bold text-lg mb-2">גילוי נאות</h4>
              <p className="text-gray-600">
                החברה מצהירה כי היא בעלת רישיון לשירות השקעות מאת רשות נירות ערך. 
                החברה עוסקת בשירותי השקעות ולא בייעוץ השקעות.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-green-500 bg-green-50 px-3 py-1 rounded-full text-sm">נקרא</span>
              <button className="text-indigo-600 hover:text-indigo-800">קרא עוד</button>
            </div>
          </div>
        </div>

        {/* Section 3 */}
        <div className="bg-white rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h4 className="font-bold text-lg mb-2">הצהרת הלקוח</h4>
              <p className="text-gray-600">
                אני מאשר כי כל הפרטים שמסרתי בטופס זה הם נכונים, מדויקים ומלאים.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-green-500 bg-green-50 px-3 py-1 rounded-full text-sm">נקרא</span>
              <button className="text-indigo-600 hover:text-indigo-800">קרא עוד</button>
            </div>
          </div>
        </div>

        {/* Final Confirmation */}
        <div className="bg-violet-50 rounded-lg p-6">
          <h3 className="font-bold text-lg mb-4">הצהרה סופית</h3>
          <p className="text-gray-700 mb-4">
            בחתימתי על מסמך זה הריני להצהיר, כי קראתי והבנתי את כל האמור לעיל
          </p>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={data.finalConfirmation}
              onChange={(e) => onDataChange({ finalConfirmation: e.target.checked })}
              className="h-5 w-5 text-blue-600 rounded"
            />
            <span className="text-gray-800">
              קראתי והבנתי את כל האמור לעיל ואני מאשר את נכונות הפרטים
            </span>
          </label>
        </div>

        {/* Digital Signature */}
        <div className="mt-6">
          <div className="border rounded-lg p-4">
            <SignatureCanvas
              ref={signaturePadRef}
              onEnd={handleSignatureEnd}
              canvasProps={{
                className: 'signature-canvas w-full h-32 border rounded bg-white'
              }}
            />
            <button
              type="button"
              onClick={clearSignature}
              className="mt-2 text-sm text-blue-600 hover:text-blue-800"
            >
              נקה חתימה
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Declarations;