import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../Components/Navigation';
import '../CSS/Pages.css';

const Submissions = () => {
  return (
    <>
      <Navigation />
      <div className="sd-page">
        <div className="container">
          <div className="sd-breadcrumb">
            <Link to="/">Home</Link> / Submissions
          </div>

          <section className="sd-submission-guide">
            <h1>Submit Your Research</h1>
            
            <div className="submission-steps">
              <div className="step">
                <span className="step-number">1</span>
                <h3 style={{color:"var(--sd-primary)"}}>Prepare Your Manuscript</h3>
                <ul>
                  <li>Follow our manuscript guidelines</li>
                  <li>Use the manuscript template</li>
                  <li>Prepare figures and tables</li>
                  <li>Write a compelling abstract</li>
                </ul>
                <Link to="/guidelines" className="sd-link">View Guidelines</Link>
              </div>

              <div className="step">
                <span className="step-number">2</span>
                <h3 style={{color:"var(--sd-primary)"}}>Submit Online</h3>
                <ul>
                  <li>Create an author account</li>
                  <li>Upload your manuscript</li>
                  <li>Add co-authors</li>
                  <li>Submit required documents</li>
                </ul>
                <button className="sd-button">Start Submission</button>
              </div>

              <div className="step">
                <span className="step-number">3</span>
                <h3 style={{color:"var(--sd-primary)"}}>Review Process</h3>
                <ul>
                  <li>Initial screening (2-3 days)</li>
                  <li>Peer review (4-6 weeks)</li>
                  <li>Revision period (2 weeks)</li>
                  <li>Final decision</li>
                </ul>
                <Link to="/review-process" className="sd-link">Learn More</Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Submissions; 