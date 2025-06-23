import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../assets/css/MentorCraft.css';

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/courses/all/');
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

  const displayedCourses = showAll ? courses : courses.slice(0, 4);

  return (
    <motion.div
      className="my-courses"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
   <div className="sidebar">
        <div className="sidebar-logo">Mentor Craft</div>
        <h2 className="sidebar-title">Teacher Dashboard</h2>
        <nav className="sidebar-nav">
          <Link to="/teacher-dashboard">Overview</Link>
          <Link to="/create-course">Create Course</Link>
          <Link to="/my-earnings">My Earnings</Link>
          <Link to="/my-courses">My Courses</Link>
          <Link to="/quizzes-assignments">Quizzes & Assignments</Link>
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
          My Courses
        </motion.h1>
        {error && <p className="error">{error}</p>}
        <div className="course-list">
          {displayedCourses.map((course, index) => (
            <motion.div
              key={course.id}
              className="course-card"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
            >
              {course.image ? (
                <img
                  src={`http://127.0.0.1:8000${course.image}`}
                  alt={course.title}
                  className="course-thumbnail"
                />
              ) : (
                <div className="course-placeholder">No Image</div>
              )}
              <h3>{course.title}</h3>
              <p>{course.description.substring(0, 100)}...</p>
              <p>Students Enrolled: {course.student_count}</p>
              <Link to={`/course/${course.id}`} className="course-button">
                View Details
              </Link>
            </motion.div>
          ))}
        </div>
        {courses.length > 4 && !showAll && (
          <motion.button
            className="show-more-btn"
            onClick={() => setShowAll(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            Show More
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default MyCourses;