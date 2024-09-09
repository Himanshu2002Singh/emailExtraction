import React, { useState, useEffect } from 'react';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import img2 from '../assets/img/webmail2[1].png';

const Header = ({ isLoggedIn, handleLogout, credits }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Close dropdown if clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownOpen && !event.target.closest('.profile-dropdown')) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <img  style={{width:'50%'}} src={img2} alt="Logo" />
          
        </div>
        <nav className={`nav ${menuOpen ? 'open' : ''}`}>
          <ul>
            <li><a href="/">Email Finder</a></li>
            {/* <li><a href="#">Tools</a></li> */}
           
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
        <div className="actions">
          <div className="credits">
            <span>Credits</span>
            <span className="credit-count">{credits}</span>
          </div>
          <button className="subscribe">Subscribe</button>
          {isLoggedIn ? (
            <div className="profile-dropdown">
              <FontAwesomeIcon 
                icon={faUser} 
                className="profile-icon" 
                onClick={toggleDropdown} 
              />
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <a href="/profile">My Profile</a>
                  <a href="/activity">Activity</a>
                  <a href="#" onClick={handleLogout}>Logout</a>
                </div>
              )}
            </div>
          ) : (
            <a href='/login'>
              <button className="login">Login/Register</button>
            </a>
          )}
        </div>
        <button className="hamburger" onClick={toggleMenu}>
          ☰
        </button>
      </div>
    </header>
  );
};

export default Header;
