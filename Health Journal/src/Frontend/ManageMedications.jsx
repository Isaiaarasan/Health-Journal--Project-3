import React, { useState, useEffect } from "react";
import axios from "axios";
import "../CSS/ManageMedications.css"; 

const API_URL = import.meta.env.VITE_API_URL || 'https://health-journal-project-3.onrender.com';

const ManageMedications = () => {
  const [medications, setMedications] = useState([]);
  const [newMedication, setNewMedication] = useState({
    name: "",
    dosage: "",
    time: "",
  });
  const [editIndex, setEditIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMedication((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!newMedication.name || !newMedication.dosage || !newMedication.time) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      if (editIndex !== null) {
        // Update existing medication
        const response = await axios.put(
          `${API_URL}/api/medications/${medications[editIndex]._id}`, 
          newMedication
        );
        const updatedMedications = [...medications];
        updatedMedications[editIndex] = response.data;
        setMedications(updatedMedications);
        setEditIndex(null);
      } else {
        // Add new medication
        const response = await axios.post(`${API_URL}/api/medications`, newMedication);
        setMedications([...medications, response.data]);
      }
      
      setNewMedication({ name: "", dosage: "", time: "" });
      setLoading(false);
    } catch (err) {
      console.error("Error saving medication:", err);
      setError("Failed to save medication");
      setLoading(false);
    }
  };

  const handleEdit = (index) => {
    setNewMedication(medications[index]);
    setEditIndex(index);
  };

  const handleDelete = async (index) => {
    try {
      setLoading(true);
      await axios.delete(`${API_URL}/api/medications/${medications[index]._id}`);
      const updatedMedications = medications.filter((_, i) => i !== index);
      setMedications(updatedMedications);
      setLoading(false);
    } catch (err) {
      console.error("Error deleting medication:", err);
      setError("Failed to delete medication");
      setLoading(false);
    }
  };

  // Fetch medications from backend
  const fetchMedications = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/medications`);
      setMedications(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching medications:", err);
      setError("Failed to fetch medications");
      setLoading(false);
    }
  };

  // Load medications when component mounts
  useEffect(() => {
    fetchMedications();
  }, []);

  return (
    <div className="medication-container">
      <h2>Manage Medications</h2>
      <div className="medication-form">
        <input
          type="text"
          name="name"
          placeholder="Medication Name"
          value={newMedication.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="dosage"
          placeholder="Dosage (e.g., 500mg)"
          value={newMedication.dosage}
          onChange={handleChange}
        />
        <input
          type="time"
          name="time"
          value={newMedication.time}
          onChange={handleChange}
        />
        <button onClick={handleSave}>
          {editIndex !== null ? "Update" : "Add"} Medication
        </button>
      </div>
      <div className="medication-list">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : medications.length > 0 ? (
          medications.map((med, index) => (
            <div key={index} className="medication-card">
              <h3>{med.name}</h3>
              <p>
                <strong>Dosage:</strong> {med.dosage}
              </p>
              <p>
                <strong>Time:</strong> {med.time}
              </p>
              <button onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => handleDelete(index)} className="delete-btn">
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="no-medications">No medications added yet.</p>
        )}
      </div>
    </div>
  );
};

export default ManageMedications;
