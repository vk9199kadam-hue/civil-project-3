import React, { useState } from 'react';
import { PROJECTS, LEADS } from '../data/mockData';
import { 
  Plus, Settings, LayoutGrid, FileText, 
  BarChart3, Users, Building, Map, Trash2, Edit,
  CheckCircle2, Clock, MessageSquare, Phone, TrendingUp, Search, Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview'); // overview, projects, inventory, leads
  const [selectedProject, setSelectedProject] = useState(PROJECTS[0]);

  return (
    <div className="animate-fade-in" style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <div className="container" style={{ padding: '2rem 0' }}>
        <div style={{ display: 'flex', gap: '2rem' }}>
          
          {/* Sidebar */}
          <aside style={{ width: '260px' }}>
            <div className="glass" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', height: 'fit-content', border: '1px solid var(--border-light)', backgroundColor: 'white' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', padding: '0 0.5rem' }}>
                <div style={{ backgroundColor: 'var(--deep-navy)', color: 'white', padding: '0.4rem', borderRadius: '4px' }}>
                  <Settings size={20} />
                </div>
                <h3 style={{ fontSize: '1.1rem' }}>Command Center</h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <button onClick={() => setActiveTab('overview')} style={{ ...tabStyle, ...(activeTab === 'overview' ? activeTabStyle : {}) }}>
                  <TrendingUp size={18} /> Overview
                </button>
                <button onClick={() => setActiveTab('projects')} style={{ ...tabStyle, ...(activeTab === 'projects' ? activeTabStyle : {}) }}>
                  <Building size={18} /> Projects
                </button>
                <button onClick={() => setActiveTab('inventory')} style={{ ...tabStyle, ...(activeTab === 'inventory' ? activeTabStyle : {}) }}>
                  <LayoutGrid size={18} /> Inventory Grid
                </button>
                <button onClick={() => setActiveTab('leads')} style={{ ...tabStyle, ...(activeTab === 'leads' ? activeTabStyle : {}) }}>
                  <Users size={18} /> Leads & Inquiries
                </button>
                <div style={{ margin: '1rem 0', height: '1px', backgroundColor: 'var(--border-light)' }}></div>
                <button style={tabStyle}> <FileText size={18} /> Documents</button>
                <button style={tabStyle}> <Download size={18} /> Export Reports</button>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main style={{ flex: 1 }}>
            {activeTab === 'overview' && <OverviewView />}
            {activeTab === 'projects' && <ProjectsView />}
            {activeTab === 'inventory' && <InventoryGridView project={selectedProject} onProjectChange={setSelectedProject} />}
            {activeTab === 'leads' && <LeadsView />}
          </main>

        </div>
      </div>
    </div>
  );
};

// --- SUB-VIEWS ---

