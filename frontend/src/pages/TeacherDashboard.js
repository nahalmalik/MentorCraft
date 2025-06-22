import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/TeacherDashboard.css';

const TeacherDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [stats, setStats] = useState({ totalCourses: 0, activeStudents: 0, earnings: 0 });
  const [instructor, setInstructor] = useState({ name: 'Loading...', id: null });
  const [queries, setQueries] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [answerForm, setAnswerForm] = useState(null);
  const [answerText, setAnswerText] = useState('');
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
      })
      .catch((err) => console.error('Error fetching instructor:', err));

    fetch('http://127.0.0.1:8000/api/courses/')
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        console.log('Courses API response:', data);
        const coursesData = Array.isArray(data) ? data : data.results || [data];
        console.log('Processed coursesData:', coursesData);
        if (!Array.isArray(coursesData)) {
          console.error('Courses data is not an array:', coursesData);
          setCourses([]);
        } else {
          setCourses(coursesData);
          setStats({
            totalCourses: coursesData.length,
            activeStudents: coursesData.reduce((sum, course) => sum + (course.students || 0), 0),
            earnings: coursesData.length * 100,
          });
        }
      })
      .catch((err) => console.error('Error fetching courses:', err));

    fetch('http://127.0.0.1:8000/api/students/')
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        console.log('Students API response:', data);
        const sampleQueries = Array.isArray(data) ? data.filter(q => q.course__title) : (data.results || [data]).filter(q => q.course__title);
        console.log('Processed queries:', sampleQueries);
        setQueries(sampleQueries);
      })
      .catch((err) => console.error('Error fetching queries:', err));
  }, []);

  const handleLogout = () => {
    navigate('/teacher/login');
  };

  const handleCourseClick = (courseId) => {
    fetch(`http://127.0.0.1:8000/api/courses/${courseId}/`)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        console.log('Selected course data:', data);
        setSelectedCourse(data);
        setSelectedQuery(null);
        setAnswerForm(null);
      })
      .catch((err) => console.error('Error fetching course details:', err));
  };

  const handleQueryClick = (queryId) => {
    fetch(`http://127.0.0.1:8000/api/students/${queryId}/`)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        setSelectedQuery(data);
        setSelectedCourse(null);
        setAnswerForm(null);
      })
      .catch((err) => console.error('Error fetching query details:', err));
  };

  const handleNewCourse = () => {
    alert('New course creation form will open here!');
  };

  const closeDetails = () => {
    setSelectedCourse(null);
    setSelectedQuery(null);
    setAnswerForm(null);
  };

  const handleAnswer = (queryId) => {
    const query = queries.find(q => q.id === queryId);
    if (query) {
      setAnswerForm(query);
      setAnswerText('');
    }
  };

  const handleDeny = (queryId) => {
    if (window.confirm(`Are you sure you want to deny and remove query ${queryId}?`)) {
      setQueries(queries.filter(q => q.id !== queryId));
      setSelectedQuery(null);
      setAnswerForm(null);
    }
  };

  const handleSubmitAnswer = () => {
    if (answerForm && answerText.trim()) {
      alert(`Answer "${answerText}" submitted for query ${answerForm.id}. To be delivered to student dashboard.`);
      setAnswerForm(null);
      setAnswerText('');
    }
  };

  return (
    <div className="teacher-dashboard">
      <div className="dashboard-header">
        <h1 className="header-title">Mentor Craft</h1>
        <div className="header-actions">
          <button className="new-course-btn" onClick={handleNewCourse}>
            New Course
          </button>
            <span>Hello, {instructor.name}</span>
        </div>
      </div>
      <div className="dashboard-container">
        <div className="sidebar">
          <h3>Dashboard</h3>
          <ul>
            <li><a href="/teacher/dashboard" className="active">Overview</a></li>
            <li><a href="/teacher/my-courses">My Courses</a></li>
            <li><a href="/teacher/create-course">Create New Course</a></li>
            <li><a href="/teacher/students">Students</a></li>
            <li><a href="/teacher/settings">Settings</a></li>
            <li><button className="logout-btn" onClick={handleLogout}>Logout</button></li>
          </ul>
        </div>
        <div className="main-content">
          <div className="stats-card">
            <div className="stat-card">
              <h4>Total Courses</h4>
              <p>{stats.totalCourses}</p>
            </div>
            <div className="stat-card">
              <h4>Active Students</h4>
              <p>{stats.activeStudents}</p>
            </div>
            <div className="stat-card">
              <h4>Earnings</h4>
              <p>${stats.earnings}</p>
            </div>
          </div>
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
            {selectedCourse && (
              <div className="course-details show">
                <button className="details-close" onClick={closeDetails}>×</button>
                <h3>{selectedCourse.title}</h3>
                <div className="course-video">
                  {selectedCourse.video_base64 && (
                    <video controls>
                      <source src={`data:video/mp4;base64,${selectedCourse.video_base64}`} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
                <p>{selectedCourse.description}</p>
                <p>Students: {selectedCourse.students}</p>
                <p>Created: {new Date(selectedCourse.created_at).toLocaleDateString()}</p>
              </div>
            )}
          </div>
          <div className="queries-card">
            <h3>Student Queries</h3>
            <div className="query-list">
              {Array.isArray(queries) ? (
                queries.map((query) => (
                  <div key={query.id} className="query-item" onClick={() => handleQueryClick(query.id)}>
                    <h4>{query.title}</h4>
                    <p>By: {query.student__name}</p>
                    <div className="query-actions">
                      <button className="answer-btn" onClick={(e) => { e.stopPropagation(); handleAnswer(query.id); }}>Answer</button>
                      <button className="deny-btn" onClick={(e) => { e.stopPropagation(); handleDeny(query.id); }}>Deny</button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No queries available</p>
              )}
            </div>
            {selectedQuery && (
              <div className="query-details show">
                <button className="details-close" onClick={closeDetails}>×</button>
                <h3>{selectedQuery.title}</h3>
                <p>Student: {selectedQuery.student__name}</p>
                <p>Course: {selectedQuery.course__title}</p>
                <p>Created: {new Date(selectedQuery.created_at).toLocaleDateString()}</p>
              </div>
            )}
          </div>
          {answerForm && (
            <div className="answer-form show">
              <button className="details-close" onClick={closeDetails}>×</button>
              <h3>Answer Query</h3>
              <p><strong>Question:</strong> {answerForm.title}</p>
              <textarea
                value={answerText}
                onChange={(e) => setAnswerText(e.target.value)}
                placeholder="Type your answer here..."
              />
              <button className="submit-btn" onClick={handleSubmitAnswer}>Submit</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;