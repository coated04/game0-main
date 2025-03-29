import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './design.css';

function LoginComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/v1/auth/authenticate', { email, password });
      console.log('Authentication successful:', response.data);

      const { token, userId, role, email: userEmail } = response.data;
      localStorage.setItem('authToken', token);
      localStorage.setItem('userId', userId);
      localStorage.setItem('userRole', role); 
      localStorage.setItem('userEmail', userEmail);
      if (userId === 1) {
        localStorage.setItem('userRole', 'ADMIN');
      }

      toast.success('User authenticated successfully!');

      const userRole = localStorage.getItem('userRole');

      if (userRole === 'ADMIN' || userRole === 'SUPERUSER') {
        navigate('/gamescrud');
      } else {
        navigate('/games');
      }
    } catch (error) {
      console.error('Login error:', error.response);
      toast.error('Wrong email or password');
    }
  };

  return (
    <div>
      <h2>Login</h2>
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
      <button onClick={handleLogin}>Login</button>
      <Link to="/register">
  <button>Register</button>
</Link>

<Link to="/games">
  <button>See games</button>
  </Link>

      <ToastContainer />
    </div>
  );
}

export default LoginComponent;
