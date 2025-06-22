import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/TeacherDashboard.css';

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [instructor, setInstructor] = useState({ name: 'Loading...', id: null });
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/instructors/')
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        console.log('Instructors API response:', data);
        const loggedInInstructor = data.find((inst) => inst.email === 'test@example.com');
        setInstructor(loggedInInstructor || { name: 'Unknown User', id: null });
        if (loggedInInstructor && loggedInInstructor.id) {
          fetch(`http://127.0.0.1:8000/api/courses/?instructor_id=${loggedInInstructor.id}`)
            .then((response) => {
              if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
              return response.json();
            })
            .then((data) => {
              console.log('My Courses API response:', data);
              const coursesData = Array.isArray(data) ? data : data.results || [data];
              console.log('Processed my courses:', coursesData);
              setCourses(coursesData);
            })
            .catch((err) => console.error('Error fetching my courses:', err));
        }
      })
      .catch((err) => console.error('Error fetching instructor:', err));
  }, []);

  const handleLogout = () => {
    navigate('/teacher/login');
  };

  const handleCourseClick = (courseId) => {
    navigate(`/teacher/course/${courseId}`);
    // Note: Implement course detail page if needed, currently just navigates
  };

  return (
    <div className="teacher-dashboard">
      <div className="dashboard-header">
        <h1 className="header-title">Mentor Craft</h1>
        <div className="header-actions">
          <button className="new-course-btn" onClick={() => navigate('/teacher/create-course')}>
            New Course
          </button>
          <div className="user-profile">
            <img src="https://via.placeholder.com/40" alt="User Profile" />
            <span>Hello, {instructor.name}</span>
          </div>
        </div>
      </div>
      <div className="dashboard-container">
        <div className="sidebar">
          <h3>Dashboard</h3>
          <ul>
            <li><a href="/teacher/dashboard">Overview</a></li>
            <li><a href="/teacher/my-courses" className="active">My Courses</a></li>
            <li><a href="/teacher/students">Students</a></li>
            <li><a href="/teacher/settings">Settings</a></li>
            <li><a href="/teacher/create-course">Create New Course</a></li>
            <li><button className="logout-btn" onClick={handleLogout}>Logout</button></li>
          </ul>
        </div>
        <div className="main-content">
          <div className="courses-card">
            <h3>My Courses</h3>
            <div className="course-list">
              {Array.isArray(courses) ? (
                courses.map((course) => (
                  <div key={course.id} className="course-item" onClick={() => handleCourseClick(course.id)}>
                    {course.image_base64 && (
                      <div className="course-image">
                        <img src={`data:image/jpeg;base64,${course.image_base64}`} alt={course.title} />
                      </div>
                    )}
                    <h4>{course.title}</h4>
                    <p>{course.students || 0} Students</p>
                    <div className="course-status">
                      Enrolled: {course.students || 0} Students
                    </div>
                  </div>
                ))
              ) : (
                <p>No courses available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCourses;