import React, { useState, useEffect } from 'react';
import '../styles/Navbar.css';
import logo from '../assets/images/beforelogo.png';
import { Link, useNavigate } from 'react-router-dom';
import { scroller } from 'react-scroll';
import { useUser } from '../context/UserContext';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { currentUser, logout } = useUser();
  const navigate = useNavigate();

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

  const handleSave = () => {
    console.log('Saving resume...');
    alert('Resume saved successfully!');
  };

  const handleSaveAsPDF = () => {
    console.log('Saving as PDF...');
    alert('Downloading as PDF...');
  };

  const handleLogout = () => {
    logout();
  };

  const handleMyProfile = () => {
    navigate('/complete-profile');
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
          <div className="user-menu">
            <span className="user-name">Hello, {currentUser.name}</span>
            <button style={{padding:'12px', width:'100px'}}
              onClick={handleMyProfile} 
              className="primary-btn"
              title="Go to your profile"
            >
              Profile
            </button>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        ) : (
          <>
            <Link to="/login" className="sign-in-btn">Sign In</Link>
            {/* <Link to="/signup" className="sign-up-btn">Sign Up</Link> */}
          </>
        )}
      </div>
    </header>
  );
};

export default Header;