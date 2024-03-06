import {} from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";

import AddTour from "../../Components/AddTour/AddTour";
import ListTour from "../../Components/ListTour/ListTour";
import ListUser from "../../Components/ListUser/ListUser";
import ListOrder from "../../Components/ListOrder/ListOrder";
import ProfileAdmin from "../../Components/ProfileAdmin/ProfileAdmin";
import AddUser from "../../Components/AddUser/AddUser";
import Statistical from "../../Components/Statistical/Statistical";
import HomeAdmin from "./HomeAdmin";

import UpdateTour from "../../Components/UpdateTour/UpdateTour";
import UpdateUser from "../../Components/UpdateUser/UpdateUser";
import Login from "./Login";
import TypeTour from "../../Components/TypeTour/TypeTour";

const Admin = () => {
  return (
    <div className="grid grid-cols-5 gap-4 ">
      <div className=" col-span-1 h-full w-full">
        <Sidebar />
      </div>

      <div className="col-span-4">
        <Routes>
          <Route path="/admin" element={<HomeAdmin />} />
          <Route path="/lisTour" element={<ListTour />} />
          <Route path="/addTour" element={<AddTour />} />
          <Route path="/listTour" element={<ListTour />} />
          <Route path="/listOrder" element={<ListOrder />} />
          <Route path="/listUser" element={<ListUser />} />
          <Route path="/profileAmin" element={<ProfileAdmin />} />
          <Route path="/addUser" element={<AddUser />} />
          <Route path="/statistical" element={<Statistical />} />
          <Route path="/typeTour" element={<TypeTour />} />
          <Route path="/update_tour/:id" element={<UpdateTour />} />
          <Route path="/update_user/:id" element={<UpdateUser />} />
          <Route path="/loginAdmin" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
