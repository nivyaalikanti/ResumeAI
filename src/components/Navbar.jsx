import React, { useState, useEffect } from 'react';
import '../styles/Navbar.css';
import logo from '../assets/images/beforelogo.png';
import { Link } from 'react-router-dom';
import { scroller } from 'react-scroll';
import { useUser } from '../context/UserContext'; // Import the useUser hook

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { currentUser, logout } = useUser(); // Get currentUser and logout function

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const scrollTo = (section) => {
    if (window.location.pathname === '/') {
      scroller.scrollTo(section, {
        smooth: true,
        duration: 500,
      });
    }
  };

  const handleLogout = () => {
    logout();
    // Optional: redirect to home page after logout
    // navigate('/');
  };

  return (
    <header className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="ResumeAI Logo" />
        </Link>
      </div>
      <nav className="nav-links">
        <ul>
          <li>
            <Link to="/" onClick={() => scrollTo('features')}>
              Features
            </Link>
          </li>
          <li>
            <Link to="/" onClick={() => scrollTo('templates')}>
              Templates
            </Link>
          </li>
          <li><Link to="/pricing">Pricing</Link></li>
          <li><Link to="/ats-score">ATS Score</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </nav>
      <div className="cta-buttons">
        {currentUser ? (
          // Display user's name and logout option when logged in, but keep Start Free button
          <div className="user-menu">
            <span className="user-name">Hello, {currentUser.name}</span>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
            <Link to="/" className="start-free-btn">Start Free</Link>
          </div>
        ) : (
          // Display both buttons when not logged in
          <>
            <Link to="/login" className="sign-in-btn">Sign In</Link>
            <Link to="/" className="start-free-btn"  onClick={() => scrollTo('templates')}>Start Free</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;