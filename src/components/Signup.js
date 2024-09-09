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
      const response = await axios.post('http://localhost:5000/signup', formData);
      
      // Assuming the signup returns the same token and user info
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('credits', 100); // Example default credits
      localStorage.setItem('userId', response.data.id);

      handleLogin(100, response.data.id); 
      setSuccess('Signup successful! Redirecting to home page...');
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
          {/* Form fields */}
          {/* ... */}
          <button type="submit" className="register-btn">Register</button>
        </form>
        <div className="signin-link">
          <br></br>
          <br></br>
          Already have an account?
          <a style={{ color: 'red', fontSize: '18px' }} href='/login'> Sign in Now!</a> 
        </div>
      </div>
    </div>
  );
};

export default Signup;
