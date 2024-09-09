import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './activity_log.css';
import { Box, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import NavbarDashboard from './NavbarDashboard';
import ResponsiveDrawer from './Sidebar';

const UserActivity = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [activityLogs, setActivityLogs] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users_activity2');
        // Filter users with role 'user'
        const filteredUsers = response.data.filter(user => user.role === 'user');
        setUsers(filteredUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const fetchActivityLogs = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/activity_log/${id}`);
      setActivityLogs(response.data);
    } catch (error) {
      console.error('Error fetching activity logs:', error);
    }
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    fetchActivityLogs(user.id);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedUser(null);
    setActivityLogs([]);
  };

  return (
    <div>
      <NavbarDashboard />
      <Box height={100} />
      <Box sx={{ display: "flex" }}>
        <ResponsiveDrawer />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <h1>User Activity</h1>
          <div className="user-list">
            <h2>Users</h2>
            <Table component={Paper}>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Phone Number</TableCell>
                  <TableCell>Email</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id} onClick={() => handleUserClick(user)} style={{ cursor: 'pointer' }}>
                    <TableCell>{user.fullName}</TableCell>
                    <TableCell>{user.phoneNumber}</TableCell>
                    <TableCell>{user.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Box>
      </Box>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="user-activity-title"
        aria-describedby="user-activity-description"
      >
        <Box sx={{ ...style, width: 900 }}>
          <h2 id="user-activity-title">Activity Log for {selectedUser?.fullName}</h2>
          <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Details</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {activityLogs.length > 0 ? (
                  activityLogs.map((log, index) => (
                    <TableRow key={index}>
                      <TableCell>{log.activity}</TableCell>
                      <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2}>No activity found for this user.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal>
    </div>
  );
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default UserActivity;
