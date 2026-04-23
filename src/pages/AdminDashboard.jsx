import React, { useState } from 'react';
import { PROJECTS, LEADS } from '../data/mockData';
import { PROJECT_CATEGORIES } from '../data/config';
import { 
  Plus, Settings, LayoutGrid, FileText, 
  BarChart3, Users, Building, Map, Trash2, Edit,
  CheckCircle2, Clock, MessageSquare, Phone, TrendingUp, Search, Download,
  ArrowRight, ArrowLeft, Image as ImageIcon, Check, X, Info, Home
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview'); // overview, projects, create-project, leads
  const [selectedProjectType, setSelectedProjectType] = useState(null); // building or land

  return (
    <div className="animate-fade-in" style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <div className="container" style={{ padding: '2rem 0' }}>
        <div className="admin-layout">
          
          {/* Sidebar */}
          <aside className="admin-sidebar">
            <div className="glass" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', height: 'fit-content', border: '1px solid var(--border-light)', backgroundColor: 'white' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', padding: '0 0.5rem' }}>
                <div style={{ backgroundColor: 'var(--deep-navy)', color: 'white', padding: '0.4rem', borderRadius: '4px' }}>
                  <Settings size={20} />
                </div>
                <h3 style={{ fontSize: '1.1rem' }}>Admin Portal</h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <button onClick={() => setActiveTab('overview')} style={{ ...tabStyle, ...(activeTab === 'overview' ? activeTabStyle : {}) }}>
                  <TrendingUp size={18} /> Overview
                </button>
                <button onClick={() => setActiveTab('projects')} style={{ ...tabStyle, ...(activeTab === 'projects' ? activeTabStyle : {}) }}>
                  <Building size={18} /> Projects
                </button>
                <button onClick={() => setActiveTab('create-project')} style={{ ...tabStyle, ...(activeTab === 'create-project' ? activeTabStyle : {}) }}>
                  <Plus size={18} /> Add New Project
                </button>
                <button onClick={() => setActiveTab('leads')} style={{ ...tabStyle, ...(activeTab === 'leads' ? activeTabStyle : {}) }}>
                  <Users size={18} /> Inquiries
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="admin-main">
            {activeTab === 'overview' && <OverviewView />}
            {activeTab === 'projects' && <ProjectsView />}
            {activeTab === 'create-project' && <CreateProjectFlow goToProjects={() => setActiveTab('projects')} />}
            {activeTab === 'leads' && <LeadsView />}
          </main>

        </div>
      </div>
    </div>
  );
};

// --- MULTI-STEP CREATE PROJECT FLOW ---

