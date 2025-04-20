import { useState } from 'react';
import '../Style/Navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <a href="/">
    <img 
      src="https://i.ibb.co/G3HFGfxb/Whats-App-Image-2025-03-06-at-04-23-58.jpg" 
      alt="Logo" 
      style={{ width: 150, height: "auto" }} 
    />
  </a>
        </div>
        <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
          <a href="/" className="nav-link">Home</a>
          <a href="/about" className="nav-link">About</a>
          <a href="/services" className="nav-link">Team</a>
          <a href="/contact" className="nav-link">Contact</a>
          <div className="auth-buttons">
            <a href="/signin" className="auth-button signin">Sign In</a>
            <a href="/signup" className="auth-button signup">Sign Up</a>
          </div>
        </div>
        <div className="hamburger" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
