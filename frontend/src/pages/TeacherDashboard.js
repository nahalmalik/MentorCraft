import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import '../assets/css/MentorCraft.css';

const TeacherDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [queries, setQueries] = useState([]);
  const [error, setError] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [answerQuery, setAnswerQuery] = useState(null);
  const [answerInput, setAnswerInput] = useState('');

  // Random stats for demo
  const stats = {
    totalCourses: Math.floor(Math.random() * 5) + 1,
    activeCourses: courses.length,
    engagedStudents: Math.floor(Math.random() * 50) + 10,
    totalEarnings: Math.floor(Math.random() * 5000) + 1000,
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

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();
    if (!answerInput || !answerQuery) {
      setError('Answer is required');
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/students/answer_query/${answerQuery.id}/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answer: answerInput }),
      });
      const data = await response.json();
      console.log('Answer response:', data);
      if (data.status === 'success') {
        setQueries(queries.map((q) => (q.id === answerQuery.id ? { ...q, answer: answerInput } : q)));
        setAnswerQuery(null);
        setAnswerInput('');
        setError('');
      } else {
        setError(data.message || 'Failed to submit answer');
      }
    } catch (err) {
      console.error('Answer submission error:', err);
      setError('Failed to submit answer');
    }
  };

  return (
    <motion.div
      className="teacher-dashboard"
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
        <h1>Teacher Dashboard</h1>
        {error && <p className="error">{error}</p>}
        <div className="stats-grid">
          <motion.div className="stat-box" whileHover={{ scale: 1.05 }}>
            <h3>Active Courses</h3>
            <p>{stats.activeCourses}</p>
          </motion.div>
          <motion.div className="stat-box" whileHover={{ scale: 1.05 }}>
            <h3>Total Courses</h3>
            <p>{stats.totalCourses}</p>
          </motion.div>
          <motion.div className="stat-box" whileHover={{ scale: 1.05 }}>
            <h3>Engaged Students</h3>
            <p>{stats.engagedStudents}</p>
          </motion.div>
          <motion.div className="stat-box" whileHover={{ scale: 1.05 }}>
            <h3>Total Earnings</h3>
            <p>${stats.totalEarnings}</p>
          </motion.div>
        </div>
        <h2>My Courses</h2>
        <div className="courses-grid">
          {courses.length === 0 ? (
            <p>No courses available</p>
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
        <h2>Student Queries</h2>
        <div className="queries-grid">
          {queries.length === 0 ? (
            <p>No queries available</p>
          ) : (
            queries.map((query) => (
              <motion.div
                key={query.id}
                className="query-box"
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedQuery(query)}
              >
                <h3>{query.title}</h3>
                <button className="answer-btn" onClick={(e) => { e.stopPropagation(); setAnswerQuery(query); }}>
                  Answer
                </button>
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
              <p>Students: {selectedCourse.student_count}</p>
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
              <p>Answer: {selectedQuery.answer || 'No answer yet'}</p>
            </motion.div>
          </motion.div>
        )}
        {answerQuery && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setAnswerQuery(null)}
          >
            <motion.div
              className="modal-content"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={() => setAnswerQuery(null)}>×</button>
              <h2>Answer Query: {answerQuery.title}</h2>
              <form onSubmit={handleAnswerSubmit}>
                <textarea
                  value={answerInput}
                  onChange={(e) => setAnswerInput(e.target.value)}
                  placeholder="Enter your answer"
                  required
                  className="answer-textarea"
                />
                <button type="submit" className="submit-btn">Submit Answer</button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TeacherDashboard;