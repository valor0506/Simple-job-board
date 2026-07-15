import React from 'react';
import { MapPin, Briefcase, DollarSign, Calendar, Bookmark, BookmarkCheck, CheckCircle2, RotateCw } from 'lucide-react';

export default function JobCard({
  job,
  isSelected,
  onSelect,
  isSaved,
  onToggleSave,
  isApplied
}) {
  // Check if job requires rotational shifts
  const isRotationalShift = 
    job.workMode.toLowerCase() === 'onsite' && 
    job.location.toLowerCase().includes('hyderabad');

  // Format relative time (mock calculation based on mock date)
  const getDaysAgo = (dateStr) => {
    const postDate = new Date(dateStr);
    const today = new Date("2026-07-16"); // Hardcoded local date for consistency
    const diffTime = Math.abs(today - postDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    return `${diffDays} days ago`;
  };

  const handleSaveClick = (e) => {
    e.stopPropagation();
    onToggleSave(job.id);
  };

  return (
    <div
      onClick={() => onSelect(job)}
      className="card-premium fade-in"
      style={{
        cursor: 'pointer',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        borderColor: isSelected ? 'var(--primary-color)' : 'var(--border-color)',
        backgroundColor: isSelected ? 'var(--bg-tertiary)' : 'var(--bg-secondary)',
        boxShadow: isSelected ? 'var(--shadow-md)' : 'var(--shadow-sm)'
      }}
    >
      {/* Top Header Row (Logo, Title, Save Button) */}
      <div className="flex items-center justify-between" style={{ gap: '1rem' }}>
        <div className="flex items-center gap-3">
          {/* Logo Badge */}
          <div
            style={{
              backgroundColor: job.logoBg || 'var(--bg-tertiary)',
              color: job.logoColor || 'var(--primary-color)',
              width: '48px',
              height: '48px',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '1.2rem',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            {job.logoText || "JO"}
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              {job.company}
            </span>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginTop: '1px', lineHeight: '1.3' }}>
              {job.title}
            </h3>
          </div>
        </div>

        {/* Action button */}
        <button
          onClick={handleSaveClick}
          style={{
            padding: '0.4rem',
            borderRadius: 'var(--radius-full)',
            backgroundColor: isSaved ? 'var(--primary-light)' : 'transparent',
            color: isSaved ? 'var(--primary-color)' : 'var(--text-muted)',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          className="btn-save-hover"
          aria-label={isSaved ? "Remove Bookmark" : "Save Job"}
        >
          {isSaved ? <Bookmark size={18} fill="currentColor" /> : <Bookmark size={18} />}
        </button>
      </div>

      {/* Middle row: Metadata tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
        <span className="flex items-center gap-1" style={{ marginRight: '0.5rem' }}>
          <MapPin size={14} style={{ color: 'var(--text-muted)' }} />
          <span>{job.location}</span>
        </span>
        <span className="flex items-center gap-1" style={{ marginRight: '0.5rem' }}>
          <DollarSign size={14} style={{ color: 'var(--text-muted)' }} />
          <span>{job.salary}</span>
        </span>
        <span className="flex items-center gap-1">
          <Calendar size={14} style={{ color: 'var(--text-muted)' }} />
          <span>{getDaysAgo(job.postedDate)}</span>
        </span>
      </div>

      {/* Badges row */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
        <span className="badge badge-primary">{job.type}</span>
        <span className="badge badge-accent">{job.workMode}</span>
        {isRotationalShift && (
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

      {/* Applied Banner indicator */}
      {isApplied && (
        <div 
          style={{ 
            position: 'absolute', 
            top: '-8px', 
            right: '2.5rem',
            backgroundColor: 'var(--success-color)',
            color: '#ffffff',
            padding: '0.2rem 0.6rem',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.7rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            boxShadow: 'var(--shadow-sm)'
          }}
        >
          <CheckCircle2 size={12} />
          <span>APPLIED</span>
        </div>
      )}

      {/* Embedded style */}
      <style>{`
        .btn-save-hover:hover {
          background-color: var(--primary-light);
          color: var(--primary-color) !important;
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
