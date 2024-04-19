import React, { useRef, useEffect } from "react";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
);

const RevenueChart = ({ revenueData }) => {
  const chartRef = useRef(null);
  const chartData = {
    labels: revenueData?.map((data) => `${data._id.month}/${data._id.year}`),
    datasets: [
      {
        label: "Doanh Thu",
        data: revenueData?.map((data) => data.totalRevenue),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    layout: {
      backgroundColor: "#f3f4f6",
    },
  };

  useEffect(() => {
    const chart = chartRef.current;
    if (chart) {
      const ctx = chart.ctx;
      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, "rgba(135, 206, 235, 0.8)"); // Light blue
      gradient.addColorStop(1, "rgba(255, 222, 173, 0.8)"); // Light coral

      chart.data.datasets[0].backgroundColor = gradient;
      chart.update();
    }
  }, [revenueData]);

  return (
    <div style={{ height: "400px" }}>
      <Line ref={chartRef} data={chartData} options={options} />
    </div>
  );
};

export default RevenueChart;
