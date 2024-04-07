import { Link } from "react-router-dom";
//import { useSelector } from "react-redux";

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
  return (
    <div className="h-screen bg-gray-200 text-gray-800">
      <div className="mx-2 pt-6">
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
            link: "/listAdmin",
          },
          {
            icon: <BsGraphUp />,
            text: "Thống Kê",
            link: "/statistical",
          },
        ].map((item, index) => (
          <Link to={item.link} key={index} className="no-underline">
            <div className="my-5 flex items-center rounded-lg bg-white px-4 py-3 shadow-sm transition duration-300 ease-in-out hover:bg-blue-200 hover:shadow-lg">
              <div className="text-xl text-gray-900">{item.icon}</div>
              <p className="pl-3 text-sm font-medium text-gray-700">
                {item.text}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
