import React from "react";
import { GiMountains } from "react-icons/gi";
import { Link } from "react-router-dom";

const Navbar = () => {
  // Lấy tên người dùng từ localStorage
  const userName = localStorage.getItem("auth-token");

  return (
    <div className="mb-2 flex items-center justify-between bg-white px-14 py-4 shadow-2xl">
      <Link
        to="/"
        className="group flex items-center gap-1 font-bold text-blue-900"
      >
        <GiMountains className="transform text-4xl transition duration-300 ease-in-out group-hover:rotate-12 group-hover:scale-110" />
        <span className="text-3xl shadow-2xl transition duration-300 ease-in-out group-hover:text-blue-950 group-hover:shadow-lg">
          ViVu3Mien
        </span>
      </Link>
      {userName ? (
        <div className="rounded-full border bg-blue-200 px-4 py-2 text-blue-900">
          {userName}
        </div>
      ) : (
        <Link to="/loginAdmin">
          <span>Đăng nhập</span>
        </Link>
      )}
    </div>
  );
};

export default Navbar;
