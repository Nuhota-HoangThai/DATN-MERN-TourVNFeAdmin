import {} from "react";
import { SiYourtraveldottv } from "react-icons/si";
import Admin from "../../assets/images/logoicon.png";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between py-4 px-14 shadow-2xl mb-2 bg-white">
      <div className="flex items-center gap-1 font-bold text-red-500 group">
        <SiYourtraveldottv className="text-4xl transition duration-300 ease-in-out transform group-hover:rotate-12 group-hover:scale-110" />
        <span className="text-3xl transition duration-300 ease-in-out shadow-2xl group-hover:text-red-400 group-hover:shadow-lg">
          VietVoyageHub
        </span>
      </div>
      <div>
        <img src={Admin} alt="" className="w-8 border rounded-full" />
      </div>
    </div>
  );
};

export default Navbar;
