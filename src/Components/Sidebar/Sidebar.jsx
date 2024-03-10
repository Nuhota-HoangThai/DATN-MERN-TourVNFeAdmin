import {} from "react";
import { Link } from "react-router-dom";

import { IoMdList } from "react-icons/io";
import { PiHammerFill } from "react-icons/pi";
import { IoStatsChartOutline } from "react-icons/io5";
import { PiUserListDuotone } from "react-icons/pi";
import { LiaThListSolid } from "react-icons/lia";

const Sidebar = () => {
  return (
    <div className=" ml-4 my-4 bg-white h-screen rounded-2xl">
      <h1 className="text-center pt-10 font-bold text-xl">QUẢN TRỊ VIÊN</h1>
      <div className="pt-10">
        <Link to={"/listTour"} className="no-underline">
          <div className="flex items-center my-5 mx-5 py-2 pl-8 rounded-lg bg-slate-100 ">
            <LiaThListSolid />
            <p className="pl-2">Danh sách tour</p>
          </div>
        </Link>
        <Link to={"/listType"} className="no-underline">
          <div className="flex items-center my-5 mx-5 py-2 pl-8 rounded-lg bg-slate-100 ">
            <PiHammerFill />
            <p className="pl-2">Danh sách loại tour</p>
          </div>
        </Link>
        <Link to={"/listOrder"} className="no-underline">
          <div className="flex items-center my-5 mx-5 py-2 pl-8 rounded-lg bg-slate-100 ">
            <IoMdList />
            <p className="pl-2">Danh sách đặt hàng</p>
          </div>
        </Link>
        <Link to={"/listUser"} className="no-underline">
          <div className="flex items-center my-5 mx-5 py-2 pl-8 rounded-lg bg-slate-100 ">
            <PiUserListDuotone />
            <p className="pl-2">Danh sách khách hàng</p>
          </div>
        </Link>

        <Link to={"/statistical"} className="no-underline">
          <div className="flex items-center my-5 mx-5 py-2 pl-8 rounded-lg bg-slate-100 ">
            <IoStatsChartOutline />
            <p className="pl-2">Thống kê</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
