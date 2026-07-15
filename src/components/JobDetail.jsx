import React from 'react';
import { MapPin, Briefcase, DollarSign, Calendar, Clock, Star, Share2, AlertTriangle, ArrowLeft, Send } from 'lucide-react';

export default function JobDetail({
  job,
  onClose,
  isSaved,
  onToggleSave,
  isApplied,
  onApplyTrigger
}) {
  if (!job) {
    return (
      <div 
        className="card-premium flex flex-col items-center justify-center text-center fade-in"
        style={{ 
          height: '100%', 
          minHeight: '300px', 
          color: 'var(--text-muted)',
          backgroundColor: 'var(--bg-secondary)',
          border: '1px dashed var(--border-color)'
        }}
      >
        <Briefcase size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
        <h3>Select a Job</h3>
        <p style={{ fontSize: '0.9rem', maxWidth: '300px', margin: '0.5rem auto 0 auto' }}>
          Select a job post from the directory to review detailed specifications and apply directly.
        </p>
      </div>
    );
  }

  const isRotationalShift = 
    job.workMode.toLowerCase() === 'onsite' && 
    job.location.toLowerCase().includes('hyderabad');

  const getDaysAgo = (dateStr) => {
    const postDate = new Date(dateStr);
    const today = new Date("2026-07-16");
    const diffTime = Math.abs(today - postDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    return `${diffDays} days ago`;
  };

  return (
    <article 
      className="card-premium fade-in detail-drawer"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        padding: '2rem',
        backgroundColor: 'var(--bg-secondary)',
        borderColor: 'var(--border-color)',
        boxShadow: 'var(--shadow-lg)'
      }}
    >
      {/* Mobile-only Header Row (Back Button & Actions) */}
      <div className="mobile-only flex items-center justify-between" style={{ marginBottom: '0.5rem' }}>
        <button 
          onClick={onClose}
          className="btn-secondary"
          style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
        >
          <ArrowLeft size={16} />
          <span>Back to Jobs</span>
        </button>
      </div>

      {/* Hero Header Section */}
      <div 
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '1rem',
          borderBottom: '1px solid var(--border-color)',
          paddingBottom: '1.5rem'
        }}
      >
        <div className="flex items-center justify-between" style={{ gap: '1rem' }}>
          <div className="flex items-center gap-3">
            <div
              style={{
                backgroundColor: job.logoBg || 'var(--bg-tertiary)',
                color: job.logoColor || 'var(--primary-color)',
                width: '56px',
                height: '56px',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '1.4rem'
              }}
            >
              {job.logoText || "JO"}
            </div>
            <div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, lineHeight: '1.2' }}>
                {job.title}
              </h2>
              <span style={{ fontSize: '0.9rem', color: 'var(--primary-color)', fontWeight: 600 }}>
                {job.company}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button 
              onClick={() => onToggleSave(job.id)}
              className="btn-secondary"
              style={{ padding: '0.5rem' }}
              title={isSaved ? "Saved" : "Save Job"}
            >
              <Star size={18} fill={isSaved ? "var(--warning-color)" : "transparent"} style={{ color: isSaved ? "var(--warning-color)" : "var(--text-secondary)" }} />
            </button>
          </div>
        </div>

        {/* Info Grid tags */}
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', 
            gap: '0.75rem',
            marginTop: '0.5rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
            <MapPin size={16} style={{ color: 'var(--text-muted)' }} />
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Location</p>
              <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{job.location}</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
            <DollarSign size={16} style={{ color: 'var(--text-muted)' }} />
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Salary</p>
              <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{job.salary}</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
            <Briefcase size={16} style={{ color: 'var(--text-muted)' }} />
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Job Type</p>
              <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{job.type} / {job.workMode}</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
            <Calendar size={16} style={{ color: 'var(--text-muted)' }} />
            <div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Posted Date</p>
              <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{getDaysAgo(job.postedDate)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ROTATIONAL SHIFT ALERT (Strictly Hyderabad Onsite Match!) */}
      {isRotationalShift && (
        <div 
          style={{ 
            backgroundColor: 'var(--primary-glow)',
            border: '1.5px solid var(--accent-color)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem',
            display: 'flex',
            gap: '0.75rem',
            alignItems: 'flex-start'
          }}
        >
          <AlertTriangle size={20} style={{ color: 'var(--accent-color)', flexShrink: 0, marginTop: '2px' }} />
          <div style={{ fontSize: '0.85rem', lineHeight: '1.4' }}>
            <p style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
              Rotational Shift & Onsite Requirement
            </p>
            <p style={{ color: 'var(--text-secondary)' }}>
              Please note that this Software Engineer role requires a <strong>rotational shift schedule</strong> and is <strong>strictly onsite</strong> at our Hitech City, Hyderabad office.
            </p>
          </div>
        </div>
      )}

      {/* Job Description */}
      <div>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem' }}>Job Description</h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          {job.description}
        </p>
      </div>

      {/* Skills Required */}
      <div>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem' }}>Core Skills Required</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          {job.skills && job.skills.map((skill, idx) => (
            <span key={idx} className="badge badge-primary" style={{ padding: '0.3rem 0.8rem', fontSize: '0.8rem' }}>
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Requirements List */}
      {job.requirements && job.requirements.length > 0 && (
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem' }}>Requirements</h3>
          <ul style={{ paddingLeft: '1.25rem', fontSize: '0.9rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.4rem', lineHeight: '1.5' }}>
            {job.requirements.map((req, idx) => (
              <li key={idx}>{req}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Responsibilities List */}
      {job.responsibilities && job.responsibilities.length > 0 && (
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem' }}>Responsibilities</h3>
          <ul style={{ paddingLeft: '1.25rem', fontSize: '0.9rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.4rem', lineHeight: '1.5' }}>
            {job.responsibilities.map((resp, idx) => (
              <li key={idx}>{resp}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Benefits List */}
      {job.benefits && job.benefits.length > 0 && (
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem' }}>Benefits & Perks</h3>
          <ul style={{ paddingLeft: '1.25rem', fontSize: '0.9rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.4rem', lineHeight: '1.5' }}>
            {job.benefits.map((benefit, idx) => (
              <li key={idx}>{benefit}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Bottom CTA Apply Row */}
      <div 
        style={{ 
          marginTop: 'auto', 
          paddingTop: '1.5rem', 
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        {isApplied ? (
          <button 
            disabled 
            style={{ 
              backgroundColor: 'var(--success-light)', 
              color: 'var(--success-color)', 
              fontWeight: 600,
              padding: '0.75rem 2rem',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'not-allowed',
              border: '1.5px solid var(--success-color)'
            }}
          >
            <span>Applied Successfully</span>
          </button>
        ) : (
          <button 
            onClick={() => onApplyTrigger(job)}
            className="btn-primary"
            style={{ padding: '0.75rem 2.5rem' }}
          >
            <Send size={16} />
            <span>Apply Now</span>
          </button>
        )}
      </div>
    </article>
  );
}
