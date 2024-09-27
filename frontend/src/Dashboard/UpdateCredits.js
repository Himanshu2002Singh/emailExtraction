import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UpdateCredit.css';
import NavbarDashboard from './NavbarDashboard';
import { Box } from '@mui/material';
import ResponsiveDrawer from './Sidebar';

const UpdateCredit = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://webmailextract.com/admin-add-credits');
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching user data');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleUpdate = async (userId, field, value) => {
    try {
      await axios.put(`https://webmailextract.com/admin-add-credits/${userId}`, { [field]: value });
      alert('User updated successfully');
    } catch (error) {
      alert('Error updating user');
    }
  };

  const handleInputChange = (userId, field, value) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, [field]: value } : user
      )
    );
  };

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
          <div className="update-credit">
            <h2>Update User Credit and Expiration Date</h2>
            <table className="user-table">
              <thead>
                <tr>
                  <th>ID</th> 
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Credit</th>
                  <th>Expiration Date</th>
                  <th>Maximum Input </th>
                  
                  <th>Update Input</th>
                  <th>Update ExpiryDate</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.fullName}</td>
                    <td>{user.email}</td>
                    <td>{user.phoneNumber}</td>
                    <td>{user.credits}</td>
                      
                   
                    <td>
                      <input
                        type="date"
                        value={user.expirationDate || ''}
                        onChange={(e) => handleInputChange(user.id, 'expirationDate', e.target.value)}
                      />
                    </td>

                    <td>
                    <input
                        type="number"
                        step="0.01"
                        min="0"
                        value={user.input_max || ''}
                        onChange={(e) => handleInputChange(user.id, 'input_max', e.target.value)}
                      />
                    </td>
                   
                    <td>
                      <button onClick={() => handleUpdate(user.id, 'input_max', user.input_max)}>Update Input</button>
                    </td>
                    <td>
                      <button onClick={() => handleUpdate(user.id, 'expirationDate', user.expirationDate)}>Update Expiration Date</button>
                    </td>
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

export default UpdateCredit;
