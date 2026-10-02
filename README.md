# 🎓 Mentor-Craft

### A Full-Stack E-Learning Platform for Students & Instructors

Mentor-Craft is a full-stack **e-learning platform** developed as a **Final Year Project** to provide students and instructors with a centralized digital learning environment.

The platform allows students to discover and enroll in courses, access their learning content, attempt quizzes and assignments, and manage their learning activities. Instructors can create and manage courses, monitor their earnings, and interact with students through the platform.

Mentor-Craft consists of a **React.js web frontend** and a **Django-powered backend**, with a structured database and REST-based communication between the frontend and backend.

---

## 📌 Project Overview

Mentor-Craft was designed to address the growing need for accessible and organized online education.

The platform brings learners and instructors together in one system, providing separate interfaces and workflows according to their roles.

### 👨‍🎓 Students can

* Register and log in
* Browse available courses
* View detailed course information
* Enroll in courses
* Access enrolled courses
* Manage their learning
* Attempt quizzes
* Complete assignments
* View their quizzes and assignments
* Submit learning activities
* Manage their profile/settings
* Submit queries to the platform

### 👨‍🏫 Instructors can

* Register and log in
* Access an instructor dashboard
* Create courses
* Manage their courses
* Manage course content
* View their earnings
* Manage instructor-related activities
* Interact with students through the platform

---

# ✨ Key Features

## 🔐 Authentication & Registration

Mentor-Craft provides separate authentication flows for students and instructors.

The frontend includes dedicated components/pages for:

* Student registration
* Student login
* Instructor login/signup
* User authentication
* Role-specific dashboards

This allows the platform to provide different functionality depending on whether the user is a learner or instructor.

---

# 👨‍🎓 Student Module

The student module is designed around the complete learning journey.

### Student Dashboard

Students have access to a dedicated dashboard from which they can manage their learning activities.

### Student Registration

New learners can create an account through the dedicated student registration system.

### Browse Courses

Students can explore courses available on the platform.

The `BrowseCourses` page provides the course discovery interface.

### Course Details

Students can view detailed information about an individual course before deciding to enroll.

### My Courses

Students can access the courses associated with their account through the **My Courses** section.

### My Learning

The **My Learning** section provides students with a centralized area for their ongoing learning activities.

### Quizzes & Assignments

Students can access quizzes and assignments associated with their courses.

Dedicated pages include:

* `Quiz.js`
* `StudentQuizzesAndAssignments.js`
* `QuizzessAssignments.js`

This provides a structured mechanism for evaluating and engaging learners.

---

# 👨‍🏫 Instructor Module

Mentor-Craft also provides functionality specifically designed for instructors.

## Teacher Dashboard

Instructors have their own dashboard for managing teaching-related activities.

The frontend contains a dedicated:

```text
TeacherDashboard.js
```

### Create Courses

Instructors can create new courses through the dedicated course creation interface.

```text
CreateCourse.js
```

This allows instructors to contribute educational content to the platform.

### Course Management

The backend contains a dedicated `courses` application while the frontend includes multiple course-management interfaces.

This separation allows course-related functionality to be maintained independently from other parts of the system.

### My Earnings

Instructors have access to an earnings section through:

```text
MyEarnings.js
```

This provides instructors with a dedicated area for their earning-related information.

---

# 📚 Course Management

Courses are one of the central components of Mentor-Craft.

The platform includes functionality for:

* Creating courses
* Browsing courses
* Viewing course details
* Managing courses
* Enrolling in courses
* Accessing enrolled courses
* Connecting courses with quizzes and assignments

Course-related backend functionality is organized into its own Django application:

```text
courses/
```

Course media is also stored through the backend's media structure:

```text
media/
└── courses/
```

---

# 📝 Quizzes & Assignments

Mentor-Craft includes a dedicated backend module for quizzes and assignments:

```text
quizzes_assignments/
```

The module contains its own:

* Models
* Views
* URLs
* Admin configuration
* Database migrations
* Tests

On the frontend, learning assessments are represented through dedicated pages including:

```text
Quiz.js
QuizzessAssignments.js
StudentQuizzesAndAssignments.js
```

This architecture keeps assessment functionality separate from the core course functionality.

---

# 💬 Contact & Queries

The platform includes a dedicated contact system through the Django:

```text
contact/
```

application.

The frontend includes:

```text
Contact.js
MyQueries.js
```

This provides a mechanism for users to communicate queries or contact-related information through the platform.

---

# ⚙️ Backend Architecture

The backend is built using **Django**.

The backend project is organized into separate Django applications according to their responsibilities.

