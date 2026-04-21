import React from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS, CATEGORIES } from '../data/mockData';
import { MapPin, ArrowRight, ShieldCheck, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="animate-fade-in" style={{ backgroundColor: 'var(--bg-soft-gray)', minHeight: '100vh' }}>
      {/* Refined Search Header */}
      <section style={{ backgroundColor: 'white', borderBottom: '1px solid var(--border-light)', padding: '2rem 0' }}>
        <div className="container">
          <h2 style={{ marginBottom: '1.5rem', fontSize: '1.8rem' }}>Properties in Sangli & Islampur</h2>
          <div className="search-box-container" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <div className="glass" style={{ flex: 1, display: 'flex', alignItems: 'center', padding: '0.75rem 1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--primary-blue)' }}>
              <Search size={22} color="var(--primary-blue)" style={{ marginRight: '1rem' }} />
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '2px' }}>Location</p>
                <input 
                  type="text" 
                  placeholder="Enter Locality (Vishrambag, Sangli, Islampur...)" 
                  style={{ width: '100%', border: 'none', outline: 'none', fontWeight: 600, fontSize: '1rem' }}
                />
              </div>
            </div>
            <div className="glass" style={{ width: '200px', display: 'flex', alignItems: 'center', padding: '0.75rem 1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)' }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '2px' }}>Budget</p>
                <select style={{ width: '100%', border: 'none', outline: 'none', fontWeight: 600, fontSize: '1rem', background: 'transparent' }}>
                  <option>Any Budget</option>
                  <option>₹20L - ₹40L</option>
                  <option>₹40L - ₹80L</option>
                  <option>₹80L+</option>
                </select>
              </div>
            </div>
            <button className="btn btn-primary" style={{ padding: '0 2.5rem', borderRadius: 'var(--radius-lg)' }}>
              Search
            </button>
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
            {['All Properties', 'New Launch', 'Ready to Move', 'Plots/Land', 'Commercial'].map((tab, i) => (
              <button key={i} style={{ 
                padding: '0.5rem 1.25rem', 
                borderRadius: '99px', 
                border: i === 0 ? 'none' : '1px solid var(--border-light)', 
                backgroundColor: i === 0 ? 'var(--primary-blue)' : 'transparent',
                color: i === 0 ? 'white' : 'var(--text-main)',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}>
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects with Enhanced Cards */}
      <section style={{ padding: '3rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '2rem' }}>
            {PROJECTS.map((project) => (
              <motion.div 
                key={project.id}
                whileHover={{ y: -5 }}
                className="project-card"
                style={{ backgroundColor: 'white', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column' }}
              >
                {/* 🖼️ IMAGE GALLERY section style */}
                <div style={{ position: 'relative', height: '220px' }}>
                  <img src={project.coverImage} alt={project.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', display: 'flex', gap: '0.5rem' }}>
                    {project.verified && <span className="badge badge-verified glass" style={{ backgroundColor: 'white' }}><ShieldCheck size={12} style={{ marginRight: '4px' }} /> Verified</span>}
                    {project.reraCertified && <span className="badge glass" style={{ backgroundColor: 'white', color: 'var(--primary-blue)' }}>🏷️ RERA</span>}
                  </div>
                  <button className="glass" style={{ position: 'absolute', bottom: '0.75rem', right: '0.75rem', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem', fontWeight: 600 }}>
                    View All Photos (20)
                  </button>
                </div>

                <div style={{ padding: '1.25rem' }}>
                  {/* 📍 PROPERTY TITLE + LOCATION */}
                  <div style={{ marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1.2rem', color: 'var(--deep-navy)', marginBottom: '0.25rem' }}>{project.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                      <MapPin size={14} />
                      <span>{project.location} • {project.distance}</span>
                    </div>
                  </div>

                  {/* 💰 PRICE (Big & Bold) */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.25rem' }}>
                    <div>
                      <p style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--success-green)' }}>
                        {project.priceRange} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>[Negotiable]</span>
                      </p>
                      <p style={{ fontSize: '0.85rem', color: 'var(--primary-blue)', fontWeight: 600 }}>
                        ₹{project.avgPriceSqFt}/sq.ft <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(Locality Avg: ₹{project.localityAvg})</span>
                      </p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--soft-teal)', backgroundColor: 'rgba(20, 184, 166, 0.1)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                        EMI: ₹38,500/mo
                      </span>
                    </div>
                  </div>

                  {/* 📊 KEY SPECS (Quick Icons Row) */}
                  <div style={{ display: 'flex', gap: '1.5rem', padding: '1rem 0', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 600 }}>
                      <BedDouble size={18} color="var(--text-muted)" /> {project.type === 'building' ? '3 BHK' : 'Plot'}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 600 }}>
                      <Square size={18} color="var(--text-muted)" /> {project.type === 'building' ? '1,250 sq.ft' : project.totalArea}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 600 }}>
                      <Car size={18} color="var(--text-muted)" /> 1 Parking
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <Link to={`/project/${project.id}`} style={{ flex: 1, textDecoration: 'none' }}>
                      <button className="btn btn-primary" style={{ width: '100%', fontSize: '0.9rem' }}>Contact Owner</button>
                    </Link>
                    <button className="btn btn-outline-blue" style={{ padding: '0.75rem' }}>
                      <Star size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>

  );
};

export default Home;
