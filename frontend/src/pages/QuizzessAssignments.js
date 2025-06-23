import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../assets/css/MentorCraft.css';

const QuizzesAndAssignments = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [responses, setResponses] = useState([]);
  const [error, setError] = useState('');
  const [showQuizForm, setShowQuizForm] = useState(false);
  const [showAssignmentForm, setShowAssignmentForm] = useState(false);
  const [quizTitle, setQuizTitle] = useState('');
  const [assignmentTitle, setAssignmentTitle] = useState('');
  const [deadline, setDeadline] = useState('');
  const [file, setFile] = useState(null);
  const [questions, setQuestions] = useState([{ question: '', options: ['', '', '', ''], correctAnswer: '' }]);

  const randomQuestions = [
    { question: 'What is the capital city of Pakistan?', options: ['Karachi', 'Lahore', 'Islamabad', 'Rawalpindi'], correctAnswer: 'Islamabad' },
    { question: 'Which river is the longest in Pakistan?', options: ['Indus', 'Jhelum', 'Chenab', 'Ravi'], correctAnswer: 'Indus' },
    { question: 'Who was the first Prime Minister of Pakistan?', options: ['Liaquat Ali Khan', 'Muhammad Ali Jinnah', 'Zulfikar Ali Bhutto', 'Ayub Khan'], correctAnswer: 'Liaquat Ali Khan' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const quizzesResponse = await fetch('http://127.0.0.1:8000/api/quizzes/teacher/');
        const quizzesData = await quizzesResponse.json();
        if (quizzesData.status === 'success') setQuizzes(quizzesData.quizzes);

        const assignmentsResponse = await fetch('http://127.0.0.1:8000/api/assignments/teacher/');
        const assignmentsData = await assignmentsResponse.json();
        if (assignmentsData.status === 'success') setAssignments(assignmentsData.assignments);

        const responsesResponse = await fetch('http://127.0.0.1:8000/api/student-responses/teacher/');
        const responsesData = await responsesResponse.json();
        if (responsesData.status === 'success') setResponses(responsesData.responses);
      } catch (err) {
        setError('Failed to fetch data');
      }
    };
    fetchData();
  }, []);

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '', ''], correctAnswer: '' }]);
  };

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    if (field === 'options') {
      newQuestions[index][field] = value.split(',').map(opt => opt.trim());
    } else {
      newQuestions[index][field] = value;
    }
    setQuestions(newQuestions);
  };

  const handleCreateQuiz = async () => {
    const quizData = { title: quizTitle, questions: questions };
    try {
      const response = await fetch('http://127.0.0.1:8000/api/quizzes/teacher/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quizData),
      });
      const data = await response.json();
      if (data.status === 'success') {
        setQuizzes([...quizzes, data.quiz]);
        setShowQuizForm(false);
        setQuizTitle('');
        setQuestions([{ question: '', options: ['', '', '', ''], correctAnswer: '' }]);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to create quiz');
    }
  };

  const handleCreateAssignment = async () => {
    const formData = new FormData();
    formData.append('title', assignmentTitle);
    formData.append('deadline', deadline);
    if (file) formData.append('file', file);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/assignments/teacher/', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.status === 'success') {
        setAssignments([...assignments, data.assignment]);
        setShowAssignmentForm(false);
        setAssignmentTitle('');
        setDeadline('');
        setFile(null);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to create assignment');
    }
  };

  return (
    <motion.div
      className="quizzes-assignments"
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
        <motion.h1
          align="center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Quizzes & Assignments
        </motion.h1>
        {error && <p className="error">{error}</p>}

        {/* Quizzes Section */}
        <h2>Quizzes</h2>
        <button className="course-button" onClick={() => setShowQuizForm(true)} style={{ marginBottom: '20px' }}>
          Create Quiz
        </button>
        <div className="course-list">
          {quizzes.map((quiz, index) => (
            <motion.div
              key={quiz.id}
              className="course-card"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
            >
              <h3>{quiz.title}</h3>
              <p>{quiz.questions.length} questions</p>
              <Link to={`/quiz/${quiz.id}`} className="course-button">
                View Details
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Quiz Creation Form */}
        {showQuizForm && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="modal-content"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <button className="modal-close" onClick={() => setShowQuizForm(false)}>×</button>
              <h2>Create Quiz</h2>
              <input
                type="text"
                className="form-input"
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
                placeholder="Quiz Title"
              />
              {questions.map((q, index) => (
                <div key={index} style={{ marginBottom: '15px' }}>
                  <input
                    type="text"
                    className="form-input"
                    value={q.question}
                    onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                    placeholder={`Question ${index + 1}`}
                  />
                  <input
                    type="text"
                    className="form-input"
                    value={q.options.join(',')}
                    onChange={(e) => handleQuestionChange(index, 'options', e.target.value)}
                    placeholder="Options (comma-separated)"
                  />
                  <input
                    type="text"
                    className="form-input"
                    value={q.correctAnswer}
                    onChange={(e) => handleQuestionChange(index, 'correctAnswer', e.target.value)}
                    placeholder="Correct Answer"
                  />
                </div>
              ))}
              <button className="course-button" onClick={handleAddQuestion} style={{ margin: '10px 0' }}>
                Add Question
              </button>
              <button className="submit-btn" onClick={handleCreateQuiz}>
                Create
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* Assignments Section */}
        <h2>Assignments</h2>
        <button className="course-button" onClick={() => setShowAssignmentForm(true)} style={{ marginBottom: '20px' }}>
          Create Assignment
        </button>
        <div className="course-list">
          {assignments.map((assignment, index) => (
            <motion.div
              key={assignment.id}
              className="course-card"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
            >
              <h3>{assignment.title}</h3>
              <p>Deadline: {new Date(assignment.deadline).toLocaleDateString()}</p>
              <Link to={`/assignment/${assignment.id}`} className="course-button">
                View Details
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Assignment Creation Form */}
        {showAssignmentForm && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="modal-content"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <button className="modal-close" onClick={() => setShowAssignmentForm(false)}>×</button>
              <h2>Create Assignment</h2>
              <input
                type="text"
                className="form-input"
                value={assignmentTitle}
                onChange={(e) => setAssignmentTitle(e.target.value)}
                placeholder="Assignment Title"
              />
              <input
                type="datetime-local"
                className="form-input"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                placeholder="Deadline"
              />
              <input
                type="file"
                className="form-input"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <button className="submit-btn" onClick={handleCreateAssignment}>
                Create
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* Student Responses Section */}
        <h2>Student Responses</h2>
        <div className="course-list">
          {responses.map((response, index) => (
            <motion.div
              key={response.id}
              className="course-card"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
            >
              <h3>{response.type === 'quiz' ? 'Quiz Response' : 'Assignment Response'} - {response.quiz_id || response.assignment_id}</h3>
              <p>Student: {response.student__username}</p>
              <p>Submitted: {new Date(response.submitted_at).toLocaleDateString()}</p>
              {response.type === 'quiz' ? (
                <p>Answer: {response.answer}</p>
              ) : (
                <a href={`http://127.0.0.1:8000${response.file}`} className="course-button" target="_blank" rel="noopener noreferrer">
                  View File
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default QuizzesAndAssignments;