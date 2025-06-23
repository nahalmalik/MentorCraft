import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../assets/css/Courses.css';

const Quiz = () => {
  const { courseId } = useParams();
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const questions = [
    { id: 1, text: 'What is the capital of France?', options: ['Paris', 'London', 'Berlin', 'Madrid'], correct: 'Paris' },
    { id: 2, text: 'What is 2 + 2?', options: ['3', '4', '5', '6'], correct: '4' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem('userEmail');
    if (!email) {
      setError('Please log in to submit quiz');
      return;
    }
    let correctCount = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correct) correctCount++;
    });
    const calculatedScore = (correctCount / questions.length) * 100;
    try {
      const response = await fetch('http://127.0.0.1:8000/api/students/submit-quiz/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Email': email,
        },
        body: JSON.stringify({ courseId: parseInt(courseId), score: calculatedScore }),
      });
      const data = await response.json();
      if (data.status === 'success') {
        setScore(calculatedScore);
        setSuccess('Quiz submitted successfully!');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Failed to submit quiz');
    }
  };

  return (
    <motion.div
      className="course-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
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
      </header>
      <h2>Course Quiz</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      {score !== null && <p>Your Score: {score}%</p>}
      <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto' }}>
        {questions.map(q => (
          <div key={q.id} style={{ marginBottom: '1rem' }}>
            <p>{q.text}</p>
            {q.options.map(option => (
              <label key={option} style={{ display: 'block' }}>
                <input
                  type="radio"
                  name={`question-${q.id}`}
                  value={option}
                  checked={answers[q.id] === option}
                  onChange={() => setAnswers({ ...answers, [q.id]: option })}
                  required
                />
                {option}
              </label>
            ))}
          </div>
        ))}
        <button type="submit" className="course-button">Submit Quiz</button>
      </form>
    </motion.div>
  );
};

export default Quiz;