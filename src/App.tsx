import React from 'react';
import RiskAssessment from './components/Form/Sections/RiskAssessment';
import InvestmentDetails from './components/Form/Sections/InvestmentDetails';
import PersonalDetails from './components/Form/Sections/PersonalDetails';
import Declarations from './components/Form/Sections/Declarations';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <PersonalDetails />
        <InvestmentDetails />
        <RiskAssessment />
        <Declarations />
      </div>
    </div>
  );
}

export default App;
