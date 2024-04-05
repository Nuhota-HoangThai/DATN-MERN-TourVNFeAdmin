import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/config";
import { Link } from "react-router-dom";
import axios from "axios";

import { useSelector } from "react-redux";

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

  const formatDateVN = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const toggleDropdown = (bookingId) => {
    setDropdownOpen((prev) => ({ ...prev, [bookingId]: !prev[bookingId] }));
  };

  const fetchBookings = async (page = 1) => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/booking/listBookingsLimit?page=${page}&limit=8`,
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

  const translateStatus = (status) =>
    ({
      pending: "Chờ xử lý",
      confirmed: "Đã xác nhận",
      cancelled: "Đã hủy",
      completed: "Hoàn thành",
    })[status] || "N/A";

  const getStatusStyle = (status) =>
    ({
      pending: "text-yellow-600",
      confirmed: "text-green-600",
      cancelled: "text-red-600",
      completed: "text-blue-600",
    })[status] || "text-gray-800";

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

  const paymentStatusMapping = (status) =>
    ({
      paid: "Đã thanh toán",
      unpaid: "Chưa thanh toán",
    })[status] || "N/A";

  const handlePageChange = (newPage) => {
    fetchBookings(newPage);
  };

  return (
    <div className="max-h-[600px] w-full">
      <h2 className="my-2 text-center text-xl font-bold">Danh sách đặt tour</h2>
      <div className="">
        {" "}
        {bookings.length > 0 ? (
          <table className="w-full  table-fixed rounded-2xl text-left text-sm">
            <thead className="bg-blue-500 text-xs uppercase text-white">
              <tr>
                <th scope="col" className="w-8 px-6 py-3">
                  Mã đặt
                </th>
                <th scope="col" className="w-8 px-6 py-3">
                  Ngày đặt
                </th>
                <th scope="col" className="w-8 px-6 py-3">
                  Khách đặt
                </th>
                <th scope="col" className="w-8 px-6 py-3">
                  Tour
                </th>
                <th scope="col" className="w-8 px-6 py-3">
                  Thanh toán
                </th>
                <th scope="col" className="w-8 px-6 py-3">
                  Trạng thái
                </th>
                <th scope="col" className="w-8 px-6 py-3">
                  Hành động
                </th>
                <th scope="col" className="w-8 px-6 py-3">
                  Chi tiết đơn
                </th>
                <th scope="col" className="w-8 px-6 py-3">
                  Xóa
                </th>
              </tr>
            </thead>
            <tbody className="">
              {bookings.map((booking) => (
                <tr key={booking._id} className="bg-white hover:bg-gray-100">
                  <td className="ellipsis border-b px-6 py-4">{booking._id}</td>
                  <td className="ellipsis border-b px-6 py-4">
                    {formatDateVN(booking.bookingDate)}
                  </td>
                  <td className="ellipsis border-b px-6 py-4">
                    {booking.user?.name || "N/A"}
                  </td>
                  <td className="ellipsis border-b px-6 py-4">
                    {booking.tour?.nameTour || "N/A"}
                  </td>
                  <td className={`ellipsis border-b px-6 py-4`}>
                    {paymentStatusMapping(booking?.paymentStatus)}
                  </td>
                  <td
                    className={`ellipsis border-b px-6 py-4 ${getStatusStyle(
                      booking.status,
                    )}`}
                  >
                    {translateStatus(booking.status)}
                  </td>

                  <td className="relative flex items-center justify-center border-x px-2 py-2 text-center ">
                    {booking.status !== "completed" && (
                      <>
                        <button
                          className="mt-2 flex items-center justify-center"
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
                  <td className="border-x  px-2 py-2 text-center">
                    <Link
                      to={`/booking-detail/${booking._id}`}
                      className="italic underline"
                    >
                      Chi tiết
                    </Link>
                  </td>
                  <td className="border-x px-2 py-2 text-center">
                    <button
                      className="text-red-500"
                      onClick={() => remove_booking(booking._id)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="mt-5 text-center">Không có đơn đặt tour nào!!!</p>
        )}
      </div>
      {/* phân trang */}
      <div className="mt-4 flex justify-center">
        {Array.from({ length: pageInfo.totalPages }, (_, i) => i + 1).map(
          (pageNum) => (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`mx-1 rounded bg-blue-500 px-4 py-2 text-white ${pageInfo.currentPage === pageNum ? "bg-blue-700" : ""}`}
            >
              {pageNum}
            </button>
          ),
        )}
      </div>
    </div>
  );
};

export default ListOrder;
