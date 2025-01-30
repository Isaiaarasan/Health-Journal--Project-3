import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../CSS/Navigation.css';

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="sd-main-nav">
      <div className="nav-container">
        <div className="nav-left">
          <Link to="/" className="nav-logo">Health Journal</Link>
        </div>
        
        <div className="nav-links">
          <Link 
            to="/home" 
            className={location.pathname === '/home' ? 'active' : ''}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className={location.pathname === '/about' ? 'active' : ''}
          >
            About
          </Link>
          <Link 
            to="/publish" 
            className={location.pathname === '/publish' ? 'active' : ''}
          >
            Publish
          </Link>
          <Link 
            to="/articles" 
            className={location.pathname === '/articles' ? 'active' : ''}
          >
            Latest Articles
          </Link>
          <Link 
            to="/submissions" 
            className={location.pathname === '/submissions' ? 'active' : ''}
          >
            Submissions
          </Link>
        </div>

        <div className="nav-right">
          <Link to="/login" className="nav-btn">Login</Link>
          <Link to="/signup" className="nav-btn primary">Register</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 