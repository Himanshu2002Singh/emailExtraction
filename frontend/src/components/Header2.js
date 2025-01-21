import React, { useState , useRef, useEffect} from "react";
import '../App.css'; // Import your custom CSS for styling
import img2 from '../assets/img/webmail2[1].png';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'; // Importing user icon

const Header2 = ({ isLoggedIn, handleLogout, credits }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [isNavOpen, setNavOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

 

  // Handle clicks outside the dropdown to close it
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

   // Toggle the mobile navigation menu
   const toggleNav = () => {
    setNavOpen(!isNavOpen);
  };


  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Web<span className="text-danger">Mail</span><span className="text-primary">Extractor</span>
          </Link>
          <button 
            aria-controls="basic-navbar-nav"
            type="button"
            onClick={toggleNav}
            aria-label="Toggle navigation"
            className={`navbar-toggler ${isNavOpen ? 'collapsed' : ''}`}
            data-toggle="collapse"
            data-target="#basic-navbar-nav"
          >
            <span className="navbar-toggler-icon kivy">
              <div></div>
              <div></div>
              <div></div>
            </span>
          </button>
          <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`}  id="basic-navbar-nav">
            <div className="navbar-nav mr-auto">
              <Link className="nav-link" to="/">Home</Link>
              
              {isLoggedIn && (
        <Link className="nav-link" to="/email/finder">Email Finder</Link>
      )}
              <Link className="nav-link" to="/contact">Contact</Link>
            </div>
            <div className="ml-auto pb-4 pb-lg-0 mt-3 mt-lg-0">
              <div className="btns">
                <Link className="text-warning text-decoration-none mr-2" to="/web-email-finder">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 1024 1024"
                    className="mr-1"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 464H528V448h312v128zm0 264H184V184h656v200H496c-17.7 0-32 14.3-32 32v192c0 17.7 14.3 32 32 32h344v200zM580 512a40 40 0 1 0 80 0 40 40 0 1 0-80 0z"></path>
                  </svg>
                  Credits
                  <span id="emailFinderCredits" className="mr-2 ml-2 badge badge-pill badge-warning">{credits}</span>
                </Link>
                <button className="btn btn-warning mr-2">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 1024 1024"
                    fontSize="20"
                    className="mr-1"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-40 110.8V792H136V270.8l-27.6-21.5 39.3-50.5 42.8 33.3h643.1l42.8-33.3 39.3 50.5-27.7 21.5zM833.6 232L512 482 190.4 232l-42.8-33.3-39.3 50.5 27.6 21.5 341.6 265.6a55.99 55.99 0 0 0 68.7 0L888 270.8l27.6-21.5-39.3-50.5-42.7 33.2z"></path>
                  </svg>
                  Subscribe
                </button>

                
              {isLoggedIn ? (
                <div className="profile-dropdown" ref={dropdownRef}>
                  <FontAwesomeIcon
                    icon={faUser}
                    className="profile-icon"
                    onClick={toggleDropdown}
                  />
                  {isDropdownOpen && (
                    <ul className="headerdropdown">
                      <li><Link to="/profile">My Profile</Link></li>
                      <li><Link to="/activity">Activity</Link></li>
                      <li><a href="#" onClick={handleLogout}>Logout</a></li>
                    </ul>
                  )}
                </div>
              )  : (
                  <Link className="btn btn-danger" to="/login">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 1024 1024"
                      fontSize="20"
                      className="mr-1"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M858.5 763.6a374 374 0 0 0-80.6-119.5 375.63 375.63 0 0 0-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 0 0-80.6 119.5A371.7 371.7 0 0 0 136 901.8a8 8 0 0 0 8 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 0 0 8-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z"></path>
                    </svg>
                    Login/Register
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="navbarspace"></div>
    </>
  );
};

export default Header2;
