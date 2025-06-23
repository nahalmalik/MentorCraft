import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Home from './pages/home';
import Courses from './pages/Courses';
import BrowseCourses from './pages/BrowseCourses';
import CreateCourse from './pages/CreateCourse';
import LoginSignup from './pages/LoginSignup';
import StudentLoginSignup from './pages/StudentLoginSignup';
import StudentRegister from './pages/StudentRegister';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import MyCourses from './pages/MyCourses';
import MyLearning from './pages/MyLearning';
import MyQueries from './pages/MyQueries';
import Settings from './pages/Settings';
import Contact from './pages/Contact';
import CourseDetails from './pages/CourseDetails';
import Quiz from './pages/Quiz';
import MyEarnings from './pages/MyEarnings';
import QuizzesAndAssignments from './pages/QuizzessAssignments';
import StudentQuizzesAndAssignments from './pages/StudentQuizzesAndAssignments';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/student-register" element={<StudentRegister />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/my-courses" element={<MyCourses />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/browse-courses" element={<BrowseCourses />} />
        <Route path="/my-learning" element={<MyLearning />} />
        <Route path="/my-earnings" element={<MyEarnings />} />
        <Route path="/my-queries" element={<MyQueries />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/create-course" element={<CreateCourse />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/quiz/:courseId" element={<Quiz />} />
        <Route path="/login" element={<TeacherDashboard />} />
        <Route path="/student-login" element={<StudentDashboard />} />
        <Route path='/quizzes-assignments' element={<QuizzesAndAssignments />} />
         <Route path="/student-quizzes-assignments" element={<StudentQuizzesAndAssignments />} />
        
      </Routes>
    </Router>
  );
}

export default App;