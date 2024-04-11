import {} from "react";
import { Link } from "react-router-dom";

import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

import StatisticalTotalTours from "../../Components/Statisical.component/StatisticalTotal/StatisticalTotalTours";
import StatisticalTotalBookings from "../../Components/Statisical.component/StatisticalTotal/StatisticalTotalBooking";
import StatisticalTotalReviews from "../../Components/Statisical.component/StatisticalTotal/StatisticalTotalReview";
import StatisticalTotalUser from "../../Components/Statisical.component/StatisticalTotal/StatisticalTotalUser";

import StatisticalBookingStatus from "../../Components/Statisical.component/StatisticalStatus/BookingStatus";

const Statistical = () => {
  return (
    <div className="h-[600px]">
      <PerfectScrollbar>
        {" "}
        <div className="mx-2 my-8 rounded bg-white shadow-xl">
          <div className="p-4">
            <h1 className="text-2xl font-bold">Thống kê số lượng</h1>
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
            <h1 className="text-2xl font-bold">Thống kê doanh thu</h1>
            <div className="mx-2 grid grid-cols-1 gap-2">
              <Link to="/common-revenue">Xem doanh thu</Link>
            </div>
          </div>
        </div>
        <div>
          <StatisticalBookingStatus />
        </div>
      </PerfectScrollbar>
    </div>
  );
};

export default Statistical;
