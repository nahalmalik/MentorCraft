import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../assets/css/MentorCraft.css';

const Settings = () => {
  return (
    <motion.div
      className="settings"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="sidebar">
        <div className="sidebar-logo">Mentor Craft</div>
        <nav className="sidebar-nav">
          <h2 className="sidebar-title">Teacher Dashboard</h2>
          <Link to="/teacher-dashboard">Overview</Link>
          <Link to="/create-course">Create Course</Link>
          <Link to="/my-earnings">My Earnings</Link>
          <Link to="/my-courses">My Courses</Link>
          <Link to="/quizzes-and-assignments">Quizzes & Assignments</Link>
          <Link to="/settings">Settings</Link>
        </nav>
      </div>
      <div className="dashboard-content">
        <motion.h1
          align="center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Settings
        </motion.h1>
        <div className="course-list">
          <motion.div
            className="course-card"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <h3>Profile</h3>
            <Link to="/settings/profile" className="course-button">
              Edit Profile
            </Link>
          </motion.div>
          <motion.div
            className="course-card"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <h3>Notifications</h3>
            <Link to="/settings/notifications" className="course-button">
              Manage Notifications
            </Link>
          </motion.div>
          <motion.div
            className="course-card"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <h3>Security</h3>
            <Link to="/settings/security" className="course-button">
              Change Password
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Settings;