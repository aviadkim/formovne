import React, { useState } from 'react';
import PersonalDetails from './Form/Sections/PersonalDetails';    
import InvestmentDetails from './Form/Sections/InvestmentDetails';
import RiskAssessment from './Form/Sections/RiskAssessment';      
import Declarations from './Form/Sections/Declarations';
import type { FormData, PersonalData, InvestmentData, RiskData, DeclarationsData } from '../types/form';
import { generatePDF } from '../services/pdf/generator';

const PDFTest: React.FC = () => {
  const [status, setStatus] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    personal: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      birthDate: '',
      occupation: '',
      company: ''
    },
    investment: {
      investmentAmount: 0,
      selectedBank: '',
      currencies: {},
      purposes: {}
    },
    risk: {
      mainGoal: '',
      investmentPeriod: '',
      investmentPercentage: ''
    },
    declarations: {
      readSections: {},
      finalConfirmation: false
    }
  });

  const handleDataChange = (
    section: keyof FormData,
    data: Partial<PersonalData | InvestmentData | RiskData | DeclarationsData>
  ) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...data
      }
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
        <PersonalDetails 
          data={formData.personal}
          onDataChange={(data) => handleDataChange('personal', data)} 
        />
        <InvestmentDetails 
          data={formData.investment}
          onDataChange={(data) => handleDataChange('investment', data)} 
        />
        <RiskAssessment 
          data={formData.risk}
          onDataChange={(data) => handleDataChange('risk', data)} 
        />
        <Declarations 
          data={formData.declarations}
          onDataChange={(data) => handleDataChange('declarations', data)}
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