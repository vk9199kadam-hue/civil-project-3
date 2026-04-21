import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Search, User, MapPin } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="glass" style={{ position: 'sticky', top: 0, zIndex: 100, borderBottom: '1px solid var(--border-light)' }}>
      <div className="container" style={{ height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
          <div style={{ backgroundColor: 'var(--primary-blue)', padding: '0.5rem', borderRadius: 'var(--radius-md)', color: 'white' }}>
            <Building2 size={24} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.25rem', lineHeight: 1 }}>ISLAMPUR</h1>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.1em' }}>PROPERTY PORTAL</p>
          </div>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <div className="search-pill" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'var(--bg-soft-gray)', padding: '0.5rem 1rem', borderRadius: '999px', border: '1px solid var(--border-light)' }}>
            <Search size={16} color="var(--text-muted)" />
            <input 
              type="text" 
              placeholder="Search in Sangli, Islampur..." 
              style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '0.9rem', width: '200px' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', fontWeight: 500, fontSize: '0.95rem' }}>
            <Link to="/" style={{ color: 'var(--deep-navy)', textDecoration: 'none' }}>Buy</Link>
            <Link to="/" style={{ color: 'var(--deep-navy)', textDecoration: 'none' }}>Rent</Link>
            <Link to="/admin" style={{ color: 'var(--primary-blue)', textDecoration: 'none', fontWeight: 600 }}>Admin</Link>
          </div>

          <button className="btn btn-primary">
            <User size={18} />
            <span>Login</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
