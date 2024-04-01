import { useState, useEffect } from "react";
import { BASE_URL } from "../../../utils/config";

import DayChart from "../RevenueChart/DayChart";

const RevenueByDay = () => {
  const [revenueData, setRevenueData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRevenueByDay();
  }, []);

  const fetchRevenueByDay = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/statistical/daily-revenue`);

      const data = await response.json();
      setRevenueData(data);
    } catch (error) {
      console.error("Failed to fetch revenue by day:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-5 max-w-4xl rounded-lg bg-white p-5 shadow-lg">
      <h2 className="mb-4 text-2xl font-semibold text-gray-800">
        Doanh Thu Theo Ngày
      </h2>
      {loading ? (
        <p className="text-center text-gray-500">Đang tải...</p>
      ) : (
        <div className="grid grid-cols-4">
          <div className="">
            <table className=" divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Ngày
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Doanh Thu
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {revenueData.map((item) => (
                  <tr key={item._id}>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {item._id}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {item.totalRevenue.toLocaleString()} đ
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="col-span-3 ml-16">
            <DayChart revenueData={revenueData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default RevenueByDay;
