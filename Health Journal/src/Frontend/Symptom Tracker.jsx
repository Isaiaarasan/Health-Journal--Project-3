import React, { useState, useEffect } from "react";
import "../style.css/SymptomTracker.css";

const SymptomTracker = () => {
  const [symptoms, setSymptoms] = useState([]);
  const [formData, setFormData] = useState({
    symptom: "",
    severity: "",
    duration: "",
  });

  // Load symptoms from Local Storage when the component mounts
  useEffect(() => {
    const storedSymptoms = JSON.parse(localStorage.getItem("symptoms")) || [];
    setSymptoms(storedSymptoms);
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add new symptom
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedSymptoms = [...symptoms, formData];
    setSymptoms(updatedSymptoms);
    localStorage.setItem("symptoms", JSON.stringify(updatedSymptoms)); // Save to Local Storage
    setFormData({ symptom: "", severity: "", duration: "" }); // Reset form
  };

  // Delete a symptom
  const handleDelete = (index) => {
    const updatedSymptoms = symptoms.filter((_, i) => i !== index);
    setSymptoms(updatedSymptoms);
    localStorage.setItem("symptoms", JSON.stringify(updatedSymptoms)); // Update Local Storage
  };

  return (
    <div className="container">
      <h2>Symptom Tracker</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="symptom"
          placeholder="Symptom"
          value={formData.symptom}
          onChange={handleChange}
          required
        />
        <select
          name="severity"
          value={formData.severity}
          onChange={handleChange}
          required
        >
          <option value="">Severity</option>
          <option value="Mild">Mild</option>
          <option value="Moderate">Moderate</option>
          <option value="Severe">Severe</option>
        </select>
        <input
          type="text"
          name="duration"
          placeholder="Duration (in hours)"
          value={formData.duration}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Symptom</button>
      </form>

      <h3>Tracked Symptoms</h3>
      {symptoms.length === 0 ? (
        <p>No symptoms recorded yet.</p>
      ) : (
        <ul>
          {symptoms.map((record, index) => (
            <li key={index} className="symptom-item">
              <strong>{record.symptom}</strong> - {record.severity}  
              <br />
              <em>Duration:</em> {record.duration} hours
              <br />
              <button onClick={() => handleDelete(index)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SymptomTracker;
