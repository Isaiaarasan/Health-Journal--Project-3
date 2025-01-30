import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import "../CSS/Dashboard.css";
import LogoutAndSettings from "../Frontend/LogoutAndSettings"; 

const Dashboard = () => {
  const [isProfileVisible, setIsProfileVisible] = useState(false);

  const handleProfileClick = () => {
    setIsProfileVisible(!isProfileVisible);
  };

  return (
    <div className="dashboard-container">
      <h2>Welcome to Your Dashboard</h2>
      <div className="profile-logo" onClick={handleProfileClick}>
        <button style={{color:"var(--sd-primary)"}}>Profile</button>
      </div>
      {isProfileVisible && (
        <div className="profile-details">
          <div className="profile-header">
            <h3 style={{color:"var(--sd-primary)"}}>Profile Details</h3>
            <button onClick={handleProfileClick} className="close-btn">
              Close
            </button>
          </div>
          <div className="profile-info">
            <img src="I:\Health Journal- P3\Health Journal\src\image\arasan1.JPG" alt="Profile" className="profile-pic" />
            <p><strong>Name:</strong> Elavarasan </p>
            <p><strong>Email:</strong> arasan9706@gmail.com</p>
            <p><strong>Address:</strong> Sri Eshwar College of Engineering, Coimbatore</p>
            <Link to="/profile-settings">
              <button className="edit-btn">Edit Profile</button>
            </Link>
          </div>
        </div>
      )}

      <div className="theory-section">
        <h3 style={{color:"var(--sd-primary)"}}>Dashboard Overview</h3>
        <p style={{color:"var(--sd-primary)"}}>Your dashboard gives you a quick overview of your profile, recent activities, and health records.</p>
      </div>
      <div className="cards-container">
        <div className="card">
          <h4>Track Your Symptoms</h4>
          <p>Keep a record of your health symptoms.</p>
          <Link to="/symptom-tracker" className="card-link">Go to Symptom Tracker</Link>
        </div>
        <div className="card">
          <h4>Health History</h4>
          <p>View your health records and symptoms.</p>
          <Link to="/medical-history" className="card-link">View Health History</Link>
        </div>
        <div className="card">
          <h4>Recent Activities</h4>
          <p>Keep track of recent updates.</p>
          <Link to="/recent-activities" className="card-link">See Activities</Link>
        </div>
        <div className="card">
          <h4>Tracking Features</h4>
          <p>Track your health conditions and medications.</p>
          <Link to="/tracking-features" className="card-link">Explore Tracking Features</Link>
        </div>
        <div className="card">
          <h4>Community & Wellness Resources</h4>
          <p>Find mental health and wellness resources.</p>
          <Link to="/charts" className="card-link">Community & Wellness Resources</Link>
        </div>
        <div className="card">
          <h4>Medication & Reminders</h4>
          <p>Set reminders for your medications.</p>
          <Link to="/medication-reminders" className="card-link">Medication & Reminders</Link> 
        </div>
      </div>
      <div className="logout-btn">
        <LogoutAndSettings />
      </div>
    </div>
  );
};

export default Dashboard;
