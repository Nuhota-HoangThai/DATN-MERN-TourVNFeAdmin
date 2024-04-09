export const translateStatus = (status) =>
  ({
    pending: "Chờ xử lý",
    confirmed: "Đã xác nhận",
    cancelled: "Đã hủy",
    completed: "Hoàn thành",
  })[status] || "N/A";

export const getStatusStyle = (status) =>
  ({
    pending: "text-yellow-600",
    confirmed: "text-green-600",
    cancelled: "text-red-600",
    completed: "text-blue-600",
  })[status] || "text-gray-800";

export const paymentStatusMapping = (status) =>
  ({
    paid: "Đã thanh toán",
    unpaid: "Chưa thanh toán",
  })[status] || "N/A";

export const paymentStatusMethod = (status) =>
  ({
    VNPay: "Đã thanh toán bằng VNPay",
    unpaid: "COD",
  })[status] || "COD";
