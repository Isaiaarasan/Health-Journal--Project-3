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
  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("medicalHistory")) || [];
    setHistory(storedHistory);
  }, []);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedHistory = [...history, formData];
    setHistory(updatedHistory);
    localStorage.setItem("medicalHistory", JSON.stringify(updatedHistory)); // Save to Local Storage
    setFormData({ date: "", diagnosis: "", medications: "", doctor: "" }); // Reset form
  };
  const handleDelete = (index) => {
    const updatedHistory = history.filter((_, i) => i !== index);
    setHistory(updatedHistory);
    localStorage.setItem("medicalHistory", JSON.stringify(updatedHistory)); // Update Local Storage
  };

  return (
    <div className="medical-history">
      <h2>Medical History</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="diagnosis"
          placeholder="Diagnosis"
          value={formData.diagnosis}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="medications"
          placeholder="Medications"
          value={formData.medications}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="doctor"
          placeholder="Doctor Name"
          value={formData.doctor}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Record</button>
      </form>
      <h3>History Records</h3>
      {history.length === 0 ? (
        <p>No medical history recorded.</p>
      ) : (
        <div className="card-container">
          {history.map((record, index) => (
            <div key={index} className="card">
              <div className="card-info">
                <h4>{record.date}</h4>
                <p><strong>Diagnosis:</strong> {record.diagnosis}</p>
                <p><strong>Medications:</strong> {record.medications}</p>
                <p><strong>Doctor:</strong> {record.doctor}</p>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default MedicalHistory;
