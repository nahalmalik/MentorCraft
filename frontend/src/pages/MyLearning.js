import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../assets/css/MentorCraft.css';

const MyLearning = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');
  const [enrolled, setEnrolled] = useState(Math.floor(Math.random() * 10) + 1);
  const [completed, setCompleted] = useState(Math.floor(Math.random() * 5) + 1);
  const [incomplete, setIncomplete] = useState(enrolled - completed);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/students/courses/');
        const data = await response.json();
        if (data.status === 'success') {
          setCourses(data.courses);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError('Failed to fetch courses');
      }
    };
    fetchCourses();
  }, []);

  return (
    <motion.div
      className="student-dashboard"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="sidebar">
        <div className="sidebar-logo">Mentor Craft</div>
        <nav className="sidebar-nav">
          <Link to="/student-dashboard">Overview</Link>
          <Link to="/my-learning">My Learning</Link>
          <Link to="/browse-courses">Browse Courses</Link>
          <Link to="/my-queries">My Queries</Link>
          <Link to="/student-quizzes-assignments">Quizzes & Assignments</Link>
          <Link to="/settings">Settings</Link>
        </nav>
      </div>
      <div className="dashboard-content">
 
    <h1>My Progress</h1>
        <div className="stats-grid">
          <motion.div className="stat-box" whileHover={{ scale: 1.05 }}>
            <h3>Enrolled</h3>
            <p>{enrolled.toLocaleString()}</p>
          </motion.div>
          <motion.div className="stat-box" whileHover={{ scale: 1.05 }}>
            <h3>Complete Courses</h3>
            <p>{completed.toLocaleString()}</p>
          </motion.div>
          <motion.div className="stat-box" whileHover={{ scale: 1.05 }}>
            <h3>Incomplete Courses</h3>
            <p>{incomplete.toLocaleString()}</p>
          </motion.div>
        </div>
        <motion.h1
          align="center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          My Courses
        </motion.h1>
        {error && <p className="error">{error}</p>}
        <div className="course-list">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              className="course-card"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
            >
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <p>Instructor: {course.instructor_name}</p>
              <p>Progress: {course.progress}%</p>
              <Link to={`/course/${course.id}`} className="course-button">
                View Details
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default MyLearning;