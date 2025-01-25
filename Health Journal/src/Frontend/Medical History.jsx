import React, { useState, useEffect } from "react";
import "../CSS/MedicalHistory.css";

const MedicalHistory = () => {
  const [history, setHistory] = useState([]);
  const [formData, setFormData] = useState({
    date: "",
    diagnosis: "",
    medications: "",
    doctor: "",
  });

  // Load history from Local Storage when the component mounts
  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("medicalHistory")) || [];
    setHistory(storedHistory);
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add new medical record
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedHistory = [...history, formData];
    setHistory(updatedHistory);
    localStorage.setItem("medicalHistory", JSON.stringify(updatedHistory)); // Save to Local Storage
    setFormData({ date: "", diagnosis: "", medications: "", doctor: "" }); // Reset form
  };

  // Delete a record
  const handleDelete = (index) => {
    const updatedHistory = history.filter((_, i) => i !== index);
    setHistory(updatedHistory);
    localStorage.setItem("medicalHistory", JSON.stringify(updatedHistory)); // Update Local Storage
  };

  return (
    <div className="container">
      <h2>Medical History</h2>
      <form onSubmit={handleSubmit}>
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        <input type="text" name="diagnosis" placeholder="Diagnosis" value={formData.diagnosis} onChange={handleChange} required />
        <input type="text" name="medications" placeholder="Medications" value={formData.medications} onChange={handleChange} required />
        <input type="text" name="doctor" placeholder="Doctor Name" value={formData.doctor} onChange={handleChange} required />
        <button type="submit">Add Record</button>
      </form>

      <h3>History Records</h3>
      {history.length === 0 ? (
        <p>No medical history recorded.</p>
      ) : (
        <ul>
          {history.map((record, index) => (
            <li key={index} className="history-item">
              <strong>{record.date}</strong> - {record.diagnosis}  
              <br />
              <em>Medications:</em> {record.medications}  
              <br />
              <em>Doctor:</em> {record.doctor}  
              <br />
              <button onClick={() => handleDelete(index)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MedicalHistory;
