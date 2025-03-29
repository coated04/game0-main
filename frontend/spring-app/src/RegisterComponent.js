import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import './design.css';

function RegisterComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const isEmailValid = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return regex.test(email);
  };

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      toast.error('fill out all fields');
      return;
    }

    if (!isEmailValid(email)) {
      toast.error('Email must be a Gmail address');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
    
      const response = await axios.post('http://localhost:8080/api/v1/auth/register', { 
        email, 
        password 
      });
      console.log('User registered:', response.data);
      toast.success('User registered successfully');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      console.error('Registration error:', error.response ? error.response.data : error.message);
      toast.error('Registration failed');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Email" 
      />
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Password" 
      />
      <input 
        type="password" 
        value={confirmPassword} 
        onChange={(e) => setConfirmPassword(e.target.value)} 
        placeholder="Confirm password" 
      />
      <button onClick={handleRegister}>Register</button>
      <Link to="/login">
      <button>Login</button>
</Link>
<Link to="/games">
  <button>See games</button>
  </Link>
      <ToastContainer />
    </div>
  );
}

export default RegisterComponent;
