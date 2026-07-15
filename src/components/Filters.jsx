import React from 'react';
import { Filter, RotateCcw, ShieldCheck } from 'lucide-react';
import { jobCategories, jobTypes, workModels } from '../data/mockJobs';

export default function Filters({
  selectedCategories,
  setSelectedCategories,
  selectedTypes,
  setSelectedTypes,
  selectedWorkModels,
  setSelectedWorkModels,
  minSalary,
  setMinSalary,
  clearFilters
}) {
  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const toggleType = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(t => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const toggleWorkModel = (model) => {
    if (selectedWorkModels.includes(model)) {
      setSelectedWorkModels(selectedWorkModels.filter(m => m !== model));
    } else {
      setSelectedWorkModels([...selectedWorkModels, model]);
    }
  };

  const hasActiveFilters = 
    selectedCategories.length > 0 || 
    selectedTypes.length > 0 || 
    selectedWorkModels.length > 0 || 
    minSalary > 0;

  return (
    <aside 
      className="fade-in"
      style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        alignSelf: 'start',
        position: 'sticky',
        top: '90px',
        boxShadow: 'var(--shadow-sm)',
        transition: 'background-color var(--transition-speed), border-color var(--transition-speed)'
      }}
    >
      {/* Title & Clear Action */}
      <div className="flex items-center justify-between" style={{ paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
        <div className="flex items-center gap-2" style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>
          <Filter size={18} style={{ color: 'var(--primary-color)' }} />
          <span>Filters</span>
        </div>
        {hasActiveFilters && (
          <button 
            onClick={clearFilters}
            className="flex items-center gap-1"
            style={{ 
              fontSize: '0.75rem', 
              color: 'var(--primary-color)', 
              fontWeight: 600,
              cursor: 'pointer' 
            }}
          >
            <RotateCcw size={12} />
            <span>Reset All</span>
          </button>
        )}
      </div>

      {/* Categories Filter */}
      <div>
        <h4 style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
          Job Category
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {jobCategories.map((category) => (
            <label 
              key={category} 
              className="flex items-center gap-2" 
              style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', cursor: 'pointer', userSelect: 'none' }}
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() => toggleCategory(category)}
                style={{
                  width: '16px',
                  height: '16px',
                  accentColor: 'var(--primary-color)',
                  cursor: 'pointer'
                }}
              />
              <span>{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Work Model Filter */}
      <div>
        <h4 style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
          Work Model
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {workModels.map((model) => (
            <label 
              key={model} 
              className="flex items-center gap-2" 
              style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', cursor: 'pointer', userSelect: 'none' }}
            >
              <input
                type="checkbox"
                checked={selectedWorkModels.includes(model)}
                onChange={() => toggleWorkModel(model)}
                style={{
                  width: '16px',
                  height: '16px',
                  accentColor: 'var(--primary-color)',
                  cursor: 'pointer'
                }}
              />
              <span>{model}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Job Type Filter */}
      <div>
        <h4 style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
          Job Type
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {jobTypes.map((type) => (
            <label 
              key={type} 
              className="flex items-center gap-2" 
              style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', cursor: 'pointer', userSelect: 'none' }}
            >
              <input
                type="checkbox"
                checked={selectedTypes.includes(type)}
                onChange={() => toggleType(type)}
                style={{
                  width: '16px',
                  height: '16px',
                  accentColor: 'var(--primary-color)',
                  cursor: 'pointer'
                }}
              />
              <span>{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Minimum Salary Filter */}
      <div>
        <h4 style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
          Min Annual Salary (USD)
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <select
            value={minSalary}
            onChange={(e) => setMinSalary(Number(e.target.value))}
            className="form-input"
            style={{ fontSize: '0.85rem', padding: '0.5rem' }}
          >
            <option value="0">Any Salary</option>
            <option value="50000">$50,000 / year +</option>
            <option value="80000">$80,000 / year +</option>
            <option value="100000">$100,000 / year +</option>
            <option value="120000">$120,000 / year +</option>
            <option value="150000">$150,000 / year +</option>
          </select>
        </div>
      </div>

      {/* Note about GlobalCo Special Requirements */}
      <div 
        style={{ 
          marginTop: '1rem',
          padding: '0.75rem',
          borderRadius: 'var(--radius-sm)',
          backgroundColor: 'var(--bg-tertiary)',
          border: '1px solid var(--border-color)',
          fontSize: '0.75rem',
          color: 'var(--text-muted)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.4rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
          <ShieldCheck size={14} style={{ color: 'var(--primary-color)' }} />
          <span>Note on Shift Rotations</span>
        </div>
        <span>Select Onsite roles at Hyderabad to view positions with rotational shift schedules.</span>
      </div>
    </aside>
  );
}
