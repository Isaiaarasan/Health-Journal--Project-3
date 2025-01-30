import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../Components/Navigation';
import '../CSS/Pages.css';

const Home = () => {
  return (
    <>
      <Navigation />
      <div className="sd-page">
        <section className="sd-hero-section">
          <div className="container">
            <h1>Latest in Health Research</h1>
            <div className="sd-journal-metrics">
              <div className="metric">
                <span className="number">4.8</span>
                <span className="label">Impact Factor</span>
              </div>
              <div className="metric">
                <span className="number">2.1M+</span>
                <span className="label">Downloads</span>
              </div>
              <div className="metric">
                <span className="number">12K+</span>
                <span className="label">Citations</span>
              </div>
            </div>
          </div>
        </section>

        <section className="sd-featured-articles">
          <div className="container">
            <h2>Featured Articles</h2>
            <div className="articles-grid">
              {[1, 2, 3].map((item) => (
                <div key={item} className="article-card">
                  <span className="article-type">Research Article</span>
                  <h3>Advanced Healthcare Analytics in Modern Medicine</h3>
                  <p className="authors">Sarah Johnson, Michael Chen, et al.</p>
                  <p className="abstract">
                    This study explores the implementation of advanced analytics in healthcare settings...
                  </p>
                  <div className="article-footer">
                    <span className="date">Published: June 2024</span>
                    <a href="https://alpha-numero.com/advanced-data-analytics-in-the-healthcare-industry/" className="sd-read-more">Read More →</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home; 