import React, { useState } from 'react';
import { FileText, Check, AlertCircle, PenTool } from 'lucide-react';

interface DeclarationsProps {
  onDataChange?: (data: any) => void;
  onComplete?: (isComplete: boolean) => void;
}

interface Section {
  title: string;
  content: string;
}

const Declarations: React.FC<DeclarationsProps> = ({ onDataChange, onComplete }) => {
  const [readSections, setReadSections] = useState<Record<number, boolean>>({});
  const [finalConfirmation, setFinalConfirmation] = useState(false);
  const [signaturePad, setSignaturePad] = useState<any>(null);

  const sections: Section[] = [
    {
      title: 'מבוא ופרשנות',
      content: 'תוכן המבוא...'
    },
    {
      title: 'גילוי נאות',
      content: 'תוכן הגילוי הנאות...'
    },
    {
      title: 'הצהרת הלקוח',
      content: 'תוכן הצהרת הלקוח...'
    }
  ];

  const updateReadStatus = (index: number, isRead: boolean) => {
    const newReadSections = { ...readSections, [index]: isRead };
    setReadSections(newReadSections);
    
    const isComplete = Object.keys(newReadSections).length === sections.length && finalConfirmation;
    onComplete?.(isComplete);
    onDataChange?.({ readSections: newReadSections });
  };

  const handleFinalConfirmation = (checked: boolean) => {
    setFinalConfirmation(checked);
    const isComplete = Object.keys(readSections).length === sections.length && checked;
    onComplete?.(isComplete);
    onDataChange?.({ finalConfirmation: checked });
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
            {sections.map((section, index) => (
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
                    onClick={() => updateReadStatus(index, true)}
                    className="text-purple-600 hover:text-purple-700 font-medium"
                  >
                    קרא עוד
                  </button>
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

              <p>בנוסף, בחתימתי על מסמך זה אני מתחייב לעדכן אתכם בכתב לגבי כל שינוי בנתונים המיוחדים 
              המפורטים בנספח זה בכל עת שיחול בהם שינוי ולפחות פעם בשנה.</p>
            </div>

            <label className="flex items-center gap-3 p-4 border-2 border-purple-200 rounded-lg
                           bg-purple-50 cursor-pointer">
              <input 
                type="checkbox"
                checked={finalConfirmation}
                onChange={(e) => handleFinalConfirmation(e.target.checked)}
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
          <div className="p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <PenTool className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-800">חתימה דיגיטלית</h3>
            </div>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-white">
              <div className="h-48 bg-gray-50 rounded-lg"></div>
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button className="px-4 py-2 text-gray-600 hover:text-gray-700 font-medium">
                נקה חתימה
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700
                             font-medium transition-colors duration-200">
                שמור חתימה
              </button>
            </div>
          </div>
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
