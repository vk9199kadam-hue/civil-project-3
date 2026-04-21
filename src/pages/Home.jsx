import React from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS, CATEGORIES } from '../data/mockData';
import { MapPin, ArrowRight, ShieldCheck, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section style={{ backgroundColor: 'var(--deep-navy)', color: 'white', padding: '6rem 0', position: 'relative', overflow: 'hidden' }}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span style={{ color: 'var(--soft-teal)', fontWeight: 700, fontSize: '0.9rem', letterSpacing: '0.2em' }}>PREMIUM PROPERTIES</span>
            <h1 style={{ color: 'white', fontSize: '3.5rem', marginTop: '1rem', lineHeight: 1.1 }}>Find Your Dream Home <br /> In Islampur</h1>
            <p style={{ fontSize: '1.2rem', opacity: 0.8, marginTop: '1.5rem', maxWidth: '600px' }}>
              The most trusted platform for residential, commercial and land projects in Sangli & Islampur region.
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem' }}>
              <button className="btn btn-primary" style={{ padding: '1rem 2rem' }}>Explore Projects</button>
              <button className="btn btn-outline-blue" style={{ color: 'white', border: '1px solid rgba(255,255,255,0.3)', padding: '1rem 2rem' }}>Contact Us</button>
            </div>
          </motion.div>
        </div>
        {/* Abstract design elements */}
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(37, 99, 235, 0.2) 0%, transparent 70%)', borderRadius: '50%' }}></div>
      </section>

      {/* Categories */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem' }}>
            {CATEGORIES.map((cat, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.05 }}
                style={{ backgroundColor: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', textAlign: 'center', cursor: 'pointer', boxShadow: 'var(--shadow-sm)' }}
              >
                <div style={{ color: 'var(--primary-blue)', marginBottom: '1rem' }}>
                  {/* Icon mapping would go here, using a placeholder for now */}
                  <div style={{ width: '40px', height: '40px', backgroundColor: 'rgba(37, 99, 235, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                    <Star size={20} />
                  </div>
                </div>
                <h3 style={{ fontSize: '1rem' }}>{cat.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section style={{ padding: '4rem 0', backgroundColor: 'var(--bg-soft-gray)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
            <div>
              <h2 style={{ fontSize: '2.25rem' }}>Featured Projects</h2>
              <p style={{ color: 'var(--text-muted)' }}>Handpicked properties for you in Sangli District</p>
            </div>
            <Link to="/" style={{ color: 'var(--primary-blue)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
              View All <ArrowRight size={18} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2.5rem' }}>
            {PROJECTS.map((project) => (
              <motion.div 
                key={project.id}
                whileHover={{ y: -10 }}
                className="project-card"
                style={{ backgroundColor: 'white', borderRadius: 'var(--radius-xl)', overflow: 'hidden', boxShadow: 'var(--shadow-md)', transition: 'box-shadow 0.3s ease' }}
              >
                <div style={{ position: 'relative', height: '240px' }}>
                  <img src={project.coverImage} alt={project.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: '1rem', left: '1rem', display: 'flex', gap: '0.5rem' }}>
                    {project.verified && <span className="badge badge-verified glass" style={{ color: 'var(--success-green)' }}><ShieldCheck size={12} style={{ marginRight: '4px' }} /> Verified</span>}
                    {project.reraCertified && <span className="badge glass" style={{ color: 'var(--primary-blue)', background: 'rgba(37, 99, 235, 0.1)' }}>RERA</span>}
                  </div>
                  <div style={{ position: 'absolute', bottom: '1rem', right: '1rem' }}>
                    <span style={{ backgroundColor: 'var(--primary-blue)', color: 'white', padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', fontWeight: 700, fontSize: '1.2rem' }}>
                      {project.priceRange}
                    </span>
                  </div>
                </div>

                <div style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                    <MapPin size={14} />
                    <span>{project.location}</span>
                  </div>
                  <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>{project.name}</h3>
                  
                  <div style={{ display: 'flex', borderTop: '1px solid var(--border-light)', paddingTop: '1.25rem', justifyContent: 'space-between' }}>
                    <div style={{ textAlign: 'center' }}>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>TOTAL UNITS</p>
                      <p style={{ fontWeight: 700, fontSize: '1.1rem' }}>{project.totalUnits}</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>AVAILABLE</p>
                      <p style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--success-green)' }}>{project.remainingUnits}</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>TYPE</p>
                      <p style={{ fontWeight: 700, fontSize: '1.1rem', textTransform: 'capitalize' }}>{project.type}</p>
                    </div>
                  </div>

                  <Link to={`/project/${project.id}`} style={{ textDecoration: 'none' }}>
                    <button className="btn btn-primary" style={{ width: '100%', marginTop: '1.5rem' }}>
                      View Inventory Grid
                    </button>
                  </Link>
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
