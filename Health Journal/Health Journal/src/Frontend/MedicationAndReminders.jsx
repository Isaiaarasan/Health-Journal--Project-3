import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import "../CSS/MedicationAndReminders.css";
const MedicationAndReminders = () => {
    const [upcomingDoses, setUpcomingDoses] = useState([
    { medication: "Paracetamol", time: "6:00 PM" },
    { medication: "Vitamin D", time: "9:00 AM" },
  ]);
  const [missedDoses, setMissedDoses] = useState([
    { medication: "Vitamin C", date: "2025-01-25" },
  ]);

  const [prescriptions, setPrescriptions] = useState([
    { medication: "Paracetamol", instructions: "Take 2 tablets after meals" },
    { medication: "Vitamin D", instructions: "Take 1 tablet every morning" },
  ]);

  return (
    <div className="medication-container">
      <h2>Medication & Reminders</h2>
      <div className="reminder-section">
        <h3>Upcoming Doses</h3>
        {upcomingDoses.length > 0 ? (
          <ul>
            {upcomingDoses.map((dose, index) => (
              <li key={index}>
                <strong>{dose.medication}</strong> at {dose.time}
              </li>
            ))}
          </ul>
        ) : (
          <p>No upcoming doses.</p>
        )}
      </div>
      <div className="reminder-section">
        <h3>Missed Doses</h3>
        {missedDoses.length > 0 ? (
          <ul>
            {missedDoses.map((dose, index) => (
              <li key={index}>
                <strong>{dose.medication}</strong> missed on {dose.date}.
              </li>
            ))}
          </ul>
        ) : (
          <p>No missed doses.</p>
        )}
      </div>
      <div className="reminder-section">
        <h3>Doctor’s Prescriptions & Notes</h3>
        {prescriptions.length > 0 ? (
          <ul>
            {prescriptions.map((prescription, index) => (
              <li key={index}>
                <strong>{prescription.medication}</strong>: {prescription.instructions}
              </li>
            ))}
          </ul>
        ) : (
          <p>No prescriptions available.</p>
        )}
      </div>
      <Link to="/manage-medications">
        <button className="manage-btn">Manage Medications</button>
      </Link>
    </div>
  );
};

export default MedicationAndReminders;
