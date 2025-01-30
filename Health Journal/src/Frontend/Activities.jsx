import React from "react";
import "../CSS/Activities.css";

const Activities = () => {
  // Sample activities data
  const activities = [
    { date: "2025-01-24", description: "Uploaded a new symptom entry for headache." },
    { date: "2025-01-23", description: "Updated profile picture." },
    { date: "2025-01-22", description: "Added new medical history entry." },
    { date: "2025-01-21", description: "Logged a new health symptom." },
    { date: "2025-01-20", description: "Profile updated successfully." }
  ];

  return (
    <div className="activities-container">
      <h2>Recent Activities</h2>
      
      <div className="activity-list">
        {activities.map((activity, index) => (
          <div key={index} className="activity-card">
            <div className="activity-date">{activity.date}</div>
            <div className="activity-description">{activity.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activities;
