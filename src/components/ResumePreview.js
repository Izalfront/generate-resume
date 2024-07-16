import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';
import './ResumePreview.css';

function ResumePreview({ resumeData }) {
  const marginLeft = 10;
  const marginRight = 200 - 10;
  const maxWidth = marginRight - marginLeft;

  const addWrappedText = (doc, text, x, y, maxWidth) => {
    const textLines = doc.splitTextToSize(text, maxWidth);
    textLines.forEach((line, index) => {
      doc.text(line, x, y + index * 5);
    });
    return y + textLines.length * 5;
  };

  const generateEditablePDF = () => {
    if (!resumeData) {
      alert('Please fill in the resume data first.');
      return;
    }

    const doc = new jsPDF();

    // Header
    doc.setFontSize(20);
    doc.text(resumeData.name || 'Name', marginLeft, 20);
    doc.line(marginLeft, 42, marginRight, 42);

    doc.setFontSize(10);
    doc.text(`${resumeData.phone || ''} | ${resumeData.email || ''} | ${resumeData.address || ''}`, marginLeft, 30);

    // Experience
    doc.setFontSize(14);
    doc.text('Experience', marginLeft, 40);
    doc.line(marginLeft, 42, marginRight, 42);
    let yPos = 50;
    if (Array.isArray(resumeData.experience)) {
      resumeData.experience.forEach((exp) => {
        doc.setFontSize(12);
        doc.text(`${exp.company} | ${exp.position}`, marginLeft, yPos);
        doc.setFontSize(10);
        yPos = addWrappedText(doc, exp.duration, marginLeft, yPos + 5, maxWidth);
        yPos = addWrappedText(doc, exp.description, marginLeft, yPos + 5, maxWidth);
        yPos += 10;
      });
    }

    // Skills
    doc.setFontSize(14);
    doc.text('Skills', marginLeft, yPos);
    doc.line(marginLeft, yPos + 2, marginRight, yPos + 2);
    doc.setFontSize(10);
    yPos = addWrappedText(doc, resumeData.skills || '', marginLeft, yPos + 10, maxWidth);

    // Education
    yPos += 10;
    doc.setFontSize(14);
    doc.text('Education', marginLeft, yPos);
    doc.line(marginLeft, yPos + 2, marginRight, yPos + 2);
    if (Array.isArray(resumeData.education)) {
      resumeData.education.forEach((edu) => {
        doc.setFontSize(12);
        doc.text(`${edu.institution} | ${edu.degree}`, marginLeft, yPos + 10);
        doc.setFontSize(10);
        yPos = addWrappedText(doc, edu.graduationDate, marginLeft, yPos + 15, maxWidth);
        yPos = addWrappedText(doc, edu.achievements, marginLeft, yPos + 5, maxWidth);
        yPos += 20;
      });
    }

    doc.save('editable_resume.pdf');
  };

  const generateWord = () => {
    const doc = new Document();
    const para = new Paragraph();

    para.addRun(new TextRun(resumeData.name || 'Name').bold().fontSize(20));
    para.addRun(new TextRun(`\n${resumeData.phone || ''} | ${resumeData.email || ''} | ${resumeData.address || ''}`).fontSize(10));
    doc.addParagraph(para);

    const experiencePara = new Paragraph('Experience').bold().fontSize(14);
    doc.addParagraph(experiencePara);
    if (Array.isArray(resumeData.experience)) {
      resumeData.experience.forEach((exp) => {
        const expPara = new Paragraph(`${exp.company} | ${exp.position}`).bold().fontSize(12);
        expPara.addRun(new TextRun(`\n${exp.duration}\n${exp.description}`).fontSize(10));
        doc.addParagraph(expPara);
      });
    }

    const skillsPara = new Paragraph('Skills').bold().fontSize(14);
    skillsPara.addRun(new TextRun(`\n${resumeData.skills || ''}`).fontSize(10));
    doc.addParagraph(skillsPara);

    const educationPara = new Paragraph('Education').bold().fontSize(14);
    doc.addParagraph(educationPara);
    if (Array.isArray(resumeData.education)) {
      resumeData.education.forEach((edu) => {
        const eduPara = new Paragraph(`${edu.institution} | ${edu.degree}`).bold().fontSize(12);
        eduPara.addRun(new TextRun(`\n${edu.graduationDate}\n${edu.achievements}`).fontSize(10));
        doc.addParagraph(eduPara);
      });
    }

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, 'resume.docx');
    });
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

        <h2 className="experience">Experience</h2>
        {Array.isArray(resumeData.experience) &&
          resumeData.experience.map((exp, index) => (
            <div key={index} className="experience-item">
              <h3>
                {exp.company} | {exp.position}
              </h3>
              <p>Duration: {exp.duration}</p>
              <p>{exp.description}</p>
            </div>
          ))}

        <h2 className="line_down">Skills</h2>
        <p>{resumeData.skills || ''}</p>

        <h2 className="line_down">Education</h2>
        {Array.isArray(resumeData.education) &&
          resumeData.education.map((edu, index) => (
            <div key={index} className="education-item">
              <h3>
                {edu.institution} | {edu.degree}
              </h3>
              <p>{edu.graduationDate}</p>
              <h2 className="line_down">Achievements</h2>
              <p>{edu.achievements}</p>
            </div>
          ))}
      </div>
      <button onClick={generateEditablePDF}>Save as Editable PDF</button>
      <button onClick={generateWord}>Save as Word</button>
    </div>
  );
}

export default ResumePreview;
