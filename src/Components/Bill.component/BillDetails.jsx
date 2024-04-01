import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils/config";

const BillDetails = () => {
  const { id } = useParams(); // Lấy id từ URL
  const [billDetails, setBillDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBillDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/bill/billDetail/${id}`);
        setBillDetails(response.data);
        setIsLoading(false);
      } catch (err) {
        setError("Lỗi khi lấy dữ liệu hóa đơn.");
        setIsLoading(false);
      }
    };

    fetchBillDetails();
  }, [id]);

  if (isLoading) return <div>Đang tải...</div>;
  if (error) return <div>{error}</div>;
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

  return (
    <div className="my-4 h-[600px]">
      <h2>Chi Tiết Hóa Đơn</h2>
      {billDetails && (
        <div>
          <div>
            <p>Mã đặt tour: {billDetails.booking?._id}</p>
            <p>Người Dùng: {billDetails.user?.name}</p>
            <p>Tour: {billDetails.tour?.nameTour}</p>
            <p>Tổng Tiền: {billDetails.totalCost}</p>

            <p>
              Ngày Xuất:{" "}
              {new Date(billDetails.issuedDate)?.toLocaleDateString()}
            </p>
            <p>Ghi Chú (Công ty dành cho bạn): {billDetails.notesBill}</p>
          </div>{" "}
          <div className="">
            <div className="flex gap-8 bg-slate-50">
              <div className=" p-4 ">
                <div className="font-semibold">
                  Người đặt:{" "}
                  <span className="font-normal">
                    {billDetails?.user?.name || "N/A"}
                  </span>
                </div>
                <div className="font-semibold">
                  Số căn cước công dân:{" "}
                  <span className="font-normal">
                    {billDetails?.user?.cccd || "N/A"}
                  </span>
                </div>
                <div className="mt-1.5 font-semibold">
                  Số điện thoại:{" "}
                  <span className="font-normal">
                    {billDetails?.user?.phone || "N/A"}
                  </span>
                </div>
                <div className="mt-1.5 font-semibold">
                  Địa chỉ người đặt:{" "}
                  <span className="font-normal">
                    {billDetails?.user?.address || "N/A"}
                  </span>
                </div>
              </div>
              <div className=" p-4 ">
                <div className="font-semibold">
                  Mã tour:{" "}
                  <span className="font-normal">
                    {billDetails?.tour?._id || "N/A"}
                  </span>
                </div>
                <div className="mt-1.5 font-semibold">
                  Tour:{" "}
                  <span className="font-normal">
                    {billDetails?.tour?.nameTour || "N/A"}
                  </span>
                </div>
                <div className="mt-1.5 font-semibold">
                  Giá khách (trên 16 tuổi):{" "}
                  <span className="font-normal">
                    {billDetails?.adultPriceBill?.toLocaleString() || 0} đ
                  </span>
                </div>
                <div className="mt-1.5 font-semibold">
                  Giá khách (6-16 tuổi):{" "}
                  <span className="font-normal">
                    {billDetails?.childPriceBill?.toLocaleString() || 0} đ
                  </span>
                </div>
                <div className="mt-1.5 font-semibold">
                  Giá khách (3-6 tuổi):{" "}
                  <span className="font-normal">
                    {billDetails?.youngChildrenPriceBill?.toLocaleString() || 0}{" "}
                    đ
                  </span>
                </div>
                <div className="mt-1.5 font-semibold">
                  Giá khách (dưới 3 tuổi):{" "}
                  <span className="font-normal">
                    {billDetails?.infantPriceBill?.toLocaleString() || 0} đ
                  </span>
                </div>
              </div>
            </div>
            <div className="my-5 bg-slate-50 p-4">
              <div className="font-semibold">
                Ngày đặt:{" "}
                <span className="font-normal">
                  {formatDateVN(billDetails?.bookingDateBill) || "N/A"}
                </span>
              </div>
              <div className="mt-1.5 font-semibold">
                Số lượng khách (trên 16):{" "}
                <span className="font-normal">
                  {billDetails?.numberOfAdultsBill || 0}
                </span>
              </div>
              <div className="mt-1.5 font-semibold">
                Số lượng khách (6-16 tuổi):{" "}
                <span className="font-normal">
                  {billDetails?.numberOfChildrenBill || 0}
                </span>
              </div>
              <div className="mt-1.5 font-semibold">
                Số lượng khách (3-6 tuổi):{" "}
                <span className="font-normal">
                  {billDetails?.numberOfYoungChildrenBill || 0}
                </span>
              </div>
              <div className="mt-1.5 font-semibold">
                Số lượng khách (dưới 3 tuổi):{" "}
                <span className="font-normal">
                  {billDetails?.numberOfInfantsBill || 0}
                </span>
              </div>
              <div className="mt-1.5 font-semibold">
                Phí phụ thu:{" "}
                <span className="font-normal">
                  {billDetails?.surchargeBill?.toLocaleString() || 0} đ
                </span>
              </div>
              <div className="mt-1.5 font-semibold">
                Tổng tiền:{" "}
                <span className="font-normal">
                  {billDetails?.totalCost?.toLocaleString()} đ
                </span>
              </div>
              <div className="mt-1.5 font-semibold">
                Trạng thái đặt tour:{" "}
                <span className="font-normal">
                  {translateStatus(billDetails?.statusBill)}
                </span>
              </div>
              <div className="mt-1.5 font-semibold">
                Trạng thái thanh toán:{" "}
                <span className="font-normal">
                  {paymentStatusMapping(billDetails?.paymentStatusBill)}
                </span>
              </div>
              <div className="mt-1.5 font-semibold">
                Thông tin thêm:{" "}
                <span className="font-normal">
                  {billDetails?.additionalInformation}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillDetails;
