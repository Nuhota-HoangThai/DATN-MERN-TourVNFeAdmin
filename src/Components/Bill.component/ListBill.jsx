import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils/config";

import SendEmailButton from "../Bill.component/SendMail";
import { useSelector } from "react-redux";

const BillsList = () => {
  const { token } = useSelector((state) => state.user.currentUser);

  const [bills, setBills] = useState([]);
  const [displayedBills, setDisplayedBills] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); // Vị trí hiện tại của mảng hóa đơn được hiển thị
  const displayCount = 5; // Số lượng hóa đơn được hiển thị mỗi lần
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchBills = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/bill/getAllBills`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      //console.log(response.data);
      setBills(response.data);
      setDisplayedBills(response.data.slice(0, displayCount)); // Chỉ hiển thị số lượng hóa đơn ban đầu
      setIsLoading(false);
    } catch (error) {
      setError("Lỗi khi lấy dữ liệu.");
      setIsLoading(false);
    }
  };

  const deleteBill = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/bill/deleteBill/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      fetchBills();
    } catch (error) {
      setError("Lỗi khi xóa bill.");
    }
  };

  const handleShowMoreBills = () => {
    const newIndex = currentIndex + displayCount; // Cập nhật vị trí mới
    const newBills = bills.slice(newIndex, newIndex + displayCount); // Lấy 5 hóa đơn tiếp theo từ danh sách
    setDisplayedBills(newBills); // Cập nhật danh sách hóa đơn được hiển thị
    setCurrentIndex(newIndex); // Cập nhật vị trí hiện tại
  };

  useEffect(() => {
    fetchBills();
  }, []);

  const formatDateVN = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  if (isLoading) return <div className="py-4 text-center">Đang tải...</div>;
  if (error)
    return <div className="py-4 text-center text-red-500">{error}</div>;

  return (
    <div className="mx-4  h-[550px] rounded-lg bg-white px-4 py-8 shadow">
      <h2 className="mb-4 text-2xl font-semibold text-gray-800">
        Danh sách hóa đơn
      </h2>
      {displayedBills.length > 0 ? (
        <div>
          <div className="overflow-x-auto">
            <table className="min-w-full leading-normal">
              <thead className="bg-gray-100">
                <tr>
                  <th
                    scope="col"
                    className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600"
                  >
                    Mã hóa đơn
                  </th>
                  <th
                    scope="col"
                    className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600"
                  >
                    Mã đặt tour
                  </th>
                  <th
                    scope="col"
                    className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600"
                  >
                    Tổng tiền
                  </th>
                  <th
                    scope="col"
                    className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600"
                  >
                    Ngày xuất hóa đơn
                  </th>
                  <th
                    scope="col"
                    className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-600"
                  >
                    Xem chi tiết
                  </th>
                  <th
                    scope="col"
                    className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-600"
                  >
                    Xóa hóa đơn
                  </th>
                  <th
                    scope="col"
                    className="border-b-2 border-gray-200 bg-gray-100 px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-600"
                  >
                    Gửi hóa đơn
                  </th>
                </tr>
              </thead>
              <tbody>
                {displayedBills.map((bill) => (
                  <tr key={bill._id}>
                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                      <p className="whitespace-no-wrap text-gray-900">
                        {bill._id}
                      </p>
                    </td>
                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                      <p className="whitespace-no-wrap text-gray-900">
                        {bill.booking._id}
                      </p>
                    </td>
                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm text-red-500">
                      <p className="whitespace-no-wrap">
                        {bill.totalCost?.toLocaleString()} đ
                      </p>
                    </td>
                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                      <p className="whitespace-no-wrap text-gray-900">
                        {formatDateVN(new Date(bill.issuedDate))}
                      </p>
                    </td>
                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-center text-sm">
                      <Link
                        to={`/bill/${bill._id}`}
                        className="text-indigo-600 transition duration-300 ease-in-out hover:text-indigo-900"
                      >
                        Chi tiết
                      </Link>
                    </td>
                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-center text-sm">
                      <button
                        onClick={() => deleteBill(bill._id)}
                        className="text-red-600 transition duration-300 ease-in-out hover:text-red-800"
                      >
                        Xóa
                      </button>
                    </td>
                    <td className="border-b border-gray-200 bg-white px-5 py-5 text-center text-sm">
                      <SendEmailButton
                        email={bill.user.email}
                        billId={bill._id}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>{" "}
          {currentIndex + displayCount < bills.length && ( // Kiểm tra nếu còn hóa đơn chưa được hiển thị
            <button
              onClick={handleShowMoreBills}
              className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
            >
              Xem thêm
            </button>
          )}
        </div>
      ) : (
        <p className="text-gray-500">Không có hóa đơn nào.</p>
      )}{" "}
    </div>
  );
};

export default BillsList;
