import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../../utils/config";
import { IoReload } from "react-icons/io5";
import { useSelector } from "react-redux";

const TotalBookings = () => {
  const { token } = useSelector((state) => state.user.currentUser);

  const [toursSold, setToursSold] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBookedTours = async () => {
    // if (!startDate || !endDate) {
    //   setError("Vui lòng chọn ngày bắt đầu và ngày kết thúc.");
    //   return;
    // }
    setIsLoading(true);
    setError(null);
    try {
      let url = `${BASE_URL}/statistical/tours-sold`;
      if (startDate && endDate) {
        url += `?startDate=${startDate}&endDate=${endDate}`;
      }
      const response = await axios.get(url, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      //console.log(response.data);
      setToursSold(response.data.toursSold);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchBookedTours();
  }, []);

  // useEffect này sẽ chạy mỗi khi startDate hoặc endDate thay đổi
  useEffect(() => {
    if (startDate && endDate) {
      fetchBookedTours();
    }
  }, [startDate, endDate]);

  return (
    <div className="mx-auto my-2 max-w-xl rounded bg-white p-4 shadow">
      <h2 className="mb-4 text-center text-2xl font-bold">Đặt Tour</h2>
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
            Số lượng: <span className="font-semibold">{toursSold}</span>
          </p>
        )}
      </div>
      {error && (
        <p className="mt-2 text-center text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default TotalBookings;
