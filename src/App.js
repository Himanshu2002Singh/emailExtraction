import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import EmailFinder from './components/EmailFinder';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './Dashboard/Dashboard';
import Header from './components/Header';
import Footer from './components/footer';
import UserDetails from './Dashboard/userdetails';
import UpdateCredit from './Dashboard/UpdateCredits';
import Profile from './Dashboard/Profile';
import UserActivity from './Dashboard/Acriviry_log';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [credits, setCredits] = useState(0);
  const [id, setId] = useState(null);

  const handleLogin = (newCredits, id) => {
    setIsLoggedIn(true);
    setCredits(newCredits);
    setId(id);
  };
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setCredits(0);
    setId(null);
  };

  const location = useLocation();
  const isOnAdminPage = location.pathname.startsWith('/admin');

  return (
    <div className="App">
      {!isOnAdminPage && (
        <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} credits={credits} />
      )}
      <Routes>
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup handleLogin={handleLogin} />} />
        <Route path="/" element={<EmailFinder  id={id}/>} />
        <Route path="/admin" element={<Dashboard  handleLogout={handleLogout}/>} />
        <Route path='/admin-user-details' element={<UserDetails />} />
        <Route path='/admin-add-credits' element={<UpdateCredit />} />
        <Route path='/admin-user-activity' element={<UserActivity/>} />

        {/* Only render Profile if id is defined */}
        <Route 
          path="/admin-profile" 
          element={id ? <Profile id={id} /> : <Navigate to="/login" />} 
        />
      </Routes>
      {!isOnAdminPage && (
        <Footer />
      )}
    </div>
  );
};

export default App;
