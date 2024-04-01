import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// Kếp tục sử dụng các icon đã được import từ trước và thêm một số icon mới nếu cần
import {
  AiFillHome,
  // AiOutlineUser,
  AiOutlineOrderedList,
  AiOutlineGift,
} from "react-icons/ai";
import { BsGraphUp, BsFillBookmarkFill } from "react-icons/bs";
import { RiBookReadLine, RiTeamLine } from "react-icons/ri";
import { MdOutlineTour } from "react-icons/md";

const Sidebar = () => {
  const { currentUser } = useSelector((state) => state.user);

  const translateRole = (role) => {
    const roleTranslations = {
      admin: "Quản trị viên",
      customer: "Khách hàng",
      staff: "Nhân viên",
      guide: "Hướng dẫn viên",
    };

    return roleTranslations[role] || role;
  };

  return (
    <div className="h-screen bg-gray-800 text-white shadow-2xl">
      <h1 className="pt-10 text-center text-xl font-bold">
        {translateRole(currentUser?.role)}
      </h1>
      <div className="mx-2 pt-10">
        {[
          {
            icon: <AiFillHome />,
            text: "Trang Chính",
            link: "/",
          },
          {
            icon: <MdOutlineTour />,
            text: "Quản Lý Tour",
            link: "/listTour",
          },
          {
            icon: <RiBookReadLine />,
            text: "Đặt Tour",
            link: "/listOrder",
          },
          {
            icon: <RiBookReadLine />,
            text: "Hóa đơn",
            link: "/bill",
          },
          {
            icon: <AiOutlineOrderedList />,
            text: "Loại Tour",
            link: "/listType",
          },
          {
            icon: <BsFillBookmarkFill />,
            text: "Danh Mục Tour",
            link: "/listTourDirectory",
          },
          {
            icon: <AiOutlineGift />,
            text: "Khuyến Mãi",
            link: "/listPromotion",
          },
          {
            icon: <RiTeamLine />,
            text: "Người Dùng",
            link: "/listUser",
          },
          {
            icon: <BsGraphUp />,
            text: "Thống Kê",
            link: "/statistical",
          },
        ].map((item, index) => (
          <Link to={item.link} key={index} className="no-underline">
            <div className="my-5 flex items-center rounded-lg bg-gray-700 px-4 py-3 shadow transition duration-200 ease-in-out hover:bg-gray-600 hover:shadow-lg">
              <div className="text-xl text-yellow-400">{item.icon}</div>
              <p className="pl-3 text-sm font-medium">{item.text}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
