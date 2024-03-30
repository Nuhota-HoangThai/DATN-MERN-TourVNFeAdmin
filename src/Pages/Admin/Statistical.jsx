import {} from "react";

import StatisticalTotalTours from "../../Components/Statisical.component/StatisticalTotalTours";
import StatisticalTotalBookings from "../../Components/Statisical.component/StatisticalTotalBooking";
import StatisticalTotalReviews from "../../Components/Statisical.component/StatisticalTotalReview";
import StatisticalTotalUser from "../../Components/Statisical.component/StatisticalTotalUser";

import DayRevene from "../../Components/Statisical.component/Revenue/DayRevene";
import MonthlyRevenue from "../../Components/Statisical.component/Revenue/MonthlyRevenue";
import YearRevene from "../../Components/Statisical.component/Revenue/YearRevene";

const Statistical = () => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <StatisticalTotalTours />
        <StatisticalTotalBookings />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <StatisticalTotalReviews />
        <StatisticalTotalUser />
      </div>
      <div>
        <DayRevene />
      </div>
      <div>
        <MonthlyRevenue />
      </div>
      <div>
        <YearRevene />
      </div>
    </>
  );
};

export default Statistical;
