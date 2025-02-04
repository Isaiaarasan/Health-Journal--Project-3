import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; 
import "../CSS/MedicationAndReminders.css";

const API_URL = import.meta.env.VITE_API_URL || 'https://health-journal-project-3.onrender.com';

const MedicationAndReminders = () => {
  const [upcomingDoses, setUpcomingDoses] = useState([]);
  const [missedDoses, setMissedDoses] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMedications = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/medications`);
      const medications = response.data;
      const currentDateTime = new Date();
      const currentDate = currentDateTime.toISOString().split('T')[0];
      const upcomingMeds = [];
      const missedMedsList = [];

      medications.forEach(med => {
        const [hours, minutes] = med.time.split(':');
        const medDateTime = new Date();
        medDateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
        if (medDateTime > currentDateTime) {
          upcomingMeds.push({
            medication: med.name,
            time: med.time,
            dosage: med.dosage
          });
        } else {
          missedMedsList.push({
            medication: med.name,
            date: currentDate,
            dosage: med.dosage
          });
        }
      });

      setUpcomingDoses(upcomingMeds);
      setMissedDoses(missedMedsList);

      const prescriptionMeds = medications.map(med => ({
        medication: med.name,
        instructions: `Take ${med.dosage} at ${med.time}`
      }));

      setPrescriptions(prescriptionMeds);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching medications:", err);
      setError("Failed to fetch medications");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedications();
  }, []);

  if (loading) return <div>Loading medications...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="medication-container">
      <h2>Medication & Reminders</h2>
      <div className="reminder-section">
        <h3>Upcoming Doses</h3>
        {upcomingDoses.length > 0 ? (
          <ul>
            {upcomingDoses.map((dose, index) => (
              <li key={index} className="upcoming-dose">
                <div className="dose-details">
                  <strong>{dose.medication}</strong>
                  <span className="dose-time">at {dose.time}</span>
                </div>
                <div className="dose-info">
                  <span className="dose-amount">{dose.dosage}</span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-doses">No upcoming doses.</p>
        )}
      </div>
      <div className="reminder-section">
        <h3>Missed Doses</h3>
        {missedDoses.length > 0 ? (
          <ul>
            {missedDoses.map((dose, index) => (
              <li key={index} className="missed-dose">
                <div className="dose-details">
                  <strong>{dose.medication}</strong>
                  <span className="dose-date">missed on {dose.date}</span>
                </div>
                <div className="dose-info">
                  <span className="dose-amount">{dose.dosage}</span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-doses">No missed doses.</p>
        )}
      </div>
      <div className="reminder-section">
        <h3>Doctor's Prescriptions & Notes</h3>
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
