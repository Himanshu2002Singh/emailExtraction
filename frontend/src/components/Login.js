import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import login1 from "../assets/img/login.avif";

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
      <div className="login-form">
        <img src={login1} alt="Login" className="login-image" />
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit} className="login-inputs">
          <div className="input-group">
            <label>Email:</label>
            
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              placeholder="Enter your email"
            />
          </div>
          <div className="input-group">
            <label>Password:</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        <div className="signup-link">
          No Account? <a href='/signup'> Sign Up Now!</a> 
        </div>
      </div>
    </div>
  );
};

export default Login;
