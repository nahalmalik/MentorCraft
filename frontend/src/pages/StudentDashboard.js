import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import '../assets/css/MentorCraft.css';

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [queries, setQueries] = useState([]);
  const [error, setError] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedQuery, setSelectedQuery] = useState(null);

  // Random stats for demo
  const stats = {
    enrolledCourses: Math.floor(Math.random() * 5) + 1,
    totalCourses: courses.length,
    completedCourses: Math.floor(Math.random() * 3),
    totalQuizzes: Math.floor(Math.random() * 10) + 5,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coursesRes = await fetch('http://127.0.0.1:8000/api/courses/all/');
        const coursesData = await coursesRes.json();
        console.log('Courses data:', coursesData);
        if (coursesData.status === 'success') setCourses(coursesData.courses);

        const queriesRes = await fetch('http://127.0.0.1:8000/api/students/my_queries/');
        const queriesData = await queriesRes.json();
        console.log('Queries data:', queriesData);
        if (queriesData.status === 'success') setQueries(queriesData.queries);
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to load data');
      }
    };
    fetchData();
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
        <h1>Student Dashboard</h1>
        {error && <p className="error">{error}</p>}
        <div className="stats-grid">
          <motion.div className="stat-box" whileHover={{ scale: 1.05 }}>
            <h3>Enrolled Courses</h3>
            <p>{stats.enrolledCourses}</p>
          </motion.div>
          <motion.div className="stat-box" whileHover={{ scale: 1.05 }}>
            <h3>Total Courses</h3>
            <p>{stats.totalCourses}</p>
          </motion.div>
          <motion.div className="stat-box" whileHover={{ scale: 1.05 }}>
            <h3>Completed Courses</h3>
            <p>{stats.completedCourses}</p>
          </motion.div>
          <motion.div className="stat-box" whileHover={{ scale: 1.05 }}>
            <h3>Total Quizzes</h3>
            <p>{stats.totalQuizzes}</p>
          </motion.div>
        </div>
        <h2>Enrolled Courses</h2>
        <div className="courses-grid">
          {courses.length === 0 ? (
            <p>No courses enrolled</p>
          ) : (
            courses.map((course) => (
              <motion.div
                key={course.id}
                className="course-card"
                whileHover={{ scale: 1.05, boxShadow: '0 8px 16px rgba(0,0,0,0.2)' }}
                onClick={() => setSelectedCourse(course)}
              >
                {course.image ? (
                  <img src={course.image} alt={course.title} className="course-thumbnail" />
                ) : (
                  <div className="course-placeholder">No Image</div>
                )}
                <h3>{course.title}</h3>
              </motion.div>
            ))
          )}
        </div>
        <h2>My Queries</h2>
        <div className="queries-grid">
          {queries.length === 0 ? (
            <p>No queries submitted</p>
          ) : (
            queries.map((query) => (
              <motion.div
                key={query.id}
                className="query-box"
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedQuery(query)}
              >
                <h3>{query.title}</h3>
              </motion.div>
            ))
          )}
        </div>
      </div>
      <AnimatePresence>
        {selectedCourse && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCourse(null)}
          >
            <motion.div
              className="modal-content"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={() => setSelectedCourse(null)}>×</button>
              <h2>{selectedCourse.title}</h2>
              <p>{selectedCourse.description}</p>
              {selectedCourse.image && <img src={selectedCourse.image} alt={selectedCourse.title} className="modal-image" />}
              {selectedCourse.video && (
                <video controls className="modal-video">
                  <source src={selectedCourse.video} type="video/mp4" />
                </video>
              )}
              <p>Progress: {selectedCourse.student_count}%</p>
            </motion.div>
          </motion.div>
        )}
        {selectedQuery && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedQuery(null)}
          >
            <motion.div
              className="modal-content"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={() => setSelectedQuery(null)}>×</button>
              <h2>{selectedQuery.title}</h2>
              <p>{selectedQuery.content}</p>
              <p>Course: {selectedQuery.course_title}</p>
              <p>Answer: {selectedQuery.answer || 'Awaiting response'}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default StudentDashboard;