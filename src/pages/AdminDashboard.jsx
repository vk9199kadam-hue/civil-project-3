import React, { useState } from 'react';
import { PROJECTS } from '../data/mockData';
import { 
  Plus, Settings, LayoutGrid, FileText, 
  BarChart3, Users, Building, Map, Trash2, Edit 
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('projects');

  return (
    <div className="animate-fade-in" style={{ minHeight: '100vh', backgroundColor: '#f1f5f9' }}>
      <div className="container" style={{ padding: '2rem 0' }}>
        <div style={{ display: 'flex', gap: '2rem' }}>
          
          {/* Sidebar */}
          <aside style={{ width: '260px' }}>
            <div className="glass" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', height: 'fit-content' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', padding: '0 0.5rem' }}>
                <div style={{ backgroundColor: 'var(--deep-navy)', color: 'white', padding: '0.4rem', borderRadius: '4px' }}>
                  <Settings size={20} />
                </div>
                <h3 style={{ fontSize: '1.1rem' }}>Admin Console</h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <button onClick={() => setActiveTab('projects')} style={{ ...tabStyle, ...(activeTab === 'projects' ? activeTabStyle : {}) }}>
                  <LayoutGrid size={18} /> Manage Projects
                </button>
                <button onClick={() => setActiveTab('leads')} style={{ ...tabStyle, ...(activeTab === 'leads' ? activeTabStyle : {}) }}>
                  <Users size={18} /> Leads & Inquiries
                </button>
                <button style={tabStyle}> <FileText size={18} /> RERA Compliance</button>
                <button style={tabStyle}> <BarChart3 size={18} /> Analytics</button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <div>
                <h2>{activeTab === 'projects' ? 'Project Inventory' : 'Total Leads'}</h2>
                <p style={{ color: 'var(--text-muted)' }}>Real-time synchronization across Islampur Property Platform</p>
              </div>
              <button className="btn btn-primary">
                <Plus size={18} /> Create New {activeTab === 'projects' ? 'Project' : 'Lead'}
              </button>
            </div>

            {activeTab === 'projects' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {PROJECTS.map(project => (
                  <div key={project.id} className="glass" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', gap: '2rem' }}>
                    <div style={{ width: '120px', height: '80px', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                      <img src={project.coverImage} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <h4 style={{ fontSize: '1.2rem' }}>{project.name}</h4>
                        <span style={{ fontSize: '0.7rem', backgroundColor: '#e2e8f0', padding: '0.2rem 0.5rem', borderRadius: '4px', textTransform: 'uppercase', fontWeight: 600 }}>{project.type}</span>
                      </div>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{project.location}</p>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', textAlign: 'center' }}>
                      <div>
                        <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>TOTAL</p>
                        <p style={{ fontWeight: 700 }}>{project.totalUnits}</p>
                      </div>
                      <div>
                        <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>SOLD</p>
                        <p style={{ fontWeight: 700, color: 'var(--warm-coral)' }}>{project.soldUnits}</p>
                      </div>
                      <div>
                        <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600 }}>AVAIL</p>
                        <p style={{ fontWeight: 700, color: 'var(--success-green)' }}>{project.remainingUnits}</p>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="btn btn-outline-blue" style={{ padding: '0.5rem' }}><Edit size={16} /></button>
                      <button className="btn btn-outline-blue" style={{ padding: '0.5rem', borderColor: '#ef4444', color: '#ef4444' }}><Trash2 size={16} /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>

        </div>
      </div>
    </div>
  );
};

const tabStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  width: '100%',
  padding: '0.75rem 1rem',
  border: 'none',
  background: 'none',
  borderRadius: 'var(--radius-md)',
  fontSize: '0.95rem',
  fontWeight: 500,
  color: 'var(--text-muted)',
  cursor: 'pointer',
  textAlign: 'left',
  transition: 'all 0.2s'
};

const activeTabStyle = {
  backgroundColor: 'var(--primary-blue)',
  color: 'white'
};

export default AdminDashboard;
