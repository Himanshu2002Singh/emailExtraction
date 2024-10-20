import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; // The updated CSS file with placeholder icons
import { useNavigate } from 'react-router-dom';
import login1 from "../assets/img/login.avif"; // Assuming this is the image path

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://webmailextract.com/login', { email, password });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('credits', response.data.credits);
      localStorage.setItem('userId', response.data.id);

      handleLogin(response.data.credits, response.data.id);

      if (response.data.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');                                                
      }
    } catch (error) {
      console.error('Login error', error);
      setError('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">WebMailExtractor</h2>
        <p className="login-subtitle">Login to User /Admin Panel</p>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit} className="login-inputs">
          <div className="input-group">
            <div className="input-wrapper">
              <i className="fas fa-envelope input-icon"></i>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                placeholder="Email"
              />
            </div>
          </div>
          <div className="input-group">
            <div className="input-wrapper">
              <i className="fas fa-lock input-icon"></i>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                placeholder="Password"
              />
            </div>
          </div>
          <div className="login-options">
            <div className="remember-me">
              <input type="checkbox" id="rememberMe" />
              <label htmlFor="rememberMe">Remember Me</label>
            </div>
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        <div className="signup-link">
          <p>Don't have any account? <a href='/signup'>Signup</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
