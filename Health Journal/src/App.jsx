import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Frontend/Dashboard";
import Login from "./Frontend/Login";
import Signup from "./Frontend/Signup";
import ProfileSettings from "./Frontend/ProfileSettings";
import MedicalHistory from "./Frontend/Medical History";
import SymptomTracker from "./Frontend/Symptom Tracker"; 
import ReportsCharts from "./Frontend/Reports & Charts"; 
import Activities from "./Frontend/Activities";
import TrackingFeatures from "./Frontend/TrackingFeatures";
import MedicationAndReminders from "./Frontend/MedicationAndReminders";
import LogoutAndSettings from "./Frontend/LogoutAndSettings";
import Charts from "./Frontend/Charts";
import ManageMedications from "./Frontend/ManageMedications";
import Landing from "./Frontend/Landing";
import Home from "./Frontend/Home";
import About from "./Frontend/About";
import Publish from "./Frontend/Publish";
import LatestArticles from "./Frontend/LatestArticles";
import Submissions from "./Frontend/Submissions";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} /> 
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/profile-settings" element={<ProfileSettings />} /> 
        <Route path="/profile-settings" element={<ProfileSettings />} />
        <Route path="/medical-history" element={<MedicalHistory />} /> 
        <Route path="/symptom-tracker" element={<SymptomTracker />} /> 
        <Route path="/reports-charts" element={<ReportsCharts />} />
        <Route path="/recent-activities" element={<Activities />} />
        <Route path="/tracking-features" element={<TrackingFeatures />} /> 
        <Route path="/medication-reminders" element={<MedicationAndReminders />} />
        <Route path="/logout-settings" element={<LogoutAndSettings />} /> 
        <Route path="/charts" element={<Charts />} />
        <Route path="/manage-medications" element={<ManageMedications/>}/> 
        <Route path="/" element={<Landing />} /> 
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/publish" element={<Publish />} />
        <Route path="/articles" element={<LatestArticles />} />
        <Route path="/submissions" element={<Submissions />} />
      </Routes>
    </Router>
  );
};

export default App;
