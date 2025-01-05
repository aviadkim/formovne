import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PDFTest from './components/PDFTest';
import ThanksPage from './components/ThanksPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<PDFTest />} />
          <Route path="/thanks" element={<ThanksPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;