import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';
import './ResumePreview.css';

function ResumePreview({ resumeData }) {
  const generateEditablePDF = () => {
    if (!resumeData) {
      alert('Please fill in the resume data first.');
      return;
    }

    const doc = new jsPDF();

    // Header
    doc.setFontSize(20);
    doc.text(resumeData.name || 'Name', 10, 20);

    doc.setFontSize(10);
    doc.text(`${resumeData.phone || ''} | ${resumeData.email || ''} | ${resumeData.address || ''}`, 10, 30);

    // Experience
    doc.setFontSize(14);
    doc.text('Experience', 10, 40);
    let yPos = 50;
    if (Array.isArray(resumeData.experience)) {
      resumeData.experience.forEach((exp) => {
        doc.setFontSize(12);
        doc.text(`${exp.company} | ${exp.position}`, 10, yPos);
        doc.setFontSize(10);
        doc.text(exp.duration, 10, yPos + 5);
        doc.text(exp.description, 10, yPos + 10);
        yPos += 20;
      });
    }

    // Skills
    doc.setFontSize(14);
    doc.text('Skills', 10, yPos);
    doc.setFontSize(10);
    doc.text(resumeData.skills || '', 10, yPos + 10);

    // Education
    yPos += 20;
    doc.setFontSize(14);
    doc.text('Education', 10, yPos);
    if (Array.isArray(resumeData.education)) {
      resumeData.education.forEach((edu) => {
        doc.setFontSize(12);
        doc.text(`${edu.institution} | ${edu.degree}`, 10, yPos + 10);
        doc.setFontSize(10);
        doc.text(edu.graduationDate, 10, yPos + 15);
        yPos += 20;
      });
    }

    doc.save('editable_resume.pdf');
  };

  const generateWord = () => {
    // Similar to the PDF generation, but using docx library
    // ... (implement Word document generation here)
  };

  if (!resumeData) {
    return <div className="resume-preview">No resume data available.</div>;
  }

  return (
    <div className="resume-preview">
      <div id="resume-preview">
        <h1>{resumeData.name || 'Name'}</h1>
        <p className="contact-info">
          {resumeData.phone || ''} | {resumeData.email || ''} | {resumeData.address || ''}
        </p>

        <h2>Experience</h2>
        {Array.isArray(resumeData.experience) &&
          resumeData.experience.map((exp, index) => (
            <div key={index} className="experience-item">
              <h3>
                {exp.company} | {exp.position}
              </h3>
              <p>{exp.duration}</p>
              <p>{exp.description}</p>
            </div>
          ))}

        <h2>Skills</h2>
        <p>{resumeData.skills || ''}</p>

        <h2>Education</h2>
        {Array.isArray(resumeData.education) &&
          resumeData.education.map((edu, index) => (
            <div key={index} className="education-item">
              <h3>
                {edu.institution} | {edu.degree}
              </h3>
              <p>{edu.graduationDate}</p>
            </div>
          ))}
      </div>
      <button onClick={generateEditablePDF}>Save as Editable PDF</button>
      <button onClick={generateWord}>Save as Word</button>
    </div>
  );
}

export default ResumePreview;
