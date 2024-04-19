import {} from "react";
import { Link } from "react-router-dom";

import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

import StatisticalTotalTours from "../../Components/Statisical.component/StatisticalTotal/StatisticalTotalTours";
import StatisticalTotalBookings from "../../Components/Statisical.component/StatisticalTotal/StatisticalTotalBooking";
import StatisticalTotalReviews from "../../Components/Statisical.component/StatisticalTotal/StatisticalTotalReview";
import StatisticalTotalUser from "../../Components/Statisical.component/StatisticalTotal/StatisticalTotalUser";

import StatisticalBookingStatus from "../../Components/Statisical.component/StatisticalStatus/BookingStatus";

import JsPDF from "jspdf";
import html2canvas from "html2canvas";

const Statistical = () => {
  // Hàm để xuất PDF
  const exportPDF = () => {
    // Sử dụng html2canvas để chụp ảnh nội dung trang
    html2canvas(document.querySelector("#statistical")).then((canvas) => {
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
      pdf.save("Thong-ke.pdf");
    });
  };

  return (
    <div className="h-[600px]">
      <PerfectScrollbar>
        <button
          onClick={exportPDF}
          className="mx-2 my-1 rounded bg-red-500 px-2 py-1 text-white"
        >
          Xuất thống kê
        </button>
        <div id="statistical">
          <div className="mx-2 my-2 rounded bg-white shadow-xl">
            <div className="p-4">
              <h1 className="text-xl font-bold">Thống kê số lượng</h1>
              <div className="grid grid-cols-4 gap-2">
                <StatisticalTotalTours />
                <StatisticalTotalBookings />
                <StatisticalTotalReviews />
                <StatisticalTotalUser />
              </div>
            </div>
          </div>
          <div className="mx-2 my-8 rounded bg-white shadow-xl">
            <div className="p-4">
              <h1 className="text-xl font-bold">Thống kê doanh thu</h1>
              <div className="mx-2 grid grid-cols-1 gap-2">
                <Link to="/common-revenue" className="italic underline">
                  Xem doanh thu
                </Link>
              </div>
            </div>
          </div>
          <div>
            <StatisticalBookingStatus />
          </div>
        </div>
      </PerfectScrollbar>
    </div>
  );
};

export default Statistical;
