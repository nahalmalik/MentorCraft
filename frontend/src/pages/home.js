import { Link } from 'react-router-dom';
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

const Header = () => (
  <header className="header">
    <div className="header-logo">
      <span>MENTOR CRAFT</span>
    </div>
    <nav className="header-nav">
      <Link to="/">Home</Link>
      <Link to="/courses">All Courses</Link>
     <div className="dropdown">
  <span>Instructor</span>
  <select onChange={(e) => (window.location.href = e.target.value)}>
    <option value="">Select</option>
    <option value="/teacher/login">Login</option>
    <option value="/teacher/signup">Signup</option>
  </select>
</div>
      <a href="#about">About Us</a>
      <a href="#contact">Contact</a>
    </nav>
    <Link to="/login">
      <button className="header-button">Start Learning</button>
    </Link>
  </header>
);

const HeroSection = () => (
  <section className="hero-section" style={{ backgroundImage: `url(${heroBg})` }}>
    <h1>"Learning never exhausts the mind."</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pellentesque. Duis estestas nunc.</p>
    <Link to="/courses">
      <button className="hero-button">View All Courses</button>
    </Link>
  </section>
);

const FeatureSection = () => (
  <section className="feature-section">
    <div className="feature-grid">
      <div className="feature-card">
        <svg className="feature-icon" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
          <path fillRule="evenodd" d="M10 0a10 10 0 100 20 10 10 0 000-20zM2 10a8 8 0 1116 0 8 8 0 01-16 0z" clipRule="evenodd" />
        </svg>
        <h3>Actionable Training</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.</p>
      </div>
      <div className="feature-card">
        <svg className="feature-icon" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
          <path fillRule="evenodd" d="M10 0a10 10 0 100 20 10 10 0 000-20zM2 10a8 8 0 1116 0 8 8 0 01-16 0z" clipRule="evenodd" />
        </svg>
        <h3>Interesting Quizzes</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.</p>
      </div>
      <div className="feature-card">
        <svg className="feature-icon" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
          <path fillRule="evenodd" d="M10 0a10 10 0 100 20 10 10 0 000-20zM2 10a8 8 0 1116 0 8 8 0 01-16 0z" clipRule="evenodd" />
        </svg>
        <h3>Premium Material</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.</p>
      </div>
    </div>
  </section>
);

const CourseSection = () => (
  <section className="course-section">
    <h2>Our Most Popular Courses</h2>
    <p>Lorem ipsum tempor incididunt ut labore et dolore magna aliqua.</p>
    <div className="course-grid">
      <div className="course-card">
        <img src={course1} alt="Course 1" />
        <h3>Java</h3>
        <p>Java is a powerful and versatile programming language widely used in software development, web applications, mobile apps, and enterprise systems.</p>
        <Link to="/CourseDetails">
          <button className="course-button">See More...</button>
        </Link>
      </div>
      <div className="course-card">
        <img src={course2} alt="Course 2" />
        <h3>Course Name</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.</p>
        <button className="course-button">See More...</button>
      </div>
      <div className="course-card">
        <img src={course3} alt="Course 3" />
        <h3>Course Name</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.</p>
        <button className="course-button">See More...</button>
      </div>
    </div>
  </section>
);

const StudySection = () => (
  <section className="study-section">
    <div className="study-grid">
      <div>
        <button className="study-button">Experience</button>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.</p>
        <button className="study-button">See More...</button>
      </div>
      <div>
        <button className="study-button">Education</button>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.</p>
        <button className="study-button">See More...</button>
      </div>
      <div>
        <button className="study-button">Certificate</button>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.</p>
        <button className="study-button">See More...</button>
      </div>
      <div className="study-pace">
        <h3>Study at your own pace</h3>
        <p>Boost your career by learning skills in high demand</p>
        <Link to="/login">
          <button className="study-pace-button">Get Started</button>
        </Link>
      </div>
    </div>
  </section>
);

const TestimonialSection = () => (
  <section className="testimonial-section">
    <h2>Student Testimonials</h2>
    <div className="testimonial-grid">
      <div className="testimonial-card">
        <p>"Massa amet, dolor tellus pellentesque eaquean in eget massa incididunt habitea."</p>
        <div className="testimonial-author">
          <img src={emma} alt="Emma Hart" />
          <p>Emma Hart</p>
        </div>
      </div>
      <div className="testimonial-card">
        <p>"Massa amet, dolor tellus pellentesque eaquean in eget massa incididunt habitea."</p>
        <div className="testimonial-author">
          <img src={eddie} alt="Eddie Johnson" />
          <p>Eddie Johnson</p>
        </div>
      </div>
      <div className="testimonial-card">
        <p>"Massa amet, dolor tellus pellentesque eaquean in eget massa incididunt habitea."</p>
        <div className="testimonial-author">
          <img src={jonathan} alt="Jonathan Doe" />
          <p>Jonathan Doe</p>
        </div>
      </div>
      <div className="testimonial-card">
        <p>"Massa amet, dolor tellus pellentesque eaquean in eget massa incididunt habitea."</p>
        <div className="testimonial-author">
          <img src={laila} alt="Laila Lauway" />
          <p>Laila Lauway</p>
        </div>
      </div>
    </div>
  </section>
);

const NewsletterSection = () => (
  <section className="newsletter-section">
    <h2>Join Our Community</h2>
    <p>Enter your email address to register to our Newsletter subscription delivered on regular basis</p>
    <div className="newsletter-form">
      <input type="email" placeholder="Enter Your Email" />
      <button>Subscribe</button>
    </div>
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

const Home = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <FeatureSection />
      <CourseSection />
      <StudySection />
      <TestimonialSection />
      <NewsletterSection />
      <Footer />
    </div>
  );
};

export default Home;