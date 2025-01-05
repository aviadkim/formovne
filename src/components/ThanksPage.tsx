import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface LocationState {
  pdfUrl: string;
  formId: string;
}

const ThanksPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;

  if (!state?.pdfUrl) {
    navigate('/');
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto p-8 text-center">
      <h1 className="text-3xl font-bold mb-6">תודה על פנייתך!</h1>
      <p className="text-lg mb-8">
        הטופס נשלח בהצלחה ונשמר במערכת
      </p>
      <a
        href={state.pdfUrl}
        download
        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors mb-4"
      >
        הורדת הטופס
      </a>
    </div>
  );
};

export default ThanksPage;