import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../assets/css/MentorCraft.css';

const MyQueries = () => {
  const [queries, setQueries] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [queriesResponse, coursesResponse] = await Promise.all([
          fetch('http://127.0.0.1:8000/api/students/my_queries/'),
          fetch('http://127.0.0.1:8000/api/courses/all/'),
        ]);
        const queriesData = await queriesResponse.json();
        const coursesData = await coursesResponse.json();
        if (queriesData.status === 'success') setQueries(queriesData.queries);
        if (coursesData.status === 'success') setCourses(coursesData.courses);
      } catch (err) {
        setError('Failed to fetch data');
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCourse) {
      setError('Please select a course');
      return;
    }
    try {
      const response = await fetch('http://127.0.0.1:8000/api/students/submit_query/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, course: selectedCourse }),
      });
      const data = await response.json();
      if (data.status === 'success') {
        setQueries([...queries, data.query]);
        setSuccess('Query submitted successfully!');
        setError('');
        setTitle('');
        setContent('');
        setSelectedCourse('');
        setShowForm(false);
      } else {
        setError(data.message);
        setSuccess('');
      }
    } catch (err) {
      setError('Failed to submit query');
      setSuccess('');
    }
  };

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
        <button className="course-button" onClick={() => setShowForm(true)} style={{ marginBottom: '20px' }}>
          Create New Query
        </button>
        <motion.h1
          align="center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          My Queries
        </motion.h1>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <div className="course-list">
          {queries.map((query, index) => (
            <motion.div
              key={query.id}
              className="course-card"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
            >
              <h3>{query.title}</h3>
              <p>{query.content.substring(0, 50)}...</p>
              <p>Created: {new Date(query.created_at).toLocaleDateString()}</p>
            </motion.div>
          ))}
        </div>
        {showForm && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="modal-content"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <button className="modal-close" onClick={() => setShowForm(false)}>×</button>
              <h2>Create New Query</h2>
              <select
                className="form-input"
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                required
              >
                <option value="">Select a Course</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.title}
                  </option>
                ))}
              </select>
              <input
                type="text"
                className="form-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Query Title"
                required
              />
              <textarea
                className="form-input"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Query Content"
                required
              />
              <button className="submit-btn" onClick={handleSubmit}>
                Submit
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default MyQueries;