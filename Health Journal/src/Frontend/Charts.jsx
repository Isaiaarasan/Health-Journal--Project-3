import React from "react";
import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import "../CSS/Charts.css";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const moodData = [4, 3, 5, 2, 4, 5, 3]; 
  const symptomData = [2, 3, 1, 4, 2, 3, 1]; 
  const medicationAdherence = [100, 90, 95, 85, 100, 100, 90]; 
  const activityData = [5000, 6000, 5500, 4500, 7000, 7500, 8000]; 

  const moodChartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Mood Rating",
        data: moodData,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const symptomChartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Symptom Severity",
        data: symptomData,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const adherenceChartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Medication Adherence (%)",
        data: medicationAdherence,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const activityChartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Steps Walked",
        data: activityData,
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <h2>Health Tracking & Statistics</h2>
      <div className="chart-container">
        <h3>Mood & Symptom Trends</h3>
        <Line data={moodChartData} options={{ responsive: true }} />
      </div>
      <div className="chart-container">
        <h3>Mood & Symptom Trends</h3>
        <Line data={symptomChartData} options={{ responsive: true }} />
      </div>
      <div className="chart-container">
        <h3>Medication Adherence</h3>
        <Bar data={adherenceChartData} options={{ responsive: true }} />
      </div>
      <div className="chart-container">
        <h3>Activity Level (Steps Walked)</h3>
        <Bar data={activityChartData} options={{ responsive: true }} />
      </div>
    </div>
  );
};

export default Dashboard;
