import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PersonalDetails from './Form/Sections/PersonalDetails';
import InvestmentDetails from './Form/Sections/InvestmentDetails';
import RiskAssessment from './Form/Sections/RiskAssessment';
import Declarations from './Form/Sections/Declarations';
import { generatePDF } from '../services/pdf/generator';
import { storage, db } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface FormState {
  personal: Record<string, unknown>;
  investment: Record<string, unknown>;
  risk: Record<string, unknown>;
  declarations: Record<string, unknown>;
}

const PDFTest: React.FC = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  const [formData, setFormData] = useState<FormState>({
    personal: {},
    investment: {},
    risk: {},
    declarations: {}
  });

  const handleDataChange = (section: keyof FormState) => (data: Record<string, unknown>) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setStatus('מתחיל תהליך שמירה...');

    try {
      const { pdfBlob } = await generatePDF(formData);

      const storageRef = ref(storage, `forms/${Date.now()}.pdf`);
      await uploadBytes(storageRef, pdfBlob);
      const downloadURL = await getDownloadURL(storageRef);

      const docRef = await addDoc(collection(db, 'forms'), {
        ...formData,
        pdfUrl: downloadURL,
        timestamp: serverTimestamp(),
      });

      navigate('/thanks', { 
        state: { 
          pdfUrl: downloadURL,
          formId: docRef.id
        }
      });

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
        <PersonalDetails onDataChange={handleDataChange('personal')} />
        <InvestmentDetails onDataChange={handleDataChange('investment')} />
        <RiskAssessment onDataChange={handleDataChange('risk')} />
        <Declarations onDataChange={handleDataChange('declarations')} />

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="mt-6 w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {isSubmitting ? 'שולח...' : 'שלח טופס'}
        </button>

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