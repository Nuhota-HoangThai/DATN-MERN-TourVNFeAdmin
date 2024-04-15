import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/config";
import { Link } from "react-router-dom";
import axios from "axios";

import { useSelector } from "react-redux";

import { formatDateVN } from "../../utils/formatDate";
import { IoEyeSharp } from "react-icons/io5";
import { FaTrashCan } from "react-icons/fa6";

import {
  translateStatus,
  getStatusStyle,
  paymentStatusMapping,
} from "../../utils/formatStatus";

const ListOrder = () => {
  const { token } = useSelector((state) => state.user.currentUser);

  const [pageInfo, setPageInfo] = useState({
    currentPage: 1,
    totalPages: 1,
  });

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState({});

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
      console.error("There was a problem with fetching bookings:", error);
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

      await fetchBookings();
    } catch (error) {
      console.error("Error removing booking:", error);
    }
  };

  if (loading) return <div className="mt-5 text-center">Đang tải trang...</div>;

  if (error)
    return (
      <div className="mt-5 text-center text-red-500">
        Lỗi không lấy được danh sách đặt tour: {error}
      </div>
    );

  const confirmOrderStatus = async (bookingId, newStatus) => {
    try {
      await axios.patch(
        `${BASE_URL}/booking/${bookingId}/confirmStatus`,
        { status: newStatus },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );

      // Cập nhật danh sách đơn hàng sau khi thay đổi trạng thái thành công
      const updatedBookings = bookings.map((booking) =>
        booking._id === bookingId ? { ...booking, status: newStatus } : booking,
      );
      setBookings(updatedBookings);
    } catch (error) {
      console.error("Error updating booking status:", error);
      setError(error.message);
    }
  };

  const handlePageChange = (newPage) => {
    fetchBookings(newPage);
  };

  return (
    <div className="max-h-[600px] w-full">
      <div className="flex items-center justify-between">
        <h2 className="font-bold">Danh sách đặt tour</h2>
        {/* phân trang */}
        <div className="my-1 flex justify-end">
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
      <div className="">
        {bookings.length > 0 ? (
          <table className="w-full table-auto rounded-2xl border border-gray-200 text-left text-sm shadow-sm">
            <thead className="bg-blue-800 text-xs uppercase text-white ">
              <tr>
                <th
                  scope="col"
                  className="w-8 border-b border-gray-200 px-6 py-3"
                >
                  Stt
                </th>
                <th scope="col" className="border-b border-gray-200 px-6 py-3">
                  Mã đặt
                </th>
                <th scope="col" className="border-b border-gray-200 px-6 py-3">
                  Ngày đặt
                </th>
                <th scope="col" className="border-b border-gray-200 px-6 py-3">
                  Khách đặt
                </th>
                <th scope="col" className="border-b border-gray-200 px-6 py-3">
                  Tour
                </th>
                <th scope="col" className="border-b border-gray-200 px-6 py-3">
                  Thanh toán
                </th>
                <th scope="col" className="border-b border-gray-200 px-6 py-3">
                  Trạng thái
                </th>
                <th
                  scope="col"
                  className="border-b border-gray-200 px-6 py-3 text-center"
                >
                  Xử lý
                </th>
                <th
                  scope="col"
                  className="border-b border-gray-200 px-6 py-3 text-center"
                >
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {bookings.map((booking, index) => (
                <tr key={booking._id} className="bg-white hover:bg-gray-100">
                  <td className="px-6 py-3 text-center">
                    {index + 1 + (pageInfo.currentPage - 1) * 8}
                  </td>
                  <td className="ellipsis px-6 py-3">{booking._id}</td>
                  <td className="ellipsis px-6 py-3">
                    {formatDateVN(booking.bookingDate)}
                  </td>
                  <td className="ellipsis px-6 py-3">
                    {booking.user?.name || "N/A"}
                  </td>
                  <td className="ellipsis px-6 py-3">
                    {booking.tour?.nameTour || "N/A"}
                  </td>
                  <td className="ellipsis px-6 py-3">
                    {paymentStatusMapping(booking?.paymentStatus)}
                  </td>
                  <td
                    className={`ellipsis px-6 py-3 ${getStatusStyle(booking.status)}`}
                  >
                    {translateStatus(booking.status)}
                  </td>

                  <td className="relative flex items-center justify-center px-6 py-3">
                    {booking.status !== "completed" && (
                      <>
                        <button
                          className="flex items-center"
                          onClick={() => toggleDropdown(booking._id)}
                        >
                          Hành động
                        </button>
                        {dropdownOpen[booking._id] && (
                          <div className="absolute right-0 z-10 mb-10 mt-36 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white  shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                              {booking.status === "pending" && (
                                <button
                                  className="block w-full  py-2 text-center text-sm text-gray-700"
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
                  <td className="px-6 py-3">
                    <div className="flex justify-center gap-2">
                      <Link
                        to={`/booking-detail/${booking._id}`}
                        className=" border p-1 text-blue-800 underline"
                      >
                        <IoEyeSharp size={"25px"} />
                      </Link>
                      <button
                        className="border p-1 text-red-500 hover:text-red-700"
                        onClick={() => remove_booking(booking._id)}
                      >
                        <FaTrashCan size={"25px"} />
                      </button>{" "}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="mt-5 text-center">Không có đơn đặt tour nào!!!</p>
        )}
      </div>
    </div>
  );
};

export default ListOrder;
