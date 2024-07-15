import React, { useState } from 'react';
import './ResumeForm.css';

function ResumeForm({ updateResume }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    experience: [],
    skills: '',
    education: [],
    achievements: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    updateResume({ ...formData, [name]: value });
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [...formData.experience, { company: '', position: '', duration: '', description: '' }],
    });
  };

  const updateExperience = (index, field, value) => {
    const newExperience = formData.experience.map((exp, i) => (i === index ? { ...exp, [field]: value } : exp));
    setFormData({ ...formData, experience: newExperience });
    updateResume({ ...formData, experience: newExperience });
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [...formData.education, { institution: '', degree: '', graduationDate: '', achievements: '' }],
    });
  };

  const updateEducation = (index, field, value) => {
    const newEducation = formData.education.map((edu, i) => (i === index ? { ...edu, [field]: value } : edu));
    setFormData({ ...formData, education: newEducation });
    updateResume({ ...formData, education: newEducation });
  };

  return (
    <div className="resume-form">
      <h2>Personal Information</h2>
      <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
      <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
      <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} />

      <h2>Experience</h2>
      {formData.experience.map((exp, index) => (
        <div key={index}>
          <input type="text" placeholder="Company" value={exp.company} onChange={(e) => updateExperience(index, 'company', e.target.value)} />
          <input type="text" placeholder="Position" value={exp.position} onChange={(e) => updateExperience(index, 'position', e.target.value)} />
          <input type="text" placeholder="Duration" value={exp.duration} onChange={(e) => updateExperience(index, 'duration', e.target.value)} />
          <textarea placeholder="Description" value={exp.description} onChange={(e) => updateExperience(index, 'description', e.target.value)}></textarea>
        </div>
      ))}
      <button onClick={addExperience}>Add Experience</button>

      <h2>Skills</h2>
      <textarea name="skills" placeholder="Skills (comma separated)" value={formData.skills} onChange={handleChange}></textarea>

      <h2>Education</h2>
      {formData.education.map((edu, index) => (
        <div key={index}>
          <input type="text" placeholder="Institution" value={edu.institution} onChange={(e) => updateEducation(index, 'institution', e.target.value)} />
          <input type="text" placeholder="Degree" value={edu.degree} onChange={(e) => updateEducation(index, 'degree', e.target.value)} />
          <input type="text" placeholder="Graduation Date" value={edu.graduationDate} onChange={(e) => updateEducation(index, 'graduationDate', e.target.value)} />
          <textarea placeholder="Achievements" value={edu.achievements} onChange={(e) => updateEducation(index, 'achievements', e.target.value)}></textarea>
        </div>
      ))}
      <button onClick={addEducation}>Add Education</button>
    </div>
  );
}

export default ResumeForm;
