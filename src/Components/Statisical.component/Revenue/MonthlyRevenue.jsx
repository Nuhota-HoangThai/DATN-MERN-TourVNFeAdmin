import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../utils/config";

import MonthChart from "../RevenueChart/MonthChart";

const RevenueByMonth = () => {
  const [revenueData, setRevenueData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRevenueData = async () => {
    setLoading(true); // Bắt đầu tải
    try {
      const response = await axios.get(
        `${BASE_URL}/statistical/monthly-revenue`,
      );
      setRevenueData(response.data);
      setError(""); // Xóa thông báo lỗi nếu lần gọi trước đó có lỗi
    } catch (error) {
      console.error("There was an error fetching the revenue data:", error);
      setError("Không thể tải dữ liệu doanh thu."); // Cập nhật trạng thái lỗi
    } finally {
      setLoading(false); // Kết thúc tải
    }
  };

  useEffect(() => {
    fetchRevenueData();
  }, []); // Dependency array rỗng đảm bảo useEffect chỉ chạy một lần sau khi component mount

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="mx-auto mt-5 max-w-4xl rounded-lg bg-white p-5 shadow-lg">
      <h2 className="mb-4 text-2xl font-semibold text-gray-800">
        Doanh Thu Theo Tháng
      </h2>
      {loading ? (
        <p className="text-center text-gray-500">Đang tải...</p>
      ) : (
        <div className="grid grid-cols-4">
          <div className="overflow-x-auto">
            <table className=" divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Tháng
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Doanh Thu
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {revenueData.map(({ _id, totalRevenue }, index) => (
                  <tr key={index}>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {_id.month}/{_id.year}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {totalRevenue.toLocaleString()} đ
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-span-3 ml-16">
            <MonthChart revenueData={revenueData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default RevenueByMonth;
