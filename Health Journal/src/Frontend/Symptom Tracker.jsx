import React, { useState } from "react";
import "../CSS/SymptomTracker.css";

const SymptomTracker = () => {
  const [symptom, setSymptom] = useState("");
  const [severity, setSeverity] = useState("Mild");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Symptom Submitted", { symptom, severity, date, notes });
    alert("Symptom recorded successfully!");
    setSymptom("");
    setSeverity("Mild");
    setDate("");
    setNotes("");
  };

  return (
    <div className="symptom-tracker-container">
      <h2>Track Your Symptoms</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="symptom">Symptom</label>
          <input
            type="text"
            id="symptom"
            placeholder="Enter your symptom"
            value={symptom}
            onChange={(e) => setSymptom(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="severity">Severity</label>
          <select
            id="severity"
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
          >
            <option value="Mild">Mild</option>
            <option value="Moderate">Moderate</option>
            <option value="Severe">Severe</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            placeholder="Additional notes..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>

        <button type="submit" className="submit-btn">Submit</button>
      </form>
      
    </div>
    
  );
};

export default SymptomTracker;
