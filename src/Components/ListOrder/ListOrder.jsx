import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/config";
import { Link } from "react-router-dom";
import axios from "axios";

import { useSelector } from "react-redux";

const ListOrder = () => {
  const { token } = useSelector((state) => state.user.currentUser);

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState({});

  useEffect(() => {
    fetchBookings();
  }, []);

  const formatDateVN = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  const formatOrderId = (id) => {
    return id.length <= 8
      ? id
      : `${id.substring(0, 5)}...${id.substring(id.length - 3)}`;
  };

  const toggleDropdown = (bookingId) => {
    setDropdownOpen((prev) => ({ ...prev, [bookingId]: !prev[bookingId] }));
  };

  const fetchBookings = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/booking/listBookings`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      setBookings(data);
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

  return (
    <div className="mx-auto my-8 max-h-[600px] max-w-6xl ">
      <h2 className="mb-6 text-center text-2xl font-bold">
        Danh sách đặt tour
      </h2>
      {bookings.length > 0 ? (
        <div className="max-h-[550px] overflow-x-auto  overflow-y-auto rounded-xl">
          <table className="min-w-full table-auto">
            <thead className="bg-blue-950 text-white ">
              <tr>
                <th className="px-4 py-2 text-left ">Mã đặt</th>
                <th className="px-4 py-2 text-left">Ngày đặt</th>
                <th className="px-4 py-2 text-left">Khách đặt</th>
                <th className="px-4 py-2 text-left">Tour</th>
                <th className="px-4 py-2 text-left">Trạng thái</th>
                <th className="px-4 py-2 text-left">Hành động</th>
                <th className="px-4 py-2 text-left">Chi tiết đơn</th>
                <th className="px-4 py-2 text-left">Xóa đơn</th>
              </tr>
            </thead>
            <tbody className="bg-white ">
              {bookings.map((booking) => (
                <tr key={booking._id} className="border-x border-b ">
                  <td className="border-x px-4 py-2">
                    {formatOrderId(booking._id)}
                  </td>
                  <td className="border-x px-4 py-2">
                    {formatDateVN(booking.bookingDate)}
                  </td>
                  <td className="border-x px-4 py-2">
                    {booking.user?.name || "N/A"}
                  </td>
                  <td className="border-x px-4 py-2">
                    {booking.tour?.nameTour || "N/A"}
                  </td>
                  <td
                    className={`border-x px-4 py-2 ${getStatusStyle(
                      booking.status,
                    )}`}
                  >
                    {translateStatus(booking.status)}
                  </td>
                  <td className="relative flex items-center justify-center border-x px-4 py-2 ">
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
                                  className="block w-full px-4 py-2 text-left text-sm text-gray-700"
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
                                  className={`block w-full px-4 py-2 text-left text-sm text-gray-700 ${
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
                                  className="block w-full px-4 py-2 text-left text-sm text-gray-700"
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
                  <td className="border-x px-4 py-2">
                    <Link to={`/booking-detail/${booking._id}`}>
                      {formatOrderId(booking._id)}
                    </Link>
                  </td>
                  <td className="border-x px-4 py-2">
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
        </div>
      ) : (
        <p className="mt-5 text-center">Không có đơn đặt tour nào!!!</p>
      )}
    </div>
  );
};

export default ListOrder;
