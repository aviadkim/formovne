import React, { useState } from 'react';
import PersonalDetails from './Form/Sections/PersonalDetails';
import InvestmentDetails from './Form/Sections/InvestmentDetails';
import RiskAssessment from './Form/Sections/RiskAssessment';
import { FormData } from '../types/form';
import { generatePDF } from '../services/pdf/generator';

const PDFTest: React.FC = () => {
  const [status, setStatus] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    personal: {},
    investment: {},
    risk: {},
    declarations: {}
  });

  const handleDataChange = (section: keyof FormData, data: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    setStatus('מתחיל תהליך שמירה...');

    try {
      const { pdfBlob, pngImages } = await generatePDF(formData);
      setStatus('PDF נוצר בהצלחה!');

      // יצירת קישור להורדת PDF
      const pdfUrl = URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = pdfUrl;
      a.download = `form-${Date.now()}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(pdfUrl);

      // תצוגה מקדימה של התמונה
      if (pngImages.length > 0) {
        const imageUrl = URL.createObjectURL(new Blob([pngImages[0]], { type: 'image/png' }));
        console.log('Preview URL:', imageUrl);
      }

    } catch (error) {
      console.error('Error:', error);
      setStatus('אירעה שגיאה בשמירת הטופס');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <form id="form-container" onSubmit={handleSubmit}>
        <div className="space-y-6">
          <PersonalDetails onDataChange={(data) => handleDataChange('personal', data)} />
          <InvestmentDetails onDataChange={(data) => handleDataChange('investment', data)} />
          <RiskAssessment onDataChange={(data) => handleDataChange('risk', data)} />
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            {isSubmitting ? 'שומר...' : 'שלח טופס'}
          </button>

          {status && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg border text-center">
              {status}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default PDFTest;