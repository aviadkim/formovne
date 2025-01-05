import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PDFTest from './components/PDFTest';
import ThanksPage from './components/ThanksPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PDFTest />} />
        <Route path="/thanks" element={<ThanksPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;