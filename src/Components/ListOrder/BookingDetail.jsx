// BookingDetail.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../utils/config";
import axios from "axios";

const BookingDetail = () => {
  const { bookingId } = useParams();
  const [bookingDetail, setBookingDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookingDetail = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${BASE_URL}/booking/bookings/${bookingId}`,
        );
        setBookingDetail(data);
        setLoading(false);
      } catch (error) {
        setError(error.toString());
        setLoading(false);
      }
    };

    fetchBookingDetail();
  }, [bookingId]);

  const formatDateVN = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  const translateStatus = (status) =>
    ({
      pending: "Chờ xử lý",
      confirmed: "Đã xác nhận",
      cancelled: "Đã hủy",
      completed: "Hoàn thành",
    })[status] || "N/A";

  const paymentStatusMapping = (status) =>
    ({
      paid: "Đã thanh toán",
      unpaid: "Chưa thanh toán",
    })[status] || "N/A";

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="mx-auto my-8 max-h-[600px] max-w-6xl rounded-xl bg-white p-4 ">
      <h1 className="mb-4 text-xl font-bold text-gray-800">
        Chi tiết đơn đặt tour
      </h1>
      <div className=" ">
        <div className="font-semibold">
          Người đặt:{" "}
          <span className="font-normal">
            {bookingDetail?.user?.name || "N/A"}
          </span>
        </div>
        <div className="font-semibold">
          Số điện thoại:{" "}
          <span className="font-normal">
            {bookingDetail?.user?.phone || "N/A"}
          </span>
        </div>
        <div className="font-semibold">
          Địa chỉ người đặt:{" "}
          <span className="font-normal">
            {bookingDetail?.user?.address || "N/A"}
          </span>
        </div>
        <div className="font-semibold">
          Tour:{" "}
          <span className="font-normal">
            {bookingDetail?.tour?.nameTour || "N/A"}
          </span>
        </div>
        <div className="font-semibold">
          Ngày đặt:{" "}
          <span className="font-normal">
            {formatDateVN(bookingDetail?.bookingDate) || "N/A"}
          </span>
        </div>
        <div className="font-semibold">
          Số lượng khách (trên 16):{" "}
          <span className="font-normal">
            {bookingDetail?.numberOfAdults || 0}
          </span>
        </div>
        <div className="font-semibold">
          Số lượng khách (6-16 tuổi):{" "}
          <span className="font-normal">
            {bookingDetail?.numberOfChildren || 0}
          </span>
        </div>
        <div className="font-semibold">
          Số lượng khách (3-6 tuổi):{" "}
          <span className="font-normal">
            {bookingDetail?.numberOfYoungChildren || 0}
          </span>
        </div>
        <div className="font-semibold">
          Số lượng khách (dưới 3 tuổi):{" "}
          <span className="font-normal">
            {bookingDetail?.numberOfInfants || 0}
          </span>
        </div>
        <div className="font-semibold">
          Phí phụ thu:{" "}
          <span className="font-normal">
            {bookingDetail?.surcharge?.toLocaleString() || 0} đ
          </span>
        </div>
        <div className="font-semibold">
          Tổng tiền:{" "}
          <span className="font-normal">
            {bookingDetail?.totalAmount.toLocaleString()} đ
          </span>
        </div>
        <div className="font-semibold">
          Trạng thái đặt tour:{" "}
          <span className="font-normal">
            {translateStatus(bookingDetail?.status)}
          </span>
        </div>
        <div className="font-semibold">
          Trạng thái thanh toán:{" "}
          <span className="font-normal">
            {paymentStatusMapping(bookingDetail?.paymentStatus)}
          </span>
        </div>
        <div className="col-span-1 font-semibold md:col-span-2">
          Thông tin thêm:{" "}
          <span className="font-normal">
            {bookingDetail?.additionalInformation}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookingDetail;
