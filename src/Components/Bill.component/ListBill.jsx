import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils/config";
import SendEmailButton from "../Bill.component/SendMail";
import { useSelector } from "react-redux";

import { formatDateVN } from "../../utils/formatDate";

const BillsList = () => {
  const { token, role } = useSelector((state) => state.user.currentUser);

  const [bills, setBills] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    currentPage: 1,
    totalPages: 1,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchBills = async (page = 1) => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `${BASE_URL}/bill/getAllBillsLimit?page=${page}&limit=7`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );
      // console.log(data);
      setBills(data.bills);
      setIsLoading(false);
      setPageInfo({
        currentPage: page,
        totalPages: data.totalPages,
      });
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
      fetchBills(); // Cập nhật lại danh sách sau khi xóa
    } catch (error) {
      setError("Lỗi khi xóa bill.");
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);

  const handlePageChange = (newPage) => {
    fetchBills(newPage);
  };

  if (isLoading) return <div className="py-4 text-center">Đang tải...</div>;
  if (error)
    return <div className="py-4 text-center text-red-500">{error}</div>;

  return (
    <div className="max-h-[600px] w-full overflow-auto">
      <div className="flex items-center justify-between">
        <h2 className="font-bold">Danh sách hóa đơn</h2>
      </div>
      {bills.length > 0 ? (
        <table className="min-w-full border-collapse divide-y divide-gray-200 text-sm">
          <thead className="bg-blue-800 text-xs uppercase text-white">
            <tr>
              {[
                "STT",
                "Mã hóa đơn",
                "Tên tour",
                "Tổng tiền",
                "Ngày xuất",
                "Hành động",
                "Gửi hóa đơn",
              ].map((header) => (
                <th
                  key={header}
                  className="border border-gray-200 px-6 py-3 text-center"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {bills?.map((bill, index) => (
              <tr key={bill?._id}>
                <td className="border border-gray-200 px-6 py-3 text-center">
                  {index + 1 + (pageInfo.currentPage - 1) * 7}
                </td>
                <td className="border border-gray-200 px-6 py-4 text-center text-gray-900">
                  {bill?._id}
                </td>
                <td className="border border-gray-200 px-6 py-4 text-center text-gray-900">
                  {bill?.tour?.nameTour}
                </td>
                <td className="border border-gray-200 px-6 py-4 text-center text-red-500">
                  {bill.totalCost?.toLocaleString()} đ
                </td>
                <td className="border border-gray-200 px-6 py-4 text-center text-gray-900">
                  {formatDateVN(bill.issuedDate)}
                </td>
                <td className="border border-gray-200 px-6 py-4 text-center">
                  <div className="flex justify-center gap-2">
                    <Link
                      to={`/bill/${bill._id}`}
                      className="w-20 rounded bg-green-500 px-1 py-2 font-bold text-white hover:bg-green-700"
                    >
                      Chi tiết
                    </Link>
                    {role !== "staff" && (
                      <button
                        onClick={() => deleteBill(bill._id)}
                        className="w-20 rounded bg-red-500 px-1 py-2 font-bold text-white hover:bg-red-700"
                      >
                        Xóa
                      </button>
                    )}
                  </div>
                </td>
                <td className="border border-gray-200 px-6 py-4 text-center">
                  <SendEmailButton email={bill.user.email} billId={bill._id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500">Không có hóa đơn nào.</p>
      )}
      {/* phân trang */}
      <div className="my-5 flex justify-center">
        {Array.from({ length: pageInfo.totalPages }, (_, i) => i + 1).map(
          (pageNum) => (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`mx-1 h-6 w-6 rounded text-white ${pageInfo.currentPage === pageNum ? "bg-blue-700" : "bg-blue-500"}`}
            >
              {pageNum}
            </button>
          ),
        )}
      </div>
    </div>
  );
};

export default BillsList;
