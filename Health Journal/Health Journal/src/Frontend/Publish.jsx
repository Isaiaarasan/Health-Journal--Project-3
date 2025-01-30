import React from "react";
import { Link } from "react-router-dom";
import Navigation from '../Components/Navigation';
import "../CSS/ScienceDirectPages.css";

const Publish = () => {
  return (
    <>
      <Navigation />
      <div className="sd-page-container">
        <div className="sd-breadcrumb">
          <Link to="/">Home</Link> / Publish
        </div>
        
        <div className="sd-content">
          <h1>Publish Your Research</h1>
          
          <section className="sd-section">
            <h2>Submission Guidelines</h2>
            <div className="sd-guidelines">
              <div className="sd-guideline-item">
                <h3>Manuscript Preparation</h3>
                <ul>
                  <li>Use standard manuscript format</li>
                  <li>Include abstract (max 250 words)</li>
                  <li>Keywords (5-8 words)</li>
                  <li>References in Vancouver style</li>
                </ul>
              </div>
              
              <div className="sd-guideline-item">
                <h3>Article Types</h3>
                <ul>
                  <li>Original Research</li>
                  <li>Review Articles</li>
                  <li>Case Studies</li>
                  <li>Short Communications</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="sd-section">
            <h2>Publication Process</h2>
            <div className="sd-process-timeline">
              <div className="sd-timeline-item">
                <h3>1. Submit</h3>
                <p>Submit your manuscript through our online system</p>
              </div>
              <div className="sd-timeline-item">
                <h3>2. Review</h3>
                <p>Peer review process (4-6 weeks)</p>
              </div>
              <div className="sd-timeline-item">
                <h3>3. Revise</h3>
                <p>Address reviewer comments</p>
              </div>
              <div className="sd-timeline-item">
                <h3>4. Publish</h3>
                <p>Final acceptance and publication</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Publish; 