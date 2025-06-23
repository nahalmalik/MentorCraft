import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../assets/css/LoginSignup.css';

const StudentRegister = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/api/students/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });
      const data = await response.json();
      if (data.status === 'success') {
        localStorage.setItem('userEmail', email);
        navigate('/student-dashboard');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <motion.div
      className="login-signup"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="login-signup-form">
        <h1>Student Registration</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
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
          <button type="submit">Register</button>
        </form>
        <p>
          Already have an account?{' '}
          <a href="/student-login" className="toggle-link">
            Login
          </a>
        </p>
      </div>
    </motion.div>
  );
};

export default StudentRegister;