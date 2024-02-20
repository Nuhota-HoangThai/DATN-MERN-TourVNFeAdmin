import {} from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";

import AddTour from "../../Components/AddTour/AddTour";
import ListTour from "../../Components/ListTour/ListTour";
import ProfileUser from "../../Components/ProfileUser/ProfileUser";
import ListOrder from "../../Components/ListOrder/ListOrder";

const Admin = () => {
  return (
    <div className="">
      <div className="w-full ">
        <Sidebar />
      </div>

      <div className="flex-grow w-full ">
        <Routes>
          <Route path="/" element={<ListTour />} />
          <Route path="/addTour" element={<AddTour />} />
          <Route path="/listTour" element={<ListTour />} />
          <Route path="/listOrder" element={<ListOrder />} />
          <Route path="/profileUser" element={<ProfileUser />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
