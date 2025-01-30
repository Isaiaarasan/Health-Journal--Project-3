import React from "react";
import { Link } from "react-router-dom";
import Navigation from '../Components/Navigation';
import "../CSS/ScienceDirectPages.css";

const About = () => {
  return (
    <>
      <Navigation />
      <div className="sd-page-container">
        <div className="sd-breadcrumb">
          <Link to="/" aria-label="Go to Home Page">Home</Link> / About
        </div>
        
        <div className="sd-content">
          <h1>About Health Journal</h1>
          
          <section className="sd-section">
            <h2>Aims and Scope</h2>
            <p>Health Journal is an international, peer-reviewed journal dedicated to publishing cutting-edge research in healthcare management, medical informatics, and clinical practice. Our journal serves as a platform for healthcare professionals, researchers, and practitioners to share their findings and innovations.</p>
          </section>

          <section className="sd-section">
            <h2>Editorial Board</h2>
            <div className="sd-board-members">
              <div className="sd-board-member">
                <h3>Editor-in-Chief</h3>
                <p>Dr. Sarah Johnson</p>
                <p>Harvard Medical School, USA</p>
              </div>
              <div className="sd-board-member">
                <h3>Associate Editors</h3>
                <ul>
                  <li>Dr. Michael Chen - Stanford University, USA</li>
                  <li>Dr. Emma Williams - Oxford University, UK</li>
                  <li>Dr. Raj Patel - All India Institute of Medical Sciences, India</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default About;
