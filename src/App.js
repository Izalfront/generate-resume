import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';
import './style/style.css';
function App() {
  const [resumeData, setResumeData] = useState({});

  const updateResume = (data) => {
    setResumeData(data);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/generate-resume"
            element={
              <div className="resume-generator">
                <ResumeForm updateResume={updateResume} />
                <ResumePreview resumeData={resumeData} />
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
