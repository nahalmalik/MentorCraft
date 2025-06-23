import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../assets/css/MentorCraft.css';

const CreateCourse = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [video, setVideo] = useState(null);
  const [videoLink, setVideoLink] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Creating course:', { title, description, video, videoLink, image });
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (video) {
      formData.append('video', video);
    } else if (videoLink) {
      formData.append('videoLink', videoLink);
    }
    if (image) formData.append('image', image);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/courses/teacher/create/', {
        method: 'POST',
        body: formData,
      });
      console.log('Course creation response:', response.status);
      const data = await response.json();
      console.log('Course creation data:', data);
      if (data.status === 'success') {
        setSuccess('Course created successfully!');
        setError('');
        setTitle('');
        setDescription('');
        setVideo(null);
        setVideoLink('');
        setImage(null);
      } else {
        setError(data.message);
        setSuccess('');
      }
    } catch (err) {
      console.error('Course creation error:', err);
      setError('Failed to create course');
      setSuccess('');
    }
  };

  return (
    <motion.div
      className="create-course"
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
        <h1 align="center">Create a New Course</h1>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <motion.div
          className="form-card"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2>Create Course</h2>
          <p>Fill in the details below to create a new course.</p>
          <p className="note">Note: You can either upload a video file or provide a video link.</p>
          <form onSubmit={handleSubmit}>
            <label className="form-label">Course Title/Name</label>
            <input
              type="text"
              placeholder="Course Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="form-input"
            />
            <label className="form-label">Course Description</label>
            <textarea
              placeholder="Course Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="form-textarea"
            />
            <label className="form-label">Video Upload or Link</label>
            <p className="note">You can upload a video file or provide a link to a video (e.g., YouTube URL).</p>
            <input
              type="text"
              placeholder="Video Link (e.g., YouTube URL)"
              value={videoLink}
              onChange={(e) => setVideoLink(e.target.value)}
              className="form-link"
            />
            <label className="form-label">Upload Video File (optional)</label>
            <p className="note">If you upload a video file, it will be used instead of the link.</p>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setVideo(e.target.files[0])}
              className="form-file"
            />
            <label className="form-label">Upload Image (optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="form-file"
            />
            <button type="submit" className="submit-btn">Create Course</button>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CreateCourse;