import { Link } from "react-router-dom";

import { FaRegListAlt, FaUserFriends } from "react-icons/fa";
import { GiPalmTree } from "react-icons/gi";
import { MdOutlineBookOnline } from "react-icons/md";
import { IoStatsChartOutline } from "react-icons/io5";

import { useSelector } from "react-redux";

const Sidebar = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="h-screen bg-gray-800 text-white shadow-xl">
      <h1 className="pt-10 text-center text-xl font-bold">
        {currentUser?.role}
      </h1>
      <div className="mx-2 pt-10">
        {[
          {
            icon: <FaRegListAlt />,
            text: "Danh sách tour",
            link: "/listTour",
          },
          {
            icon: <GiPalmTree />,
            text: "Danh sách loại tour",
            link: "/listType",
          },
          {
            icon: <MdOutlineBookOnline />,
            text: "Danh sách đặt tour",
            link: "/listOrder",
          },
          {
            icon: <FaUserFriends />,
            text: "Danh sách người dùng",
            link: "/listUser",
          },
          {
            icon: <IoStatsChartOutline />,
            text: "Thống kê",
            link: "/statistical",
          },
        ].map((item, index) => (
          <Link to={item.link} key={index} className="no-underline">
            <div className="my-5 flex items-center rounded-lg bg-gray-700 px-2 py-2 transition duration-200 ease-in-out hover:bg-gray-600">
              <div className="text-lg text-yellow-400">{item.icon}</div>
              <p className="pl-2">{item.text}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
