import {} from "react";
import { Link } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import { IoMdList } from "react-icons/io";
import { ImProfile } from "react-icons/im";

const Sidebar = () => {
  return (
    <div className="flex flex-row py-5 justify-center  gap-5 w-full h-full bg-blue-200 ">
      <Link to={"/addTour"} className="no-underline">
        <div className="flex items-center justify-center my-0 mx-5 py-2 px-4 rounded-lg bg-slate-100 gap-5">
          <TiShoppingCart />
          <p>Thêm tour</p>
        </div>
      </Link>
      <Link to={"/listTour"} className="no-underline">
        <div className="flex items-center justify-center my-0 mx-5 py-2 px-4 rounded-lg bg-slate-100 gap-5">
          <IoMdList />
          <p>DS tour </p>
        </div>
      </Link>
      <Link to={"/listOrder"} className="no-underline">
        <div className="flex items-center justify-center my-0 mx-5 py-2 px-4 rounded-lg bg-slate-100 gap-5">
          <IoMdList />
          <p>DS đặt hàng </p>
        </div>
      </Link>
      <Link to={"/profileUser"} className="no-underline">
        <div className="flex items-center justify-center my-0 mx-5 py-2 px-4 rounded-lg bg-slate-100 gap-5">
          <ImProfile />
          <p>Thông tin khách hàng </p>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
