import React from 'react';
import '../assets/css/Courses.css';

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

const Header = () => (
  <header className="header">
    <div className="header-logo">
      <span>MENTOR CRAFT</span>
    </div>
    <nav className="header-nav">
      <a href="/">Home</a>
      <a href="/courses">All Courses</a>
      <a href="#instructor">Instructor</a>
      <a href="#about">About Us</a>
      <a href="#contact">Contact</a>
    </nav>
    <button className="header-button">Start Learning</button>
  </header>
);

const HeroSection = () => (
  <section className="hero-section" style={{ backgroundImage: `url(${heroBgCourses})` }}>
    <h1>COURSES</h1>
    <p>Home ---- Courses</p>
  </section>
);

const CourseSection = () => (
  <section className="course-section">
    <div className="course-grid">
      <div className="course-card">
        <img src={course1} alt="Course 1" />
        <h3>Course Name</h3>
        <p>"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipiscing velit."</p>
        <button className="course-button">Apply Now</button>
      </div>
      <div className="course-card">
        <img src={course2} alt="Course 2" />
        <h3>Course Name</h3>
        <p>"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipiscing velit."</p>
        <button className="course-button">Apply Now</button>
      </div>
      <div className="course-card">
        <img src={course3} alt="Course 3" />
        <h3>Course Name</h3>
        <p>"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipiscing velit."</p>
        <button className="course-button">Apply Now</button>
      </div>
      <div className="course-card">
        <img src={course4} alt="Course 4" />
        <h3>Course Name</h3>
        <p>"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipiscing velit."</p>
        <button className="course-button">Apply Now</button>
      </div>
    </div>
  </section>
);

const SubjectSection = () => (
  <section className="subject-section">
    <h2>Explore Top Subjects</h2>
    <div className="subject-grid">
      <div className="subject-card">
        <img src={subject1} alt="Subject 1" />
        <p>Subject #1</p>
      </div>
      <div className="subject-card">
        <img src={subject2} alt="Subject 2" />
        <p>Subject #2</p>
      </div>
      <div className="subject-card">
        <img src={subject3} alt="Subject 3" />
        <p>Subject #3</p>
      </div>
      <div className="subject-card">
        <img src={subject4} alt="Subject 4" />
        <p>Subject #4</p>
      </div>
      <div className="subject-card">
        <img src={subject5} alt="Subject 5" />
        <p>Subject #5</p>
      </div>
      <div className="subject-card">
        <img src={subject6} alt="Subject 6" />
        <p>Subject #6</p>
      </div>
      <div className="subject-card">
        <img src={subject7} alt="Subject 7" />
        <p>Subject #7</p>
      </div>
      <div className="subject-card">
        <img src={subject8} alt="Subject 8" />
        <p>Subject #8</p>
      </div>
      <div className="subject-card">
        <img src={subject9} alt="Subject 9" />
        <p>Subject #9</p>
      </div>
    </div>
    <button className="subject-button">View More</button>
  </section>
);

const Footer = () => (
  <footer className="footer">
    <div className="footer-grid">
      <div>
        <p className="footer-title">MENTOR CRAFT</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sacpit elit.</p>
        <div className="footer-social">
          <a href="#"><i className="fab fa-facebook-f"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
          <a href="#"><i className="fab fa-vimeo-v"></i></a>
        </div>
      </div>
      <div>
        <p className="footer-title">Popular Courses</p>
        <ul>
          <li>1. Course no 1</li>
          <li>2. Course no 2</li>
          <li>3. Course no 3</li>
          <li>4. Course no 4</li>
          <li>5. Course no 5</li>
        </ul>
      </div>
      <div>
        <p className="footer-title">Contact Info</p>
        <p>Phone: ____</p>
        <p>Email: abc@xyz.com</p>
      </div>
    </div>
    <p className="footer-copyright">Copyright © Mentor-Craft Team</p>
  </footer>
);

const Courses = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <CourseSection />
      <SubjectSection />
      <Footer />
    </div>
  );
};

export default Courses;