import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/config";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { formatDateVN } from "../../utils/formatDate";

import {
  translateStatus,
  getStatusStyle,
  paymentStatusMapping,
} from "../../utils/formatStatus";

import { toast } from "react-toastify";

const ListOrder = () => {
  const { token, role } = useSelector((state) => state.user.currentUser);

  const [pageInfo, setPageInfo] = useState({
    currentPage: 1,
    totalPages: 1,
  });

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState({});
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  const toggleDropdown = (bookingId) => {
    setDropdownOpen((prev) => ({ ...prev, [bookingId]: !prev[bookingId] }));
  };

  const fetchBookings = async (page = 1) => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/booking/listBookingsLimit?page=${page}&limit=10`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );

      setBookings(data.bookings);
      setPageInfo({
        currentPage: page,
        totalPages: data.totalPages,
      });
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const remove_booking = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/booking/removeBooking/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      toast("Xóa đặt tour thành công");
      await fetchBookings();
    } catch (error) {
      console.error(error);
    }
  };

  const handlePageChange = (newPage) => {
    fetchBookings(newPage);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value.toLowerCase());
  };

  const filteredBookings = bookings.filter((booking) =>
    booking.tour?.nameTour.toLowerCase().includes(filter),
  );

  if (loading) return <div className="mt-5 text-center">Đang tải trang...</div>;

  if (error)
    return (
      <div className="mt-5 text-center text-red-500">
        Lỗi không lấy được danh sách đặt tour: {error}
      </div>
    );

  const confirmOrderStatus = async (bookingId, newStatus) => {
    try {
      const updates = { status: newStatus };
      if (newStatus === "completed") {
        updates.paymentStatus = "paid";
      }
      await axios.patch(
        `${BASE_URL}/booking/${bookingId}/confirmStatus`,
        updates,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );

      // Cập nhật danh sách đơn hàng sau khi thay đổi trạng thái thành công
      const updatedBookings = bookings.map((booking) =>
        booking._id === bookingId ? { ...booking, ...updates } : booking,
      );
      setBookings(updatedBookings);
    } catch (error) {
      console.error("Error updating booking status:", error);
      setError(error.message);
    }
  };

  return (
    <div className="max-h-[600px] w-full">
      <div className="my-1 flex items-center justify-between">
        <h2 className="font-bold">Danh sách đặt tour</h2>
        <input
          type="text"
          placeholder="Nhập tên tour"
          value={filter}
          onChange={handleFilterChange}
          className="w-1/2 rounded-full border border-blue-800 p-1.5 px-3"
        />
      </div>
      <div className="">
        {filteredBookings.length > 0 ? (
          <table className="w-full table-fixed border-collapse rounded-2xl border border-gray-200 text-left text-sm shadow-sm">
            <thead className="bg-blue-800 text-xs uppercase text-white">
              <tr>
                <th
                  scope="col"
                  className="w-12 border border-gray-300 px-3 py-2 text-center"
                >
                  Stt
                </th>
                <th
                  scope="col"
                  className="w-3/12 border border-gray-300 px-3 py-2 text-center"
                >
                  Mã đặt
                </th>
                <th
                  scope="col"
                  className="w-1/12 border border-gray-300 px-3 py-2 text-center"
                >
                  Ngày đặt
                </th>
                <th
                  scope="col"
                  className="w-2/12 border border-gray-300 px-3 py-2 text-center"
                >
                  Khách đặt
                </th>
                <th
                  scope="col"
                  className="w-2/12 border border-gray-300 px-3 py-2 text-center"
                >
                  Tour
                </th>
                <th
                  scope="col"
                  className="w-2/12 border border-gray-300 px-3 py-2 text-center"
                >
                  Thanh toán
                </th>
                <th
                  scope="col"
                  className="w-2/12 border border-gray-300 px-3 py-2 text-center"
                >
                  Trạng thái
                </th>
                <th
                  scope="col"
                  className="w-2/12 border border-gray-300 px-3 py-2 text-center"
                >
                  Xử lý
                </th>
                <th
                  scope="col"
                  className="w-2/12 border border-gray-300 px-3 py-2 text-center"
                >
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredBookings.map((booking, index) => (
                <tr key={booking._id} className="bg-white hover:bg-gray-100">
                  <td className="border border-gray-300 px-3 py-2 text-center">
                    {index + 1 + (pageInfo.currentPage - 1) * 8}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-center">
                    {booking._id}
                  </td>
                  <td className="border border-gray-300 px-1 py-2 text-left">
                    {formatDateVN(booking.bookingDate)}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-center">
                    {booking.user?.name || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-center">
                    {booking.tour?.nameTour || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-center">
                    {paymentStatusMapping(booking?.paymentStatus)}
                  </td>
                  <td
                    className={`border border-gray-300 px-3 py-2 text-center ${getStatusStyle(booking.status)}`}
                  >
                    {translateStatus(booking.status)}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-center">
                    {booking.status !== "completed" && (
                      <>
                        <button
                          className=""
                          onClick={() => toggleDropdown(booking._id)}
                        >
                          Hành động
                        </button>
                        {dropdownOpen[booking._id] && (
                          <div className="absolute right-40 z-10 mt-4 w-48  divide-gray-100 rounded-md bg-white  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                              {booking.status === "pending" && (
                                <button
                                  className="block w-full py-2 text-center text-sm text-gray-700"
                                  onClick={() =>
                                    confirmOrderStatus(booking._id, "confirmed")
                                  }
                                >
                                  Xác nhận
                                </button>
                              )}
                              {["confirmed", "pending"].includes(
                                booking.status,
                              ) && (
                                <button
                                  className={`block w-full py-2 text-center  text-sm text-gray-700 ${
                                    booking.status !== "pending"
                                      ? "cursor-not-allowed opacity-50"
                                      : ""
                                  }`}
                                  onClick={() =>
                                    booking.status === "pending" &&
                                    confirmOrderStatus(booking._id, "cancelled")
                                  }
                                  disabled={booking.status !== "pending"}
                                >
                                  Hủy
                                </button>
                              )}
                              {booking.status === "confirmed" && (
                                <button
                                  className="block w-full px-2 py-2 text-center  text-sm text-gray-700"
                                  onClick={() =>
                                    confirmOrderStatus(booking._id, "completed")
                                  }
                                >
                                  Hoàn thành
                                </button>
                              )}
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-center">
                    <div className="flex justify-center space-x-2">
                      <Link
                        to={`/booking-detail/${booking._id}`}
                        className="w-20 rounded bg-green-500 px-1 py-2 font-bold text-white hover:bg-green-700"
                      >
                        Chi tiết
                      </Link>
                      {role !== "staff" && (
                        <button
                          className="w-20 rounded bg-red-500 px-1 py-2 font-bold text-white hover:bg-red-700"
                          onClick={() => remove_booking(booking._id)}
                        >
                          Xóa
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="mt-10 text-center">Không có đơn đặt tour nào!!!</p>
        )}
        {/* Phân trang */}
        <div className="my-5 flex items-center justify-center">
          {Array.from({ length: pageInfo.totalPages }, (_, i) => i + 1).map(
            (pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`mx-1 h-6 w-6 rounded bg-blue-500 text-white ${pageInfo.currentPage === pageNum ? "bg-blue-700" : ""}`}
              >
                {pageNum}
              </button>
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default ListOrder;
