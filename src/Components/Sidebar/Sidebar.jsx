import { Link } from "react-router-dom";
import { AiOutlineGift } from "react-icons/ai";
import { BsBookmarksFill, BsFillBookmarkFill, BsGraphUp } from "react-icons/bs";
import { RiTeamLine, RiBillLine } from "react-icons/ri";
import { MdOutlineTour, MdOutlineCategory, MdEventSeat } from "react-icons/md";

const Sidebar = () => {
  return (
    <div className="h-screen bg-gray-200 text-gray-800">
      <div className="mx-2 pt-6">
        {[
          // { icon: <AiFillHome />, text: "Trang Chính", link: "/" },
          { icon: <MdOutlineTour />, text: "Quản Lý Tour", link: "/listTour" },
          { icon: <MdEventSeat />, text: "Đặt Tour", link: "/listOrder" },
          { icon: <RiBillLine />, text: "Hóa Đơn", link: "/bill" },
          { icon: <MdOutlineCategory />, text: "Loại Tour", link: "/listType" },
          {
            icon: <BsBookmarksFill />,
            text: "Danh Mục Tour",
            link: "/listTourDirectory",
          },
          {
            icon: <AiOutlineGift />,
            text: "Khuyến Mãi",
            link: "/listPromotion",
          },
          { icon: <RiTeamLine />, text: "Người Dùng", link: "/listAdmin" },
          { icon: <BsGraphUp />, text: "Thống Kê", link: "/statistical" },
          { icon: <BsFillBookmarkFill />, text: "Blog", link: "/listBlog" },
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
