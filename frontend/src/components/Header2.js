import React, { useState } from "react";
import './Header2.css'; // Import your custom CSS for styling
import img2 from '../assets/img/webmail2[1].png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faStar } from '@fortawesome/free-solid-svg-icons';

const Header2 = ({ isLoggedIn, handleLogout, credits }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState);
  };

  return (
    <header>
      <div className="header container5">
        <div className="logo">
          <img style={{ width: '30%' }} src={img2} alt="Logo" />
        </div>

        <input
          className="hamburger-button"
          type="checkbox"
          id="hamburger-button"
          checked={isMenuOpen}
          onChange={toggleMenu}
        />
        <label htmlFor="hamburger-button" className="hamburger-label">
          <div></div>
        </label>

        <div className={`menu ${isMenuOpen ? "open" : ""}`}>
          <nav>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/">Email Finder</a></li>
              <li>
                <a href='#'>
                  Credits: {credits}
                </a>
              </li>
              <li>
                <a href='#'>
                 
                  <button className="buttons5">Subscribe</button>
                </a>
              </li>
              {isLoggedIn ? (
                <li className="profile-dropdown" onClick={toggleDropdown}>
                  <FontAwesomeIcon icon={faUser} className="profile-icon" />
                  {isDropdownOpen && (
                    <li className="dropdown-menu">
                        <a href="#">
                      <li><a href="/profile">My Profile</a></li>
                      <li><a href="/activity">Activity</a></li>
                      <li><a href="#" onClick={handleLogout}>Logout</a></li>
                      </a>
                    </li>
                  )}
                </li>
              ) : (
                <li>
                  <a href="/login">
                    <button className="buttons5">Login/Register</button>
                  </a>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header2;
