import React, { useState, useEffect } from "react";
import "../CSS/Activities.css";

const SymptomList = () => {
  const [symptoms, setSymptoms] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSymptoms = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/symptoms");
        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        const data = await response.json();
        setSymptoms(data);
      } catch (error) {
        console.error("Error fetching symptoms:", error);
        setError("Failed to fetch symptoms. Please try again.");
      }
    };

    fetchSymptoms();
  }, []);

  return (
    <div className="symptom-container">
      <h2>Symptoms List</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul className="symptom-list">
        {symptoms.map((symptom, index) => (
          <li key={index} className="symptom-card">
            <p className="symptom-name">
              <strong>Symptom:</strong> {symptom.symptom}
            </p>
            <p className="symptom-severity">
              <strong>Severity:</strong> {symptom.severity}
            </p>
            <p className="symptom-date">
              <strong>Date:</strong> {new Date(symptom.date).toLocaleDateString()}
            </p>
            {symptom.notes && ( // Display notes if available
              <p className="symptom-notes">
                <strong>Notes:</strong> {symptom.notes}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SymptomList;
