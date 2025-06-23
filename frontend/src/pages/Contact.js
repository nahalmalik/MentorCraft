import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../assets/css/home.css';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/api/contact/submit/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await response.json();
      if (data.status === 'success') {
        setSuccess('Message sent successfully!');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to send message');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="home-container"
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
        <div>
          <Link to="/student/login">
            <button className="header-button start-learning">Start Learning</button>
          </Link>
          <Link to="/instructor">
            <button className="header-button instructor">Instructor</button>
          </Link>
        </div>
      </header>

      {/* Contact Section */}
      <section className="contact-section">
        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
        >
          Contact Us
        </motion.h2>
        {error && (
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{ color: 'red', textAlign: 'center' }}
          >
            {error}
          </motion.p>
        )}
        {success && (
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{ color: 'green', textAlign: 'center' }}
          >
            {success}
          </motion.p>
        )}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
          className="contact-form"
        >
          <motion.input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            whileFocus={{ scale: 1.02, transition: { duration: 0.2 } }}
          />
          <motion.input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            whileFocus={{ scale: 1.02, transition: { duration: 0.2 } }}
          />
          <motion.textarea
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            whileFocus={{ scale: 1.02, transition: { duration: 0.2 } }}
          />
          <motion.button
            type="submit"
            className="course-button"
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          >
            Send Message
          </motion.button>
        </motion.form>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-grid">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
          >
            <p className="footer-title">Mentor Craft</p>
            <p>Empowering global learners with top education.</p>
            <div className="footer-social">
              <a href="#">Facebook</a>
              <a href="#">Twitter</a>
              <a href="#">Instagram</a>
            </div>
          </motion.div>
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
          >
            <p className="footer-title">Popular Courses</p>
            <ul>
              <li><Link to="/courses">Web Development</Link></li>
              <li><Link to="/courses">Data Science</Link></li>
              <li><Link to="/courses">Java Programming</Link></li>
              <li><Link to="/courses">UI/UX Design</Link></li>
              <li><Link to="/courses">Digital Marketing</Link></li>
            </ul>
          </motion.div>
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
          >
            <p className="footer-title">Contact Info</p>
            <p>Email: support@mentorcraft.com</p>
            <p>Phone: +1 234 567 890</p>
          </motion.div>
        </div>
        <motion.p 
          className="footer-copyright"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
        >
          © 2025 Mentor Craft. All rights reserved.
        </motion.p>
      </footer>
    </motion.div>
  );
};

export default Contact;