import React, { useState } from "react";
import axios from "axios";
import "../CSS/SymptomTracker.css"; // Make sure you have a separate CSS for this component

const SymptomTracker = () => {
  const [formData, setFormData] = useState({
    symptom: "",
    severity: "",
    date: "",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newSymptom = { ...formData };
      // Post the symptom data to the backend
      await axios.post(`https://health-journal-project-3-1.onrender.com/api/symptoms`, newSymptom);
      setFormData({ symptom: "", severity: "", date: "", notes: "" });
    } catch (error) {
      console.error("Error submitting new symptom:", error);
    }
  };

  return (
    <div className="symptom-tracker">
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
          <option value="">Select Severity</option>
          <option value="Mild">Mild</option>
          <option value="Moderate">Moderate</option>
          <option value="Severe">Severe</option>
        </select>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <textarea
          name="notes"
          placeholder="Notes (optional)"
          value={formData.notes}
          onChange={handleChange}
        />
        <button type="submit">Record Symptom</button>
      </form>
    </div>
  );
};

export default SymptomTracker;
