import { Link } from "react-router-dom";

const SidebarListUser = () => {
  return (
    <div className="bg-blue-800 font-medium text-white shadow-md">
      <div className="flex items-center justify-between px-6 py-4">
        <Link to={"/listAdmin"} className="hover:text-gray-300">
          Danh sách quản trị viên
        </Link>
        <Link to={"/listStaff"} className="hover:text-gray-300">
          Danh sách nhân viên
        </Link>
        <Link to={"/listGuide"} className="hover:text-gray-300">
          Danh sách hướng dẫn viên
        </Link>
        <Link to={"/listCustomer"} className="hover:text-gray-300">
          Danh sách khách hàng
        </Link>
        <Link to={"/addUser"} className="hover:text-gray-300">
          Thêm người dùng
        </Link>
      </div>
    </div>
  );
};

export default SidebarListUser;
