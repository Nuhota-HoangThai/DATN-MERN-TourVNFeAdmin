import {} from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { GiMountains } from "react-icons/gi";

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="mb-2 flex items-center justify-between bg-white px-14 py-4 shadow-2xl">
      <Link
        to="/admin"
        className="group flex items-center gap-1 font-bold text-blue-900"
      >
        <GiMountains className="transform text-4xl transition duration-300 ease-in-out group-hover:rotate-12 group-hover:scale-110" />
        <span className="text-3xl shadow-2xl transition duration-300 ease-in-out group-hover:text-blue-950 group-hover:shadow-lg">
          ViVu3Mien
        </span>
      </Link>

      <div>
        <Link to="/admin">
          {currentUser ? (
            <span className="text-slate-700">{currentUser.name}</span>
          ) : (
            <Link to="/loginAdmin" className="text-slate-700 hover:underline">
              Đăng nhập
            </Link>
          )}{" "}
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
