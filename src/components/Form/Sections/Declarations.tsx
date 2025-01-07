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
    <section className="space-y-6">
      <SectionHeader 
        title="הצהרות והתחייבויות" 
        subtitle="אנא קרא בעיון את ההצהרות הבאות וסמן את הסכמתך"
      />

      <div className="space-y-4">
        {/* Section 1 */}
        <div className="p-4 border rounded-lg">
          <div className="flex items-start">
            <input
              type="checkbox"
              checked={data.readSections?.[1] || false}
              onChange={(e) => handleReadSection(1, e.target.checked)}
              className="mt-1"
            />
            <div className="mr-3">
              <h4 className="font-semibold">הצהרת מדיניות השקעה</h4>
              <p className="text-sm text-gray-600">
                קראתי והבנתי את מדיניות ההשקעה של החברה ואני מסכים לתנאיה
              </p>
            </div>
          </div>
        </div>

        {/* Section 2 */}
        <div className="p-4 border rounded-lg">
          <div className="flex items-start">
            <input
              type="checkbox"
              checked={data.readSections?.[2] || false}
              onChange={(e) => handleReadSection(2, e.target.checked)}
              className="mt-1"
            />
            <div className="mr-3">
              <h4 className="font-semibold">הצהרת סיכונים</h4>
              <p className="text-sm text-gray-600">
                אני מודע לסיכונים הכרוכים בהשקעה ומקבל אותם על עצמי
              </p>
            </div>
          </div>
        </div>

        {/* Section 3 */}
        <div className="p-4 border rounded-lg">
          <div className="flex items-start">
            <input
              type="checkbox"
              checked={data.readSections?.[3] || false}
              onChange={(e) => handleReadSection(3, e.target.checked)}
              className="mt-1"
            />
            <div className="mr-3">
              <h4 className="font-semibold">אישור פרטים</h4>
              <p className="text-sm text-gray-600">
                אני מאשר שכל הפרטים שמסרתי נכונים ומדויקים
              </p>
            </div>
          </div>
        </div>

        {/* Digital Signature */}
        <div className="mt-6">
          <h4 className="font-semibold mb-2">חתימה דיגיטלית</h4>
          <div className="border rounded-lg p-4">
            <div className="bg-gray-50 border rounded h-40">
              <SignatureCanvas
                ref={signaturePadRef}
                onEnd={handleSignatureEnd}
                canvasProps={{
                  className: 'signature-canvas w-full h-full'
                }}
              />
            </div>
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