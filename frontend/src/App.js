import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import EmailFinder from './components/EmailFinder';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './Dashboard/Dashboard';
import Header2 from './components/Header2';
import Footer from './components/footer';
import UserDetails from './Dashboard/userdetails';
import UpdateCredit from './Dashboard/UpdateCredits';
import Profile from './Dashboard/Profile';
import UserActivity from './Dashboard/Acriviry_log';
import PrivateRoute from './components/PrivateRoutes';
import Website from './Website3';


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
        <Header2 isLoggedIn={isLoggedIn} handleLogout={handleLogout} credits={credits} />
      )}
      <Routes>
        <Route path='/' element={<Website/>}/>
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup handleLogin={handleLogin} />} />
        <Route path="/email/finder" element={<EmailFinder id={id} />} />

        {/* Protecting Admin Routes */}
        <Route path="/admin" element={
          <PrivateRoute isLoggedIn={isLoggedIn}>
            <Dashboard handleLogout={handleLogout} />
          </PrivateRoute>
        } />

        <Route path="/admin-user-details" element={
          <PrivateRoute isLoggedIn={isLoggedIn}>
            <UserDetails />
          </PrivateRoute>
        } />

        <Route path="/admin-add-credits" element={
          <PrivateRoute isLoggedIn={isLoggedIn}>
            <UpdateCredit />
          </PrivateRoute>
        } />

        <Route path="/admin-user-activity" element={
          <PrivateRoute isLoggedIn={isLoggedIn}>
            <UserActivity />
          </PrivateRoute>
        } />

        <Route path="/admin-profile" element={
          <PrivateRoute isLoggedIn={isLoggedIn}>
            <Profile id={id} />
          </PrivateRoute>
        } />
      </Routes>
      {!isOnAdminPage && (
        <Footer />
      )}
    </div>
  );
};

export default App;