```text
backend/
└── myproject/
    │
    ├── myproject/
    │   ├── settings.py
    │   ├── urls.py
    │   ├── asgi.py
    │   └── wsgi.py
    │
    ├── students/
    │   ├── models.py
    │   ├── views.py
    │   ├── urls.py
    │   ├── admin.py
    │   └── migrations/
    │
    ├── instructors/
    │   ├── models.py
    │   ├── views.py
    │   ├── urls.py
    │   ├── admin.py
    │   └── migrations/
    │
    ├── courses/
    │   ├── models.py
    │   ├── views.py
    │   ├── urls.py
    │   ├── admin.py
    │   └── migrations/
    │
    ├── quizzes_assignments/
    │   ├── models.py
    │   ├── views.py
    │   ├── urls.py
    │   ├── admin.py
    │   └── migrations/
    │
    ├── contact/
    │   ├── models.py
    │   ├── views.py
    │   ├── urls.py
    │   ├── admin.py
    │   └── migrations/
    │
    ├── media/
    │   ├── courses/
    │   └── assignments/
    │
    ├── db.sqlite3
    └── manage.py
```

---

# 🏗️ System Architecture

Mentor-Craft follows a client-server architecture in which the React frontend communicates with the Django backend.

```text
                       ┌───────────────────┐
                       │       User        │
                       └─────────┬─────────┘
                                 │
                    ┌────────────┴────────────┐
                    │                         │
             👨‍🎓 Student                👨‍🏫 Instructor
                    │                         │
                    └────────────┬────────────┘
                                 │
                                 ▼
                       ┌───────────────────┐
                       │    React.js       │
                       │    Frontend       │
                       └─────────┬─────────┘
                                 │
                              API Requests
                                 │
                                 ▼
                       ┌───────────────────┐
                       │      Django       │
                       │      Backend      │
                       └─────────┬─────────┘
                                 │
                ┌────────────────┼────────────────┐
                │        │       │       │        │
                ▼        ▼       ▼       ▼        ▼
            Students Instructors Courses Quizzes Contact
                                 │
                                 ▼
                       ┌───────────────────┐
                       │   SQLite Database │
                       └───────────────────┘
```

---

# 🌐 Frontend

The web application is built using **React.js**.

The frontend is organized into reusable pages and components.

```text
frontend/
└── src/
    │
    ├── assets/
    │   ├── css/
    │   └── images/
    │
    ├── pages/
    │   ├── BrowseCourses.js
    │   ├── Contact.js
    │   ├── CourseDetails.js
    │   ├── Courses.js
    │   ├── CreateCourse.js
    │   ├── LoginSignup.js
    │   ├── MyCourses.js
    │   ├── MyEarnings.js
    │   ├── MyLearning.js
    │   ├── MyQueries.js
    │   ├── Quiz.js
    │   ├── QuizzessAssignments.js
    │   ├── Settings.js
    │   ├── StudentDashboard.js
    │   ├── StudentLoginSignup.js
    │   ├── StudentQuizzesAndAssignments.js
    │   ├── StudentRegister.js
    │   ├── TeacherDashboard.js
    │   └── home.js
    │
    ├── App.js
    ├── App.css
    ├── index.js
    └── index.css
```

---

# 🛠️ Technology Stack

| Layer                   | Technology          |
| ----------------------- | ------------------- |
| Frontend                | React.js            |
| Backend                 | Django              |
| Programming Language    | Python / JavaScript |
| Database                | SQLite              |
| API Communication       | Django-based API    |
| Styling                 | CSS                 |
| Mobile / Cross-platform | Flutter             |
| Media Storage           | Django Media        |
| Version Control         | Git & GitHub        |

---

# 🗄️ Database

The project currently uses **SQLite** as its database.

The database is represented in the backend by:

```text
db.sqlite3
```

Django's ORM is used to manage the application's database models.

Separate Django applications maintain their own migrations:

```text
students/migrations/
instructors/migrations/
courses/migrations/
quizzes_assignments/migrations/
contact/migrations/
```

This modular database structure makes each major system component easier to maintain.

---

# 📂 Complete Project Structure

```text
Final_Year_Project/
│
├── backend/
│   │
│   ├── myproject/
│   │   ├── contact/
│   │   ├── courses/
│   │   ├── instructors/
│   │   ├── students/
│   │   ├── quizzes_assignments/
│   │   │
│   │   ├── media/
│   │   │   ├── assignments/
│   │   │   └── courses/
│   │   │
│   │   ├── myproject/
│   │   │   ├── settings.py
│   │   │   ├── urls.py
│   │   │   ├── asgi.py
│   │   │   └── wsgi.py
│   │   │
│   │   ├── db.sqlite3
│   │   └── manage.py
│   │
│   └── requirements.txt
│
├── frontend/
│   │
│   ├── public/
│   │
│   ├── src/
│   │   ├── assets/
│   │   │   ├── css/
│   │   │   └── images/
│   │   │
│   │   ├── pages/
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   │
│   ├── package.json
│   └── package-lock.json
│
├── .gitattributes
└── README.md
```

