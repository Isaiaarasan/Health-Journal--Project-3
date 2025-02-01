import React, { useState, useEffect } from "react";
import axios from "axios";
import "../CSS/MedicalHistory.css"; // Separate CSS for this component

const MedicalHistory = () => {
  const [history, setHistory] = useState([]);
  const [formData, setFormData] = useState({
    date: "",
    diagnosis: "",
    medications: "",
    doctor: "",
  });

  // Fetch medical history records from the backend
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        console.log("Fetching medical history from:", process.env.REACT_APP_API_URL);  // Check the API URL
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/medical-history`);
        setHistory(response.data); // Set medical history records from the backend
      } catch (error) {
        console.error("Error fetching medical history:", error);
      }
    };
    fetchHistory();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Log formData before sending to ensure data is captured correctly
    console.log("Submitting the following data:", formData);

    try {
      const { date, diagnosis, medications, doctor } = formData;
      const newRecord = { date, diagnosis, medications, doctor };

      // Check if API URL is valid
      console.log("Posting to:", `${process.env.REACT_APP_API_URL}/medical-history`);

      const response = await axios.post(`${process.env.REACT_APP_API_URL}/medical-history`, newRecord);
      console.log("Server Response:", response); // Log the response from the backend

      setHistory([...history, newRecord]); // Update local state with new record
      setFormData({ date: "", diagnosis: "", medications: "", doctor: "" });
    } catch (error) {
      console.error("Error submitting new medical history:", error);
    }
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
                <h4>{new Date(record.date).toLocaleDateString()}</h4>
                <p><strong>Diagnosis:</strong> {record.diagnosis}</p>
                <p><strong>Medications:</strong> {record.medications}</p>
                <p><strong>Doctor:</strong> {record.doctor}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MedicalHistory;
