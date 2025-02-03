import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../CSS/MedicalHistory.css";

// Use `import.meta.env` for Vite and fallback for CRA
const API_URL = import.meta.env.VITE_API_URL || "http://mongodb+srv://arasan:17652000@health-journal.xxwey.mongodb.net/healthjournal";

const MedicalHistory = () => {
    const [history, setHistory] = useState([]);
    const [newEntry, setNewEntry] = useState({
        date: "",
        diagnosis: "",
        medications: "",
        doctor: "",
    });
    const [loading, setLoading] = useState(false);
    const [showHistory, setShowHistory] = useState(false);

    const fetchHistory = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/medical-history`);
            setHistory(response.data);
        } catch (error) {
            console.error("Error fetching medical history:", error);
            alert("Failed to fetch medical history.");
        }
    };

    const handleViewHistory = async () => {
        if (!showHistory) {
            await fetchHistory();
        }
        setShowHistory(!showHistory);
    };

    useEffect(() => {
        // Optional: Prefetch history to improve performance
        fetchHistory();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Basic validation
        if (!newEntry.date || !newEntry.diagnosis || !newEntry.medications || !newEntry.doctor) {
            return alert("Please fill all the fields.");
        }

        setLoading(true);
        try {
            console.log("Submitting the following data:", newEntry);
            const response = await axios.post(`${API_URL}/api/medical-history`, newEntry);
            // Re-fetch the history to ensure it's up to date
            fetchHistory();
            setNewEntry({ date: "", diagnosis: "", medications: "", doctor: "" });

            // Show a success popup
            alert("Added successfully!");
        } catch (error) {
            console.error("Error submitting new medical history:", error);
            alert("Failed to add medical history.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="medical-history-container">
            <h2 className="history-title">Medical History</h2>
            
          

            {showHistory && (
                <div className="history-section">
                    {loading ? (
                        <p className="loading">Loading medical history...</p>
                    ) : Array.isArray(history) && history.length > 0 ? (
                        <ul className="history-list">
                            {history.map((item, index) => (
                                <li key={index} className="history-item">
                                    <p><strong>Date:</strong> {new Date(item.date).toLocaleDateString()}</p>
                                    <p><strong>Diagnosis:</strong> {item.diagnosis}</p>
                                    <p><strong>Medications:</strong> {item.medications}</p>
                                    <p><strong>Doctor:</strong> {item.doctor}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="no-history">No medical history available.</p>
                    )}
                </div>
            )}

            {/* Form to Add New Medical History */}
            <form onSubmit={handleSubmit}>
                <input
                    type="date"
                    value={newEntry.date}
                    onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
                    placeholder="Date of record"
                    required
                />
                <input
                    type="text"
                    value={newEntry.diagnosis}
                    onChange={(e) => setNewEntry({ ...newEntry, diagnosis: e.target.value })}
                    placeholder="Diagnosis"
                    required
                />
                <input
                    type="text"
                    value={newEntry.medications}
                    onChange={(e) => setNewEntry({ ...newEntry, medications: e.target.value })}
                    placeholder="Medications"
                    required
                />
                <input
                    type="text"
                    value={newEntry.doctor}
                    onChange={(e) => setNewEntry({ ...newEntry, doctor: e.target.value })}
                    placeholder="Doctor"
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Adding..." : "Add Record"}
                </button>
                <button type="button" onClick={handleViewHistory}>
                    {showHistory ? "Hide History" : "View History"}
                </button>
                <Link to="/medication-reminders" className="card-link">
                    Go to Medication Reminders
                </Link>
            </form>
        </div>
    );
};

export default MedicalHistory;