import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import Filters from './components/Filters';
import JobCard from './components/JobCard';
import JobDetail from './components/JobDetail';
import ApplyModal from './components/ApplyModal';
import EmployerPortal from './components/EmployerPortal';
import Dashboard from './components/Dashboard';
import { mockJobsData } from './data/mockJobs';

function App() {
  // Navigation & UI Tabs
  const [currentTab, setCurrentTab] = useState('jobs'); // 'jobs' | 'dashboard' | 'employer'
  const [theme, setTheme] = useState('light');

  // Jobs Database
  const [jobs, setJobs] = useState(() => {
    const local = localStorage.getItem('globalhire_jobs');
    return local ? JSON.parse(local) : mockJobsData;
  });

  // Search & Filtering State
  const [searchQuery, setSearchQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');
  const [sortBy, setSortBy] = useState('relevant');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedWorkModels, setSelectedWorkModels] = useState([]);
  const [minSalary, setMinSalary] = useState(0);

  // Selected Detail Panel State
  const [selectedJob, setSelectedJob] = useState(null);

  // Saved & Applied Jobs State
  const [savedJobIds, setSavedJobIds] = useState(() => {
    const local = localStorage.getItem('globalhire_saved');
    return local ? JSON.parse(local) : [];
  });
  
  const [appliedJobIds, setAppliedJobIds] = useState(() => {
    const local = localStorage.getItem('globalhire_applied');
    return local ? JSON.parse(local) : [];
  });

  // Modal Triggers
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applyJob, setApplyJob] = useState(null);

  // Synchronize localStorage
  useEffect(() => {
    localStorage.setItem('globalhire_jobs', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem('globalhire_saved', JSON.stringify(savedJobIds));
  }, [savedJobIds]);

  useEffect(() => {
    localStorage.setItem('globalhire_applied', JSON.stringify(appliedJobIds));
  }, [appliedJobIds]);

  // Synchronize Theme Attribute
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
  }, [theme]);

  // Toggle Theme helper
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Bookmark / Save Action handler
  const handleToggleSave = (jobId) => {
    setSavedJobIds((prev) => 
      prev.includes(jobId) ? prev.filter(id => id !== jobId) : [...prev, jobId]
    );
  };

  // Submit Application handler
  const handleApplySuccess = (jobId, formData) => {
    setAppliedJobIds((prev) => [...prev, jobId]);
    // Auto-remove from saved list if applied
    setSavedJobIds((prev) => prev.filter(id => id !== jobId));
  };

  // Add Job Listing (Employer Portal)
  const handleAddJob = (newJob) => {
    setJobs((prev) => [newJob, ...prev]);
  };

  // Clear Filters action
  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSelectedTypes([]);
    setSelectedWorkModels([]);
    setMinSalary(0);
  };

  // Filtering Logic
  const filteredJobs = jobs.filter((job) => {
    // Keyword query matches title, company, skills
    const searchLower = searchQuery.toLowerCase();
    const matchesKeyword = 
      job.title.toLowerCase().includes(searchLower) ||
      job.company.toLowerCase().includes(searchLower) ||
      (job.skills && job.skills.some(skill => skill.toLowerCase().includes(searchLower)));

    // Location query matches location string
    const matchesLocation = job.location.toLowerCase().includes(locationQuery.toLowerCase());

    // Category matches checkbox state
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(job.category);

    // Job Type matches checkbox state
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(job.type);

    // Work Model matches checkbox state
    const matchesWorkModel = selectedWorkModels.length === 0 || selectedWorkModels.includes(job.workMode);

    // Salary matches minimum bounds
    const matchesSalary = minSalary === 0 || job.salaryMax >= minSalary;

    return matchesKeyword && matchesLocation && matchesCategory && matchesType && matchesWorkModel && matchesSalary;
  });

  // Sorting Logic
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.postedDate) - new Date(a.postedDate);
    }
    if (sortBy === 'salary-high') {
      return b.salaryMax - a.salaryMax;
    }
    if (sortBy === 'salary-low') {
      return a.salaryMin - b.salaryMin;
    }
    // 'relevant' keeps the active state index matching database mock lists
    return 0;
  });

  // Dynamic values for header count notifications
  const savedJobs = jobs.filter(j => savedJobIds.includes(j.id));
  const appliedJobs = jobs.filter(j => appliedJobIds.includes(j.id));

  // Trigger Apply Modal opening
  const triggerApplyModal = (job) => {
    setApplyJob(job);
    setShowApplyModal(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Responsive Sticky Header */}
      <Header 
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        theme={theme}
        toggleTheme={toggleTheme}
        savedJobsCount={savedJobs.length}
        appliedJobsCount={appliedJobs.length}
      />

      {/* Main Container Workspace */}
      <main style={{ flex: 1, padding: currentTab === 'jobs' ? '2.5rem 0' : '0' }}>
        
        {/* TAB 1: FIND JOBS DIRECTORY */}
        {currentTab === 'jobs' && (
          <div className="container">
            {/* Top Search bar */}
            <SearchBar 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              locationQuery={locationQuery}
              setLocationQuery={setLocationQuery}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />

            {/* Content Area Grid: Left Filter, Middle List, Right Details */}
            <div className="jobs-directory-layout">
              {/* Sidebar filter controls */}
              <Filters 
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                selectedTypes={selectedTypes}
                setSelectedTypes={setSelectedTypes}
                selectedWorkModels={selectedWorkModels}
                setSelectedWorkModels={setSelectedWorkModels}
                minSalary={minSalary}
                setMinSalary={setMinSalary}
                clearFilters={handleClearFilters}
              />

              {/* Central Job Listings List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} className="fade-in">
                <div className="flex justify-between items-center" style={{ marginBottom: '0.5rem' }}>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>
                    Showing <strong style={{ color: 'var(--primary-color)' }}>{sortedJobs.length}</strong> matching vacancies
                  </p>
                </div>
                
                {sortedJobs.length === 0 ? (
                  <div 
                    className="card-premium flex flex-col items-center justify-center text-center"
                    style={{ padding: '3rem', border: '1px dashed var(--border-color)' }}
                  >
                    <Briefcase size={36} style={{ color: 'var(--text-muted)', marginBottom: '0.75rem', opacity: 0.5 }} />
                    <h4 style={{ fontWeight: 700 }}>No Jobs Found</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', maxWidth: '280px', margin: '0.25rem auto' }}>
                      Try expanding search query keys, switching filters, or resetting filter options.
                    </p>
                    <button onClick={handleClearFilters} className="btn-secondary" style={{ marginTop: '1rem', fontSize: '0.85rem' }}>
                      Reset Filter Criteria
                    </button>
                  </div>
                ) : (
                  sortedJobs.map((job) => (
                    <JobCard 
                      key={job.id}
                      job={job}
                      isSelected={selectedJob && selectedJob.id === job.id}
                      onSelect={setSelectedJob}
                      isSaved={savedJobIds.includes(job.id)}
                      onToggleSave={handleToggleSave}
                      isApplied={appliedJobIds.includes(job.id)}
                    />
                  ))
                )}
              </div>

              {/* Side Drawer Details view */}
              <div className="detail-pane-wrapper">
                <JobDetail 
                  job={selectedJob}
                  onClose={() => setSelectedJob(null)}
                  isSaved={selectedJob ? savedJobIds.includes(selectedJob.id) : false}
                  onToggleSave={handleToggleSave}
                  isApplied={selectedJob ? appliedJobIds.includes(selectedJob.id) : false}
                  onApplyTrigger={triggerApplyModal}
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: APPLICANT DASHBOARD */}
        {currentTab === 'dashboard' && (
          <Dashboard 
            savedJobs={savedJobs}
            appliedJobs={appliedJobs}
            onRemoveSave={handleToggleSave}
            onSelectJob={setSelectedJob}
            setCurrentTab={setCurrentTab}
          />
        )}

        {/* TAB 3: EMPLOYER PORTAL */}
        {currentTab === 'employer' && (
          <EmployerPortal 
            onAddJob={handleAddJob}
          />
        )}
      </main>

      {/* Global Application Modal Form */}
      {showApplyModal && (
        <ApplyModal 
          job={applyJob}
          onClose={() => { setShowApplyModal(false); setApplyJob(null); }}
          onSubmitSuccess={handleApplySuccess}
        />
      )}

      {/* Responsive Footer */}
      <Footer setCurrentTab={setCurrentTab} />

      {/* Layout styles for responsive grid */}
      <style>{`
        .jobs-directory-layout {
          display: grid;
          grid-template-columns: 240px 1fr 400px;
          gap: 1.5rem;
          align-items: start;
        }

        @media (max-width: 1200px) {
          .jobs-directory-layout {
            grid-template-columns: 220px 1fr;
          }
          .detail-pane-wrapper {
            display: none !important;
          }
          /* Overlay drawer handled by CSS class in JobDetail on smaller sizes */
        }

        @media (max-width: 768px) {
          .jobs-directory-layout {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
