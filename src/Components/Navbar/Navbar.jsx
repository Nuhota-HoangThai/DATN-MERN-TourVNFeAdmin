import {} from "react";
import { GiMountains } from "react-icons/gi";
import Admin from "../../assets/images/logoicon.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between py-4 px-14 shadow-2xl mb-2 bg-white">
      <Link
        to="/"
        className="flex items-center gap-1 font-bold text-blue-900 group"
      >
        <GiMountains className="text-4xl transition duration-300 ease-in-out transform group-hover:rotate-12 group-hover:scale-110" />
        <span className="text-3xl transition duration-300 ease-in-out shadow-2xl group-hover:text-blue-950 group-hover:shadow-lg">
          ViVu3Mien
        </span>
      </Link>
      <Link to="/loginAdmin">
        <img src={Admin} alt="" className="w-8 border rounded-full" />
      </Link>
    </div>
  );
};

export default Navbar;
