import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "../CSS/Dashboard.css";

const Dashboard = () => {
  const [isProfileVisible, setIsProfileVisible] = useState(false);

  const handleProfileClick = () => {
    setIsProfileVisible(!isProfileVisible);
  };

  return (
    
    <div className="dashboard-container">
      <h2>Welcome to Your Dashboard</h2>

      {/* Profile Logo in top-right corner */}
      <div className="profile-logo" onClick={handleProfileClick}>
        <img src="profile-logo.png" alt="Profile" />
      </div>

      {/* Profile Details dropdown */}
      {isProfileVisible && (
        <div className="profile-details">
          <div className="profile-header">
            <h3>Profile Details</h3>
            <button onClick={handleProfileClick} className="close-btn">
              Close
            </button>
          </div>
          <div className="profile-info">
            <img src="I:\Health Journal- P3\Health Journal\src\image\arasan1.JPG" alt="Profile" className="profile-pic" />
            <p><strong>Name:</strong> Elavarasan </p>
            <p><strong>Email:</strong> arasan9706@gmail.com</p>
            <p><strong>Address:</strong> Sri Eshwar College of Enfineering,Coimbatore</p>
            {/* Link to Profile Settings */}
            <Link to="/profile-settings">
              <button className="edit-btn">Edit Profile</button>
            </Link>
          </div>
        </div>
      )}

      {/* Theory Section */}
      <div className="theory-section">
        <h3>Dashboard Overview</h3>
        <p>
          Your dashboard gives you a quick overview of your profile, recent activities, and health records. Stay on top of your updates, manage your settings, and access key features of your health journal from here.
        </p>
      </div>

      {/* Dashboard Cards */}
      <div className="cards-container">
        <div className="card">
          <h4>Profile Settings</h4>
          <p>Update your personal information, change your password, and upload a new profile picture.</p>
          <Link to="/profile-settings" className="card-link">Go to Profile Settings</Link>
        </div>

        <div className="card">
          <h4>Health History</h4>
          <p>View your health records, symptoms, and other medical data.</p>
          <Link to="/medical-history" className="card-link">View Health History</Link>
        </div>

        <div className="card">
          <h4>Recent Activities</h4>
          <p>Keep track of recent updates and activities related to your health journal.</p>
          <Link to="/recent-activities" className="card-link">See Activities</Link>
        </div>

        <div className="card">
          <h4>Track Your Symptoms</h4>
          <p>Keep a record of your health symptoms and their severity.</p>
          <Link to="/symptom-tracker" className="card-link">Go to Symptom Tracker</Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
