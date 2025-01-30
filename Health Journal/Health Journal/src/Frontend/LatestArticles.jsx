import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../Components/Navigation';
import '../CSS/Pages.css';

const LatestArticles = () => {
  return (
    <>
      <Navigation />
      <div className="sd-page">
        <div className="container">
          <div className="sd-breadcrumb">
            <Link to="/">Home</Link> / Latest Articles
          </div>

          <section className="sd-articles-section">
            <div className="sd-filters">
              <div className="filter-group">
                <label>Article Type</label>
                <select>
                  <option>All Types</option>
                  <option>Research Articles</option>
                  <option>Review Articles</option>
                  <option>Case Studies</option>
                </select>
              </div>
              <div className="filter-group">
                <label>Publication Date</label>
                <select>
                  <option>Last 3 Months</option>
                  <option>Last 6 Months</option>
                  <option>Last Year</option>
                  <option>All Time</option>
                </select>
              </div>
            </div>

            <div className="articles-list">
              {[1].map((item) => (
                <div key={item} className="article-item">
                  <div className="article-content">
                    <span className="article-type">Original Research</span>
                    <h3 style={{color:"var(--sd-primary)"}}>Machine Learning Applications in Clinical Decision Support</h3>
                    <p className="authors">
                      <strong>Authors:</strong> David Smith, Emma Johnson, et al.
                    </p>
                    <p className="abstract">
                      This study investigates the implementation of machine learning algorithms...
                    </p>
                   
                  </div>
                </div>
              ))}
            </div>

          </section>
        </div>
      </div>
    </>
  );
};

export default LatestArticles; 