const CreateProjectFlow = ({ goToProjects }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    type: '', // building, land
    category: 'RESIDENTIAL',
    subType: '',
    totalUnits: 0,
    totalFloors: 0,
    totalArea: '',
    description: '',
    coverImage: '',
    inventory: [] // Array of unit objects
  });

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleTypeSelect = (type) => {
    setFormData({ ...formData, type });
    nextStep();
  };

  const handleBasicInfo = (data) => {
    setFormData({ ...formData, ...data });
    nextStep();
  };

  const generateInventory = (remUnitsCount) => {
    const newInventory = Array.from({ length: remUnitsCount }, (_, i) => ({
      id: `unit-${Date.now()}-${Math.floor(Math.random() * 1000)}-${i + 1}`,
      number: i + 1,
      name: formData.type === 'building' ? `Flat ${i + 1}` : `Plot ${i + 1}`,
      floor: formData.type === 'building' ? 1 : null,
      status: 'available',
      price: '',
      area: '',
      type: '', // 2BHK etc
      images: [],
      description: ''
    }));
    setFormData({ ...formData, inventory: newInventory, remainingUnits: remUnitsCount });
    nextStep();
  };

  const updateUnit = (index, unitData) => {
    const updated = [...formData.inventory];
    updated[index] = { ...updated[index], ...unitData };
    setFormData({ ...formData, inventory: updated });
  };

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '2rem' }}>
        <button onClick={step === 1 ? goToProjects : prevStep} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontWeight: 600 }}>
          <ArrowLeft size={18} /> {step === 1 ? 'Back to Projects' : 'Previous Step'}
        </button>
        <h2 style={{ marginTop: '1rem' }}>Step {step}: {
          step === 1 ? 'Select Project Type' : 
          step === 2 ? 'Project Category & Details' :
          step === 3 ? 'Inventory Configuration' :
          'Unit Level Details'
        }</h2>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
              <TypeCard 
                icon={<Building size={48} />} 
                title="Building Project" 
                desc="Apartments, Commercial Complexes, Multi-story buildings" 
                onClick={() => handleTypeSelect('building')}
              />
              <TypeCard 
                icon={<Map size={48} />} 
                title="Land / Plotting Project" 
                desc="Acreage projects, Plotting schemes, Agricultural layouts" 
                onClick={() => handleTypeSelect('land')}
              />
              <TypeCard 
                icon={<Home size={48} />} 
                title="Standalone Property" 
                desc="Individual house, shop, resale flat, or single land parcel" 
                onClick={() => handleTypeSelect('property')}
              />
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div className="glass" style={{ backgroundColor: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={labelStyle}>Project Name</label>
                  <input type="text" placeholder="e.g. Green Valley Residency" style={inputStyle} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div>
                  <label style={labelStyle}>Major Category</label>
                  <select style={inputStyle} value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                    {Object.keys(PROJECT_CATEGORIES).map(cat => <option key={cat} value={cat}>{PROJECT_CATEGORIES[cat].name}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Project Sub-type</label>
                  <select style={inputStyle} value={formData.subType} onChange={e => setFormData({...formData, subType: e.target.value})}>
                    <option value="">Select sub-type...</option>
                    {PROJECT_CATEGORIES[formData.category].subTypes.map(st => <option key={st.name} value={st.name}>{st.name}</option>)}
                  </select>
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={labelStyle}>Location / Landmark</label>
                  <input type="text" placeholder="e.g. Main Highway, Islampur" style={inputStyle} value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={labelStyle}>Project Cover Image (Direct Upload)</label>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div 
                      onClick={() => document.getElementById('file-upload').click()}
                      style={{ 
                        flex: 1, 
                        height: '100px', 
                        border: '2px dashed var(--border-light)', 
                        borderRadius: '12px', 
                        display: 'flex', 
                        flexDirection: 'column',
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        cursor: 'pointer',
                        backgroundColor: '#f9fafb',
                        transition: 'all 0.2s'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--primary-blue)'}
                      onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--border-light)'}
                    >
                      <Plus size={24} color="var(--text-muted)" />
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                        {formData.coverImage ? 'Change Image' : 'Select Photo from Folder'}
                      </span>
                    </div>
                    <input 
                      id="file-upload"
                      type="file" 
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            // Resize image before saving to keep DB light
                            const img = new Image();
                            img.src = reader.result;
                            img.onload = () => {
                              const canvas = document.createElement('canvas');
                              const MAX_WIDTH = 800;
                              const scaleSize = MAX_WIDTH / img.width;
                              canvas.width = MAX_WIDTH;
                              canvas.height = img.height * scaleSize;
                              const ctx = canvas.getContext('2d');
                              ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                              const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
                              setFormData({...formData, coverImage: dataUrl});
                            };
                          };
                          reader.readAsDataURL(file);
                        }
                      }} 
                    />
                    {formData.coverImage && (
                      <div style={{ width: '150px', height: '100px', borderRadius: '12px', overflow: 'hidden', border: '2px solid var(--primary-blue)' }}>
                        <img src={formData.coverImage} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    )}
                  </div>
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={labelStyle}>Description</label>
                  <textarea rows="4" style={inputStyle} placeholder="Project highlights, developer details..." value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                </div>
              </div>
              <button className="btn btn-primary" style={{ width: '100%', marginTop: '2rem', padding: '1rem' }} onClick={nextStep}>
                {formData.type === 'property' ? 'Next: Enter Property Details' : 'Next: Setup Inventory'} <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        )}

        {/* --- STEP 3 FOR BUILDING & LAND PROJECTS --- */}
        {step === 3 && formData.type !== 'property' && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div className="glass" style={{ backgroundColor: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)' }}>
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <p style={{ fontWeight: 600, color: 'var(--primary-blue)' }}>{formData.type === 'building' ? 'INVENTORY STRUCTURE' : 'PLOT STRUCTURE'}</p>
                <h3 style={{ fontSize: '1.5rem' }}>Define Project Size & Remaining Units</h3>
              </div>
              
              <div style={{ maxWidth: '500px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                
                <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={labelStyle}>Total Unsold & Sold Units in Project</label>
                    <input type="number" style={inputStyle} value={formData.totalUnits} onChange={e => setFormData({...formData, totalUnits: e.target.value})} placeholder="e.g. 50" />
                  </div>
                  <div>
                    <label style={labelStyle}>How many remain for Sale?</label>
                    <input type="number" style={inputStyle} value={formData.remainingUnits} onChange={e => setFormData({...formData, remainingUnits: e.target.value})} placeholder="e.g. 10" />
                  </div>
                </div>

                {formData.type === 'building' && (
                  <div>
                    <label style={labelStyle}>Available Configurations (BHK / Types)</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {["1 RK", "1 BHK", "1.5 BHK", "2 BHK", "2.5 BHK", "3 BHK", "4 BHK+", "Penthouse", "Shop"].map(conf => (
                        <div 
                          key={conf} 
                          onClick={() => {
                            const current = formData.configurations || [];
                            setFormData({...formData, configurations: current.includes(conf) ? current.filter(c => c !== conf) : [...current, conf]});
                          }}
                          style={{ 
                            padding: '0.4rem 0.8rem', 
                            borderRadius: '20px', 
                            fontSize: '0.8rem', 
                            fontWeight: 600, 
                            cursor: 'pointer',
                            border: `1px solid ${(formData.configurations || []).includes(conf) ? 'var(--primary-blue)' : 'var(--border-light)'}`,
                            backgroundColor: (formData.configurations || []).includes(conf) ? 'var(--primary-blue)' : 'white',
                            color: (formData.configurations || []).includes(conf) ? 'white' : 'var(--text-muted)'
                          }}
                        >
                          {conf}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {formData.type === 'land' && (
                  <div>
                    <label style={labelStyle}>Available Plot Sizes</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {["500 Sq.Ft", "1000 Sq.Ft", "1500 Sq.Ft", "2000 Sq.Ft", "1 Guntha", "2 Guntha", "5 Guntha", "Half Acre", "1 Acre+"].map(conf => (
                        <div 
                          key={conf} 
                          onClick={() => {
                            const current = formData.configurations || [];
                            setFormData({...formData, configurations: current.includes(conf) ? current.filter(c => c !== conf) : [...current, conf]});
                          }}
                          style={{ 
                            padding: '0.4rem 0.8rem', 
                            borderRadius: '20px', 
                            fontSize: '0.8rem', 
                            fontWeight: 600, 
                            cursor: 'pointer',
                            border: `1px solid ${(formData.configurations || []).includes(conf) ? 'var(--primary-blue)' : 'var(--border-light)'}`,
                            backgroundColor: (formData.configurations || []).includes(conf) ? 'var(--primary-blue)' : 'white',
                            color: (formData.configurations || []).includes(conf) ? 'white' : 'var(--text-muted)'
                          }}
                        >
                          {conf}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <button className="btn btn-primary" style={{ padding: '1rem', marginTop: '1rem' }} onClick={() => generateInventory(parseInt(formData.remainingUnits || 0))}>
                  Generate Grid for {formData.remainingUnits || 0} Remaining Units <LayoutGrid size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* --- STEP 3 FOR STANDALONE PROPERTIES --- */}
        {step === 3 && formData.type === 'property' && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div className="glass" style={{ backgroundColor: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.5rem' }}>Standalone Property Details</h3>
                  <p style={{ color: 'var(--text-muted)' }}>Fill in the exact dimensions and pricing for this specific property.</p>
                </div>
                <button className="btn btn-success" onClick={async () => {
                     try {
                       const res = await fetch('/api/projects', {
                         method: 'POST',
                         headers: { 'Content-Type': 'application/json' },
                         body: JSON.stringify(formData)
                       });
                       if(!res.ok) {
                         const errTx = await res.text();
                         alert('Failed to save to database: ' + errTx);
                         return;
                       }
                       alert('Project Saved to Database Successfully!');
                       goToProjects();
                     } catch(err) {
                       alert('Network Error mapping to Vercel API. ' + err.message);
                     }
                  }}>Save Property to Database ✓</button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <label style={labelStyle}>Price (₹) / Rent</label>
                  <input type="number" style={inputStyle} value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                </div>
                <div>
                  <label style={labelStyle}>Total Area</label>
                  <input type="text" style={inputStyle} placeholder="e.g. 1500 sq.ft or 2 acres" value={formData.area} onChange={e => setFormData({...formData, area: e.target.value})} />
                </div>
                <div>
                  <label style={labelStyle}>Facing</label>
                  <input type="text" style={inputStyle} placeholder="East, North..." value={formData.facing} onChange={e => setFormData({...formData, facing: e.target.value})} />
                </div>
                <div>
                  <label style={labelStyle}>Specific Amenities (comma separated)</label>
                  <input type="text" style={inputStyle} placeholder="Lift, Power Backup, Gym..." value={formData.amenitiesText} onChange={e => setFormData({...formData, amenitiesText: e.target.value})} />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={labelStyle}>Property Image (Direct Upload)</label>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div 
                      onClick={() => document.getElementById('file-upload-standalone').click()}
                      style={{ 
                        flex: 1, 
                        height: '100px', 
                        border: '2px dashed var(--border-light)', 
                        borderRadius: '12px', 
                        display: 'flex', 
                        flexDirection: 'column',
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        cursor: 'pointer',
                        backgroundColor: '#f9fafb'
                      }}
                    >
                      <Plus size={24} color="var(--text-muted)" />
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                        {formData.coverImage ? 'Change Image' : 'Select Photo from Folder'}
                      </span>
                    </div>
                    <input 
                      id="file-upload-standalone"
                      type="file" 
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            const img = new Image();
                            img.src = reader.result;
                            img.onload = () => {
                              const canvas = document.createElement('canvas');
                              const MAX_WIDTH = 800;
                              const scaleSize = MAX_WIDTH / img.width;
                              canvas.width = MAX_WIDTH;
                              canvas.height = img.height * scaleSize;
                              const ctx = canvas.getContext('2d');
                              ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                              setFormData({...formData, coverImage: canvas.toDataURL('image/jpeg', 0.7)});
                            };
                          };
                          reader.readAsDataURL(file);
                        }
                      }} 
                    />
                    {formData.coverImage && (
                      <div style={{ width: '150px', height: '100px', borderRadius: '12px', overflow: 'hidden', border: '2px solid var(--primary-blue)' }}>
                        <img src={formData.coverImage} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div className="glass" style={{ backgroundColor: 'white', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                  <h3>Interactive Inventory Grid</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Click on each box to fill details for that specific unit.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}>
                    <div style={{ width: '12px', height: '12px', backgroundColor: 'var(--success-green)', borderRadius: '2px' }}></div> Configured
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}>
                    <div style={{ width: '12px', height: '12px', border: '1px solid var(--border-light)', borderRadius: '2px' }}></div> Pending
                  </div>
                  <button className="btn btn-success" onClick={async () => {
                     try {
                       const res = await fetch('/api/projects', {
                         method: 'POST',
                         headers: { 'Content-Type': 'application/json' },
                         body: JSON.stringify(formData)
                       });
                       if(!res.ok) {
                         const errTx = await res.text();
                         alert('Failed to save to database: ' + errTx);
                         return;
                       }
                       alert('Project & Inventory Saved to Database Successfully!');
                       goToProjects();
                     } catch(err) {
                       alert('Network Error mapping to Vercel API. ' + err.message);
                     }
                  }}>Save Complete Project ✓</button>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '1rem' }}>
                {formData.inventory.map((unit, idx) => (
                  <UnitBox key={unit.id} unit={unit} onEdit={(data) => updateUnit(idx, data)} projectType={formData.type} />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const UnitBox = ({ unit, onEdit, projectType }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...unit });

  const isConfigured = editData.price && editData.area;

  return (
    <>
      <motion.div 
        whileHover={{ y: -3, shadow: 'var(--shadow-md)' }}
        onClick={() => setIsEditing(true)}
        style={{ 
          padding: '1rem', 
          borderRadius: '12px', 
          border: `2px solid ${isConfigured ? 'var(--success-green)' : 'var(--border-light)'}`, 
          textAlign: 'center', 
          cursor: 'pointer',
          backgroundColor: isConfigured ? 'rgba(16, 185, 129, 0.05)' : 'transparent',
          transition: 'all 0.2s'
        }}
      >
        <p style={{ fontSize: '0.7rem', fontWeight: 800, opacity: 0.6 }}>{projectType === 'building' ? `FLOOR ${unit.floor}` : 'PLOT'}</p>
        <p style={{ fontWeight: 800, fontSize: '1.2rem', margin: '0.25rem 0' }}>{unit.number}</p>
        {isConfigured ? (
          <p style={{ fontSize: '0.65rem', color: 'var(--success-green)', fontWeight: 700 }}>CONFIGURED ✓</p>
        ) : (
          <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>PENDING</p>
        )}
      </motion.div>

      {/* Unit Edit Modal */}
      <AnimatePresence>
        {isEditing && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass" style={{ backgroundColor: 'white', width: '100%', maxWidth: '600px', padding: '2.5rem', borderRadius: 'var(--radius-xl)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h3>Configure {projectType === 'building' ? 'Flat' : 'Plot'} {unit.number}</h3>
                <button onClick={() => setIsEditing(false)} style={{ border: 'none', background: 'none', cursor: 'pointer' }}><X size={24} /></button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                <div>
                  <label style={labelStyle}>Price (₹)</label>
                  <input type="number" style={inputStyle} value={editData.price} onChange={e => setEditData({...editData, price: e.target.value})} />
                </div>
                <div>
                  <label style={labelStyle}>Area ({projectType === 'building' ? 'sq.ft' : 'sq.yd/Acres'})</label>
                  <input type="text" style={inputStyle} value={editData.area} onChange={e => setEditData({...editData, area: e.target.value})} />
                </div>
                <div>
                  <label style={labelStyle}>{projectType === 'building' ? 'Configuration (BHK)' : 'Zone Type'}</label>
                  <input type="text" style={inputStyle} value={editData.type} onChange={e => setEditData({...editData, type: e.target.value})} />
                </div>
                <div>
                  <label style={labelStyle}>Images</label>
                  <div style={{ border: '2px dashed var(--border-light)', padding: '0.5rem', borderRadius: '8px', textAlign: 'center', cursor: 'pointer' }}>
                    <ImageIcon size={20} color="var(--text-muted)" />
                    <p style={{ fontSize: '0.7rem' }}>Click to upload</p>
                  </div>
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={labelStyle}>Specific Details / Amenities</label>
                  <textarea rows="3" style={inputStyle} value={editData.description} onChange={e => setEditData({...editData, description: e.target.value})} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => {
                  onEdit(editData);
                  setIsEditing(false);
                }}>Apply to Unit</button>
                <button className="btn btn-success" style={{ flex: 1 }} onClick={() => {
                   // Mock "Apply to All Remaining"
                   alert('Applied these details to all pending units!');
                   onEdit(editData);
                   setIsEditing(false);
                }}>Apply to All Similar</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

// --- SUB-VIEWS ---

const OverviewView = () => {
  const [stats, setStats] = useState({ projects: 0, leads: 0 });
  const [recentLeads, setRecentLeads] = useState([]);
  const [error, setError] = useState(null);

  React.useEffect(() => {
    const fetchOverview = async () => {
      try {
        const [projRes, leadRes] = await Promise.all([
          fetch('/api/projects'),
          fetch('/api/leads')
        ]);
        
        if (!projRes.ok || !leadRes.ok) {
           const errBody = !projRes.ok ? await projRes.json() : await leadRes.json();
           throw new Error(errBody.details || errBody.error || 'Failed to reach Database API');
        }
        
        const projs = await projRes.json();
        const leads = await leadRes.json();
        
        setStats({ 
          projects: Array.isArray(projs) ? projs.length : 0, 
          leads: Array.isArray(leads) ? leads.length : 0 
        });
        setRecentLeads(Array.isArray(leads) ? leads.slice(0, 5) : []);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };
    fetchOverview();
  }, []);

  return (
  <div className="animate-fade-in">
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
      <h2>Dashboard Overview</h2>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button className="btn btn-outline-blue"><Download size={18} /> Export Reports</button>
        <button className="btn btn-primary" onClick={() => window.location.reload()}><Check /> Refresh Data</button>
      </div>
    </div>
    
    {error && (
      <div style={{ padding: '1rem', backgroundColor: '#fee2e2', color: '#b91c1c', borderRadius: '8px', marginBottom: '2rem', border: '1px solid #ef4444' }}>
        <strong>Database Sync Error:</strong> {error}. Please check your Vercel Environment Variables.
      </div>
    )}
    <div className="mobile-stack" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2.5rem' }}>
      <Widget icon={<Building color="var(--primary-blue)" />} label="Total Projects" value={stats.projects} />
      <Widget icon={<LayoutGrid color="var(--success-green)" />} label="Available Units" value="--" color="var(--success-green)" />
      <Widget icon={<Users color="var(--warm-coral)" />} label="Total Inquiries" value={stats.leads} color="var(--warm-coral)" />
      <Widget icon={<CheckCircle2 color="var(--soft-teal)" />} label="Success Rate" value="High" />
    </div>

    <div className="grid-2col" style={{ gap: '1.5rem' }}>
      <div className="glass" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', backgroundColor: 'white', border: '1px solid var(--border-light)' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>Recent Inquiries</h3>
        {recentLeads.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No inquiries yet.</p>}
        {recentLeads.map(lead => (
          <div key={lead.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0', borderBottom: '1px solid var(--border-light)' }}>
            <div>
              <p style={{ fontWeight: 700 }}>{lead.name}</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{lead.property_name} • {lead.unit_ref || 'General'}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span className="badge badge-verified" style={{ fontSize: '0.65rem' }}>{lead.status}</span>
              <p style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>{new Date(lead.created_at).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="glass" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', backgroundColor: 'white', border: '1px solid var(--border-light)' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>Platform Health</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <StatBar label="Database Connection" value={error ? 0 : 100} total={100} color={error ? '#ef4444' : 'var(--success-green)'} />
          <StatBar label="API Response" value={error ? 10 : 98} total={100} color={error ? 'var(--warm-coral)' : 'var(--primary-blue)'} />
          <StatBar label="Form Uptime" value={100} total={100} color="var(--gold-premium)" />
        </div>
      </div>
    </div>
  </div>
  );
};

const ProjectsView = () => {
  const [dbProjects, setDbProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        if (res.ok && Array.isArray(data)) {
          setDbProjects(data);
        } else {
          console.error('API Error:', data);
        }
      } catch (err) {
        console.error('Failed to fetch projects', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project? This will remove it permanently from the database.")) return;
    try {
      const res = await fetch(`/api/projects?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setDbProjects(dbProjects.filter(p => p.id !== id));
      } else {
        alert("Failed to delete project.");
      }
    } catch (err) {
      alert("Error deleting project.");
    }
  };

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Manage Projects</h2>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {loading ? <p>Loading real data from database...</p> : null}
        {!loading && dbProjects.length === 0 ? <p>No projects found in database. Create one!</p> : null}
        
        {dbProjects.map(p => (
          <div key={p.id} className="glass" style={{ padding: '1rem 1.5rem', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '2rem', backgroundColor: 'white', border: '1px solid var(--border-light)' }}>
            <img src={p.coverImage || '/images/interior.png'} style={{ width: '80px', height: '60px', borderRadius: '4px', objectFit: 'cover' }} alt="" />
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 700 }}>{p.name}</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{p.location} • {p.type}</p>
            </div>
            <div style={{ display: 'flex', gap: '2rem', textAlign: 'center' }}>
              <p style={{ fontSize: '0.8rem' }}><span style={{ display: 'block', fontWeight: 800 }}>{p.totalUnits || 1}</span> Units</p>
              <p style={{ fontSize: '0.8rem' }}><span style={{ display: 'block', fontWeight: 800, color: 'var(--success-green)' }}>{(p.inventory || []).length}</span> Remaining</p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="btn glass" style={{ padding: '0.4rem', fontSize: '0.75rem', fontWeight: 'bold' }}>LIVE</button>
              <button className="btn glass" style={{ padding: '0.4rem' }}><Edit size={16} /></button>
              <button 
                className="btn glass" 
                style={{ padding: '0.4rem', color: '#ef4444' }} 
                onClick={() => handleDelete(p.id)}
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const LeadsView = () => {
  const [dbLeads, setDbLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await fetch('/api/leads');
        const data = await res.json();
        if (res.ok && Array.isArray(data)) {
          setDbLeads(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
  }, []);

  const handleDeleteLead = async (id) => {
    if (!window.confirm("Remove this inquiry?")) return;
    try {
      const res = await fetch(`/api/leads?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setDbLeads(dbLeads.filter(l => l.id !== id));
      }
    } catch (err) {
      alert("Error deleting inquiry.");
    }
  };

  return (
    <div className="animate-fade-in">
      <h2>Inquiries</h2>
      <div style={{ marginTop: '1rem' }}>
        {loading && <p>Loading live inquiries...</p>}
        {!loading && dbLeads.length === 0 && <p>No inquiries saved in database yet.</p>}
        {dbLeads.map(l => (
          <div key={l.id} className="glass" style={{ padding: '1.5rem', backgroundColor: 'white', marginBottom: '1rem', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <p style={{ fontWeight: 800, fontSize: '1.1rem' }}>{l.name}</p>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span className="badge badge-verified">{l.status}</span>
                <button 
                  onClick={() => handleDeleteLead(l.id)} 
                  style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.2rem' }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', fontSize: '0.9rem' }}>
              <p><strong>Phone:</strong> {l.phone}</p>
              <p><strong>Project:</strong> {l.property_name}</p>
              <p><strong>Unit:</strong> {l.unit_ref || 'General Inquiry'}</p>
              <p><strong>Requested At:</strong> {new Date(l.created_at).toLocaleString()}</p>
            </div>
            {l.message && (
              <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: 'var(--bg-soft-gray)', borderRadius: '8px', fontSize: '0.85rem' }}>
                <strong>Message:</strong> {l.message}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// --- HELPERS ---

const TypeCard = ({ icon, title, desc, onClick }) => (
  <motion.div 
    whileHover={{ y: -5, shadow: 'var(--shadow-lg)' }}
    onClick={onClick}
    style={{ 
      backgroundColor: 'white', 
      padding: '3rem 2rem', 
      borderRadius: 'var(--radius-xl)', 
      textAlign: 'center', 
      cursor: 'pointer', 
      border: '2px solid var(--border-light)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1rem'
    }}
  >
    <div style={{ color: 'var(--primary-blue)', marginBottom: '1rem' }}>{icon}</div>
    <h3>{title}</h3>
    <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{desc}</p>
    <button className="btn btn-outline-blue" style={{ marginTop: '1rem' }}>Select & Start</button>
  </motion.div>
);

const Widget = ({ icon, label, value, color }) => (
  <div className="glass" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', backgroundColor: 'white', border: '1px solid var(--border-light)', display: 'flex', gap: '1rem', alignItems: 'center' }}>
    <div style={{ padding: '0.75rem', backgroundColor: 'rgba(37, 99, 235, 0.05)', borderRadius: '12px' }}>{icon}</div>
    <div>
      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>{label}</p>
      <p style={{ fontSize: '1.5rem', fontWeight: 800, color: color || 'var(--deep-navy)' }}>{value}</p>
    </div>
  </div>
);

const StatBar = ({ label, value, total, color }) => (
  <div>
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
      <span style={{ fontWeight: 600 }}>{label}</span>
      <span style={{ color: 'var(--text-muted)' }}>{value}/{total}</span>
    </div>
    <div style={{ height: '8px', backgroundColor: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
      <div style={{ width: `${(value/total)*100}%`, height: '100%', backgroundColor: color }}></div>
    </div>
  </div>
);

const labelStyle = { display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem' };
const inputStyle = { width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-light)', outline: 'none', fontSize: '0.95rem', fontWeight: 600 };
const tabStyle = { display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%', padding: '0.75rem 1rem', border: 'none', background: 'none', borderRadius: 'var(--radius-md)', fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-muted)', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' };
const activeTabStyle = { backgroundColor: 'rgba(37, 99, 235, 0.08)', color: 'var(--primary-blue)', borderLeft: '4px solid var(--primary-blue)', borderRadius: '0 var(--radius-md) var(--radius-md) 0' };

export default AdminDashboard;

