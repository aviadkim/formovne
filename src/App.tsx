import React, { useState } from 'react';
import PersonalDetails from './components/Form/Sections/PersonalDetails';
import InvestmentDetails from './components/Form/Sections/InvestmentDetails';
import RiskAssessment from './components/Form/Sections/RiskAssessment';
import Declarations from './components/Form/Sections/Declarations';
import { saveFormToFirebase } from './services/firebase/storage';

function App() {
  const [formData, setFormData] = useState({
    personal: {},
    investment: {},
    risk: {},
    declarations: {}
  });

  const handleSubmit = async () => {
    try {
      const formId = await saveFormToFirebase(formData);
      console.log('Form submitted successfully', formId);
      // Add success message here
    } catch (error) {
      console.error('Error submitting form:', error);
      // Add error message here
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
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
    </div>
  );
}

export default App;