---

# 🚀 Getting Started

## Prerequisites

Make sure the following are installed:

* Python 3.x
* pip
* Node.js
* npm
* Git
* A modern web browser

---

## 1. Clone the Repository

```bash
git clone https://github.com/nahalmalik/Final_Year_Project.git

cd Final_Year_Project
```

---

# ⚙️ Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install the Python dependencies:

```bash
pip install -r requirements.txt
```

Navigate to the Django project:

```bash
cd myproject
```

Run migrations:

```bash
python manage.py migrate
```

Start the Django development server:

```bash
python manage.py runserver
```

The Django server will start locally.

---

# 🌐 Frontend Setup

Open another terminal and navigate to the frontend:

```bash
cd frontend
```

Install JavaScript dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm start
```

The React application will open in your browser.

---

# 🔗 Frontend & Backend Communication

The React frontend communicates with the Django backend to retrieve and submit application data.

The overall request flow is:

```text
React Component
      │
      │ API Request
      ▼
Django URL
      │
      ▼
Django View
      │
      ▼
Django Model / ORM
      │
      ▼
Database
      │
      ▼
Django Response
      │
      ▼
React UI
```

This allows the frontend and backend to remain separated while working together as one application.

---

# 📱 Mobile Application

Mentor-Craft was designed as a **web and mobile-based e-learning platform**.

The mobile side of the project is intended to provide learners with access to the platform through mobile devices while the Django backend provides centralized application services.

The project architecture can therefore be extended to support:

```text
                    Django Backend
                         │
             ┌───────────┴───────────┐
             │                       │
        React Web               Flutter Mobile
             │                       │
             └───────────┬───────────┘
                         │
                       Users
```

---

# 📊 Main Modules

| Module                | Purpose                                     |
| --------------------- | ------------------------------------------- |
| Students              | Student accounts and learning activities    |
| Instructors           | Instructor accounts and teaching activities |
| Courses               | Course creation, browsing and management    |
| Quizzes & Assignments | Learning assessments                        |
| Contact               | Contact and communication functionality     |
| Media                 | Course and assignment file storage          |

---

# 🎓 Final Year Project

Mentor-Craft was developed as a **Final Year Project** to demonstrate the design and implementation of a complete full-stack e-learning platform.

The project combines multiple areas of software engineering, including:

* Frontend development
* Backend development
* Database management
* REST/API communication
* User authentication
* Role-based functionality
* Course management
* Online assessments
* File/media management
* Responsive web development
* Mobile application development

---

# 🧠 Learning Outcomes

Through the development of Mentor-Craft, the project demonstrates practical experience in:

### Frontend Development

* React.js
* JavaScript
* Component-based architecture
* Page routing
* API integration
* CSS-based UI development

### Backend Development

* Python
* Django
* Django applications
* Models
* Views
* URL routing
* Django ORM
* Database migrations

### Full-Stack Development

* Client-server architecture
* API communication
* Database integration
* Authentication workflows
* Modular application architecture

### Software Engineering

* Requirement analysis
* System design
* Application development
* Database design
* Testing structure
* Git/GitHub version control

---

# 🔮 Future Enhancements

Possible future improvements include:

* 🎥 Live video classes
* 💬 Real-time student/instructor chat
* 🤖 AI-powered learning assistant
* 🧠 Personalized course recommendations
* 📊 Advanced student progress analytics
* 📝 More advanced assessment types
* 🏆 Gamification and achievement badges
* 📜 Automated course certificates
* 🔔 Push notifications
* 💳 Online payment integration
* ☁️ Cloud deployment
* 📥 Offline mobile learning
* 🌍 Multi-language support
* 🔐 Advanced role and permission management

---

# 🤝 Contributing

Contributions and suggestions are welcome.

```bash
# Fork the repository

# Clone your fork
git clone https://github.com/nahalmalik/Final_Year_Project.git

# Create a feature branch
git checkout -b feature/your-feature

# Make your changes

# Commit
git add .
git commit -m "Add your feature"

# Push
git push origin feature/your-feature
```

Then create a Pull Request.

---

# 👨‍💻 Developer

**Nahal Malik**

Software Engineer 

---

# ⭐ Support

If you find this project useful or interesting, consider giving the repository a ⭐ on GitHub.

**Repository:**
https://github.com/nahalmalik/Final_Year_Project

---

## 📌 Project Summary

**Mentor-Craft** is a full-stack e-learning platform developed as a Final Year Project using **React.js and Django**, with a mobile-oriented architecture using **Flutter**. The system provides separate experiences for students and instructors, supporting course discovery and management, learning activities, quizzes and assignments, instructor dashboards, earnings management, and user communication through a centralized backend.
