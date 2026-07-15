import React, { useState } from 'react';
import { PlusCircle, Eye, FileText, CheckCircle, RotateCw, MapPin, DollarSign, Calendar, ArrowRight, Info } from 'lucide-react';
import { jobCategories, jobTypes, workModels } from '../data/mockJobs';

export default function EmployerPortal({ onAddJob }) {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    category: 'Engineering',
    type: 'Full-time',
    workMode: 'Remote',
    location: '',
    salary: '',
    salaryMin: 0,
    salaryMax: 0,
    skills: '',
    description: '',
    requirements: '',
    responsibilities: '',
    benefits: ''
  });

  const [errors, setErrors] = useState({});
  const [showBanner, setShowBanner] = useState(false);
  const [postedJobTitle, setPostedJobTitle] = useState('');

  // Validate form
  const validate = () => {
    const temp = {};
    if (!formData.title.trim()) temp.title = "Job Title is required.";
    if (!formData.company.trim()) temp.company = "Company Name is required.";
    if (!formData.location.trim()) temp.location = "Job Location is required.";
    if (!formData.salary.trim()) temp.salary = "Salary text range is required (e.g. $90k - $120k).";
    if (!formData.description.trim()) temp.description = "Job Description is required.";
    
    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Process tag arrays
    const skillList = formData.skills
      ? formData.skills.split(',').map(s => s.trim()).filter(s => s !== '')
      : [];

    const reqList = formData.requirements
      ? formData.requirements.split('\n').map(r => r.trim()).filter(r => r !== '')
      : [];

    const respList = formData.responsibilities
      ? formData.responsibilities.split('\n').map(r => r.trim()).filter(r => r !== '')
      : [];

    const benefitList = formData.benefits
      ? formData.benefits.split('\n').map(r => r.trim()).filter(r => r !== '')
      : [];

    // Create random background color for logo initials
    const colors = ['#4f46e5', '#059669', '#db2777', '#d97706', '#7c3aed', '#2563eb'];
    const backgrounds = ['#e0e7ff', '#ecfdf5', '#fdf2f8', '#fef3c7', '#faf5ff', '#eff6ff'];
    const randomIdx = Math.floor(Math.random() * colors.length);

    const newJob = {
      id: `custom-${Date.now()}`,
      title: formData.title,
      company: formData.company,
      logoBg: backgrounds[randomIdx],
      logoText: formData.company.substring(0, 2).toUpperCase(),
      logoColor: colors[randomIdx],
      category: formData.category,
      type: formData.type,
      location: formData.location,
      workMode: formData.workMode,
      salary: formData.salary,
      salaryMin: Number(formData.salaryMin) || 50000,
      salaryMax: Number(formData.salaryMax) || 100000,
      postedDate: new Date().toISOString().split('T')[0],
      description: formData.description,
      requirements: reqList,
      responsibilities: respList,
      benefits: benefitList,
      skills: skillList.length > 0 ? skillList : ['React', 'CSS', 'JavaScript']
    };

    onAddJob(newJob);
    setPostedJobTitle(formData.title);
    setShowBanner(true);

    // Reset Form
    setFormData({
      title: '',
      company: '',
      category: 'Engineering',
      type: 'Full-time',
      workMode: 'Remote',
      location: '',
      salary: '',
      salaryMin: 0,
      salaryMax: 0,
      skills: '',
      description: '',
      requirements: '',
      responsibilities: '',
      benefits: ''
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setShowBanner(false);
    }, 5000);
  };

  // Rotational shift warning condition for live preview
  const isRotationalPreview = 
    formData.workMode.toLowerCase() === 'onsite' && 
    formData.location.toLowerCase().includes('hyderabad');

  return (
    <div className="container fade-in" style={{ padding: '2rem 1.5rem' }}>
      
      {/* Success banner */}
      {showBanner && (
        <div 
          className="fade-in"
          style={{
            backgroundColor: 'var(--success-light)',
            color: 'var(--success-color)',
            border: '1.5px solid var(--success-color)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem 1.5rem',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            boxShadow: 'var(--shadow-md)'
          }}
        >
          <CheckCircle size={24} />
          <div>
            <p style={{ fontWeight: 700, fontSize: '0.95rem' }}>Success! Position Published</p>
            <p style={{ fontSize: '0.85rem', opacity: 0.9 }}>
              The position <strong>{postedJobTitle}</strong> has been listed on the job board. Candidates can now search and apply.
            </p>
          </div>
        </div>
      )}

      {/* Grid Layout: Left Form, Right Preview */}
      <div className="employer-grid">
        
        {/* Form Container */}
        <section 
          className="card-premium" 
          style={{ 
            backgroundColor: 'var(--bg-secondary)', 
            borderColor: 'var(--border-color)',
            transition: 'all var(--transition-speed)'
          }}
        >
          <div className="flex items-center gap-2" style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
            <PlusCircle size={22} style={{ color: 'var(--primary-color)' }} />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Post a New Career Listing</h2>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="grid-split">
              <div>
                <label className="form-label">Job Title *</label>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g. Senior Software Architect"
                  value={formData.title}
                  onChange={handleChange}
                  className="form-input"
                  style={{ borderColor: errors.title ? 'var(--danger-color)' : 'var(--border-color)' }}
                />
                {errors.title && <span style={{ color: 'var(--danger-color)', fontSize: '0.75rem' }}>{errors.title}</span>}
              </div>

              <div>
                <label className="form-label">Company Name *</label>
                <input
                  type="text"
                  name="company"
                  placeholder="e.g. GlobalCo"
                  value={formData.company}
                  onChange={handleChange}
                  className="form-input"
                  style={{ borderColor: errors.company ? 'var(--danger-color)' : 'var(--border-color)' }}
                />
                {errors.company && <span style={{ color: 'var(--danger-color)', fontSize: '0.75rem' }}>{errors.company}</span>}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }} className="grid-three">
              <div>
                <label className="form-label">Category</label>
                <select name="category" value={formData.category} onChange={handleChange} className="form-input" style={{ appearance: 'none', cursor: 'pointer' }}>
                  {jobCategories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="form-label">Job Type</label>
                <select name="type" value={formData.type} onChange={handleChange} className="form-input" style={{ appearance: 'none', cursor: 'pointer' }}>
                  {jobTypes.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div>
                <label className="form-label">Work Model</label>
                <select name="workMode" value={formData.workMode} onChange={handleChange} className="form-input" style={{ appearance: 'none', cursor: 'pointer' }}>
                  {workModels.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="grid-split">
              <div>
                <label className="form-label">Location *</label>
                <input
                  type="text"
                  name="location"
                  placeholder="e.g. Hitech City, Hyderabad"
                  value={formData.location}
                  onChange={handleChange}
                  className="form-input"
                  style={{ borderColor: errors.location ? 'var(--danger-color)' : 'var(--border-color)' }}
                />
                {errors.location && <span style={{ color: 'var(--danger-color)', fontSize: '0.75rem' }}>{errors.location}</span>}
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block', marginTop: '3px' }}>
                  Use <strong>Hyderabad</strong> and select <strong>Onsite</strong> for rotational shift indicators.
                </span>
              </div>

              <div>
                <label className="form-label">Salary Text Display *</label>
                <input
                  type="text"
                  name="salary"
                  placeholder="e.g. ₹15,00,000 - ₹20,00,000 or $120k - $140k"
                  value={formData.salary}
                  onChange={handleChange}
                  className="form-input"
                  style={{ borderColor: errors.salary ? 'var(--danger-color)' : 'var(--border-color)' }}
                />
                {errors.salary && <span style={{ color: 'var(--danger-color)', fontSize: '0.75rem' }}>{errors.salary}</span>}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="grid-split">
              <div>
                <label className="form-label">Numeric Min Salary (USD Equivalent)</label>
                <input
                  type="number"
                  name="salaryMin"
                  placeholder="e.g. 90000"
                  value={formData.salaryMin || ''}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">Numeric Max Salary (USD Equivalent)</label>
                <input
                  type="number"
                  name="salaryMax"
                  placeholder="e.g. 130000"
                  value={formData.salaryMax || ''}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
            </div>

            <div>
              <label className="form-label">Skills Required (Comma separated)</label>
              <input
                type="text"
                name="skills"
                placeholder="e.g. React, Docker, JavaScript, PyTorch"
                value={formData.skills}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div>
              <label className="form-label">Job Description *</label>
              <textarea
                name="description"
                rows={3}
                placeholder="Describe the company mission and overview of the role..."
                value={formData.description}
                onChange={handleChange}
                className="form-input"
                style={{ resize: 'vertical', borderColor: errors.description ? 'var(--danger-color)' : 'var(--border-color)' }}
              />
              {errors.description && <span style={{ color: 'var(--danger-color)', fontSize: '0.75rem' }}>{errors.description}</span>}
            </div>

            <div>
              <label className="form-label">Requirements (One per line)</label>
              <textarea
                name="requirements"
                rows={3}
                placeholder="e.g. 3+ years experience with React&#10;Bachelor's in CS or equivalent"
                value={formData.requirements}
                onChange={handleChange}
                className="form-input"
                style={{ resize: 'vertical' }}
              />
            </div>

            <div>
              <label className="form-label">Responsibilities & Duties (One per line)</label>
              <textarea
                name="responsibilities"
                rows={3}
                placeholder="e.g. Collaborating on system architecture&#10;Deploying cloud automation pipelines"
                value={formData.responsibilities}
                onChange={handleChange}
                className="form-input"
                style={{ resize: 'vertical' }}
              />
            </div>

            <div>
              <label className="form-label">Benefits & Perks (One per line)</label>
              <textarea
                name="benefits"
                rows={2}
                placeholder="e.g. Full health insurance&#10;Flexible hybrid workspace allowances"
                value={formData.benefits}
                onChange={handleChange}
                className="form-input"
                style={{ resize: 'vertical' }}
              />
            </div>

            <button 
              type="submit" 
              className="btn-primary"
              style={{ padding: '0.75rem', justifyContent: 'center', fontWeight: 700, marginTop: '0.5rem' }}
            >
              <span>Publish Position</span>
              <ArrowRight size={16} />
            </button>
          </form>
        </section>

        {/* Live Preview Container */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
            <Eye size={20} />
            <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Live Card Preview</h3>
          </div>

          <div
            className="card-premium fade-in"
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              borderColor: 'var(--primary-color)',
              boxShadow: 'var(--shadow-lg)'
            }}
          >
            {/* Header row */}
            <div className="flex items-center justify-between" style={{ gap: '1rem' }}>
              <div className="flex items-center gap-3">
                <div
                  style={{
                    backgroundColor: 'var(--primary-light)',
                    color: 'var(--primary-color)',
                    width: '48px',
                    height: '48px',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '1.2rem'
                  }}
                >
                  {formData.company ? formData.company.substring(0, 2).toUpperCase() : "CO"}
                </div>
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                    {formData.company || "Your Company Corp"}
                  </span>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginTop: '1px', lineHeight: '1.3' }}>
                    {formData.title || "Senior Software Engineer"}
                  </h3>
                </div>
              </div>
              <div style={{ color: 'var(--text-muted)' }}>
                {/* Dummy save icon */}
                <span style={{ fontSize: '0.8rem' }} className="badge">Preview</span>
              </div>
            </div>

            {/* Meta tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <span className="flex items-center gap-1" style={{ marginRight: '0.5rem' }}>
                <MapPin size={14} style={{ color: 'var(--text-muted)' }} />
                <span>{formData.location || "Hyderabad, India"}</span>
              </span>
              <span className="flex items-center gap-1" style={{ marginRight: '0.5rem' }}>
                <DollarSign size={14} style={{ color: 'var(--text-muted)' }} />
                <span>{formData.salary || "₹12,00,000 - ₹18,00,000"}</span>
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={14} style={{ color: 'var(--text-muted)' }} />
                <span>Just Now</span>
              </span>
            </div>

            {/* Badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              <span className="badge badge-primary">{formData.type}</span>
              <span className="badge badge-accent">{formData.workMode}</span>
              {isRotationalPreview && (
                <span 
                  className="badge" 
                  style={{ 
                    backgroundColor: 'var(--primary-light)', 
                    color: 'var(--accent-color)',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.2rem'
                  }}
                >
                  <RotateCw size={11} className="spin-slow" />
                  <span>Rotational Shift</span>
                </span>
              )}
            </div>
            
            {/* Split warning in preview */}
            {isRotationalPreview && (
              <div 
                style={{ 
                  display: 'flex', 
                  gap: '0.5rem', 
                  alignItems: 'center', 
                  backgroundColor: 'var(--danger-light)', 
                  color: 'var(--danger-color)',
                  padding: '0.5rem', 
                  borderRadius: 'var(--radius-sm)', 
                  fontSize: '0.75rem' 
                }}
              >
                <Info size={14} />
                <span>Rotational shifts apply for this Hyderabad Onsite role.</span>
              </div>
            )}
          </div>

          {/* Tips for employers */}
          <div 
            style={{ 
              backgroundColor: 'var(--bg-tertiary)', 
              border: '1px solid var(--border-color)', 
              borderRadius: 'var(--radius-md)', 
              padding: '1.25rem',
              fontSize: '0.85rem',
              color: 'var(--text-secondary)',
              lineHeight: '1.5'
            }}
          >
            <h4 style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Recruiting tips:</h4>
            <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              <li>Detail the rotational shift frequency to set correct expectations.</li>
              <li>Provide numeric equivalents for min/max salaries to ensure candidates can search your range.</li>
              <li>List primary technology tags under "Skills" to trigger SEO keyword match.</li>
            </ul>
          </div>
        </section>
      </div>

      <style>{`
        .employer-grid {
          display: grid;
          grid-template-columns: 3fr 2fr;
          gap: 2rem;
        }
        @media (max-width: 1024px) {
          .employer-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }
        .grid-split {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .grid-three {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 1rem;
        }
        @media (max-width: 600px) {
          .grid-split, .grid-three {
            grid-template-columns: 1fr !important;
            gap: 1rem;
          }
        }
        .spin-slow {
          animation: spin 8s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
