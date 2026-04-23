import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PROJECTS } from '../data/mockData';
import { 
  MapPin, ShieldCheck, BedDouble, Bath, Square, Car, 
  ArrowLeft, Info, ImageIcon, PlayCircle, Download, CheckCircle2,
  Clock, Share2, Calculator, Calendar, Phone, MessageCircle,
  LayoutGrid, ChevronRight, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [showVisitForm, setShowVisitForm] = useState(false);

  React.useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        let found = null;
        
        if (res.ok && data.length > 0) {
           found = data.find(p => p.id === id);
        }
        
        // VIRTUAL FALLBACK: If not in DB, look in Mock Data
        if (!found) {
          found = PROJECTS.find(p => p.id === id);
        }
        
        setProject(found || null);
      } catch (err) {
        console.error('Failed to fetch project details, checking mock data', err);
        const found = PROJECTS.find(p => p.id === id);
        setProject(found || null);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) return <div className="container" style={{ padding: '4rem', textAlign: 'center' }}><h3>Loading Live Project Data...</h3></div>;
  if (!project) return <div className="container" style={{ padding: '4rem', textAlign: 'center' }}><h3>Project not found in Live Database.</h3></div>;

  return (
    <div className="animate-fade-in" style={{ backgroundColor: 'var(--bg-soft-gray)', minHeight: '100vh' }}>
      
      {/* 🖼️ HERO GALLERY */}
      <section style={{ backgroundColor: 'white', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container" style={{ padding: '2rem 0' }}>
          <div className="grid-2col" style={{ height: '450px' }}>
            <div style={{ position: 'relative', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
              <img src={project.coverImage} alt={project.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', top: '1rem', left: '1rem', display: 'flex', gap: '0.5rem' }}>
                <span className="badge badge-verified glass" style={{ backgroundColor: 'white' }}>Verified Property</span>
                <span className="badge glass" style={{ backgroundColor: 'white', color: 'var(--primary-blue)' }}>{project.reraId || 'P53100012345'}</span>
              </div>
            </div>
            <div className="mobile-stack" style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: '1rem' }}>
              <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                <img src="/images/interior.png" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
              </div>
              <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', position: 'relative' }}>
                <img src="/images/interior.png" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.6)' }} alt="" />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700 }}>
                  <ImageIcon size={24} style={{ marginRight: '0.5rem' }} /> +12 Photos
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HEADER INFO */}
      <section style={{ backgroundColor: 'white', padding: '2rem 0', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container">
          <div className="mobile-stack" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                <h1 style={{ fontSize: '2.5rem' }}>{project.name}</h1>
              </div>
              <p style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem' }}>
                <MapPin size={20} /> {project.location} {project.landmark ? `• ${project.landmark}` : ''}
              </p>
            </div>
            <div style={{ textAlign: 'left' }}>
              <p style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--success-green)' }}>{project.priceRange || 'Contact Details'}</p>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                <button className="btn glass" style={{ padding: '0.4rem 1rem' }}><Share2 size={16} /> Share</button>
                <button className="btn btn-primary" onClick={() => setShowVisitForm(true)}><Calendar size={16} /> Book Site Visit</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 📦 INVENTORY DASHBOARD - "The Structure Way" */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>View Available Inventory</h2>
            <p style={{ color: 'var(--text-muted)' }}>Click on any {project.type === 'building' ? 'flat' : 'plot'} to see its actual details and photos.</p>
          </div>

          <div className="glass" style={{ backgroundColor: 'white', padding: '2.5rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-lg)' }}>
            <div className="mobile-stack" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '1.5rem', gap: '1rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', gap: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '16px', height: '16px', backgroundColor: 'var(--success-green)', borderRadius: '3px' }}></div>
                  <span style={{ fontWeight: 600 }}>Available ({project.remainingUnits})</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '16px', height: '16px', backgroundColor: 'var(--warm-coral)', borderRadius: '3px' }}></div>
                  <span style={{ fontWeight: 600 }}>Sold Out ({project.soldUnits})</span>
                </div>
              </div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--primary-blue)' }}>
                Total {project.type === 'building' ? 'Floors' : 'Area'}: {project.type === 'building' ? 'G+4' : project.totalArea}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '1.25rem' }}>
              {/* Using inventory from mockData if available, otherwise generating placeholder structure */}
              {(project.inventory || []).map((unit) => (
                <UnitBlock 
                  key={unit.id} 
                  unit={unit} 
                  onSelect={() => setSelectedUnit(unit)} 
                />
              ))}
              {/* Fill remaining with sold blocks for visual density */}
              {[...Array(Math.max(0, 10))].map((_, i) => (
                <div key={`sold-${i}`} style={{ padding: '1.5rem', borderRadius: '12px', border: '1px solid #fee2e2', backgroundColor: '#fef2f2', textAlign: 'center', opacity: 0.6 }}>
                  <p style={{ fontSize: '0.7rem', fontWeight: 800, color: '#ef4444' }}>SOLD</p>
                  <p style={{ fontWeight: 800, fontSize: '1.2rem', color: '#991b1b' }}>X</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* UNIT DETAIL MODAL */}
      <AnimatePresence>
        {selectedUnit && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="glass" style={{ backgroundColor: 'white', width: '100%', maxWidth: '900px', display: 'grid', gridTemplateColumns: '1.2fr 1fr', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
              
              <div style={{ backgroundColor: '#000', position: 'relative' }}>
                <img src={selectedUnit.image || project.coverImage} style={{ width: '100%', height: '100%', objectFit: 'contain' }} alt="" />
                <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', right: '1rem', display: 'flex', gap: '0.5rem' }}>
                   <div style={{ padding: '0.5rem', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '4px' }}><ImageIcon size={20} color="white" /></div>
                </div>
              </div>

              <div style={{ padding: '3rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                  <div>
                    <h2 style={{ fontSize: '1.8rem' }}>{selectedUnit.name}</h2>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{selectedUnit.type} • {selectedUnit.floor ? `Floor ${selectedUnit.floor}` : project.name}</p>
                  </div>
                  <button onClick={() => setSelectedUnit(null)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}><X size={28} /></button>
                </div>

                <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                   <div style={{ padding: '1rem', backgroundColor: 'var(--bg-soft-gray)', borderRadius: '8px' }}>
                     <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>PRICE</p>
                     <p style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--success-green)' }}>₹{(selectedUnit.price / 100000).toFixed(1)} Lakhs</p>
                   </div>
                   <div style={{ padding: '1rem', backgroundColor: 'var(--bg-soft-gray)', borderRadius: '8px' }}>
                     <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>TOTAL AREA</p>
                     <p style={{ fontSize: '1.4rem', fontWeight: 800 }}>{selectedUnit.area} sq.ft</p>
                   </div>
                </div>

                <div style={{ flex: 1 }}>
                   <h4 style={{ marginBottom: '0.75rem' }}>Inside Details</h4>
                   <p style={{ fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: 1.6 }}>
                     {selectedUnit.description || "This unit offers premium finishing, excellent ventilation, and prime positioning within the project layout. Verified and ready for immediate booking."}
                   </p>
                   <ul style={{ marginTop: '1rem', listStyle: 'none', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                      <li style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle2 size={14} color="var(--success-green)" /> {selectedUnit.facing || 'East'} Facing</li>
                      <li style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle2 size={14} color="var(--success-green)" /> Balcony Access</li>
                      <li style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle2 size={14} color="var(--success-green)" /> Covered Parking</li>
                   </ul>
                </div>

                <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                  <button className="btn btn-primary" style={{ flex: 1, padding: '1rem' }} onClick={async () => {
                    const leadData = {
                      name: 'Anonymous (Contact Click)',
                      phone: 'Clicked Contact',
                      message: `Inquiry for Unit ${selectedUnit.number} in ${project.name}`,
                      propertyName: project.name,
                      propertyId: project.id,
                      unitRef: selectedUnit.number
                    };
                    await fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(leadData) });
                    alert('Dealer contact requested! They will be notified.');
                  }}><Phone size={18} /> Contact Dealer</button>
                  
                  <button className="btn btn-success" style={{ flex: 1, padding: '1rem' }} onClick={async () => {
                    const leadData = {
                      name: 'Anonymous (WhatsApp Click)',
                      phone: 'Clicked WhatsApp',
                      message: `WhatsApp Inquiry for Unit ${selectedUnit.number} in ${project.name}`,
                      propertyName: project.name,
                      propertyId: project.id,
                      unitRef: selectedUnit.number
                    };
                    await fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(leadData) });
                    window.open(`https://wa.me/919970349818?text=I am interested in Unit ${selectedUnit.number} at ${project.name}`, '_blank');
                  }}><MessageCircle size={18} /> WhatsApp</button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* VISIT FORM MODAL */}
      <AnimatePresence>
        {showVisitForm && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="glass" style={{ backgroundColor: 'white', width: '100%', maxWidth: '450px', padding: '2.5rem', borderRadius: 'var(--radius-xl)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h3>Schedule Site Visit</h3>
                <button onClick={() => setShowVisitForm(false)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}><X size={24} /></button>
              </div>
              <form onSubmit={async (e) => {
                e.preventDefault();
                const fd = new FormData(e.target);
                const leadData = {
                  name: fd.get('name'),
                  phone: fd.get('phone'),
                  message: `Schedule Visit for ${fd.get('date')}`,
                  propertyName: project.name,
                  propertyId: project.id
                };
                try {
                  const res = await fetch('/api/leads', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(leadData)
                  });
                  if (res.ok) {
                    alert('Visit Request Sent Successfully!');
                    setShowVisitForm(false);
                  }
                } catch (err) {
                  alert('Error sending request.');
                }
              }} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <input name="name" type="text" placeholder="Full Name" style={inputStyle} required />
                <input name="phone" type="tel" placeholder="Phone Number" style={inputStyle} required />
                <input name="date" type="date" style={inputStyle} required />
                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem', marginTop: '1rem' }}>Request Visit</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const UnitBlock = ({ unit, onSelect }) => (
  <motion.div 
    whileHover={{ y: -5, shadow: 'var(--shadow-md)' }}
    onClick={onSelect}
    style={{ 
      padding: '1.5rem', 
      borderRadius: '12px', 
      border: '2px solid var(--success-green)', 
      backgroundColor: 'rgba(16, 185, 129, 0.05)',
      textAlign: 'center', 
      cursor: 'pointer',
      transition: 'all 0.2s'
    }}
  >
    <p style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)' }}>{unit.floor ? `FLR ${unit.floor}` : 'PLOT'}</p>
    <p style={{ fontWeight: 800, fontSize: '1.3rem', margin: '0.25rem 0' }}>{unit.number}</p>
    <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginTop: '0.5rem' }}>
       <span style={{ fontSize: '0.6rem', fontWeight: 700, padding: '2px 4px', backgroundColor: 'var(--primary-blue)', color: 'white', borderRadius: '3px' }}>{unit.type || 'VIEW'}</span>
    </div>
  </motion.div>
);

const inputStyle = { width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-light)', outline: 'none' };

export default ProjectDetails;

