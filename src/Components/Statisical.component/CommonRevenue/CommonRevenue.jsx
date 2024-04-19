import {} from "react";

import DayRevene from "../Revenue/DayRevene";
import MonthlyRevenue from "../Revenue/MonthlyRevenue";
import YearRevene from "../Revenue/YearRevene";
import { Link } from "react-router-dom";

import JsPDF from "jspdf";
import html2canvas from "html2canvas";

const CommonRevenue = () => {
  const exportPDF = () => {
    // Sử dụng html2canvas để chụp ảnh nội dung trang
    html2canvas(document.querySelector("#revenue")).then((canvas) => {
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
      pdf.save("Thong-ke-doanh-thu.pdf");
    });
  };

  return (
    <div className="h-[600px]">
      <div className="mx-4 my-4 flex justify-between">
        <div className="flex gap-3">
          <h1 className="font-bold">Thống kê doanh thu</h1>
          <button
            onClick={exportPDF}
            className=" rounded bg-red-500 px-2 py-1 text-white"
          >
            Xuất doanh thu
          </button>
        </div>
        <Link to={"/statistical"} className="">
          <p className="font-semibold italic underline">Trở về</p>
        </Link>
      </div>

      <div id="revenue">
        <DayRevene />
        <MonthlyRevenue />
        <YearRevene />
      </div>
    </div>
  );
};

export default CommonRevenue;
