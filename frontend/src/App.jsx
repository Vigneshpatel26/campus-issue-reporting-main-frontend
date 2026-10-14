import { useState } from 'react';
import ReportIssue from './ReportIssue'
import './App.css'

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showReportPage, setShowReportPage] = useState(false)

  if (showReportPage) {
    return (
      <ReportIssue
        onBack={() => setShowReportPage(false)}
      />
    )
  }

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">CampusCare</div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#services">Services</a>
          <a href="#about">About</a>

          
{showLogin && (
  <div className="login-overlay">
    <div className="login-form">
      <button
        className="close-login"
        onClick={() => setShowLogin(false)}
      >
        ×
      </button>

      <h2>Welcome Back</h2>
      <p>Login to CampusCare</p>

      <form onSubmit={(e) => {
        e.preventDefault();
        alert("Login form submitted. Authentication is not connected yet.");
      }}>
        <label>Email Address</label>
        <input
          type="email"
          placeholder="Enter your email"
          required
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          required
        />

        <button type="submit" className="login-submit">
          Login
        </button>
      </form>
    </div>
  </div>
)}

        </div>

       <button
  className="login-btn"
  onClick={() => setShowLogin(true)}
>
  Login
</button>
      </nav>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <p className="eyebrow">CAMPUS ISSUE REPORTING SYSTEM</p>

            <h1>
              A Better Campus
              <br />
              Starts With You.
            </h1>

            <p className="hero-description">
              Report campus problems, track your complaints, and help
              make your college a better place for everyone.
            </p>

            <div className="hero-buttons">
              <button
                  className="primary-btn"
                  onClick={() => setShowReportPage(true)}
              >
                 Report an Issue
              </button>
              <button className="secondary-btn">Track My Issues</button>
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-icon">🏫</div>
            <h2>Your Campus, Your Voice</h2>
            <p>Every issue reported is a step towards improvement.</p>
          </div>
        </section>

        <section className="services" id="services">
          <p className="section-label">SIMPLE AND EFFECTIVE</p>
          <h2>How It Works</h2>
          <p className="section-description">
            Three simple steps to help improve your campus.
          </p>

          <div className="service-grid">
            <article className="service-card">
              <div className="service-icon">📝</div>
              <h3>Report an Issue</h3>
              <p>
                Submit problems related to classrooms, hostels,
                electricity, water, or cleanliness.
              </p>
            </article>

            <article className="service-card">
              <div className="service-icon">🔎</div>
              <h3>Track Progress</h3>
              <p>
                Check the status of your reported issues and stay
                updated on their progress.
              </p>
            </article>

            <article className="service-card">
              <div className="service-icon">✅</div>
              <h3>Get It Resolved</h3>
              <p>
                Follow the resolution process and help create a
                safer, cleaner campus.
              </p>
            </article>
          </div>
        </section>

        <section className="about" id="about">
          <h2>Building a Better Campus Together</h2>
          <p>
            Our goal is to make campus issue reporting simple,
            transparent, and accessible to every student.
          </p>
        </section>
      </main>

      <footer className="footer">
        CampusCare · Campus Issue Reporting System
      </footer>
    </div>
  )
}

export default App