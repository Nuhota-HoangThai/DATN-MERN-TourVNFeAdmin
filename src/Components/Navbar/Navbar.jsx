import {} from "react";
import { GiMountains } from "react-icons/gi";
import Admin from "../../assets/images/logoicon.png";
import { Link } from "react-router-dom";

const Navbar = () => {
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
      <Link to="/loginAdmin">
        <img src={Admin} alt="" className="w-8 rounded-full border" />
      </Link>
    </div>
  );
};

export default Navbar;
