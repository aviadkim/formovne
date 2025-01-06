import React, { useState } from 'react';
import PersonalDetails from './Form/Sections/PersonalDetails';
import InvestmentDetails from './Form/Sections/InvestmentDetails';
import RiskAssessment from './Form/Sections/RiskAssessment';
import Declarations from './Form/Sections/Declarations';
import type { FormData, PersonalData, InvestmentData, RiskData, DeclarationsData } from '../types/form';
import { generatePDF } from '../services/pdf/generator';

const PDFTest: React.FC = () => {
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const pdfData = await generatePDF(formData);
      
      // Download PDF
      const blob = new Blob([pdfData.pdfBlob], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'form.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      setStatus('PDF generated successfully');
    } catch (error) {
      console.error('Error generating PDF:', error);
      setStatus('Error generating PDF');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <form id="form-container" onSubmit={handleSubmit} className="space-y-6">
        <PersonalDetails 
          data={formData.personal}
          onDataChange={data => handleDataChange('personal', data)} 
        />
        <InvestmentDetails 
          data={formData.investment}
          onDataChange={data => handleDataChange('investment', data)} 
        />
        <RiskAssessment 
          data={formData.risk}
          onDataChange={data => handleDataChange('risk', data)} 
        />
        <Declarations
          data={formData.declarations}
          onDataChange={data => handleDataChange('declarations', data)}
        />

        <div className="mt-6 text-right">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            {isSubmitting ? 'מייצר PDF...' : 'צור PDF'}
          </button>
          {status && (
            <div className={status.includes('error') ? 'text-red-500' : 'text-green-500'}>
              {status}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default PDFTest;