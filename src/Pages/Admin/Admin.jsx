import {} from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";

import AddTour from "../../Components/AddTour/AddTour";
import ListTour from "../../Components/ListTour/ListTour";
import ListUser from "../../Components/ListUser/ListUser";
import ListOrder from "../../Components/ListOrder/ListOrder";
import AddUser from "../../Components/AddUser/AddUser";
import Statistical from "../../Components/Statistical/Statistical";
import HomeAdmin from "./HomeAdmin";

import UpdateTour from "../../Components/UpdateTour/UpdateTour";
import UpdateUser from "../../Components/UpdateUser/UpdateUser";
import Login from "./Login";

import AddTourType from "../../Components/TourType/AddTourType/AddTourType";
import ListType from "../../Components/TourType/ListType/ListType";
import UpdateTourType from "../../Components/TourType/UpdateTourType/UpdateTourType";
import ProfileUser from "../../Components/ProfileUser/ProfileUser";
import Register from "./Register";

const Admin = () => {
  return (
    <div className="layout grid grid-cols-5 gap-1">
      <div className="sidebar sidebar col-span-1 w-full">
        <Sidebar />
      </div>

      <div className="content col-span-4">
        <Routes>
          <Route path="/admin" element={<HomeAdmin />} />
          <Route path="/lisTour" element={<ListTour />} />
          <Route path="/addTour" element={<AddTour />} />
          <Route path="/listTour" element={<ListTour />} />
          <Route path="/listOrder" element={<ListOrder />} />
          <Route path="/listUser" element={<ListUser />} />
          <Route path="/profileUser" element={<ProfileUser />} />
          <Route path="/addUser" element={<AddUser />} />
          <Route path="/statistical" element={<Statistical />} />

          <Route path="/update_tour/:id" element={<UpdateTour />} />
          <Route path="/update_user/:id" element={<UpdateUser />} />
          <Route path="/loginAdmin" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/addTourType" element={<AddTourType />} />
          <Route path="/listType" element={<ListType />} />
          <Route path="/updateTourType/:id" element={<UpdateTourType />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
