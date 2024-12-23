import React, { useState } from 'react';
import PersonalDetails from './components/Form/Sections/PersonalDetails';
import InvestmentDetails from './components/Form/Sections/InvestmentDetails';
import RiskAssessment from './components/Form/Sections/RiskAssessment';
import Declarations from './components/Form/Sections/Declarations';
import ThankYou from './components/Form/Common/ThankYou';
import { saveFormToFirebase } from './services/firebase/storage';
import { generatePDF } from './services/pdf/generator';
import { savePDFToFirebase } from './services/firebase/storage';
import { FormData } from './types/form';

function App() {
  const [formData, setFormData] = useState<FormData>({
    personal: {},
    investment: {},
    risk: {},
    declarations: {}
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedFormId, setSubmittedFormId] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Save form data to Firebase
      const formId = await saveFormToFirebase(formData);
      console.log('Form submitted successfully', formId);

      // Generate and save PDF
      console.log('Generating PDF...');
      const pdfBlob = await generatePDF(formData);
      const pdfDownloadUrl = await savePDFToFirebase(pdfBlob, formId);
      console.log('PDF saved successfully:', pdfDownloadUrl);

      setSubmittedFormId(formId);
      setPdfUrl(pdfDownloadUrl);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      setError(error instanceof Error ? error.message : 'שגיאה בשליחת הטופס');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Logo */}
      <div className="max-w-4xl mx-auto mb-8 text-center">
        <img src="/movne-logo.png" alt="Movne Logo" className="h-14 mx-auto" />
      </div>

      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg flex items-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="text-gray-700">מעבד את הטופס...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="max-w-4xl mx-auto mb-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <span className="block sm:inline">{error}</span>
          </div>
        </div>
      )}

      {isSubmitted ? (
        <ThankYou 
          formId={submittedFormId || undefined} 
          pdfUrl={pdfUrl || undefined}
        />
      ) : (
        <div className="max-w-4xl mx-auto space-y-8">
          <PersonalDetails
            onDataChange={(data) => setFormData(prev => ({ ...prev, personal: data }))}
          />
          <InvestmentDetails
            onDataChange={(data) => setFormData(prev => ({ ...prev, investment: data }))}
          />
          <RiskAssessment
            onDataChange={(data) => setFormData(prev => ({ ...prev, risk: data }))}
          />
          <Declarations
            onDataChange={(data) => setFormData(prev => ({ ...prev, declarations: data }))}
            onSubmit={handleSubmit}
          />
        </div>
      )}
    </div>
  );
}

export default App;