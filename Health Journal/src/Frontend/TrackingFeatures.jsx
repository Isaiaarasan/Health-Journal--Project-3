import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/TrackingFeatures.css";

const API_URL = import.meta.env.VITE_API_URL || 'https://health-journal-project-3.onrender.com';

const features = [
  {
    title: "Condition Shifts",
    description: "Rate your overall wellbeing on a scale of 0 to 100",
    icon: "➖0",
    color: "text-red-500 border-red-500",
  },
  {
    title: "Mood Swings",
    description: "Track your positive and negative mood changes",
    icon: "🙂",
    color: "text-gray-400 border-gray-400",
  },
  {
    title: "Symptom Changes",
    description: "Add, remove, and rate your symptoms each day",
    icon: "🤒",
    color: "text-red-500 border-red-500",
  },
  {
    title: "Medications",
    description: "Set reminders and log when you take your medications",
    icon: "🧘",
    color: "text-red-500 border-red-500",
  },
  {
    title: "Daily Activities",
    description: "Record activities like meals, exercise, mindfulness, & more",
    icon: "🌱",
    color: "text-red-500 border-red-500",
  },
  {
    title: "Vitals",
    description: "Enter your heart rate, blood glucose, weight, & other vitals",
    icon: "📉",
    color: "text-red-500 border-red-500",
  },
  {
    title: "Treatments",
    description: "Log appointment details, get reminders, and track your progress",
    icon: "🩺",
    color: "text-red-500 border-red-500",
  },
  {
    title: "Journal Entries",
    description: "Record notes, thoughts, & experiences over the course of treatment",
    icon: "📝",
    color: "text-gray-400 border-gray-400",
  },
];

const TrackingFeatures = () => {
  const navigate = useNavigate();

  const handleMoveToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <section className="tracking-features py-12 bg-black text-center">
      <div className="features-header">
        <h2 className="text-3xl font-bold text-white mb-10">What can Wave help you track?</h2>
        <button 
          className="move-to-dashboard-btn" 
          onClick={handleMoveToDashboard}
        >
          Move to Dashboard
        </button>
      </div>
      <div className="grid-container features-grid">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className={`feature-card flex flex-col items-center bg-gray-900 shadow-xl rounded-lg p-6 border ${feature.color}`}
          >
            <div className={`w-16 h-16 flex items-center justify-center rounded-full border-4 ${feature.color} text-2xl font-bold`}>
              {feature.icon}
            </div>
            <h3 className="mt-4 font-semibold text-lg text-white">{feature.title}</h3>
            <p className="text-gray-400 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrackingFeatures;
