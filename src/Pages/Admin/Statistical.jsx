import {} from "react";

import StatisticalTotalTours from "../../Components/Statisical.component/StatisticalTotal/StatisticalTotalTours";
import StatisticalTotalBookings from "../../Components/Statisical.component/StatisticalTotal/StatisticalTotalBooking";
import StatisticalTotalReviews from "../../Components/Statisical.component/StatisticalTotal/StatisticalTotalReview";
import StatisticalTotalUser from "../../Components/Statisical.component/StatisticalTotal/StatisticalTotalUser";

import DayRevene from "../../Components/Statisical.component/Revenue/DayRevene";
import MonthlyRevenue from "../../Components/Statisical.component/Revenue/MonthlyRevenue";
import YearRevene from "../../Components/Statisical.component/Revenue/YearRevene";

const Statistical = () => {
  return (
    <div className="h-[600px]">
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
            <DayRevene />
            <MonthlyRevenue />
            <YearRevene />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistical;
