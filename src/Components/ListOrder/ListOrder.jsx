import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/config";

import { MdClear } from "react-icons/md";

const ListOrder = () => {
  const [orders, setOrders] = useState([]);
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

  const toggleDropdown = (orderId) => {
    setDropdownOpen((prev) => ({ ...prev, [orderId]: !prev[orderId] }));
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${BASE_URL}/booking/listBookings`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("There was a problem with fetching orders:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const remove_order = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/booking/removeBooking/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete the order");
      }

      await fetchOrders();
    } catch (error) {
      console.error("Error removing order:", error);
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
    return <div className="text-center mt-5">Đang tải trang...</div>;
  }

  if (error) {
    return (
      <div className="text-red-500 text-center mt-5">
        Error fetching orders: {error}
      </div>
    );
  }

  const confirmOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(
        `${BASE_URL}/order/${orderId}/confirmStatus`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Cập nhật danh sách đơn hàng sau khi thay đổi trạng thái thành công
      const updatedOrders = orders.map((order) =>
        order._id === orderId ? { ...order, status: newStatus } : order
      );
      setOrders(updatedOrders);
    } catch (error) {
      console.error("Error updating order status:", error);
      setError(error.message);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Danh sách đặt tour
      </h2>
      {orders.length > 0 ? (
        <div className="overflow-x-auto rounded-xl  max-h-[550px] overflow-y-auto">
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
              {orders.map((order) => (
                <tr key={order._id} className="border-x border-b ">
                  <td className="px-4 py-2 border-x">
                    {formatOrderId(order._id)}
                  </td>
                  <td className="px-4 py-2 border-x">
                    {formatDateVN(order.orderDate)}
                  </td>
                  <td className="px-4 py-2 border-x">
                    {order.user?.name || "N/A"}
                  </td>
                  <td className="px-4 py-2 border-x">
                    {order.tour?.nameTour || "N/A"}
                  </td>
                  <td
                    className={`border-x px-4 py-2 ${getStatusStyle(
                      order.status
                    )}`}
                  >
                    {translateStatus(order.status)}
                  </td>
                  <td className="border-x px-4 py-2 flex justify-center items-center relative">
                    {order.status !== "completed" && (
                      <>
                        <button
                          className="flex justify-center items-center mt-2"
                          onClick={() => toggleDropdown(order._id)}
                        >
                          Hành động
                        </button>
                        {dropdownOpen[order._id] && (
                          <div className="origin-top-right absolute right-0 mt-36 mb-10 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none z-10">
                            <div className="py-1">
                              {order.status === "pending" && (
                                <button
                                  className="text-gray-700 block w-full text-left px-4 py-2 text-sm"
                                  onClick={() =>
                                    confirmOrderStatus(order._id, "confirmed")
                                  }
                                >
                                  Xác nhận
                                </button>
                              )}
                              {["confirmed", "pending"].includes(
                                order.status
                              ) && (
                                <button
                                  className={`text-gray-700 block w-full text-left px-4 py-2 text-sm ${
                                    order.status !== "pending"
                                      ? "opacity-50 cursor-not-allowed"
                                      : ""
                                  }`}
                                  onClick={() =>
                                    order.status === "pending" &&
                                    confirmOrderStatus(order._id, "cancelled")
                                  }
                                  disabled={order.status !== "pending"}
                                >
                                  Hủy
                                </button>
                              )}
                              {order.status === "confirmed" && (
                                <button
                                  className="text-gray-700 block w-full text-left px-4 py-2 text-sm"
                                  onClick={() =>
                                    confirmOrderStatus(order._id, "completed")
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
                      onClick={() => remove_order(order._id)}
                      className="cursor-pointer text-red-500 hover:text-red-700"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center mt-5">Không có đơn đặt tour nào!!!</p>
      )}
    </div>
  );
};

export default ListOrder;
