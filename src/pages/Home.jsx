import React from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS, CATEGORIES } from '../data/mockData';
import { Search, MapPin, ShieldCheck, BedDouble, Square, Car, Star, CheckCircle2, TrendingUp, Users, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="animate-fade-in" style={{ backgroundColor: 'var(--bg-soft-gray)', minHeight: '100vh' }}>
      
      {/* 🚀 HERO SEARCH SECTION - Point 14 */}
      <section style={{ backgroundColor: 'var(--deep-navy)', padding: '6rem 0', color: 'white', position: 'relative', overflow: 'hidden' }}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ color: 'white', fontSize: '3.5rem', marginBottom: '1.5rem', lineHeight: 1.1 }}>Find Your Trusted Home <br /> in Islampur region.</h1>
            <p style={{ fontSize: '1.2rem', opacity: 0.8, marginBottom: '3rem' }}>The only platform with 100% verified listings from local market experts.</p>
            
            <div className="glass" style={{ padding: '0.8rem', borderRadius: 'var(--radius-xl)', display: 'flex', gap: '0.5rem', backgroundColor: 'rgba(255,255,255,0.1)' }}>
              <select style={heroSelectStyle}>
                <option>Buy</option>
                <option>Rent</option>
                <option>Commercial</option>
              </select>
              <div style={{ flex: 1, backgroundColor: 'white', borderRadius: '12px', display: 'flex', alignItems: 'center', padding: '0 1.5rem' }}>
                <Search color="var(--text-muted)" size={20} />
                <input type="text" placeholder="Search by Project, Locality or Landmark..." style={{ border: 'none', outline: 'none', width: '100%', padding: '1rem', fontWeight: 600, fontSize: '1.1rem' }} />
              </div>
              <Link to="/listings">
                <button className="btn btn-primary" style={{ padding: '0 2.5rem', height: '100%', borderRadius: '12px', fontSize: '1.1rem' }}>Search</button>
              </Link>
            </div>
          </motion.div>
        </div>
        <div style={{ position: 'absolute', bottom: '-50%', left: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(37, 99, 235, 0.2) 0%, transparent 70%)', borderRadius: '50%' }}></div>
      </section>

      {/* 🏷️ QUICK FILTERS - Point 14 */}
      <section style={{ marginTop: '-40px', position: 'relative', zIndex: 2 }}>
        <div className="container">
          <div className="glass" style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
            <QuickFilterItem label="BUDGET" value="Up to ₹50L" />
            <div style={dividerStyle}></div>
            <QuickFilterItem label="PROPERTY TYPE" value="Apartments" />
            <div style={dividerStyle}></div>
            <QuickFilterItem label="BHK" value="2, 3 BHK" />
            <div style={dividerStyle}></div>
            <QuickFilterItem label="VERIFIED" value="Verified Only" />
          </div>
        </div>
      </section>

      {/* 🛡️ TRUST SECTION - Point 18 */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            <TrustCard 
              icon={<ShieldCheck size={32} color="var(--success-green)" />}
              title="Verified by Local Expert"
              desc="Every listing is physically verified by our local Islampur team."
            />
            <TrustCard 
              icon={<TrendingUp size={32} color="var(--primary-blue)" />}
              title="Real-time Availability"
              desc="See exact vacant flats and plots. No stale or fake information."
            />
            <TrustCard 
              icon={<Users size={32} color="var(--warn-coral)" />}
              title="Dealer Direct"
              desc="Connect directly with the trusted local dealer with zero brokerage."
            />
          </div>
        </div>
      </section>

      {/* 🏢 BROWSE BY CATEGORY - Point 14 */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <h2 style={{ marginBottom: '2rem' }}>Browse by Category</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            {CATEGORIES.map(cat => (
              <motion.div key={cat.id} whileHover={{ y: -5 }} style={{ backgroundColor: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', textAlign: 'center', cursor: 'pointer', border: '1px solid var(--border-light)' }}>
                <div style={{ backgroundColor: 'rgba(37,99,235,0.05)', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                  <Star color="var(--primary-blue)" />
                </div>
                <h4 style={{ marginBottom: '0.5rem' }}>{cat.name}</h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{cat.subTypes.length} Sub-types</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS - Point 14 */}
      <section style={{ padding: '4rem 0', backgroundColor: 'white' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
            <h2>New Launch & Featured Projects</h2>
            <Link to="/listings" style={{ fontWeight: 700, color: 'var(--primary-blue)', textDecoration: 'none' }}>View All Projects →</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '2rem' }}>
            {PROJECTS.map(p => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

// --- SUB-COMPONENTS ---

const ProjectCard = ({ project }) => (
  <motion.div whileHover={{ y: -5 }} style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-md)' }}>
    <div style={{ position: 'relative', height: '220px' }}>
      <img src={project.coverImage} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
      <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
        <span className="badge badge-verified glass" style={{ backgroundColor: 'white' }}>Verified ✅</span>
      </div>
    </div>
    <div style={{ padding: '1.5rem' }}>
      <p style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--success-green)', marginBottom: '0.5rem' }}>{project.priceRange}</p>
      <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{project.name}</h3>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>{project.location}</p>
      
      <div style={{ display: 'flex', gap: '1.5rem', padding: '1rem 0', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)', marginBottom: '1.5rem' }}>
        <div style={{ fontSize: '0.85rem', fontWeight: 600 }}><BedDouble size={16} /> Configuration: 2, 3 BHK</div>
      </div>
      <Link to={`/project/${project.id}`}><button className="btn btn-primary" style={{ width: '100%' }}>View Available Units ({project.remainingUnits} left)</button></Link>
    </div>
  </motion.div>
);

const QuickFilterItem = ({ label, value }) => (
  <div style={{ textAlign: 'center', cursor: 'pointer', padding: '0 2rem' }}>
    <p style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '0.25rem', letterSpacing: '0.05em' }}>{label}</p>
    <p style={{ fontWeight: 700, color: 'var(--deep-navy)', fontSize: '1rem' }}>{value} ▾</p>
  </div>
);

const TrustCard = ({ icon, title, desc }) => (
  <div style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', backgroundColor: 'white', border: '1px solid var(--border-light)', textAlign: 'center' }}>
    <div style={{ marginBottom: '1.25rem' }}>{icon}</div>
    <h3 style={{ marginBottom: '0.75rem', fontSize: '1.2rem' }}>{title}</h3>
    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{desc}</p>
  </div>
);

const dividerStyle = { width: '1px', height: '40px', backgroundColor: 'var(--border-light)' };
const heroSelectStyle = { backgroundColor: 'transparent', color: 'white', border: 'none', fontWeight: 700, padding: '0 1rem', fontSize: '1.1rem', cursor: 'pointer' };

export default Home;
