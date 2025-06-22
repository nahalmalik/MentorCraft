import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/LoginSignup.css';

const LoginSignup = ({ isLogin }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = `http://127.0.0.1:8000/api/instructors/${isLogin ? 'login/' : 'signup/'}`;
    console.log('Fetching:', url, 'with data:', formData);

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCookie('csrftoken'), // Add CSRF token
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        console.log('Response status:', response.status);
        if (!response.ok) {
          return response.json().then((data) => {
            throw new Error(data.message || `HTTP error! Status: ${response.status}`);
          });
        }
        return response.json();
      })
      .then((data) => {
        if (data.status === 'success') {
          // Store token or user ID (assuming backend returns it)
          localStorage.setItem('instructorToken', data.token || data.id); // Adjust based on backend response
          navigate('/teacher/dashboard');
        } else {
          throw new Error(data.message || 'Operation failed');
        }
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setError(err.message || 'Network error or invalid credentials');
      });
  };

  // Utility function to get CSRF token
  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  return (
    <div className="login-signup">
      <div className="login-signup-form">
        <h1>{isLogin ? 'Teacher Login' : 'Teacher Signup'}</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="Password"
            required
          />
          <button type="submit">{isLogin ? 'Login' : 'Signup'}</button>
        </form>
        <a href={isLogin ? '/teacher/signup' : '/teacher/login'} className="toggle-link">
          {isLogin ? 'Need an account? Signup' : 'Already have an account? Login'}
        </a>
      </div>
    </div>
  );
};

export default LoginSignup;