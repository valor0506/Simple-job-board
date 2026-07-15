import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle, FileText, ArrowRight, User, Mail, Link, AlertCircle } from 'lucide-react';

export default function ApplyModal({ job, onClose, onSubmitSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    resume: '',
    portfolio: '',
    coverLetter: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [confettiParticles, setConfettiParticles] = useState([]);

  // Generate confetti coordinates for the success screen
  useEffect(() => {
    if (showSuccess) {
      const particles = Array.from({ length: 30 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 1.5}s`,
        color: ['#6366f1', '#8b5cf6', '#10b981', '#fbbf24', '#ef4444'][Math.floor(Math.random() * 5)],
        size: `${Math.random() * 8 + 6}px`,
        duration: `${Math.random() * 1.5 + 1.5}s`
      }));
      setConfettiParticles(particles);
    }
  }, [showSuccess]);

  if (!job) return null;

  const validate = () => {
    const tempErrors = {};
    if (!formData.name.trim()) {
      tempErrors.name = "Full name is required.";
    } else if (formData.name.trim().length < 3) {
      tempErrors.name = "Name must be at least 3 characters.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      tempErrors.email = "Email address is required.";
    } else if (!emailRegex.test(formData.email)) {
      tempErrors.email = "Please enter a valid email address.";
    }

    const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
    if (!formData.resume.trim()) {
      tempErrors.resume = "Resume link (Google Drive / Dropbox / web URL) is required.";
    } else if (!urlRegex.test(formData.resume.trim())) {
      tempErrors.resume = "Please enter a valid URL (starting with http:// or https://).";
    }

    if (formData.portfolio.trim() && !urlRegex.test(formData.portfolio.trim())) {
      tempErrors.portfolio = "Please enter a valid portfolio URL.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error for field as user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Mock network dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
    }, 1500);
  };

  const handleFinalize = () => {
    onSubmitSuccess(job.id, formData);
    onClose();
  };

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(2, 6, 17, 0.65)',
        backdropFilter: 'blur(4px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem'
      }}
    >
      <div 
        className="fade-in"
        style={{
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          width: '100%',
          maxWidth: '550px',
          boxShadow: 'var(--shadow-xl)',
          position: 'relative',
          overflow: 'hidden',
          transition: 'all var(--transition-speed)'
        }}
      >
        {/* Confetti particles for success view */}
        {showSuccess && confettiParticles.map((particle) => (
          <div 
            key={particle.id}
            className="confetti"
            style={{
              left: particle.left,
              backgroundColor: particle.color,
              width: particle.size,
              height: particle.size,
              animationDelay: particle.delay,
              animationDuration: particle.duration
            }}
          />
        ))}

        {/* Modal Header */}
        <div 
          style={{ 
            padding: '1.25rem 1.5rem', 
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'between'
          }}
          className="flex justify-between items-center"
        >
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>
              {showSuccess ? "Application Sent!" : "Apply for Role"}
            </h3>
            {!showSuccess && (
              <p style={{ fontSize: '0.8rem', color: 'var(--primary-color)', fontWeight: 600, marginTop: '2px' }}>
                {job.title} at {job.company}
              </p>
            )}
          </div>
          {!isSubmitting && (
            <button 
              onClick={onClose}
              style={{
                color: 'var(--text-muted)',
                padding: '0.25rem',
                borderRadius: 'var(--radius-sm)'
              }}
              className="btn-close-hover"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Modal Body */}
        {!showSuccess ? (
          <form onSubmit={handleSubmit} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            
            {/* Full Name */}
            <div>
              <label className="form-label" htmlFor="name">
                <span className="flex items-center gap-1">
                  <User size={14} />
                  <span>Full Name *</span>
                </span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="e.g. Suvan S"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                style={{ borderColor: errors.name ? 'var(--danger-color)' : 'var(--border-color)' }}
              />
              {errors.name && (
                <p style={{ color: 'var(--danger-color)', fontSize: '0.75rem', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                  <AlertCircle size={12} />
                  <span>{errors.name}</span>
                </p>
              )}
            </div>

            {/* Email Address */}
            <div>
              <label className="form-label" htmlFor="email">
                <span className="flex items-center gap-1">
                  <Mail size={14} />
                  <span>Email Address *</span>
                </span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="e.g. suvan@globalco.com"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                style={{ borderColor: errors.email ? 'var(--danger-color)' : 'var(--border-color)' }}
              />
              {errors.email && (
                <p style={{ color: 'var(--danger-color)', fontSize: '0.75rem', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                  <AlertCircle size={12} />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>

            {/* Resume Link */}
            <div>
              <label className="form-label" htmlFor="resume">
                <span className="flex items-center gap-1">
                  <Link size={14} />
                  <span>Resume Link *</span>
                </span>
              </label>
              <input
                id="resume"
                name="resume"
                type="text"
                placeholder="Google Drive, Dropbox or Hosted PDF URL..."
                value={formData.resume}
                onChange={handleChange}
                className="form-input"
                style={{ borderColor: errors.resume ? 'var(--danger-color)' : 'var(--border-color)' }}
              />
              {errors.resume && (
                <p style={{ color: 'var(--danger-color)', fontSize: '0.75rem', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                  <AlertCircle size={12} />
                  <span>{errors.resume}</span>
                </p>
              )}
            </div>

            {/* Portfolio Link */}
            <div>
              <label className="form-label" htmlFor="portfolio">
                <span className="flex items-center gap-1">
                  <Link size={14} />
                  <span>Portfolio / GitHub Link</span>
                </span>
              </label>
              <input
                id="portfolio"
                name="portfolio"
                type="text"
                placeholder="e.g. https://github.com/valor0506"
                value={formData.portfolio}
                onChange={handleChange}
                className="form-input"
                style={{ borderColor: errors.portfolio ? 'var(--danger-color)' : 'var(--border-color)' }}
              />
              {errors.portfolio && (
                <p style={{ color: 'var(--danger-color)', fontSize: '0.75rem', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                  <AlertCircle size={12} />
                  <span>{errors.portfolio}</span>
                </p>
              )}
            </div>

            {/* Cover Letter */}
            <div>
              <label className="form-label" htmlFor="coverLetter">
                <span className="flex items-center justify-between" style={{ width: '100%' }}>
                  <span className="flex items-center gap-1">
                    <FileText size={14} />
                    <span>Brief Pitch / Cover Letter</span>
                  </span>
                  <span style={{ fontSize: '0.75rem', color: formData.coverLetter.length > 500 ? 'var(--danger-color)' : 'var(--text-muted)' }}>
                    {formData.coverLetter.length}/500
                  </span>
                </span>
              </label>
              <textarea
                id="coverLetter"
                name="coverLetter"
                rows={3}
                placeholder="Briefly state why you're a perfect fit for this rotational shift/onsite role..."
                value={formData.coverLetter}
                onChange={handleChange}
                maxLength={500}
                className="form-input"
                style={{ resize: 'vertical' }}
              />
            </div>

            {/* Footer Buttons */}
            <div 
              style={{ 
                marginTop: '1rem',
                paddingTop: '1rem',
                borderTop: '1px solid var(--border-color)',
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '0.75rem'
              }}
            >
              <button 
                type="button" 
                onClick={onClose} 
                disabled={isSubmitting}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="btn-primary"
                style={{ minWidth: '130px', justifyContent: 'center' }}
              >
                {isSubmitting ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="spinner-loader" />
                    <span>Sending...</span>
                  </span>
                ) : (
                  <>
                    <Send size={15} />
                    <span>Submit Application</span>
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          /* Success Screen */
          <div 
            className="fade-in"
            style={{ 
              padding: '2.5rem 1.5rem', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              textAlign: 'center',
              gap: '1.25rem' 
            }}
          >
            <div 
              style={{
                color: 'var(--success-color)',
                backgroundColor: 'var(--success-light)',
                padding: '1rem',
                borderRadius: 'var(--radius-full)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'var(--shadow-md)'
              }}
            >
              <CheckCircle size={48} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800 }}>Success! Application Transmitted</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '380px', margin: '0.75rem auto 0 auto', lineHeight: '1.5' }}>
                Your job application for the <strong>{job.title}</strong> role at <strong>{job.company}</strong> has been successfully registered.
              </p>
            </div>
            
            <div 
              style={{ 
                backgroundColor: 'var(--bg-tertiary)', 
                border: '1px solid var(--border-color)', 
                borderRadius: 'var(--radius-md)', 
                padding: '0.75rem 1rem', 
                fontSize: '0.8rem', 
                color: 'var(--text-muted)',
                width: '100%',
                maxWidth: '400px'
              }}
            >
              Our recruiters from GlobalCo will review your resume/portfolio link and reach out if you qualify.
            </div>

            <button 
              onClick={handleFinalize} 
              className="btn-primary"
              style={{ marginTop: '0.5rem', padding: '0.75rem 2rem' }}
            >
              <span>Back to Directory</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>

      <style>{`
        .btn-close-hover:hover {
          background-color: var(--bg-tertiary);
          color: var(--text-primary) !important;
        }
        .spinner-loader {
          width: 14px;
          height: 14px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: #ffffff;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
