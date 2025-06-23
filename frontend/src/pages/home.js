import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../assets/css/home.css';

// Import images
import heroBg from '../assets/images/hero-bg.png';
import course1 from '../assets/images/course1.png';
import course2 from '../assets/images/course2.png';
import course3 from '../assets/images/course3.png';
import emma from '../assets/images/emma.png';
import eddie from '../assets/images/eddie.png';
import jonathan from '../assets/images/jonathan.png';
import laila from '../assets/images/laila.png';

const Home = () => {
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
          <Link to="/student-dashboard">
            <button className="header-button start-learning">Start Learning</button>
          </Link>
          <Link to="/teacher-dashboard">
            <button className="header-button instructor">Instructor</button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section" style={{ backgroundImage: `url(${heroBg})` }}>
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
          style={{ color: 'white' }}
        >
          "Learning never exhausts the mind."
        </motion.h1>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
        >
          Discover a world of courses taught by expert instructors.
        </motion.p>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
        >
          <Link to="/courses" className="hero-button">
            Explore Courses
          </Link>
        </motion.div>
      </section>

      {/* Feature Section */}
      <section className="feature-section">
        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
        >
          Why Choose Mentor Craft?
        </motion.h2>
        <div className="feature-grid">
          <motion.div 
            className="feature-card"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          >
            <div className="feature-icon">📚</div>
            <h3>Actionable Training</h3>
            <p>Practical skills for immediate career impact.</p>
          </motion.div>
          <motion.div 
            className="feature-card"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          >
            <div className="feature-icon">🧠</div>
            <h3>Engaging Quizzes</h3>
            <p>Interactive assessments to boost learning.</p>
          </motion.div>
          <motion.div 
            className="feature-card"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          >
            <div className="feature-icon">💎</div>
            <h3>Premium Content</h3>
            <p>Top-tier material from industry leaders.</p>
          </motion.div>
        </div>
      </section>

      {/* Course Section */}
      <section className="course-section">
        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
        >
          Explore Our Popular Courses
        </motion.h2>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
        >
          Find courses tailored to your goals.
        </motion.p>
        <div className="course-grid">
          <motion.div 
            className="course-card"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          >
            <img src={course1} alt="Java Course" />
            <h3>Java Programming</h3>
            <p>Master Java fundamentals and applications.</p>
            <Link to="/course/java">
              <button className="course-button">Learn More</button>
            </Link>
          </motion.div>
          <motion.div 
            className="course-card"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          >
            <img src={course2} alt="Web Development Course" />
            <h3>Web Development</h3>
            <p>Build modern sites with HTML, CSS, JS.</p>
            <Link to="/course/web-development">
              <button className="course-button">Learn More</button>
            </Link>
          </motion.div>
          <motion.div 
            className="course-card"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          >
            <img src={course3} alt="Data Science Course" />
            <h3>Data Science</h3>
            <p>Master data analysis with Python and ML.</p>
            <Link to="/course/data-science">
              <button className="course-button">Learn More</button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Study Section */}
      <section className="study-section">
        <div className="study-grid">
          <motion.div 
            className="study-card"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          >
            <button className="study-button">Experience</button>
            <p>Learn from seasoned industry pros.</p>
            <Link to="/courses"><button className="study-button">Explore</button></Link>
          </motion.div>
          <motion.div 
            className="study-card"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          >
            <button className="study-button">Education</button>
            <p>Curated paths by education experts.</p>
            <Link to="/courses"><button className="study-button">Explore</button></Link>
          </motion.div>
          <motion.div 
            className="study-card"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          >
            <button className="study-button">Certificate</button>
            <p>Earn credentials for career growth.</p>
            <Link to="/courses"><button className="study-button">Explore</button></Link>
          </motion.div>
          <motion.div 
            className="study-pace"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          >
            <h3>Study at Your Pace</h3>
            <p>Advance your career with in-demand skills.</p>
            <Link to="/courses"><button className="study-pace-button">Get Started</button></Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="testimonial-section">
        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
        >
          What Our Students Say
        </motion.h2>
        <div className="testimonial-grid">
          <motion.div 
            className="testimonial-card"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          >
            <p>"Mentor Craft launched my tech career in 6 months!"</p>
            <div className="testimonial-author">
              <img src={emma} alt="Emma Hart" />
              <p>Emma Hart</p>
            </div>
          </motion.div>
          <motion.div 
            className="testimonial-card"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          >
            <p>"Incredible courses with expert instructors."</p>
            <div className="testimonial-author">
              <img src={eddie} alt="Eddie Johnson" />
              <p>Eddie Johnson</p>
            </div>
          </motion.div>
          <motion.div 
            className="testimonial-card"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          >
            <p>"Doubled my salary with Data Science training."</p>
            <div className="testimonial-author">
              <img src={jonathan} alt="Jonathan Doe" />
              <p>Jonathan Doe</p>
            </div>
          </motion.div>
          <motion.div 
            className="testimonial-card"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8, ease: 'easeOut' }}
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          >
            <p>"Flexible schedule fit my work-life balance."</p>
            <div className="testimonial-author">
              <img src={laila} alt="Laila Lauway" />
              <p>Laila Lauway</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <motion.h2
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
        >
          Join Our Community
        </motion.h2>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
        >
          Subscribe for the latest updates and offers.
        </motion.p>
        <motion.div 
          className="newsletter-form"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
        >
          <input type="email" placeholder="Enter Your Email" />
          <button>Subscribe</button>
        </motion.div>
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
        <p className="footer-copyright">© 2025 Mentor Craft. All rights reserved.</p>
      </footer>
    </motion.div>
  );
};

export default Home;