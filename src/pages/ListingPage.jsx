import React, { useState } from 'react';
import { PROJECTS } from '../data/mockData';
import { Filter, MapPin, ShieldCheck, BedDouble, Square, Car, Search, ArrowUpDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ListingPage = () => {
  const [activeFilters, setActiveFilters] = useState({
    budget: 'Any',
    type: 'Any',
    bhk: 'Any'
  });

  return (
    <div className="animate-fade-in" style={{ backgroundColor: 'var(--bg-soft-gray)', minHeight: '100vh' }}>
      <div className="container" style={{ padding: '2rem 0' }}>
        
        {/* Filter Breadcrumb / Summary */}
        <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem' }}>Properties in Sangli District</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Showing {PROJECTS.length} results based on your search</p>
          </div>
          <button className="btn glass" style={{ backgroundColor: 'white', border: '1px solid var(--border-light)' }}>
            <ArrowUpDown size={16} /> Sort: Relevance
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '2rem' }}>
          
          {/* Sidebar Filters - Point 15 */}
          <aside>
            <div className="glass" style={{ backgroundColor: 'white', borderRadius: 'var(--radius-lg)', padding: '1.5rem', position: 'sticky', top: '100px', border: '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem' }}>
                <Filter size={20} color="var(--primary-blue)" />
                <h3 style={{ fontSize: '1.1rem' }}>Filters</h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <p style={{ fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.75rem' }}>BUDGET</p>
                  <select style={filterSelectStyle}>
                    <option>Any Budget</option>
                    <option>Under ₹20 Lakhs</option>
                    <option>₹20L - ₹40L</option>
                    <option>₹40L - ₹80L</option>
                    <option>₹80L+</option>
                  </select>
                </div>

                <div>
                  <p style={{ fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.75rem' }}>PROPERTY TYPE</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {['Apartments', 'Independent House', 'Plots/Land', 'Commercial'].map(t => (
                      <label key={t} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', cursor: 'pointer' }}>
                        <input type="checkbox" style={{ accentColor: 'var(--primary-blue)' }} /> {t}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <p style={{ fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.75rem' }}>BHK TYPE</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    {['1 BHK', '2 BHK', '3 BHK', '4+ BHK'].map(b => (
                      <button key={b} style={filterBadgeStyle}>{b}</button>
                    ))}
                  </div>
                </div>

                <div>
                  <p style={{ fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.75rem' }}>TRUST SIGNALS</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', cursor: 'pointer' }}>
                      <input type="checkbox" /> Verified Listings
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', cursor: 'pointer' }}>
                      <input type="checkbox" /> RERA Certified
                    </label>
                  </div>
                </div>

                <button className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Apply Filters</button>
              </div>
            </div>
          </aside>

          {/* Results Grid */}
          <main>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {PROJECTS.map(project => (
                <motion.div 
                  key={project.id}
                  whileHover={{ shadow: 'var(--shadow-lg)' }}
                  style={{ backgroundColor: 'white', borderRadius: 'var(--radius-lg)', overflow: 'hidden', display: 'flex', border: '1px solid var(--border-light)', height: '280px' }}
                >
                  <div style={{ width: '320px', position: 'relative' }}>
                    <img src={project.coverImage} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
                      {project.reraCertified && <span className="badge badge-verified glass">RERA</span>}
                    </div>
                  </div>
                  
                  <div style={{ flex: 1, padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <h3 style={{ fontSize: '1.4rem', color: 'var(--deep-navy)' }}>{project.name}</h3>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <MapPin size={14} /> {project.location}
                        </p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--success-green)' }}>{project.priceRange}</p>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Avg. ₹{project.avgPriceSqFt}/sq.ft</p>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '2rem', margin: '1.5rem 0', padding: '1rem 0', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 600 }}>
                        <BedDouble size={18} color="var(--primary-blue)" /> {project.type === 'building' ? '2, 3 BHK' : 'Res. Plots'}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 600 }}>
                        <Square size={18} color="var(--primary-blue)" /> {project.type === 'building' ? '1,150 - 1,850 sq.ft' : project.totalArea}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--success-green)' }}></div>
                        <span style={{ fontWeight: 600 }}>{project.remainingUnits} units left</span>
                      </div>
                    </div>

                    <div style={{ marginTop: 'auto', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <Link to={`/project/${project.id}`} style={{ flex: 1, textDecoration: 'none' }}>
                        <button className="btn btn-primary" style={{ width: '100%' }}>View Details</button>
                      </Link>
                      <button className="btn btn-outline-blue" style={{ flex: 1 }}>Contact Dealer</button>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                        <ShieldCheck size={16} color="var(--success-green)" />
                        Verified Listings
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </main>

        </div>
      </div>
    </div>
  );
};

const filterSelectStyle = {
  width: '100%',
  padding: '0.6rem',
  borderRadius: 'var(--radius-md)',
  border: '1px solid var(--border-light)',
  outline: 'none',
  fontWeight: 600,
  fontSize: '0.9rem'
};

const filterBadgeStyle = {
  padding: '0.4rem',
  borderRadius: '4px',
  border: '1px solid var(--border-light)',
  backgroundColor: 'transparent',
  fontSize: '0.8rem',
  fontWeight: 600,
  cursor: 'pointer'
};

export default ListingPage;
