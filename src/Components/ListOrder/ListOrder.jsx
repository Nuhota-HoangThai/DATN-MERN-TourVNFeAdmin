import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/config";

import { MdClear } from "react-icons/md";

const ListOrder = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState({});

  const formatDateVN = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const formatOrderId = (id) => {
    // Kiểm tra nếu id không đủ dài, trả về nguyên vẹn
    if (id.length <= 8) return id;
    // Lấy 5 ký tự đầu và 3 ký tự cuối
    return `${id.substring(0, 5)}...${id.substring(id.length - 3)}`;
  };

  const toggleDropdown = (bookingId) => {
    setDropdownOpen((prev) => ({ ...prev, [bookingId]: !prev[bookingId] }));
  };

  const fetchBookings = async () => {
    try {
      const response = await fetch(`${BASE_URL}/booking/listBookings`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error("There was a problem with fetching bookings:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const remove_booking = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/booking/removeBooking/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete the booking");
      }

      await fetchBookings();
    } catch (error) {
      console.error("Error removing booking:", error);
    }
  };

  const translateStatus = (status) => {
    const statusTranslations = {
      pending: "Chờ xử lý",
      confirmed: "Đã xác nhận",
      cancelled: "Đã hủy",
      completed: "Hoàn thành",
    };
    return statusTranslations[status] || "N/A";
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "pending":
        return "text-yellow-600";
      case "confirmed":
        return "text-green-600";
      case "cancelled":
        return "text-red-600";
      case "completed":
        return "text-blue-600";
      default:
        return "text-gray-800";
    }
  };

  if (loading) {
    return <div className="mt-5 text-center">Đang tải trang...</div>;
  }

  if (error) {
    return (
      <div className="mt-5 text-center text-red-500">
        Error fetching booking: {error}
      </div>
    );
  }

  const confirmOrderStatus = async (bookingId, newStatus) => {
    try {
      const response = await fetch(
        `${BASE_URL}/booking/${bookingId}/confirmStatus`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

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
    <div className="mx-auto mt-10 max-w-6xl">
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
                  <td className="relative flex items-center justify-center border-x px-4 py-2">
                    {booking.status !== "completed" && (
                      <>
                        <button
                          className="mt-2 flex items-center justify-center"
                          onClick={() => toggleDropdown(booking._id)}
                        >
                          Hành động
                        </button>
                        {dropdownOpen[booking._id] && (
                          <div className="absolute right-0 z-10 mb-10 mt-36 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
                    <MdClear
                      onClick={() => remove_booking(booking._id)}
                      className="cursor-pointer text-red-500 hover:text-red-700"
                    />
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
