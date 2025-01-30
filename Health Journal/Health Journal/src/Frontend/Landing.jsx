import React from "react";
import { Link } from "react-router-dom";
import "../CSS/Landing.css";

const LandingPage = () => {
  return (
    <div className="sd-landing-container">
      <header className="sd-header">
        <div className="sd-header-top">
          <div className="sd-logo-container">
            <h1>Health Journal</h1>
            <span className="sd-subtitle">An International Journal</span>
          </div>
          <div className="sd-nav-buttons">
            <Link to="/login" className="sd-btn">Login</Link>
            <Link to="/signup" className="sd-btn sd-btn-primary">Register</Link>
          </div>
        </div>
        <nav className="sd-nav">
          <ul>
          <Link to="/home" className="sd-btn">Home</Link>
          <Link to="/about" className="sd-btn">About</Link> 
           <Link to="/publish" className="sd-btn">Publish</Link>
          <Link to="/latest-articles" className="sd-btn">Latest Articles</Link> 
           <Link to="/submissions" className="sd-btn">Submissions</Link>
          <Link to="/register" className="sd-btn">Register</Link>

          </ul>
        </nav>
      </header>

      <main className="sd-main-content">
        <section className="sd-hero">
          <div className="sd-journal-info">
            <h2>Health Journal</h2>
            <div className="sd-metrics">
              <div className="sd-metric">
                <span className="sd-metric-value">4.5</span>
                <span className="sd-metric-label">Impact Factor</span>
              </div>
              <div className="sd-metric">
                <span className="sd-metric-value">6 Days</span>
                <span className="sd-metric-label">Review Time</span>
              </div>
              <div className="sd-metric">
                <span className="sd-metric-value">98%</span>
                <span className="sd-metric-label">Satisfaction</span>
              </div>
            </div>
          </div>
        </section>

        <section className="sd-latest-articles">
          <h2>Latest Research Highlights</h2>
          <div className="sd-articles-grid">
            <div className="sd-article-card">
              <h3>Symptom Tracking Analytics</h3>
              <p>Advanced methods for monitoring and analyzing health symptoms with precision.</p>
              <a href="https://pro.boehringer-ingelheim.com/connecting-psychiatry/in-the-clinic/traditional-symptom-tracking" className="sd-read-more">Read More →</a>
            </div>
            <div className="sd-article-card">
              <h3>Medical History Management</h3>
              <p>Innovative approaches to organizing and accessing medical records.</p>
              <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC3238553/" className="sd-read-more">Read More →</a>
            </div>
            <div className="sd-article-card">
              <h3>Medication Adherence Studies</h3>
              <p>Research on improving medication compliance through digital reminders.</p>
              <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC3191684/" className="sd-read-more">Read More →</a>
            </div>
         <div className="sd-article-card" >
          <h3>How to Submit Your Research</h3>
          <p>Join our community of healthcare researchers and practitioners.</p>
          <Link to="/submissions" className="sd-btn">Read More</Link>
          </div>
          </div>
        </section>
      </main>

      <footer className="sd-footer">
        <div className="sd-footer-bottom">
          <p>&copy; {new Date().getFullYear()} Health Journal. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
