import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../assets/css/LoginSignup.css';

const StudentLoginSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Attempting login with:', { email, password });
    try {
      const response = await fetch('http://127.0.0.1:8000/api/students/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      console.log('Login response status:', response.status);
      const data = await response.json();
      console.log('Login response data:', data);
      if (data.status === 'success') {
        localStorage.setItem('userEmail', email);
        console.log('Stored userEmail:', localStorage.getItem('userEmail'));
        navigate('/student-dashboard');
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed: Unable to connect to server');
    }
  };

  return (
    <motion.div
      className="login-signup"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <header className="header">
        <div className="header-logo">
          <span>Mentor Craft</span>
        </div>
        <nav className="header-nav">
          <Link to="/">Home</Link>
          <Link to="/courses">All Courses</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </header>
      <div className="login-signup-form">
        <h1>Student Login</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account?{' '}
          <Link to="/student-register" className="toggle-link">
            Register
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default StudentLoginSignup;