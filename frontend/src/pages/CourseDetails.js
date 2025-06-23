import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../assets/css/Courses.css';

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [error, setError] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');

  useEffect(() => {
    const fetchCourse = async () => {
      const email = localStorage.getItem('userEmail');
      if (!email) {
        setError('Please log in to view course details');
        return;
      }
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/courses/${id}/details/`, {
          headers: { 'X-Email': email },
        });
        const data = await response.json();
        if (data.status === 'success') {
          setCourse(data.course);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError('Failed to fetch course details');
      }
    };
    fetchCourse();
  }, [id]);

  const handlePayment = () => {
    // Mocked payment
    setPaymentStatus('Payment successful (mocked)! Enrolled in course.');
    setTimeout(() => setPaymentStatus(''), 3000);
  };

  if (!course) return <p>Loading...</p>;

  return (
    <motion.div
      className="course-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
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
      </header>
      <h2>{course.title}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {paymentStatus && <p style={{ color: 'green' }}>{paymentStatus}</p>}
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <p><strong>Description:</strong> {course.description}</p>
        <p><strong>Instructor:</strong> {course.instructor_name}</p>
        <p><strong>Students Enrolled:</strong> {course.student_count}</p>
        <p><strong>Syllabus:</strong> {course.syllabus}</p>
        <div style={{ margin: '1rem 0' }}>
          <h3>Course Video (Mocked)</h3>
          <video controls style={{ width: '100%', maxHeight: '400px' }}>
            <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <button onClick={handlePayment} className="course-button" style={{ marginRight: '1rem' }}>
          Enroll Now (Mocked Payment)
        </button>
        <Link to={`/quiz/${id}`} className="course-button">
          Take Quiz
        </Link>
      </div>
    </motion.div>
  );
};

export default CourseDetails;