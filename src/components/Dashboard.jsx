import React, { useState } from 'react';
import { Bookmark, Briefcase, FileText, CheckCircle, Clock, Search, Trash2, ArrowRight, ShieldCheck, Mail, Calendar } from 'lucide-react';

export default function Dashboard({
  savedJobs,
  appliedJobs,
  onRemoveSave,
  onSelectJob,
  setCurrentTab
}) {
  const [activeSubTab, setActiveSubTab] = useState('applied'); // 'applied' or 'saved'

  // Mock application statuses for design realism
  const getMockStatus = (job) => {
    // If the job is Onsite and Hyderabad, let's mark it as "Assessment Pending" (matching GlobalCo assessment)
    if (job.workMode.toLowerCase() === 'onsite' && job.location.toLowerCase().includes('hyderabad')) {
      return { text: 'Assessment Sent', color: 'var(--accent-color)', bg: 'var(--accent-light)' };
    }
    return { text: 'In Review', color: 'var(--warning-color)', bg: 'var(--primary-light)' };
  };

  return (
    <div className="container fade-in" style={{ padding: '2rem 1.5rem' }}>
      
      {/* Stats Summary Cards */}
      <section className="stats-grid" style={{ marginBottom: '2.5rem' }}>
        
        {/* Applied Stats */}
        <div className="card-premium flex items-center gap-4" style={{ padding: '1.25rem' }}>
          <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--primary-light)', color: 'var(--primary-color)' }}>
            <Briefcase size={24} />
          </div>
          <div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600 }}>Applied Careers</p>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 800 }}>{appliedJobs.length}</h3>
          </div>
        </div>

        {/* Saved Stats */}
        <div className="card-premium flex items-center gap-4" style={{ padding: '1.25rem' }}>
          <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--accent-light)', color: 'var(--accent-color)' }}>
            <Bookmark size={24} />
          </div>
          <div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600 }}>Saved Bookmarks</p>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 800 }}>{savedJobs.length}</h3>
          </div>
        </div>

        {/* Assessment Stats */}
        <div className="card-premium flex items-center gap-4" style={{ padding: '1.25rem' }}>
          <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--success-light)', color: 'var(--success-color)' }}>
            <CheckCircle size={24} />
          </div>
          <div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600 }}>Assessments Sent</p>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 800 }}>
              {appliedJobs.filter(j => j.workMode.toLowerCase() === 'onsite' && j.location.toLowerCase().includes('hyderabad')).length}
            </h3>
          </div>
        </div>

        {/* Rotational Shifts Alert (Hyderabad Match) */}
        <div className="card-premium flex items-center gap-4" style={{ padding: '1.25rem' }}>
          <div style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--danger-light)', color: 'var(--danger-color)' }}>
            <Clock size={24} />
          </div>
          <div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600 }}>Rotational Shifts</p>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 800 }}>
              {appliedJobs.filter(j => j.workMode.toLowerCase() === 'onsite' && j.location.toLowerCase().includes('hyderabad')).length > 0 ? "Active" : "None"}
            </h3>
          </div>
        </div>
      </section>

      {/* Tabs Selector Bar */}
      <div 
        style={{ 
          display: 'flex', 
          gap: '1rem', 
          borderBottom: '1px solid var(--border-color)', 
          marginBottom: '1.5rem',
          paddingBottom: '0.2rem'
        }}
      >
        <button
          onClick={() => setActiveSubTab('applied')}
          style={{
            padding: '0.75rem 1rem',
            fontWeight: 600,
            fontSize: '0.95rem',
            color: activeSubTab === 'applied' ? 'var(--primary-color)' : 'var(--text-secondary)',
            borderBottom: activeSubTab === 'applied' ? '2.5px solid var(--primary-color)' : '2.5px solid transparent',
            transition: 'all 0.2s'
          }}
        >
          Applied Positions ({appliedJobs.length})
        </button>
        <button
          onClick={() => setActiveSubTab('saved')}
          style={{
            padding: '0.75rem 1rem',
            fontWeight: 600,
            fontSize: '0.95rem',
            color: activeSubTab === 'saved' ? 'var(--primary-color)' : 'var(--text-secondary)',
            borderBottom: activeSubTab === 'saved' ? '2.5px solid var(--primary-color)' : '2.5px solid transparent',
            transition: 'all 0.2s'
          }}
        >
          Bookmarked Jobs ({savedJobs.length})
        </button>
      </div>

      {/* Content Render Pane */}
      <div>
        
        {/* APPLIED LIST */}
        {activeSubTab === 'applied' && (
          appliedJobs.length === 0 ? (
            <div 
              className="card-premium flex flex-col items-center justify-center text-center fade-in"
              style={{ padding: '3rem', minHeight: '320px', border: '1px dashed var(--border-color)' }}
            >
              <Briefcase size={40} style={{ color: 'var(--text-muted)', marginBottom: '1rem', opacity: 0.6 }} />
              <h4 style={{ fontWeight: 700 }}>No Applications Yet</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', maxWidth: '300px', margin: '0.5rem auto 1.5rem auto' }}>
                You haven't submitted any job application forms. Explore our lists to apply!
              </p>
              <button onClick={() => setCurrentTab('jobs')} className="btn-primary">
                <span>Browse Directory</span>
                <ArrowRight size={15} />
              </button>
            </div>
          ) : (
            <div className="card-premium fade-in" style={{ padding: 0, overflow: 'hidden' }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: 'var(--bg-tertiary)', borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', fontWeight: 600 }}>
                      <th style={{ padding: '1rem 1.5rem' }}>Job Opportunity</th>
                      <th style={{ padding: '1rem' }}>Location & Type</th>
                      <th style={{ padding: '1rem' }}>Applied Date</th>
                      <th style={{ padding: '1rem' }}>Status</th>
                      <th style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appliedJobs.map((job) => {
                      const status = getMockStatus(job);
                      return (
                        <tr 
                          key={job.id} 
                          style={{ 
                            borderBottom: '1px solid var(--border-color)',
                            transition: 'background-color 0.2s' 
                          }}
                          className="table-row-hover"
                        >
                          <td style={{ padding: '1rem 1.5rem' }}>
                            <div className="flex items-center gap-3">
                              <div
                                style={{
                                  backgroundColor: job.logoBg,
                                  color: job.logoColor,
                                  width: '36px',
                                  height: '36px',
                                  borderRadius: 'var(--radius-sm)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontWeight: 700,
                                  fontSize: '0.9rem'
                                }}
                              >
                                {job.logoText}
                              </div>
                              <div>
                                <p style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{job.title}</p>
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{job.company}</p>
                              </div>
                            </div>
                          </td>
                          <td style={{ padding: '1rem' }}>
                            <p style={{ fontWeight: 500, color: 'var(--text-secondary)' }}>{job.location}</p>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{job.type} / {job.workMode}</p>
                          </td>
                          <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>
                            <div className="flex items-center gap-1">
                              <Calendar size={14} style={{ color: 'var(--text-muted)' }} />
                              <span>2026-07-16</span> {/* Today */}
                            </div>
                          </td>
                          <td style={{ padding: '1rem' }}>
                            <span 
                              className="badge" 
                              style={{ 
                                backgroundColor: status.bg, 
                                color: status.color,
                                fontWeight: 700,
                                fontSize: '0.7rem' 
                              }}
                            >
                              {status.text}
                            </span>
                          </td>
                          <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                            <button 
                              onClick={() => { onSelectJob(job); setCurrentTab('jobs'); }}
                              className="btn-outline"
                              style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', borderWidth: '1px' }}
                            >
                              <span>View Listing</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )
        )}

        {/* SAVED LIST */}
        {activeSubTab === 'saved' && (
          savedJobs.length === 0 ? (
            <div 
              className="card-premium flex flex-col items-center justify-center text-center fade-in"
              style={{ padding: '3rem', minHeight: '320px', border: '1px dashed var(--border-color)' }}
            >
              <Bookmark size={40} style={{ color: 'var(--text-muted)', marginBottom: '1rem', opacity: 0.6 }} />
              <h4 style={{ fontWeight: 700 }}>No Bookmarks Saved</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', maxWidth: '300px', margin: '0.5rem auto 1.5rem auto' }}>
                Save job offers to track them later, edit your resume, or apply when you're ready.
              </p>
              <button onClick={() => setCurrentTab('jobs')} className="btn-primary">
                <span>Browse Directory</span>
                <ArrowRight size={15} />
              </button>
            </div>
          ) : (
            <div className="dashboard-saved-grid">
              {savedJobs.map((job) => (
                <div 
                  key={job.id}
                  className="card-premium fade-in flex flex-col justify-between"
                  style={{ gap: '1rem', minHeight: '160px' }}
                >
                  <div className="flex justify-between items-start" style={{ gap: '1rem' }}>
                    <div className="flex items-center gap-3">
                      <div
                        style={{
                          backgroundColor: job.logoBg,
                          color: job.logoColor,
                          width: '40px',
                          height: '40px',
                          borderRadius: 'var(--radius-sm)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700
                        }}
                      >
                        {job.logoText}
                      </div>
                      <div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>{job.company}</span>
                        <h4 style={{ fontWeight: 700, fontSize: '0.95rem', lineHeight: '1.2' }}>{job.title}</h4>
                      </div>
                    </div>

                    <button 
                      onClick={() => onRemoveSave(job.id)}
                      style={{ color: 'var(--danger-color)', padding: '0.25rem', borderRadius: 'var(--radius-sm)' }}
                      title="Remove bookmark"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }} className="flex justify-between items-center">
                    <span>{job.location}</span>
                    <span style={{ fontWeight: 600 }}>{job.salary}</span>
                  </div>

                  <div className="flex gap-2 justify-end" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
                    <button 
                      onClick={() => { onSelectJob(job); setCurrentTab('jobs'); }}
                      className="btn-secondary"
                      style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>

      <style>{`
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.25rem;
        }
        .dashboard-saved-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.25rem;
        }
        .table-row-hover:hover {
          background-color: var(--bg-tertiary) !important;
        }
      `}</style>
    </div>
  );
}
