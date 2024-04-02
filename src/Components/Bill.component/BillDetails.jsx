import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils/config";

import JsPDF from "jspdf";
import html2canvas from "html2canvas";

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

  const paymentStatusMethod = (status) =>
    ({
      VNPay: "Đã thanh toán bằng VNPay",
      COD: "COD",
    })[status] || "COD";

  // Hàm để xuất PDF
  const exportPDF = () => {
    // Sử dụng html2canvas để chụp ảnh nội dung trang
    html2canvas(document.querySelector("#billDetailsContent")).then(
      (canvas) => {
        // Tạo một đối tượng PDF mới
        const imgData = canvas.toDataURL("image/png");
        const pdf = new JsPDF({
          orientation: "portrait",
        });

        const imgWidth = 210; // Là chiều rộng của một trang A4
        const pageHeight = 295;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;

        let position = 0;
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        // Lưu file PDF
        pdf.save("bill-details.pdf");
      },
    );
  };

  return (
    <div className="mx-4 my-4 h-[600px]">
      <div className="mx-8 flex justify-between">
        <h2 className="text-2xl font-medium">Hóa Đơn</h2>
        <button
          onClick={exportPDF}
          className="my-2 rounded bg-red-500 px-6 py-2 text-white"
        >
          Xuất PDF
        </button>
      </div>
      <div id="billDetailsContent" className="p-8">
        <p className="mt-5 text-lg ">Mã hóa đơn: {id}</p>
        {billDetails && (
          <div className="">
            <div className="my-5 bg-slate-50 p-4">
              <p>Mã đặt tour: {billDetails.booking?._id}</p>
              <p>Tổng tiền thanh toán: {billDetails.totalCost}</p>
              <p>
                Trạng thái thanh toán:{" "}
                <span className="">
                  {paymentStatusMapping(billDetails?.paymentStatusBill)}
                </span>
              </p>
              <p className="mt-1.5 ">
                Phương thức thanh toán:{" "}
                <span className="">
                  {paymentStatusMethod(billDetails?.paymentMethod)}
                </span>
              </p>
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
                      {billDetails?.youngChildrenPriceBill?.toLocaleString() ||
                        0}{" "}
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
    </div>
  );
};

export default BillDetails;
