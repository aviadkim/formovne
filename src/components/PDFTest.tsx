import React, { useState } from 'react';
import { generatePDF, savePagesToFirebase } from '../services/pdf/generator';
import { FormData } from '../types/form';

const PDFTest: React.FC = () => {
  const [status, setStatus] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    setStatus('מתחיל יצירת הטופס...');

    try {
      const formData: FormData = {
        personal: {
          firstName: 'ישראל',
          lastName: 'ישראלי',
          phone: '050-1234567',
          email: 'test@test.com',
          address: 'רחוב הרצל 1',
          birthDate: '1990-01-01',
          occupation: 'עצמאי',
          company: 'חברה בע"מ'
        },
        investment: {
          investmentAmount: 100000,
          selectedBank: 'לאומי',
          currencies: { USD: true, EUR: true },
          purposes: { savings: true }
        },
        risk: {
          mainGoal: 'חיסכון לטווח ארוך',
          investmentPeriod: '5-10 שנים',
          investmentPercentage: '20%'
        },
        declarations: {
          readSections: { 1: true, 2: true, 3: true },
          finalConfirmation: true
        }
      };

      setStatus('יוצר PDF ותמונות...');
      const { pdfBlob, pngImages } = await generatePDF(formData);

      // שמירה בפיירבייס
      setStatus('שומר בפיירבייס...');
      const formId = Date.now().toString();
      const savedPaths = await savePagesToFirebase(formId, pngImages);

      // יצירת קישור להורדת PDF
      const pdfUrl = URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = pdfUrl;
      a.download = `form-${formId}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(pdfUrl);

      setStatus('הטופס נשלח בהצלחה!');
      
    } catch (error) {
      console.error('Error:', error);
      setStatus(`שגיאה: ${error instanceof Error ? error.message : 'אירעה שגיאה'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">שליחת טופס</h2>
        
        {/* חשוב: הוספת id="form-container" לאלמנט שמכיל את הטופס */}
        <form id="form-container" onSubmit={handleSubmit}>
          <div className="form-page">
            {/* תוכן הטופס שלך */}
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          >
            {isSubmitting ? 'שולח...' : 'שלח טופס'}
          </button>
        </form>

        {status && (
          <div className="mt-4 p-3 bg-gray-50 rounded border text-sm">
            {status}
          </div>
        )}
      </div>
    </div>
  );
};

export default PDFTest;