import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../assets/css/MentorCraft.css';

const BrowseCourses = () => {
  const [courses, setCourses] = useState([]);
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          searchQuery
            ? `http://127.0.0.1:8000/api/courses/search/?q=${encodeURIComponent(searchQuery)}`
            : 'http://127.0.0.1:8000/api/courses/all/'
        );
        const data = await response.json();
        if (data.status === 'success') {
          setCourses(data.courses);
          setRecommendedCourses(data.courses.sort(() => 0.5 - Math.random()).slice(0, 2));
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError('Failed to fetch courses');
      }
    };
    fetchCourses();
  }, [searchQuery]);

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
        <motion.h1
          align="center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Browse Courses
        </motion.h1>
        <input
          type="text"
          className="form-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search courses..."
          style={{ marginBottom: '20px', width: '100%' }}
        />
        {error && <p className="error">{error}</p>}
        <h3>Recommended Courses</h3>
        <div className="course-list">
          {recommendedCourses.map((course, index) => (
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
              <Link to={`/course/${course.id}`} className="course-button">
                View Details
              </Link>
            </motion.div>
          ))}
        </div>
        <h3>All Courses</h3>
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

export default BrowseCourses;