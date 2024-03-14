import {} from "react";
import { Link } from "react-router-dom";

import { IoMdList } from "react-icons/io";
import { PiHammerFill } from "react-icons/pi";
import { IoStatsChartOutline } from "react-icons/io5";
import { PiUserListDuotone } from "react-icons/pi";
import { LiaThListSolid } from "react-icons/lia";

const Sidebar = () => {
  return (
    <div className=" my-4 ml-4 h-screen rounded-2xl bg-white">
      <h1 className="pt-10 text-center text-xl font-bold">QUẢN TRỊ VIÊN</h1>
      <div className="pt-10">
        <Link to={"/listTour"} className="no-underline">
          <div className="mx-5 my-5 flex items-center rounded-lg bg-slate-100 py-2 pl-8 ">
            <LiaThListSolid />
            <p className="pl-2">Danh sách tour</p>
          </div>
        </Link>
        <Link to={"/listType"} className="no-underline">
          <div className="mx-5 my-5 flex items-center rounded-lg bg-slate-100 py-2 pl-8 ">
            <PiHammerFill />
            <p className="pl-2">Danh sách loại tour</p>
          </div>
        </Link>
        <Link to={"/listOrder"} className="no-underline">
          <div className="mx-5 my-5 flex items-center rounded-lg bg-slate-100 py-2 pl-8 ">
            <IoMdList />
            <p className="pl-2">Danh sách đặt tour</p>
          </div>
        </Link>
        <Link to={"/listUser"} className="no-underline">
          <div className="mx-5 my-5 flex items-center rounded-lg bg-slate-100 py-2 pl-8 ">
            <PiUserListDuotone />
            <p className="pl-2">Danh sách khách hàng</p>
          </div>
        </Link>

        <Link to={"/statistical"} className="no-underline">
          <div className="mx-5 my-5 flex items-center rounded-lg bg-slate-100 py-2 pl-8 ">
            <IoStatsChartOutline />
            <p className="pl-2">Thống kê</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
