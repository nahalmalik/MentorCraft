import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Courses from './pages/Courses';
import TeacherDashboard from './pages/TeacherDashboard';
import LoginSignup from './pages/LoginSignup';
import MyCourses from './pages/MyCourses';
import CreateCourse from './pages/CreateCourse';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher/login" element={<LoginSignup isLogin={true} />} />
        <Route path="/teacher/signup" element={<LoginSignup isLogin={false} />} />
        <Route path="/teacher/my-courses" element={<MyCourses />} />
        <Route path="/teacher/create-course" element={<CreateCourse />} />
      </Routes>
    </Router>
  );
}

export default App;