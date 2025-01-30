import React, { useState } from "react";
import "../CSS/ManageMedications.css"; 
const ManageMedications = () => {
  const [medications, setMedications] = useState([]);
  const [newMedication, setNewMedication] = useState({
    name: "",
    dosage: "",
    time: "",
  });
  const [editIndex, setEditIndex] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMedication((prev) => ({ ...prev, [name]: value }));
  };
  const handleSave = () => {
    if (!newMedication.name || !newMedication.dosage || !newMedication.time) {
      alert("Please fill in all fields.");
      return;
    }

    if (editIndex !== null) {
      const updatedMedications = [...medications];
      updatedMedications[editIndex] = newMedication;
      setMedications(updatedMedications);
      setEditIndex(null);
    } else {
      setMedications([...medications, newMedication]);
    }

    setNewMedication({ name: "", dosage: "", time: "" });
  };
  const handleEdit = (index) => {
    setNewMedication(medications[index]);
    setEditIndex(index);
  };
  const handleDelete = (index) => {
    const updatedMedications = medications.filter((_, i) => i !== index);
    setMedications(updatedMedications);
  };

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
        {medications.length > 0 ? (
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
