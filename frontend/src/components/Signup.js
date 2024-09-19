import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Signup = ({ handleLogin }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    country: '',
    state: '',
    city: '',
    whatsapp: '',
    phoneNumber: '',
    companyName: '',
  });
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agree) {
      setError('You must agree to the terms and conditions');
      return;
    }

    try {
      // Post request to signup route
      const response = await axios.post('http://88.222.245.28:5000/signup', formData);

      // Store the token and user details in local storage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('credits', response.data.credits); // Store default credits
      localStorage.setItem('userId', response.data.id); // Store user ID

      // Call handleLogin with credits and userId
      handleLogin(response.data.credits, response.data.id);

      setSuccess('Signup successful! Redirecting to login page...');
      
      // Redirect to login page
      navigate('/');
    } catch (error) {
      console.error('Signup error', error);
      setError('Error signing up');
    }
  };

  return (
    <div className='sign'>
      <div className="signup-form">
        <h2>Signup</h2>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        <form onSubmit={handleSubmit} className="signup-grid">
          <label>Full Name:</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <label>Country:</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          />

          <label>State:</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          />

          <label>City:</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />

          <label>WhatsApp Number:</label>
          <input
            type="text"
            name="whatsapp"
            value={formData.whatsapp}
            onChange={handleChange}
          />

          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />

          <label>Company Name (optional):</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
          />

          <div className="agree-terms">
            <input
              type="checkbox"
              name="agree"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              required
            />
            <label>I agree to the terms and conditions</label>
          </div>

          <button type="submit" className="register-btn">Register</button>
        </form>

        <div className="signin-link">
          <br />
          <br />
          Already have an account?
          <a style={{ color: 'red', fontSize: '18px' }} href='/login'> Sign in Now!</a> 
        </div>
      </div>
    </div>
  );
};

export default Signup;
