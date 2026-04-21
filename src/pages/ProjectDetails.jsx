import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PROJECTS } from '../data/mockData';
import { 
  MapPin, ShieldCheck, BedDouble, Bath, Square, Car, 
  ArrowLeft, Info, ImageIcon, PlayCircle, Download, CheckCircle2 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectDetails = () => {
  const { id } = useParams();
  const project = PROJECTS.find(p => p.id === id);
  const [selectedUnit, setSelectedUnit] = useState(null);

  if (!project) return <div className="container" style={{ padding: '4rem' }}>Project not found</div>;

  return (
    <div className="animate-fade-in">
      {/* breadcrumbs */}
      <div className="container" style={{ padding: '1rem 0' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>
          <ArrowLeft size={16} /> Back to Projects
        </Link>
      </div>

      {/* Hero Section */}
      <section className="container">
        <div style={{ position: 'relative', borderRadius: 'var(--radius-xl)', overflow: 'hidden', height: '500px' }}>
          <img src={project.coverImage} alt={project.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)' }}></div>
          
          <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', right: '2rem', color: 'white' }}>
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
              {project.verified && <span className="badge badge-verified glass">Verified</span>}
              {project.reraCertified && <span className="badge glass" style={{ border: '1px solid rgba(255,255,255,0.3)', color: 'white' }}>RERA Certified</span>}
            </div>
            <h1 style={{ color: 'white', fontSize: '2.5rem', marginBottom: '0.5rem' }}>{project.name}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', opacity: 0.9 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <MapPin size={18} />
                <span>{project.location}</span>
              </div>
              <div style={{ width: '1px', height: '15px', backgroundColor: 'rgba(255,255,255,0.3)' }}></div>
              <span>{project.distance}</span>
            </div>
          </div>

          <div style={{ position: 'absolute', bottom: '2rem', right: '2rem' }}>
            <button className="btn glass" style={{ color: 'white' }}>
              <ImageIcon size={18} /> View All Photos (20)
            </button>
          </div>
        </div>
      </section>

      {/* Main Info Row */}
      <section className="container" style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2.5rem' }}>
        <div>
          <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>STARTING FROM</p>
                <h2 style={{ fontSize: '2.25rem', color: 'var(--success-green)' }}>{project.priceRange}</h2>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ color: 'var(--primary-blue)', fontWeight: 700, fontSize: '1.1rem' }}>₹{project.avgPriceSqFt}/sq.ft</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Locality Avg: ₹{project.localityAvg}</p>
              </div>
            </div>

            {/* Quick Specs Icons */}
            <div style={{ display: 'flex', gap: '2rem', padding: '1.5rem 0', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ color: 'var(--primary-blue)' }}><BedDouble size={20} /></div>
                <div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Configurations</p>
                  <p style={{ fontWeight: 700 }}>2, 3, 4 BHK</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ color: 'var(--primary-blue)' }}><Square size={20} /></div>
                <div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Project Size</p>
                  <p style={{ fontWeight: 700 }}>{project.type === 'land' ? project.totalArea : '3.5 Acres'}</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ color: 'var(--primary-blue)' }}><Car size={20} /></div>
                <div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Parking</p>
                  <p style={{ fontWeight: 700 }}>Available</p>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '2rem' }}>
              <h3>Project Overview</h3>
              <p style={{ color: 'var(--text-muted)', marginTop: '0.75rem' }}>
                Developed with a vision of luxury and community, this project offers a perfect blend of modern architecture and natural surroundings. 
                Located in the heart of the Islampur-Sangli corridor, it provides unmatched connectivity to key landmarks while maintaining a serene environment.
              </p>
            </div>
          </div>

          {/* DYNAMIC INVENTORY GRID (THE REMAINING UNITS) */}
          <div id="remaining-units" style={{ marginTop: '4rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <div>
                <h2 style={{ fontSize: '1.75rem' }}>Remaining Available Units</h2>
                <p style={{ color: 'var(--text-muted)' }}>Click on a unit block to view detailed information & images</p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', fontWeight: 600 }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '2px', backgroundColor: 'var(--success-green)' }}></div> Available
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', fontWeight: 600 }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '2px', backgroundColor: '#e2e8f0' }}></div> Sold
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '1rem' }}>
              {project.inventory.map((unit) => (
                <motion.div
                  key={unit.id}
                  whileHover={{ scale: 1.05, shadow: 'var(--shadow-md)' }}
                  onClick={() => setSelectedUnit(unit)}
                  style={{ 
                    backgroundColor: 'white', 
                    border: '2px solid var(--success-green)', 
                    borderRadius: 'var(--radius-md)', 
                    padding: '1.25rem', 
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                    {project.type === 'building' ? `FLOOR ${unit.floor}` : 'PLOT'}
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--deep-navy)' }}>
                    {project.type === 'building' ? unit.number : `#${unit.number}`}
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary-blue)', marginTop: '0.5rem' }}>
                    {unit.type || unit.size}
                  </div>
                  <div style={{ position: 'absolute', bottom: '0', right: '0', width: '20px', height: '20px', backgroundColor: 'var(--success-green)', clipPath: 'polygon(100% 0, 0% 100%, 100% 100%)' }}></div>
                </motion.div>
              ))}

              {/* Placeholder Sold Units for visual effect */}
              {[...Array(6)].map((_, i) => (
                <div key={i} style={{ backgroundColor: '#f1f5f9', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', padding: '1.25rem', opacity: 0.5, cursor: 'not-allowed' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#94a3b8' }}>SOLD</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar / CTA */}
        <div>
          <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', position: 'sticky', top: '100px', border: '1px solid var(--primary-blue)' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Interested in this project?</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ backgroundColor: 'var(--bg-soft-gray)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Availability Score</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
                  <div style={{ flex: 1, height: '8px', backgroundColor: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${(project.remainingUnits / project.totalUnits) * 100}%`, height: '100%', backgroundColor: 'var(--warm-coral)' }}></div>
                  </div>
                  <span style={{ fontWeight: 700, color: 'var(--warm-coral)' }}>{project.remainingUnits} Left</span>
                </div>
              </div>
              
              <button className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>Book Direct Call</button>
              <button className="btn btn-outline-blue" style={{ width: '100%', padding: '1rem' }}>Request Brochure</button>
              
              <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border-light)', paddingTop: '1.5rem' }}>
                <p style={{ fontSize: '0.9rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <ShieldCheck size={18} color="var(--success-green)" /> Government Approved
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* UNIT DETAILS MODAL */}
      <AnimatePresence>
        {selectedUnit && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedUnit(null)}
            style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              style={{ backgroundColor: 'white', maxWidth: '900px', width: '100%', borderRadius: 'var(--radius-xl)', overflow: 'hidden', display: 'grid', gridTemplateColumns: '1fr 1fr' }}
            >
              <div style={{ height: '100%', minHeight: '500px' }}>
                <img src={selectedUnit.image} alt={selectedUnit.number} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span className="badge badge-verified">Available for {project.type === 'building' ? 'Move-in' : 'Possession'}</span>
                    <h2 style={{ fontSize: '2rem', marginTop: '0.5rem' }}>
                      {project.type === 'building' ? `Unit ${selectedUnit.number}` : `Plot ${selectedUnit.number}`}
                    </h2>
                    <p style={{ color: 'var(--primary-blue)', fontWeight: 700, fontSize: '1.25rem' }}>₹{(selectedUnit.price / 100000).toFixed(1)} Lakhs</p>
                  </div>
                  <button onClick={() => setSelectedUnit(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.5rem' }}>×</button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '2rem' }}>
                  <div style={{ border: '1px solid var(--border-light)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{project.type === 'building' ? 'BHK TYPE' : 'PLOT SIZE'}</p>
                    <p style={{ fontWeight: 700 }}>{selectedUnit.type || selectedUnit.size}</p>
                  </div>
                  <div style={{ border: '1px solid var(--border-light)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{project.type === 'building' ? 'FLOOR NO' : 'FACING'}</p>
                    <p style={{ fontWeight: 700 }}>{selectedUnit.floor || selectedUnit.facing}</p>
                  </div>
                  <div style={{ border: '1px solid var(--border-light)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{project.type === 'building' ? 'CARPET AREA' : 'ROAD WIDTH'}</p>
                    <p style={{ fontWeight: 700 }}>{selectedUnit.area ? `${selectedUnit.area} sq.ft` : selectedUnit.roadWidth}</p>
                  </div>
                  <div style={{ border: '1px solid var(--border-light)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>EST. EMI</p>
                    <p style={{ fontWeight: 700, color: 'var(--soft-teal)' }}>₹{Math.round(selectedUnit.price * 0.007).toLocaleString()}/mo</p>
                  </div>
                </div>

                <div style={{ marginTop: '2rem' }}>
                  <h4>Description</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.5rem' }}>{selectedUnit.description}</p>
                </div>

                <div style={{ marginTop: 'auto', display: 'flex', gap: '1rem' }}>
                  <button className="btn btn-primary" style={{ flex: 2 }}>
                    <CheckCircle2 size={18} /> Confirm Interest
                  </button>
                  <button className="btn btn-outline-blue" style={{ flex: 1 }}>
                    <PlayCircle size={18} /> Virtual Tour
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectDetails;
