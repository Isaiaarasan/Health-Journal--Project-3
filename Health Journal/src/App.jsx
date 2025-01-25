import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Frontend/Dashboard"; // Import the Dashboard component
import Login from "./Frontend/Login"; // Assuming you have a Login page component
import Signup from "./Frontend/Signup"; // Assuming you have a Signup page component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />  {/* Login page route */}
        <Route path="/signup" element={<Signup />} />  {/* Signup page route */}
        <Route path="/dashboard" element={<Dashboard />} />  {/* Dashboard page route */}
      </Routes>
    </Router>
  );
};

export default App;
