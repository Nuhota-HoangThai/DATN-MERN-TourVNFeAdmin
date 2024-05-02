import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; // Assuming you're using Redux to store user data
import {
  AiOutlineGift,
  // AiFillHome, // Uncomment and import if you decide to use it again
} from "react-icons/ai";
import { BsBookmarksFill, BsGraphUp } from "react-icons/bs";
import { RiTeamLine, RiBillLine } from "react-icons/ri";
import { MdOutlineTour, MdOutlineCategory, MdEventSeat } from "react-icons/md";
import { FaBlogger } from "react-icons/fa";
import { MdOutlineRateReview } from "react-icons/md";
import { SiFoursquarecityguide } from "react-icons/si";
import { useEffect } from "react";

const Sidebar = () => {
  //const currentUserRole = useSelector((state) => state.user.currentUser.role); // assuming role is a property of currentUser object
  //console.log("Current user role:", currentUserRole);
  const currentUser = useSelector((state) => state.user.currentUser);
  const currentUserRole = currentUser ? currentUser.role : null;

  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if there is no currentUser or currentUserRole
    if (!currentUser || !currentUserRole) {
      navigate("/loginAdmin");
    }
  }, [currentUser, currentUserRole, navigate]);

  // Xác định tất cả các mục thanh bên có vai trò truy cập
  const sidebarItems = [
    {
      icon: <MdOutlineTour color="blue" />,
      text: "Quản Lý Tour",
      link: "/listTour",
      role: ["admin"],
    },
    {
      icon: <MdEventSeat color="green" />,
      text: "Đặt Tour",
      link: "/listOrder",
      role: ["admin", "staff"],
    },
    {
      icon: <RiBillLine color="red" />,
      text: "Hóa Đơn",
      link: "/bill",
      role: ["admin", "staff"],
    },
    {
      icon: <MdOutlineCategory color="purple" />,
      text: "Loại Tour",
      link: "/listType",
      role: ["admin"],
    },
    {
      icon: <BsBookmarksFill color="orange" />,
      text: "Danh Mục Tour",
      link: "/listTourDirectory",
      role: ["admin"],
    },
    {
      icon: <AiOutlineGift color="pink" />,
      text: "Khuyến Mãi",
      link: "/listPromotion",
      role: ["admin"],
    },
    {
      icon: <RiTeamLine color="teal" />,
      text: "Người Dùng",
      link: "/listAdmin",
      role: ["admin"],
    },
    {
      icon: <BsGraphUp color="darkblue" />,
      text: "Thống Kê",
      link: "/statistical",
      role: ["admin", "staff"],
    },
    {
      icon: <FaBlogger color="gold" />,
      text: "Tin tức",
      link: "/listBlog",
      role: ["admin"],
    },
    {
      icon: <MdOutlineRateReview color="silver" />,
      text: "Đánh giá",
      link: "/review",
      role: ["admin"],
    },
    {
      icon: <SiFoursquarecityguide color="brown" />,
      text: "Tour HDV",
      link: "/all-tour-guide",
      role: ["admin"],
    },
    {
      icon: <SiFoursquarecityguide color="black" />,
      text: "Tour HDV",
      link: "/tour-guide",
      role: ["guide"],
    },
  ];

  // Lọc các mục thanh bên dựa trên vai trò của người dùng
  // const accessibleItems = sidebarItems.filter((item) =>
  //   item.role.includes(currentUserRole),
  // );
  const accessibleItems = sidebarItems.filter((item) =>
    currentUserRole ? item.role.includes(currentUserRole) : false,
  );

  return (
    <div className="h-screen bg-blue-800 text-gray-800">
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
