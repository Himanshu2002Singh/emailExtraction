import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';
import { Box, Grid, Typography, Avatar, TextField, Button } from '@mui/material';
import ResponsiveDrawer from './Sidebar';
import NavbarDashboard from './NavbarDashboard';

const Profile = ({ id }) => {
  const [profile, setProfile] = useState({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError('Invalid profile ID');
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users-profile/${id}`);
        setProfile(response.data);
        setEmail(response.data.email || '');
        setPhoneNumber(response.data.phoneNumber || '');
        setLoading(false);
      } catch (error) {
        setError('Error fetching profile data');
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  const handleProfileUpdate = async () => {
    if (!email || !phoneNumber) {
      alert('Email and phone number are required');
      return;
    }

    const formData = new FormData();
    formData.append('email', email);
    if (password) {
      formData.append('password', password);
    }
    formData.append('phoneNumber', phoneNumber);
    if (profilePhoto) {
      formData.append('profilePhoto', profilePhoto);
    }

    try {
      await axios.put(`http://localhost:5000/users/${id}/profile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Profile updated successfully');
    } catch (error) {
      alert('Error updating profile');
    }
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
      <Box sx={{ display: 'flex' }}>
        <ResponsiveDrawer />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Grid container spacing={3}>
            {/* Left Side - User Details */}
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  p: 2,
                  boxShadow: 3,
                  borderRadius: 2,
                  backgroundColor: '#f9f9f9',
                }}
              >
                <Avatar
                  src={`http://localhost:5000${profile.profilePhoto}`}
                  alt="Profile"
                  sx={{ width: 100, height: 100, mb: 2 }}
                />
                <Typography variant="h6">{profile.name || 'User Name'}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {email}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {phoneNumber}
                </Typography>
              </Box>
            </Grid>

            {/* Right Side - Update Form */}
            <Grid item xs={12} md={8}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  p: 2,
                  boxShadow: 3,
                  borderRadius: 2,
                }}
              >
                <Typography variant="h5" gutterBottom>
                  Update Profile
                </Typography>
                <input
                  type="file"
                  onChange={(e) => setProfilePhoto(e.target.files[0])}
                  style={{ marginBottom: '1rem' }}
                />
                <TextField
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  sx={{ marginBottom: '1rem' }}
                />
                <TextField
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  sx={{ marginBottom: '1rem' }}
                />
                <TextField
                  label="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  fullWidth
                  sx={{ marginBottom: '1rem' }}
                />
                <Button variant="contained" color="primary" onClick={handleProfileUpdate}>
                  Update Profile
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
};

export default Profile;
