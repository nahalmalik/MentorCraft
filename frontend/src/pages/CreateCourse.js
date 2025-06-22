import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/TeacherDashboard.css';

const CreateCourse = () => {
  const [instructor, setInstructor] = useState({ name: 'Loading...', id: null });
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    students: 0,
    image_base64: '',
    video_base64: '',
  });
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
  }, []);

  const handleLogout = () => {
    navigate('/teacher/login');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image_base64: reader.result.split(',')[1] }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, video_base64: reader.result.split(',')[1] }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data being sent:', formData); // Debug log
    if (!instructor.id) {
      console.error('Instructor ID not available');
      alert('Instructor not logged in. Please try again.');
      return;
    }

    fetch('http://127.0.0.1:8000/api/courses/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCookie('csrftoken'), // Add CSRF token
      },
      body: JSON.stringify({
        ...formData,
        instructor_id: instructor.id,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Course created:', data);
        alert('Course created successfully!');
        navigate('/teacher/my-courses');
      })
      .catch((err) => {
        console.error('Error creating course:', err);
        alert(`Failed to create course. Error: ${err.message}. Check console for details.`);
      });
  };

  // Utility function to get CSRF token
  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

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
            <li><a href="/teacher/my-courses">My Courses</a></li>
            <li><a href="/teacher/students">Students</a></li>
            <li><a href="/teacher/settings">Settings</a></li>
            <li><a href="/teacher/create-course" className="active">Create New Course</a></li>
            <li><button className="logout-btn" onClick={handleLogout}>Logout</button></li>
          </ul>
        </div>
        <div className="main-content">
          <div className="courses-card">
            <h3>Create New Course</h3>
            <form onSubmit={handleSubmit} className="course-form">
              <div className="form-group">
                <label>Title:</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description:</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Students:</label>
                <input
                  type="number"
                  name="students"
                  value={formData.students}
                  onChange={handleChange}
                  min="0"
                />
              </div>
              <div className="form-group">
                <label>Image:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
              <div className="form-group">
                <label>Video:</label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoChange}
                />
              </div>
              <button type="submit" className="submit-btn">Create Course</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;