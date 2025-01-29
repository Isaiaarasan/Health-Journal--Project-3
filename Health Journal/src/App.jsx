import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Frontend/Dashboard";
import Login from "./Frontend/Login";
import Signup from "./Frontend/Signup";
import ProfileSettings from "./Frontend/Profile Settings";
import MedicalHistory from "./Frontend/Medical History"; // Assuming this component exists
import SymptomTracker from "./Frontend/Symptom Tracker"; // Assuming this component exists
import ReportsCharts from "./Frontend/Reports & Charts"; 
import Activities from "./Frontend/Activities";
import TrackingFeatures from "./Frontend/TrackingFeatures";
import MedicationAndReminders from "./Frontend/MedicationAndReminders";
import LogoutAndSettings from "./Frontend/LogoutAndSettings";
import Charts from "./Frontend/Charts";
import ManageMedications from "./Frontend/ManageMedications";
import Landing from "./Frontend/Landing";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Login />} /> Login page */}
        <Route path="/login" element={<Login />} /> {/* Login page */}
        <Route path="/signup" element={<Signup />} /> {/* Signup page */}
        <Route path="/dashboard" element={<Dashboard />} /> {/* Dashboard */}
        <Route path="/profile-settings" element={<ProfileSettings />} /> {/* Profile Settings */}
        <Route path="/medical-history" element={<MedicalHistory />} /> {/* Medical History */}
        <Route path="/symptom-tracker" element={<SymptomTracker />} /> {/* Symptom Tracker */}
        <Route path="/reports-charts" element={<ReportsCharts />} /> {/* Reports & Charts */}
        <Route path="/recent-activities" element={<Activities />} /> {/* Reports & Charts */}
        <Route path="/tracking-features" element={<TrackingFeatures />} /> {/* Symptom Tracker route */}
        <Route path="/medication-reminders" element={<MedicationAndReminders />} /> {/* Medication & Reminders */}
        <Route path="/logout-settings" element={<LogoutAndSettings />} /> {/* Logout & Settings */}
        <Route path="/charts" element={<Charts />} /> {/* Charts */}
        <Route path="/manage-medications" element={<ManageMedications/>}/> {/* Manage Medications */}
        <Route path="/" element={<Landing />} /> {/* Landing page */}
      </Routes>
    </Router>
  );
};

export default App;
