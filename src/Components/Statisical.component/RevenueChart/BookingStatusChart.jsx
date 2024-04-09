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
      },
    ],
  };

  const options = {
    plugins: {
      datalabels: {
        color: "#fff",
        anchor: "end",
        align: "start",
        offset: 50,
        font: {
          size: 13,
        },
        // formatter: (value, context) => {
        //   return context.chart.data.labels[context.dataIndex] + ": " + value;
        // },
        formatter: (value) => {
          return value; // Chỉ trả về giá trị
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            // let label = context.label || "";
            let label = context.chart.data.labels[context.dataIndex] || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed !== null) {
              label += context.parsed;
            }
            return label;
          },
        },
      },
    },
  };

  return (
    <div className="m-4">
      <div style={{ width: "70%", margin: "0 auto" }}>
        {" "}
        <h1 className="mb-4 text-center text-xl font-bold">
          Biểu đồ tròn thể hiện trạng thái đặt tour
        </h1>
        <Pie data={chartData} options={options} plugins={[ChartDataLabels]} />
      </div>
    </div>
  );
};

export default BookingStatusChart;