const OverviewView = () => (
  <div className="animate-fade-in">
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
      <h2>Dashboard Overview</h2>
      <button className="btn btn-primary"><Plus size={18} /> New Project</button>
    </div>
    
    {/* Widgets - Point 8 */}
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2.5rem' }}>
      <Widget icon={<Building color="var(--primary-blue)" />} label="Total Projects" value={PROJECTS.length} />
      <Widget icon={<LayoutGrid color="var(--success-green)" />} label="Available Units" value="22" color="var(--success-green)" />
      <Widget icon={<Users color="var(--warm-coral)" />} label="New Leads" value={LEADS.length} color="var(--warm-coral)" />
      <Widget icon={<CheckCircle2 color="var(--soft-teal)" />} label="Sold This Month" value="8" />
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
      <div className="glass" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', backgroundColor: 'white', border: '1px solid var(--border-light)' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>Recent Inquiries</h3>
        {LEADS.map(lead => (
          <div key={lead.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0', borderBottom: '1px solid var(--border-light)' }}>
            <div>
              <p style={{ fontWeight: 700 }}>{lead.name}</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{lead.property} • {lead.unitRef}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span className="badge badge-verified" style={{ fontSize: '0.65rem' }}>{lead.status}</span>
              <p style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>10 mins ago</p>
            </div>
          </div>
        ))}
      </div>
      <div className="glass" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', backgroundColor: 'white', border: '1px solid var(--border-light)' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>Inventory Status</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <StatBar label="Available" value={22} total={60} color="var(--success-green)" />
          <StatBar label="Booked" value={10} total={60} color="var(--gold-premium)" />
          <StatBar label="Sold" value={28} total={60} color="var(--warm-coral)" />
        </div>
      </div>
    </div>
  </div>
);

const ProjectsView = () => (
  <div className="animate-fade-in">
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
      <h2>Manage Projects</h2>
      <button className="btn btn-primary"><Plus size={18} /> Create Project</button>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {PROJECTS.map(p => (
        <div key={p.id} className="glass" style={{ padding: '1rem 1.5rem', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '2rem', backgroundColor: 'white', border: '1px solid var(--border-light)' }}>
          <img src={p.coverImage} style={{ width: '80px', height: '60px', borderRadius: '4px', objectFit: 'cover' }} alt="" />
          <div style={{ flex: 1 }}>
            <p style={{ fontWeight: 700 }}>{p.name}</p>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{p.location} • {p.type}</p>
          </div>
          <div style={{ display: 'flex', gap: '2rem', textAlign: 'center' }}>
            <p style={{ fontSize: '0.8rem' }}><span style={{ display: 'block', fontWeight: 800 }}>{p.totalUnits}</span> Units</p>
            <p style={{ fontSize: '0.8rem' }}><span style={{ display: 'block', fontWeight: 800, color: 'var(--warm-coral)' }}>{p.soldUnits}</span> Sold</p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn glass" style={{ padding: '0.4rem' }}><Edit size={16} /></button>
            <button className="btn glass" style={{ padding: '0.4rem', color: '#ef4444' }}><Trash2 size={16} /></button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const InventoryGridView = ({ project, onProjectChange }) => (
  <div className="animate-fade-in">
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
      <div>
        <h2>Inventory Management Grid</h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Project: {project.name}</p>
      </div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <select onChange={(e) => onProjectChange(PROJECTS.find(p => p.id === e.target.value))} style={{ padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
          {PROJECTS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <button className="btn btn-outline-blue"><Download size={18} /> CSV Export</button>
      </div>
    </div>

    {/* Legend - Point 10 */}
    <div className="glass" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', backgroundColor: 'white', border: '1px solid var(--border-light)' }}>
      <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem' }}>
        <LegendItem color="var(--success-green)" label="Available" count={10} />
        <LegendItem color="var(--gold-premium)" label="Booked" count={5} />
        <LegendItem color="var(--warm-coral)" label="Sold" count={12} />
        <LegendItem color="#94a3b8" label="Blocked" count={3} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '0.75rem' }}>
        {/* Mock Units for Grid */}
        {[...Array(30)].map((_, i) => {
          let status = 'available';
          if (i > 15) status = 'sold';
          if (i > 25) status = 'booked';
          if (i === 28 || i === 29) status = 'blocked';

          const colors = {
            available: 'var(--success-green)',
            sold: 'var(--warm-coral)',
            booked: 'var(--gold-premium)',
            blocked: '#94a3b8'
          };

          return (
            <div key={i} style={{ 
              height: '80px', 
              backgroundColor: 'white', 
              border: `2px solid ${colors[status]}`, 
              borderRadius: '8px', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center',
              cursor: 'pointer',
              position: 'relative'
            }}>
              <p style={{ fontSize: '0.65rem', fontWeight: 800, opacity: 0.6 }}>{Math.floor(i/10 + 1)}0{i%10 + 1}</p>
              <p style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--deep-navy)' }}>{i+1}</p>
              <div style={{ position: 'absolute', bottom: 4, right: 4, width: '6px', height: '6px', borderRadius: '50%', backgroundColor: colors[status] }}></div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

const LeadsView = () => (
  <div className="animate-fade-in">
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
      <h2>Lead Management</h2>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <div className="search-pill" style={{ backgroundColor: 'white', border: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', padding: '0.5rem 1rem', borderRadius: '99px' }}>
          <Search size={16} /><input type="text" placeholder="Search leads..." style={{ border: 'none', outline: 'none', marginLeft: '0.5rem' }} />
        </div>
      </div>
    </div>
    <div className="glass" style={{ backgroundColor: 'white', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid var(--border-light)' }}>
          <tr style={{ textAlign: 'left' }}>
            <th style={{ padding: '1rem' }}>CONTACT</th>
            <th style={{ padding: '1rem' }}>PROPERTY</th>
            <th style={{ padding: '1rem' }}>STATUS</th>
            <th style={{ padding: '1rem' }}>DATE</th>
            <th style={{ padding: '1rem' }}>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {LEADS.map(l => (
            <tr key={l.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
              <td style={{ padding: '1rem' }}>
                <p style={{ fontWeight: 700 }}>{l.name}</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{l.phone}</p>
              </td>
              <td style={{ padding: '1rem' }}>
                <p style={{ fontSize: '0.9rem' }}>{l.property}</p>
                <p style={{ fontSize: '0.75rem', color: 'var(--primary-blue)' }}>Unit: {l.unitRef}</p>
              </td>
              <td style={{ padding: '1rem' }}>
                <span className="badge badge-verified" style={{ fontSize: '0.7rem' }}>{l.status}</span>
              </td>
              <td style={{ padding: '1rem', fontSize: '0.85rem' }}>Today, 10:45 AM</td>
              <td style={{ padding: '1rem' }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button className="btn glass" style={{ padding: '0.4rem', color: 'var(--success-green)' }}><Phone size={16} /></button>
                  <button className="btn glass" style={{ padding: '0.4rem', color: 'var(--primary-blue)' }}><MessageSquare size={16} /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// --- HELPERS ---

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

const LegendItem = ({ color, label, count }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
    <div style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: color }}></div>
    <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{label} ({count})</span>
  </div>
);

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
  fontWeight: 600,
  color: 'var(--text-muted)',
  cursor: 'pointer',
  textAlign: 'left',
  transition: 'all 0.2s'
};

const activeTabStyle = {
  backgroundColor: 'rgba(37, 99, 235, 0.08)',
  color: 'var(--primary-blue)',
  borderLeft: '4px solid var(--primary-blue)',
  borderRadius: '0 var(--radius-md) var(--radius-md) 0'
};

export default AdminDashboard;
