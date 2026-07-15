import React from 'react';
import { Search, MapPin, ArrowUpDown } from 'lucide-react';

export default function SearchBar({
  searchQuery,
  setSearchQuery,
  locationQuery,
  setLocationQuery,
  sortBy,
  setSortBy
}) {
  return (
    <div 
      className="fade-in"
      style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-md)',
        padding: '1rem',
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '0.75rem',
        marginBottom: '2rem',
        transition: 'all var(--transition-speed)'
      }}
      className="search-bar-grid"
    >
      {/* Title / Keywords Search */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <Search 
          size={20} 
          style={{ 
            position: 'absolute', 
            left: '12px', 
            color: 'var(--text-muted)' 
          }} 
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search job titles, skills, or companies..."
          className="form-input"
          style={{ paddingLeft: '2.5rem' }}
        />
      </div>

      {/* Location Search */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <MapPin 
          size={20} 
          style={{ 
            position: 'absolute', 
            left: '12px', 
            color: 'var(--text-muted)' 
          }} 
        />
        <input
          type="text"
          value={locationQuery}
          onChange={(e) => setLocationQuery(e.target.value)}
          placeholder="Filter by city, region or Remote..."
          className="form-input"
          style={{ paddingLeft: '2.5rem' }}
        />
      </div>

      {/* Sort Select */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <ArrowUpDown 
          size={18} 
          style={{ 
            position: 'absolute', 
            left: '12px', 
            color: 'var(--text-muted)' 
          }} 
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="form-input"
          style={{ paddingLeft: '2.5rem', appearance: 'none', cursor: 'pointer' }}
        >
          <option value="relevant">Most Relevant</option>
          <option value="newest">Newest Posted</option>
          <option value="salary-high">Salary: High to Low</option>
          <option value="salary-low">Salary: Low to High</option>
        </select>
      </div>

      <style>{`
        .search-bar-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 1rem;
        }
        @media (max-width: 768px) {
          .search-bar-grid {
            grid-template-columns: 1fr;
            gap: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
}
