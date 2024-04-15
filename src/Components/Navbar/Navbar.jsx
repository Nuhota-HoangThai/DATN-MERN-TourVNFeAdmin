import {} from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/user/userSlice"; // Ensure the path is correct

import logoViVu3Mien from "../../assets/images/logoViVu3Mien.jpg";
import { translateRole } from "../../utils/formatRole";

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("auth-token");
    navigate("/loginAdmin");
  };

  return (
    <div className="flex items-center justify-between bg-blue-800 px-14 py-2 text-white shadow">
      <Link to="/" className="group flex items-center gap-1">
        <h1 className="text-lg font-bold">Trang quản trị</h1>
        {/* <img src={logoViVu3Mien} alt="" className="w-20" />
        <div>
          <div className="vivu3mien-logo text-2xl font-bold text-cyan-500">
            ViVu3Mien
          </div>
          <div className="text-sm font-medium italic text-orange-400">
            Phục vụ tận tâm
          </div>
        </div> */}
      </Link>

      <div className="text-lg">
        {currentUser ? (
          <div className="flex justify-between gap-8">
            <div className="flex items-center gap-4">
              <Link to="/profileUser" className="flex ">
                <strong className="ml-3">
                  {translateRole(currentUser?.role)} - {currentUser.name}
                </strong>
              </Link>
            </div>

            <div>
              <button onClick={handleLogout} className="underline">
                Đăng xuất
              </button>
            </div>
          </div>
        ) : (
          <Link to="/loginAdmin" className="text-slate-700 hover:underline">
            Đăng nhập
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
