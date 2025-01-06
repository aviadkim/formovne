import React, { useState } from 'react';
import PersonalDetails from './Form/Sections/PersonalDetails';
import InvestmentDetails from './Form/Sections/InvestmentDetails';
import RiskAssessment from './Form/Sections/RiskAssessment';
import Declarations from './Form/Sections/Declarations';
import { FormData } from '../types/form';
import { generatePDF } from '../services/pdf/generator';

const PDFTest: React.FC = () => {
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

  const handleDataChange = (section: keyof FormData, data: Record<string, unknown>) => {
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

    try {
      setIsSubmitting(true);
      const result = await generatePDF(formData);
      console.log('PDF generated successfully:', result);
      
      // הורדת הקובץ
      const blob = new Blob([result.pdfBlob], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'form.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <form id="form-container" onSubmit={handleSubmit} className="space-y-6">
        <PersonalDetails
          onDataChange={(data) => handleDataChange('personal', data)}
        />
        <InvestmentDetails
          onDataChange={(data) => handleDataChange('investment', data)}
        />
        <RiskAssessment
          onDataChange={(data) => handleDataChange('risk', data)}
        />
        <Declarations
          onDataChange={(data) => handleDataChange('declarations', data)}
        />

        <div className="mt-6 text-right">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            {isSubmitting ? 'מייצר PDF...' : 'צור PDF'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PDFTest;