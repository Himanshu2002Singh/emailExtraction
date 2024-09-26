import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import login1 from "../assets/img/login.avif";

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agree) {
      setError('You must agree to the terms and conditions');
      return;
    }

    try {
      const response = await axios.post('https://webmailextract.com/signup', formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('credits', response.data.credits); // Store default credits
      localStorage.setItem('userId', response.data.id); // Store user ID
      handleLogin(response.data.credits, response.data.id);
      setSuccess('Signup successful! Redirecting to login page...');
      navigate('/');
    } catch (error) {
      console.error('Signup error', error);
      setError('Error signing up');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <img src={login1} alt="Login" className="signup-image" />
        <h2>SIGN UP FOR NEW ACCOUNT</h2>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        <form onSubmit={handleSubmit} className="signup-grid">
          <div className="grid-row">
            <div>
              <label>First Name:</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="grid-row">
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="grid-row">
            <div>
              <label>Country:</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>State:</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="grid-row">
            <div>
              <label>City:</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>WhatsApp Phone No.:</label>
              <input
                type="text"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="grid-row">
            <div>
              <label>Company Name (optional):</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
              />
            </div>
            
          </div>
       
            <div className='texty'>
            <input
              type="checkbox"
              name="agree"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              required
            />
            
            <div  className='lity'>I agree to the terms and conditions</div>
          </div>
          <button type="submit" className="register-btn">Register</button>
        </form>
        <div className="signin-link">
          Already have an account?
          <a style={{ color: 'red', fontSize: '18px' }} href='/login'> Sign in Now!</a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
