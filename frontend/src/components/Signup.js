import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css';  // Ensure you have the CSS styles updated as per your requirements
import login1 from "../assets/img/login.avif";  // You can remove this if the image is not needed

const Signup = ({ handleLogin }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    // country: '',
    // state: '',
    // city: '',
    // whatsapp: '',
    phoneNumber: '',
    // companyName: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://webmailextract.com/signup', formData);
      localStorage.setItem('token', response.data.token);
      handleLogin(response.data.credits, response.data.id);
      setSuccess('Signup successful! Redirecting...');
      navigate('/login');
    } catch (error) {
      setError('Error signing up');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2 className="signup-title">WEBMAILEXTRACTOR</h2>
        <p className="signup-subtitle">Create an account</p>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        <form onSubmit={handleSubmit} className="signup-inputs">
          <div className="input-group2">
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              placeholder="Full Name"
            />
            <i className="fa fa-user"></i>
          </div>
          <div className="input-group2">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Email"
            />
            <i className="fa fa-envelope"></i>
          </div>
          <div className="input-group2">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Password"
            />
            <i className="fa fa-lock"></i>
          </div>
          {/* <div className="input-group2">
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              placeholder="Country"
            />
            <i className="fa fa-globe"></i>
          </div>
          <div className="input-group2">
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              placeholder="State"
            />
            <i className="fa fa-map-marker-alt"></i>
          </div>
          <div className="input-group2">
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
              placeholder="City"
            />
            <i className="fa fa-city"></i>
          </div>
          <div className="input-group2">
            <input
              type="text"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              placeholder="WhatsApp"
            />
            <i className="fa fa-whatsapp"></i>
          </div> */}
          <div className="input-group2">
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              placeholder="Phone Number"
            />
            <i className="fa fa-phone"></i>
          </div>
          {/* <div className="input-group2">
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Company Name (optional)"
            />
            <i className="fa fa-building"></i>
          </div> */}
          <button type="submit" className="signup-button">Signup</button>
        </form>
        <div className="login-link">
          Already have an account? <a href="/login">Login</a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
