import {} from "react";

import DayRevene from "../Revenue/DayRevene";
import MonthlyRevenue from "../Revenue/MonthlyRevenue";
import YearRevene from "../Revenue/YearRevene";
import { Link } from "react-router-dom";

const CommonRevenue = () => {
  return (
    <div className="h-[600px]">
      <div className="mx-4 my-4 flex justify-between">
        <h1 className=" text-2xl font-bold">Thống kê doanh thu</h1>

        <Link to={"/statistical"} className=" no-underline ">
          <div className=" flex w-48 items-center justify-center rounded-lg bg-blue-950 py-2 text-white">
            <p className="">Trở về</p>
          </div>
        </Link>
      </div>
      <DayRevene />
      <MonthlyRevenue />
      <YearRevene />
    </div>
  );
};

export default CommonRevenue;
