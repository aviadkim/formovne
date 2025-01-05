import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PersonalDetails from './Form/Sections/PersonalDetails';
import InvestmentDetails from './Form/Sections/InvestmentDetails';
import RiskAssessment from './Form/Sections/RiskAssessment';
import Declarations from './Form/Sections/Declarations';
import { FormData } from '../types/form';
import { generatePDF } from '../services/pdf/generator';
import { storage, db } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { sendEmail } from '../services/email';

const PDFTest: React.FC = () => {
  const navigate = useNavigate();
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
      // יצירת PDF
      const { pdfBlob, pdfBase64 } = await generatePDF(formData);

      // העלאה ל-Firebase Storage
      const storageRef = ref(storage, `forms/${Date.now()}.pdf`);
      await uploadBytes(storageRef, pdfBlob);
      const downloadURL = await getDownloadURL(storageRef);

      // שמירה ב-Firestore
      const docRef = await addDoc(collection(db, 'forms'), {
        ...formData,
        pdfUrl: downloadURL,
        timestamp: serverTimestamp(),
        email: 'info@movne.co.il'
      });

      // שליחת מייל
      await sendEmail(downloadURL, formData);

      // מעבר לדף תודה
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
        <PersonalDetails onDataChange={(data) => handleDataChange('personal', data)} />
        <InvestmentDetails onDataChange={(data) => handleDataChange('investment', data)} />
        <RiskAssessment onDataChange={(data) => handleDataChange('risk', data)} />
        <Declarations 
          onDataChange={(data) => handleDataChange('declarations', data)}
        />

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