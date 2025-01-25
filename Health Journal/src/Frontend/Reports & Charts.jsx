import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import "../style.css/Dashboard.css"; // Import chart components
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";

// Register necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const ReportsAndCharts = () => {
  const [chartData, setChartData] = useState({
    barChartData: {
      labels: ["January", "February", "March", "April", "May"],
      datasets: [
        {
          label: "Symptom Severity",
          data: [65, 59, 80, 81, 56],
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    },
    pieChartData: {
      labels: ["Mild", "Moderate", "Severe"],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        },
      ],
    },
  });

  useEffect(() => {
    // Fetch chart data if needed from API or local storage
    // For example: setChartData(fetchedData);
  }, []);

  return (
    <div className="container">
      <h2>Reports & Charts</h2>

      <div className="chart-container">
        <h3>Symptom Severity (Bar Chart)</h3>
        <Bar data={chartData.barChartData} options={{ responsive: true }} />
      </div>

      <div className="chart-container">
        <h3>Symptom Distribution (Pie Chart)</h3>
        <Pie data={chartData.pieChartData} options={{ responsive: true }} />
      </div>
    </div>
  );
};

export default ReportsAndCharts;
