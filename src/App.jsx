import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProjectDetails from './pages/ProjectDetails';
import AdminDashboard from './pages/AdminDashboard';
import ListingPage from './pages/ListingPage';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/listings" element={<ListingPage />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
        <footer style={{ padding: '4rem 0', textAlign: 'center', backgroundColor: 'var(--deep-navy)', color: 'white', marginTop: '4rem' }}>
          <div className="container">
            <h2 style={{ color: 'white', marginBottom: '1rem' }}>Islampur Property Portal</h2>
            <p style={{ opacity: 0.7 }}>Transforming property discovery in Maharashtra</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
