import React from 'react';
import { Briefcase, Heart } from 'lucide-react';

export default function Footer({ setCurrentTab }) {
  return (
    <footer 
      style={{ 
        backgroundColor: 'var(--bg-secondary)', 
        borderTop: '1px solid var(--border-color)', 
        padding: '3rem 0 2rem 0',
        marginTop: 'auto',
        transition: 'background-color var(--transition-speed), border-color var(--transition-speed)'
      }}
    >
      <div className="container">
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '2.5rem',
            marginBottom: '2.5rem'
          }}
        >
          {/* Brand Info */}
          <div>
            <div 
              onClick={() => setCurrentTab('jobs')} 
              className="flex items-center gap-2" 
              style={{ cursor: 'pointer', marginBottom: '1rem' }}
            >
              <div 
                style={{ 
                  background: 'linear-gradient(135deg, var(--primary-color), var(--accent-color))',
                  padding: '0.4rem',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  color: '#ffffff'
                }}
              >
                <Briefcase size={18} />
              </div>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.1rem' }}>
                GlobalHire
              </span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Empowering global tech and business professionals to locate top careers. Built with speed, responsiveness, and clean aesthetics in mind.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '0.95rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              For Candidates
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem' }}>
              <li>
                <a href="#explore" onClick={(e) => { e.preventDefault(); setCurrentTab('jobs'); }} style={{ color: 'var(--text-secondary)' }}>
                  Explore Job Directory
                </a>
              </li>
              <li>
                <a href="#dashboard" onClick={(e) => { e.preventDefault(); setCurrentTab('dashboard'); }} style={{ color: 'var(--text-secondary)' }}>
                  Application Dashboard
                </a>
              </li>
              <li>
                <a href="#saved" onClick={(e) => { e.preventDefault(); setCurrentTab('dashboard'); }} style={{ color: 'var(--text-secondary)' }}>
                  Saved Jobs & Bookmarks
                </a>
              </li>
            </ul>
          </div>

          {/* Employer Info */}
          <div>
            <h4 style={{ fontSize: '0.95rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              For Employers
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem' }}>
              <li>
                <a href="#post" onClick={(e) => { e.preventDefault(); setCurrentTab('employer'); }} style={{ color: 'var(--text-secondary)' }}>
                  Post a New Job
                </a>
              </li>
              <li>
                <a href="#process" onClick={(e) => { e.preventDefault(); }} style={{ color: 'var(--text-secondary)' }}>
                  Onsite Hiring Solutions
                </a>
              </li>
              <li>
                <a href="#rotational" onClick={(e) => { e.preventDefault(); }} style={{ color: 'var(--text-secondary)' }}>
                  Rotational Shifts Guide
                </a>
              </li>
            </ul>
          </div>

          {/* Contact / Connect */}
          <div>
            <h4 style={{ fontSize: '0.95rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Connect With Us
            </h4>
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
              {/* GitHub SVG */}
              <a 
                href="https://github.com/valor0506" 
                target="_blank" 
                rel="noreferrer" 
                style={{ 
                  color: 'var(--text-secondary)',
                  backgroundColor: 'var(--bg-tertiary)',
                  padding: '0.5rem',
                  borderRadius: 'var(--radius-full)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s'
                }}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                  <path d="M9 18c-4.51 2-5-2-7-2"></path>
                </svg>
              </a>

              {/* LinkedIn SVG */}
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer" 
                style={{ 
                  color: 'var(--text-secondary)',
                  backgroundColor: 'var(--bg-tertiary)',
                  padding: '0.5rem',
                  borderRadius: 'var(--radius-full)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s'
                }}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>

              {/* Twitter/X SVG */}
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer" 
                style={{ 
                  color: 'var(--text-secondary)',
                  backgroundColor: 'var(--bg-tertiary)',
                  padding: '0.5rem',
                  borderRadius: 'var(--radius-full)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s'
                }}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Email support: careers@globalco.com
            </p>
          </div>
        </div>

        {/* Divider line */}
        <div style={{ borderTop: '1px solid var(--border-color)', margin: '1.5rem 0', opacity: 0.8 }}></div>

        {/* Bottom footer text */}
        <div className="flex flex-col items-center justify-between gap-4 md-row" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <p>© 2026 GlobalHire Inc. All rights reserved.</p>
          <p style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            Handcrafted with <Heart size={14} style={{ color: 'var(--danger-color)' }} /> for GlobalCo Assessment.
          </p>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .md-row { flex-direction: row !important; }
        }
      `}</style>
    </footer>
  );
}
