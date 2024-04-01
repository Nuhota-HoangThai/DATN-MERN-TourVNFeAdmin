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
  const chartData = {
    labels: revenueData.map((data) => data._id.year), // Thêm năm vào nhãn
    datasets: [
      {
        label: "Doanh Thu",
        data: revenueData.map((data) => data.totalRevenue),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
    ],
  };

  return (
    <div>
      <Line data={chartData} options={{ responsive: true }} />
    </div>
  );
};

export default RevenueChart;
