import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/config";
import { IoReload } from "react-icons/io5";

const TotalTours = () => {
  const [totalTours, setTotalTours] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTotalTours = async () => {
    if (!startDate || !endDate) {
      setError("Vui lòng chọn ngày bắt đầu và ngày kết thúc.");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${BASE_URL}/statistical/total-tours?startDate=${startDate}&endDate=${endDate}`,
      );
      setTotalTours(response.data.totalTours);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTotalTours();
  }, [startDate, endDate]);

  return (
    <div className="mx-auto mt-12 max-w-xl rounded bg-white p-4 shadow">
      <h2 className="mb-4 text-center text-2xl font-bold">Tour</h2>
      <div className="mb-4 grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Ngày bắt đầu
          </label>
          <input
            type="date"
            value={startDate}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Ngày kết thúc
          </label>
          <input
            type="date"
            value={endDate}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center justify-center">
        {isLoading ? (
          <IoReload className="mr-3 h-5 w-5 animate-spin" />
        ) : (
          <p className="text-lg">
            Số lượng: <span className="font-semibold">{totalTours}</span>
          </p>
        )}
      </div>
      {error && (
        <p className="mt-2 text-center text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default TotalTours;
