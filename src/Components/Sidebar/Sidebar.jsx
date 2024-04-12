import { Link } from "react-router-dom";
import { useSelector } from "react-redux"; // Assuming you're using Redux to store user data
import {
  AiOutlineGift,
  // AiFillHome, // Uncomment and import if you decide to use it again
} from "react-icons/ai";
import { BsBookmarksFill, BsFillBookmarkFill, BsGraphUp } from "react-icons/bs";
import { RiTeamLine, RiBillLine } from "react-icons/ri";
import { MdOutlineTour, MdOutlineCategory, MdEventSeat } from "react-icons/md";

const Sidebar = () => {
  const currentUserRole = useSelector((state) => state.user.currentUser.role); // assuming role is a property of currentUser object
  console.log("Current user role:", currentUserRole);
  // Xác định tất cả các mục thanh bên có vai trò truy cập
  const sidebarItems = [
    {
      icon: <MdOutlineTour />,
      text: "Quản Lý Tour",
      link: "/listTour",
      role: ["admin"],
    },
    {
      icon: <MdEventSeat />,
      text: "Đặt Tour",
      link: "/listOrder",
      role: ["admin", "staff"],
    },
    {
      icon: <RiBillLine />,
      text: "Hóa Đơn",
      link: "/bill",
      role: ["admin", "staff"],
    },
    {
      icon: <MdOutlineCategory />,
      text: "Loại Tour",
      link: "/listType",
      role: ["admin"],
    },
    {
      icon: <BsBookmarksFill />,
      text: "Danh Mục Tour",
      link: "/listTourDirectory",
      role: ["admin"],
    },
    {
      icon: <AiOutlineGift />,
      text: "Khuyến Mãi",
      link: "/listPromotion",
      role: ["admin"],
    },
    {
      icon: <RiTeamLine />,
      text: "Người Dùng",
      link: "/listAdmin",
      role: ["admin"],
    },
    {
      icon: <BsGraphUp />,
      text: "Thống Kê",
      link: "/statistical",
      role: ["admin"],
    },
    {
      icon: <BsFillBookmarkFill />,
      text: "Blog",
      link: "/listBlog",
      role: ["admin"],
    },
    {
      icon: <AiOutlineGift />,
      text: "Đánh giá",
      link: "/review",
      role: ["admin"],
    },
    {
      icon: <AiOutlineGift />,
      text: "Tour HDV",
      link: "/all-tour-guide",
      role: ["admin"],
    },
    {
      icon: <AiOutlineGift />,
      text: "Tour cá nhân HDV",
      link: "/tour-guide",
      role: ["guide"],
    },
  ];

  // Lọc các mục thanh bên dựa trên vai trò của người dùng
  const accessibleItems = sidebarItems.filter((item) =>
    item.role.includes(currentUserRole),
  );

  return (
    <div className="h-screen bg-gray-200 text-gray-800">
      <div className="mx-2 pt-2">
        {accessibleItems.map((item, index) => (
          <Link to={item.link} key={index} className="no-underline">
            <div className="my-5 flex items-center rounded-lg bg-white px-4 py-1.5 shadow-sm transition duration-300 ease-in-out hover:bg-blue-200 hover:shadow-lg">
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
