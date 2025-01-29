import React from "react";
import { Link } from "react-router-dom";
import "../CSS/Landing.css";

const LandingPage = () => {
  return (
    <div className="landing-container">
      <header className="landing-header">
        <h1>Health Journal</h1>
        <Link to="/login" className="login-btn">Login</Link>
      </header>
      <section className="intro-section">
        <h2>Track Your Health, Stay Informed</h2>
        <p>
          Health Journal helps you monitor your symptoms, track medical history, and stay
          on top of your well-being. Your health, your data, your control.
        </p>
      </section>
      <section className="features-section">
        <div className="feature">
          <h3>Symptom Tracker</h3>
          <p>Record and analyze your health symptoms with ease.</p>
        </div>
        <div className="feature">
          <h3>Medical History</h3>
          <p>Access and review your past health records anytime.</p>
        </div>
        <div className="feature">
          <h3>Medication Reminders</h3>
          <p>Never miss a dose with scheduled medication alerts.</p>
        </div>
        <div className="feature">
          <h3>Community & Resources</h3>
          <p>Get wellness resources and connect with a support community.</p>
        </div>
      </section>
      <section className="cta-section">
        <h2>Get Started Today!</h2>
        <p>Join us in making health tracking simple and effective.</p>
        <Link to="/login" className="cta-btn">Login to Your Account</Link>
      </section>
    </div>
  );
};

export default LandingPage;
