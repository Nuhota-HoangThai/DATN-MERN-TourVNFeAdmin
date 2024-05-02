import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels"; // Nhập plugin

import { translateStatus } from "../../../utils/formatStatus";

const BookingStatusChart = ({ bookingStats }) => {
  const chartData = {
    labels: Object.keys(bookingStats).map((status) => translateStatus(status)),
    datasets: [
      {
        data: Object.values(bookingStats),
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"].map(
          (color) => shadeColor(color, -20),
        ),
        borderWidth: 2,
        borderColor: "#fff",
        hoverOffset: 8,
        shadowOffsetX: 3,
        shadowOffsetY: 3,
        shadowBlur: 10,
        shadowColor: "rgba(0, 0, 0, 0.3)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 14,
            family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
          },
        },
      },
      datalabels: {
        color: "#fff",
        anchor: "end",
        align: "start",
        offset: 10,
        font: {
          size: 16,
        },
        formatter: (value, context) => {
          return `${context.chart.data.labels[context.dataIndex]}: ${value}`;
        },
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.parsed}`;
          },
        },
        bodyFont: {
          size: 14,
        },
        padding: 10,
        backgroundColor: "rgba(0,0,0,0.7)",
        bodyAlign: "center",
        titleFont: {
          size: 16,
          weight: "bold",
        },
      },
    },
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  };

  return (
    <div className="m-4">
      <div style={{ width: "70%", margin: "0 auto" }}>
        <h1 className="mb-4 text-center text-xl font-bold">
          Biểu đồ tròn thể hiện trạng thái đặt tour
        </h1>
        <Pie data={chartData} options={options} plugins={[ChartDataLabels]} />
      </div>
    </div>
  );
};

export default BookingStatusChart;

function shadeColor(color, percent) {
  let R = parseInt(color.substring(1, 3), 16);
  let G = parseInt(color.substring(3, 5), 16);
  let B = parseInt(color.substring(5, 7), 16);

  R = parseInt((R * (100 + percent)) / 100);
  G = parseInt((G * (100 + percent)) / 100);
  B = parseInt((B * (100 + percent)) / 100);

  R = R < 255 ? R : 255;
  G = G < 255 ? G : 255;
  B = B < 255 ? B : 255;

  const RR = R.toString(16).length == 1 ? "0" + R.toString(16) : R.toString(16);
  const GG = G.toString(16).length == 1 ? "0" + G.toString(16) : G.toString(16);
  const BB = B.toString(16).length == 1 ? "0" + B.toString(16) : B.toString(16);

  return "#" + RR + GG + BB;
}
