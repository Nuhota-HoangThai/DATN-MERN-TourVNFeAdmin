import { useState, useEffect } from "react";
import { BASE_URL } from "../../../utils/config";

import YearChart from "../RevenueChart/YearChart";
import axios from "axios";
import { useSelector } from "react-redux";

const RevenueByYear = () => {
  const { token } = useSelector((state) => state.user.currentUser);

  const [revenueData, setRevenueData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRevenueByYear();
  }, []);

  const fetchRevenueByYear = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/statistical/yearly-revenue`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      setRevenueData(res.data);
    } catch (error) {
      console.error("Failed to fetch revenue by year:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-4 my-5 rounded-lg bg-white p-5 shadow-xl">
      <h2 className="mb-6 font-semibold text-gray-800">Doanh Thu Theo Năm</h2>
      {loading ? (
        <p className="text-center text-gray-500">Đang tải...</p>
      ) : (
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/3">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Năm
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Doanh Thu
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {revenueData.map((item) => (
                    <tr key={item._id}>
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
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
          </div>
          <div className="mt-6 lg:ml-12 lg:mt-0 lg:w-2/3">
            <YearChart revenueData={revenueData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default RevenueByYear;
