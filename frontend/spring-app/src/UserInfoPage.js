import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GamesComponent from './GamesComponent';

function UserInfoPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const userId = localStorage.getItem('userId');

  const fetchUserInfo = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.error('No token found');
        return;
      }
      const response = await axios.get(`http://localhost:8080/api/v1/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { email } = response.data;
      setEmail(email);
      const { password } = response.data;
      setPassword(password);
    } catch (error) {
      console.error('Failed to fetch user information:', error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const handleUpdateUserInfo = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.error('No token found');
        return;
      }

      const updatedData = {};
      if (newEmail) updatedData.email = newEmail;
      if (newPassword) updatedData.password = newPassword;

      const response = await axios.put(
        `http://localhost:8080/api/v1/users/update/${userId}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEmail(response.data.email);
      setNewEmail('');
      setNewPassword('');
      alert('User information updated successfully!');
    } catch (error) {
      console.error('Failed to update user information:', error);
      alert('Failed to update user information.');
    }
  };

  const handleDeleteUser = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.error('No token found');
        return;
      }

      await axios.delete(`http://localhost:8080/api/v1/users/delete/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert('User deleted successfully!');
      localStorage.clear(); 
      window.location.href = '/'; 
    } catch (error) {
      console.error('Failed to delete user:', error);
      alert('Failed to delete user.');
    }
  };

  return (
    <div>
      <h2>User Info</h2>
      <div>
        <h3>Email: {email}</h3>
        <h3>Password: {password}</h3>
        <input
          type="text"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          placeholder="Enter new email"
        />
      </div>
      <div>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter new password"
        />
      </div>
      <button onClick={handleUpdateUserInfo}>Update User Info</button>
      <button onClick={handleDeleteUser} style={{ color: 'red' }}>
        Delete User
      </button>

      <GamesComponent userId={userId} />
    </div>
  );
}

export default UserInfoPage;
