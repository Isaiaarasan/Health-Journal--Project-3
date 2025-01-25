import React from "react";
import SymptomTracker from "../Frontend/Symptom Tracker";
import ReportsAndCharts from "../Frontend/Reports & Charts";
import ProfileSettings from "../Frontend/Profile Settings";
import "../style.css/Dashboard.css";


const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1>Health Journal Dashboard</h1>

      <div className="section">
        <ProfileSettings />
      </div>

      <div className="section">
        <SymptomTracker />
      </div>

      <div className="section">
        <ReportsAndCharts />
      </div>
    </div>
  );
};

export default Dashboard;
