// components/UserDetails.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserDetails.css';
import NavbarDashboard from './NavbarDashboard';
import ResponsiveDrawer from './Sidebar';
import { Box } from '@mui/material';
const UserDetails = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://webmailextract.com/users/details'); // Adjust the URL as needed
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching user data');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    
    <div>
      <NavbarDashboard />
      <Box height={100} />
      <Box sx={{ display: "flex" }}>
        <ResponsiveDrawer />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>

    <div className="user-details">
      <h2>User Details</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th> Credits</th>
            <th>Country</th>
            <th>State</th>
            <th>City</th>
            <th>WhatsApp</th>
            <th>Phone Number</th>
            <th>Company Name</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>{user.credits}</td>
              <td>{user.country}</td>
              <td>{user.state}</td>
              <td>{user.city}</td>
              <td>{user.whatsapp}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.companyName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </Box>
    </Box>
    </div>
  );
};

export default UserDetails;
