import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PROJECTS } from '../data/mockData';
import { 
  MapPin, ShieldCheck, BedDouble, Bath, Square, Car, 
  ArrowLeft, Info, ImageIcon, PlayCircle, Download, CheckCircle2,
  Clock, Share2, Calculator, Calendar, Phone, MessageCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectDetails = () => {
  const { id } = useParams();
  const project = PROJECTS.find(p => p.id === id);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [showVisitForm, setShowVisitForm] = useState(false);

  if (!project) return <div className="container" style={{ padding: '4rem' }}>Project not found</div>;

  return (
    <div className="animate-fade-in" style={{ backgroundColor: 'var(--bg-soft-gray)', minHeight: '100vh' }}>
      
      {/* 🖼️ IMAGE GALLERY (Main Photo + Slider feel) - Point 16 */}
      <section style={{ backgroundColor: 'white', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container" style={{ padding: '2rem 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem', height: '450px' }}>
            <div style={{ position: 'relative', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
              <img src={project.coverImage} alt={project.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', top: '1rem', left: '1rem', display: 'flex', gap: '0.5rem' }}>
                <span className="badge badge-verified glass" style={{ backgroundColor: 'white' }}>Verified Property</span>
                <span className="badge glass" style={{ backgroundColor: 'white', color: 'var(--primary-blue)' }}>{project.reraId}</span>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: '1rem' }}>
              <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                <img src="/images/interior.png" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
              </div>
              <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', position: 'relative' }}>
                <img src="/images/interior.png" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.6)' }} alt="" />
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700 }}>
                  <ImageIcon size={24} style={{ marginRight: '0.5rem' }} /> +18 Photos
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Header Info - Point 16 */}
      <section style={{ backgroundColor: 'white', padding: '2rem 0', borderBottom: '1px solid var(--border-light)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                <h1 style={{ fontSize: '2.2rem' }}>{project.name}</h1>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--success-green)', backgroundColor: 'rgba(16, 185, 129, 0.1)', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>
                  ACTIVE PROJECT
                </span>
              </div>
              <p style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={18} /> {project.location} • {project.landmark}
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--success-green)' }}>{project.priceRange}</p>
              <p style={{ fontWeight: 600, color: 'var(--primary-blue)' }}>₹{project.avgPriceSqFt}/sq.ft <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>Locality Avg: ₹{project.localityAvg}</span></p>
              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                <button className="btn glass" style={{ padding: '0.4rem 0.8rem' }}><Share2 size={16} /> Share</button>
                <button className="btn glass" style={{ padding: '0.4rem 0.8rem' }}><Download size={16} /> Brochure</button>
              </div>
            </div>
          </div>

          {/* Quick Specs Icons - Point 16 */}
          <div style={{ display: 'flex', gap: '3rem', marginTop: '2.5rem', padding: '1.5rem', backgroundColor: 'var(--bg-soft-gray)', borderRadius: 'var(--radius-lg)' }}>
            <SpecIcon icon={<BedDouble />} label="Configurations" value="2, 3, 4 BHK" />
            <SpecIcon icon={<Clock />} label="Possession" value={project.possessionDate} />
            <SpecIcon icon={<Square />} label="Status" value="Under Construction" />
            <SpecIcon icon={<ShieldCheck />} label="RERA Status" value="Approved" />
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="container" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2.5rem', padding: '3rem 0' }}>
        
        <div>
          {/* Overview & Amenities */}
          <div className="glass" style={{ backgroundColor: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)', marginBottom: '2.5rem' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Project Overview</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
              Experience the pinnacle of luxury living at {project.name}. Located in the prestigious {project.location} area, this project is designed for families value privacy, community, and quality. With world-class amenities and RERA-approved transparency, it stands as the most trusted development in the Krishna River basin region.
            </p>
            
            <h4 style={{ margin: '2rem 0 1.25rem' }}>Project Amenities</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
              {project.amenities.map(a => (
                <div key={a} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 600 }}>
                  <CheckCircle2 size={16} color="var(--success-green)" /> {a}
                </div>
              ))}
            </div>
          </div>

          {/* 📅 REMAINING INVENTORY SECTION - Point 17 */}
          <div id="inventory-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.6rem' }}>Available Flats for Sale</h3>
                <p style={{ color: 'var(--text-muted)' }}>Choose from {project.remainingUnits} verified units</p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {['All', '2 BHK', '3 BHK', '4 BHK'].map(t => (
                  <button key={t} style={{ padding: '0.4rem 1rem', borderRadius: '6px', border: '1px solid var(--border-light)', backgroundColor: t === 'All' ? 'var(--primary-blue)' : 'white', color: t === 'All' ? 'white' : 'var(--text-main)', fontWeight: 600, fontSize: '0.85rem' }}>{t}</button>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              {project.inventory.map(unit => (
                <motion.div 
                  key={unit.id}
                  whileHover={{ y: -5 }}
                  onClick={() => setSelectedUnit(unit)}
                  style={{ backgroundColor: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--success-green)', padding: '1.25rem', cursor: 'pointer', display: 'flex', gap: '1.25rem' }}
                >
                  <div style={{ width: '100px', height: '100px', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                    <img src={unit.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <p style={{ fontWeight: 800, fontSize: '1.1rem' }}>Flat {unit.number}</p>
                      <span className="badge badge-verified" style={{ fontSize: '0.65rem' }}>AVAILABLE</span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{unit.floor}th Floor • {unit.type}</p>
                    <p style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary-blue)', marginTop: '0.5rem' }}>₹{(unit.price / 100000).toFixed(1)} Lakhs</p>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                      <span>{unit.area} sq.ft</span>
                      <span>{unit.facing} Facing</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Sticky Actions - Point 16 */}
        <div>
          <div className="glass" style={{ position: 'sticky', top: '100px', backgroundColor: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--primary-blue)', padding: '2rem', overflow: 'hidden' }}>
            <h3 style={{ marginBottom: '1.5rem' }}>Express Interest</h3>
            
            <div style={{ backgroundColor: 'var(--bg-soft-gray)', padding: '1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--primary-blue)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <User size={20} />
                </div>
                <div>
                  <p style={{ fontWeight: 700, fontSize: '0.95rem' }}>Sangli Property Hub</p>
                  <p style={{ fontSize: '0.75rem', color: 'var(--success-green)', fontWeight: 600 }}>Local Dealer • Responds in 2h</p>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <button className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>
                <Phone size={18} /> Call Dealer Now
              </button>
              <button className="btn" style={{ width: '100%', padding: '1rem', backgroundColor: '#25D366', color: 'white' }}>
                <MessageCircle size={18} /> WhatsApp Inquiry
              </button>
              <button onClick={() => setShowVisitForm(true)} className="btn btn-outline-blue" style={{ width: '100%', padding: '1rem' }}>
                <Calendar size={18} /> Schedule Site Visit
              </button>
            </div>

            <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border-light)', paddingTop: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <Calculator size={18} color="var(--primary-blue)" />
                <span style={{ fontSize: '1rem', fontWeight: 700 }}>EMI Calculator</span>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span>Down Payment</span>
                  <span style={{ fontWeight: 700 }}>₹10,00,000</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span>Interest Rate</span>
                  <span style={{ fontWeight: 700 }}>8.5%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span>Tenure</span>
                  <span style={{ fontWeight: 700 }}>20 Years</span>
                </div>
                <div style={{ backgroundColor: 'rgba(20, 184, 166, 0.1)', padding: '0.75rem', borderRadius: '4px', textAlign: 'center', marginTop: '0.5rem' }}>
                  <p style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)' }}>ESTIMATED MONTHLY EMI</p>
                  <p style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--soft-teal)' }}>₹38,500/mo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VISIT FORM MODAL */}
      <AnimatePresence>
        {showVisitForm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}
          >
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="glass"
              style={{ backgroundColor: 'white', width: '100%', maxWidth: '450px', padding: '2.5rem', borderRadius: 'var(--radius-xl)' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h3>Schedule Site Visit</h3>
                <button onClick={() => setShowVisitForm(false)} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '1.5rem' }}>×</button>
              </div>
              <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>FULL NAME</p>
                  <input type="text" placeholder="John Doe" style={inputStyle} />
                </div>
                <div>
                  <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>PHONE NUMBER</p>
                  <input type="tel" placeholder="+91 99999 99999" style={inputStyle} />
                </div>
                <div>
                  <p style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>PREFERRED DATE</p>
                  <input type="date" style={inputStyle} />
                </div>
                <button className="btn btn-primary" style={{ width: '100%', padding: '1rem', marginTop: '1rem' }}>Confirm Visit Request</button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* UNIT MODAL (Same as before but refined) */}
      {/* ... Unit Modal Code ... */}
    </div>
  );
};

const SpecIcon = ({ icon, label, value }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
    <div style={{ color: 'var(--primary-blue)', padding: '0.75rem', backgroundColor: 'white', borderRadius: '12px', boxShadow: 'var(--shadow-sm)' }}>
      {React.cloneElement(icon, { size: 22 })}
    </div>
    <div>
      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>{label}</p>
      <p style={{ fontWeight: 700, fontSize: '1rem' }}>{value}</p>
    </div>
  </div>
);

const inputStyle = {
  width: '100%',
  padding: '0.75rem',
  borderRadius: '8px',
  border: '1px solid var(--border-light)',
  outline: 'none',
  fontSize: '1rem'
};

export default ProjectDetails;
