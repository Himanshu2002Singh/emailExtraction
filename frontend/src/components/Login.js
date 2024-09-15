import React, { useState } from 'react';
import axios from 'axios';
import './Header.css';
import { useNavigate } from 'react-router-dom';

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://88.222.245.28:5000/login', { email, password });

      // Store token in localStorage
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
    <div>
      <div className="login-form">
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label>Password:</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              placeholder="Enter your password"
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <div>
          <br></br>
          <br></br>
          No Account? <a style={{color: 'red', fontSize:'18px' }} href='/signup'> Sign Up Now!</a> 
        </div>
      </div>
    </div>
  );
};

export default Login;
