import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../utils/config";

const RevenueByMonth = () => {
  // State để lưu trữ dữ liệu doanh thu
  const [revenueData, setRevenueData] = useState([]);

  const fetchRevenueData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/statistical/monthly-revenue`,
      );
      setRevenueData(response.data);
    } catch (error) {
      console.error("There was an error fetching the revenue data:", error);
    }
  };

  // Sử dụng useEffect để gọi API khi component được mount
  useEffect(() => {
    fetchRevenueData();
  }, []); // Mảng rỗng đảm bảo rằng API chỉ được gọi một lần

  return (
    <div className="mx-auto my-4 max-w-4xl rounded-lg border border-gray-200 bg-white px-4 py-8">
      <h2 className="mb-6  text-2xl font-bold text-gray-800">
        Doanh thu theo tháng
      </h2>
      <ul className="w-full  text-gray-900">
        {revenueData.map(({ _id, totalRevenue }, index) => (
          <li
            key={index}
            className={`flex items-center justify-between p-4 hover:bg-gray-50 ${
              index !== revenueData.length - 1 ? "border-b border-gray-200" : ""
            }`}
          >
            <span>
              Tháng: {_id.month}, Năm: {_id.year}
            </span>
            <span className="font-semibold">
              Tổng doanh thu: ${totalRevenue.toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RevenueByMonth;
