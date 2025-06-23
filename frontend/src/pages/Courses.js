import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../assets/css/home.css';

// Import images
import heroBgCourses from '../assets/images/hero-bg-courses.png';
import course1 from '../assets/images/course1.png';
import course2 from '../assets/images/course2.png';
import course3 from '../assets/images/course3.png';
import course4 from '../assets/images/course4.png';
import subject1 from '../assets/images/subject1.png';
import subject2 from '../assets/images/subject2.png';
import subject3 from '../assets/images/subject3.png';
import subject4 from '../assets/images/subject4.png';
import subject5 from '../assets/images/subject5.png';
import subject6 from '../assets/images/subject6.png';
import subject7 from '../assets/images/subject7.png';
import subject8 from '../assets/images/subject8.png';
import subject9 from '../assets/images/subject9.png';

const Courses = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="home-container"
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
        <div>
          <Link to="/student/login">
            <button className="header-button start-learning">Start Learning</button>
          </Link>
          <Link to="/instructor">
            <button className="header-button instructor">Instructor</button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section" style={{ backgroundImage: `url(${heroBgCourses})` }}>
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
          style={{ color: 'white' }}
        >
          COURSES
        </motion.h1>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
          style={{ color: 'white' }}
        >
          Home ---- Courses
        </motion.p>
      </section>

      {/* Course Section */}
      <section className="course-section">
        <div className="course-grid">
          <motion.div 
            className="course-card"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          >
            <img src={course1} alt="Course 1" />
            <h3>Course Name</h3>
            <p>"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipiscing velit."</p>
            <button className="course-button">Apply Now</button>
          </motion.div>
          <motion.div 
            className="course-card"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          >
            <img src={course2} alt="Course 2" />
            <h3>Course Name</h3>
            <p>"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipiscing velit."</p>
            <button className="course-button">Apply Now</button>
          </motion.div>
          <motion.div 
            className="course-card"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          >
            <img src={course3} alt="Course 3" />
            <h3>Course Name</h3>
            <p>"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipiscing velit."</p>
            <button className="course-button">Apply Now</button>
          </motion.div>
          <motion.div 
            className="course-card"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          >
            <img src={course4} alt="Course 4" />
            <h3>Course Name</h3>
            <p>"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipiscing velit."</p>
            <button className="course-button">Apply Now</button>
          </motion.div>
        </div>
      </section>

      {/* Subject Section */}
      <section className="subject-section">
        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
        >
          Explore Top Subjects
        </motion.h2>
        <div className="subject-grid">
          <motion.div 
            className="subject-card"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          >
            <img src={subject1} alt="Subject 1" />
            <p>Subject #1</p>
          </motion.div>
          <motion.div 
            className="subject-card"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          >
            <img src={subject2} alt="Subject 2" />
            <p>Subject #2</p>
          </motion.div>
          <motion.div 
            className="subject-card"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          >
            <img src={subject3} alt="Subject 3" />
            <p>Subject #3</p>
          </motion.div>
          <motion.div 
            className="subject-card"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          >
            <img src={subject4} alt="Subject 4" />
            <p>Subject #4</p>
          </motion.div>
          <motion.div 
            className="subject-card"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8, ease: 'easeOut' }}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          >
            <img src={subject5} alt="Subject 5" />
            <p>Subject #5</p>
          </motion.div>
          <motion.div 
            className="subject-card"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8, ease: 'easeOut' }}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          >
            <img src={subject6} alt="Subject 6" />
            <p>Subject #6</p>
          </motion.div>
          <motion.div 
            className="subject-card"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8, ease: 'easeOut' }}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          >
            <img src={subject7} alt="Subject 7" />
            <p>Subject #7</p>
          </motion.div>
          <motion.div 
            className="subject-card"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.8, ease: 'easeOut' }}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          >
            <img src={subject8} alt="Subject 8" />
            <p>Subject #8</p>
          </motion.div>
          <motion.div 
            className="subject-card"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8, ease: 'easeOut' }}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          >
            <img src={subject9} alt="Subject 9" />
            <p>Subject #9</p>
          </motion.div>
        </div>
        <motion.button
          className="subject-button"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8, ease: 'easeOut' }}
          whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
        >
          View More
        </motion.button>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-grid">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
          >
            <p className="footer-title">Mentor Craft</p>
            <p>Empowering global learners with top education.</p>
            <div className="footer-social">
              <a href="#">Facebook</a>
              <a href="#">Twitter</a>
              <a href="#">Instagram</a>
            </div>
          </motion.div>
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
          >
            <p className="footer-title">Popular Courses</p>
            <ul>
              <li><Link to="/courses">Web Development</Link></li>
              <li><Link to="/courses">Data Science</Link></li>
              <li><Link to="/courses">Java Programming</Link></li>
              <li><Link to="/courses">UI/UX Design</Link></li>
              <li><Link to="/courses">Digital Marketing</Link></li>
            </ul>
          </motion.div>
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
          >
            <p className="footer-title">Contact Info</p>
            <p>Email: support@mentorcraft.com</p>
            <p>Phone: +1 234 567 890</p>
          </motion.div>
        </div>
        <motion.p 
          className="footer-copyright"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
        >
          © 2025 Mentor Craft. All rights reserved.
        </motion.p>
      </footer>
    </motion.div>
  );
};

export default Courses;