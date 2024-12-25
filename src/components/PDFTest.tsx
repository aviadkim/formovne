// src/components/PDFTest.tsx
import React, { useState } from 'react';
import PersonalDetails from './Form/Sections/PersonalDetails';    
import InvestmentDetails from './Form/Sections/InvestmentDetails';
import RiskAssessment from './Form/Sections/RiskAssessment';      
import Declarations from './Form/Sections/Declarations';
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

  const handleDataChange = (section: keyof FormData, data: Record<string, unknown>) => {
    setFormData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setStatus('מתחיל תהליך שמירה...');

    try {
      // Generate PDF
      const { pdfBlob } = await generatePDF(formData);

      // Create and trigger download
      const pdfUrl = URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = pdfUrl;
      a.download = `form-${Date.now()}.pdf`;
      a.click();

      // Clean up
      URL.revokeObjectURL(pdfUrl);

      setStatus('הטופס נשמר בהצלחה!');
      
    } catch (error) {
      console.error('Error:', error);
      setStatus('אירעה שגיאה בשמירת הטופס');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <form id="form-container" onSubmit={handleSubmit} className="space-y-6">
        <PersonalDetails onDataChange={(data) => handleDataChange('personal', data)} />
        <InvestmentDetails onDataChange={(data) => handleDataChange('investment', data)} />
        <RiskAssessment onDataChange={(data) => handleDataChange('risk', data)} />
        <Declarations 
          onDataChange={(data) => handleDataChange('declarations', data)}
          onSubmit={handleSubmit}
        />

        {status && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg border text-center">
            {status}
          </div>
        )}
      </form>
    </div>
  );
};

export default PDFTest;