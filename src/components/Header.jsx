import React, { useState } from 'react';
import { Briefcase, Sun, Moon, PlusCircle, LayoutDashboard, Search, Menu, X, Landmark } from 'lucide-react';

export default function Header({ 
  currentTab, 
  setCurrentTab, 
  theme, 
  toggleTheme, 
  savedJobsCount, 
  appliedJobsCount 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'jobs', label: 'Find Jobs', icon: Search },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: savedJobsCount + appliedJobsCount },
    { id: 'employer', label: 'Post a Job', icon: PlusCircle, highlight: true }
  ];

  const handleNavClick = (tabId) => {
    setCurrentTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="header-glass">
      <div className="container flex items-center justify-between" style={{ height: '70px' }}>
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('jobs')} 
          className="flex items-center gap-2" 
          style={{ cursor: 'pointer' }}
        >
          <div 
            style={{ 
              background: 'linear-gradient(135deg, var(--primary-color), var(--accent-color))',
              padding: '0.5rem',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff'
            }}
          >
            <Briefcase size={22} />
          </div>
          <span 
            style={{ 
              fontFamily: 'var(--font-heading)', 
              fontWeight: 800, 
              fontSize: '1.25rem',
              letterSpacing: '-0.03em',
              background: 'linear-gradient(135deg, var(--text-primary), var(--text-secondary))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            GlobalHire
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="flex items-center gap-6" style={{ display: 'none' }}>
          {/* Handled by CSS wrapper but for React layout we do it explicitly */}
        </nav>
        
        {/* Navigation Elements Grid for Large Screen */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              
              if (item.highlight) {
                return (
                  <button 
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className="btn-primary"
                    style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                  >
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </button>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.5rem 0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    fontWeight: 500,
                    fontSize: '0.875rem',
                    color: isActive ? 'var(--primary-color)' : 'var(--text-secondary)',
                    backgroundColor: isActive ? 'var(--primary-light)' : 'transparent',
                    transition: 'all 0.2s ease',
                    position: 'relative'
                  }}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                  {item.badge > 0 && (
                    <span 
                      className="badge badge-primary" 
                      style={{ 
                        position: 'absolute', 
                        top: '-6px', 
                        right: '-8px',
                        padding: '0.15rem 0.35rem',
                        fontSize: '0.65rem'
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--border-color)' }} className="desktop-only"></div>

          {/* Theme Toggle Button */}
          <button 
            onClick={toggleTheme} 
            style={{ 
              padding: '0.5rem', 
              borderRadius: 'var(--radius-full)', 
              backgroundColor: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s'
            }}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={18} style={{ color: '#fbbf24' }} /> : <Moon size={18} style={{ color: '#475569' }} />}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button 
            className="mobile-only" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              padding: '0.5rem',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div 
          className="fade-in glass-overlay" 
          style={{ 
            position: 'absolute', 
            top: '71px', 
            left: 0, 
            right: 0, 
            padding: '1.5rem',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            zIndex: 49
          }}
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            
            if (item.highlight) {
              return (
                <button 
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="btn-primary"
                  style={{ justifyContent: 'center', width: '100%' }}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </button>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  fontWeight: 600,
                  color: isActive ? 'var(--primary-color)' : 'var(--text-primary)',
                  backgroundColor: isActive ? 'var(--primary-light)' : 'transparent',
                  textAlign: 'left',
                  width: '100%',
                  position: 'relative'
                }}
              >
                <Icon size={20} />
                <span>{item.label}</span>
                {item.badge > 0 && (
                  <span 
                    className="badge badge-primary" 
                    style={{ 
                      marginLeft: 'auto',
                      padding: '0.2rem 0.5rem',
                      fontSize: '0.75rem'
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Embedded CSS for responsive toggles */}
      <style>{`
        @media (min-width: 768px) {
          .mobile-only { display: none !important; }
          .desktop-only { display: flex !important; }
        }
        @media (max-width: 767px) {
          .mobile-only { display: flex !important; }
          .desktop-only { display: none !important; }
        }
      `}</style>
    </header>
  );
}
