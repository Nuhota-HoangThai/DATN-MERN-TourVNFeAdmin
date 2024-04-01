import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils/config";

const BillsList = () => {
  const [bills, setBills] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchBills = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/bill/getAllBills`);
      setBills(response.data);
      setIsLoading(false);
    } catch (error) {
      setError("Lỗi khi lấy dữ liệu.");
      setIsLoading(false);
    }
  };

  const deleteBill = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/bill/deleteBill/${id}`);
      fetchBills();
    } catch (error) {
      setError("Lỗi khi xóa bill.");
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);

  if (isLoading) return <div className="py-4 text-center">Đang tải...</div>;
  if (error)
    return <div className="py-4 text-center text-red-500">{error}</div>;

  return (
    <div className=" mx-4 bg-white px-4 py-8">
      <h2 className="mb-4 text-xl font-semibold text-gray-800">
        Danh sách hóa đơn
      </h2>
      {bills.length > 0 ? (
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Mã đặt tour
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Tổng tiền
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Ngày xuất hóa đơn
              </th>
              <th scope="col" className="px-6 py-3">
                Xem chi tiết
              </th>
              <th scope="col" className="px-6 py-3">
                Xóa hóa đơn
              </th>
            </tr>
          </thead>
          <tbody className="">
            {bills.map((bill) => (
              <tr key={bill._id}>
                <td className="whitespace-nowrap px-6 py-4">
                  {bill.booking._id}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {bill.totalCost?.toLocaleString()} đ
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {new Date(bill.issuedDate)?.toLocaleDateString()}
                </td>
                <td>
                  <Link
                    to={`/bill/${bill._id}`}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Chi tiết
                  </Link>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <button
                    onClick={() => deleteBill(bill._id)}
                    className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">Không có hóa đơn nào.</p>
      )}
    </div>
  );
};

export default BillsList;
