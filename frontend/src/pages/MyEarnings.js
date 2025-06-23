import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import '../assets/css/MentorCraft.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend);

const MyEarnings = () => {
  const [chartType, setChartType] = useState('monthly'); // Default: monthly earnings

  // Static earnings data in PKR (max 80,000)
  const earningsData = {
    total: 75000, // PKR
    monthly: [5000, 6000, 4500, 7000, 5500, 6500, 4000, 6000, 5000, 4500, 7000, 5500], // 12 months
    yearly: [72000, 75000, 68000, 74000, 71000], // 5 years
  };

  // Chart data configuration
  const getChartData = () => {
    if (chartType === 'monthly') {
      return {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Monthly Earnings (PKR)',
          data: earningsData.monthly,
          backgroundColor: 'rgba(52, 152, 219, 0.6)',
          borderColor: '#3498db',
          borderWidth: 1,
        }],
      };
    } else if (chartType === 'yearly') {
      return {
        labels: ['2021', '2022', '2023', '2024', '2025'],
        datasets: [{
          label: 'Yearly Earnings (PKR)',
          data: earningsData.yearly,
          backgroundColor: 'rgba(46, 204, 113, 0.6)',
          borderColor: '#2ecc71',
          borderWidth: 1,
        }],
      };
    } else {
      return {
        labels: ['Total Earnings'],
        datasets: [{
          label: 'Total Earnings (PKR)',
          data: [earningsData.total],
          backgroundColor: ['rgba(231, 76, 60, 0.6)'],
          borderColor: ['#e74c3c'],
          borderWidth: 1,
        }],
      };
    }
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: `${chartType.charAt(0).toUpperCase() + chartType.slice(1)} Earnings` },
    },
    scales: chartType !== 'total' ? {
      y: { beginAtZero: true, title: { display: true, text: 'Earnings (PKR)' } },
      x: { title: { display: true, text: chartType === 'monthly' ? 'Month' : 'Year' } },
    } : {},
  };

  // Render chart based on type
  const renderChart = () => {
    if (chartType === 'monthly') {
      return <Bar data={getChartData()} options={chartOptions} />;
    } else if (chartType === 'yearly') {
      return <Line data={getChartData()} options={chartOptions} />;
    } else {
      return <Pie data={getChartData()} options={chartOptions} />;
    }
  };

  return (
    <motion.div
      className="my-earnings"
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
        <h1>My Earnings</h1>
        <div className="stats-grid">
          <motion.div className="stat-box" whileHover={{ scale: 1.05 }}>
            <h3>Total Earnings</h3>
            <p>{earningsData.total.toLocaleString()} PKR</p>
          </motion.div>
          <motion.div className="stat-box" whileHover={{ scale: 1.05 }}>
            <h3>Monthly Earnings (Jun)</h3>
            <p>{earningsData.monthly[5].toLocaleString()} PKR</p>
          </motion.div>
          <motion.div className="stat-box" whileHover={{ scale: 1.05 }}>
            <h3>Yearly Earnings (2025)</h3>
            <p>{earningsData.yearly[4].toLocaleString()} PKR</p>
          </motion.div>
        </div>
        <motion.div
          className="chart-container"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {renderChart()}
          <div className="chart-controls">
            <button
              className={`chart-btn ${chartType === 'monthly' ? 'active' : ''}`}
              onClick={() => setChartType('monthly')}
            >
              Monthly
            </button>
            <button
              className={`chart-btn ${chartType === 'yearly' ? 'active' : ''}`}
              onClick={() => setChartType('yearly')}
            >
              Yearly
            </button>
            <button
              className={`chart-btn ${chartType === 'total' ? 'active' : ''}`}
              onClick={() => setChartType('total')}
            >
              Total
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MyEarnings;