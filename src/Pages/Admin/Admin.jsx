import {} from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { Routes, Route, useLocation } from "react-router-dom";

import AddTour from "../../Components/AddTour/AddTour";
import ListTour from "../../Components/ListTour/ListTour";
import TourDetail from "../../Components/ListTour/TourDetail";

import ListUser from "../../Components/ListUser/ListUser";

import ListOrder from "../../Components/ListOrder/ListOrder";
import BookingDetails from "../../Components/ListOrder/BookingDetail";

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

import AddTourDirectory from "../../Components/TourDirectory/AddTourDirectory";
import ListTourDirectory from "../../Components/TourDirectory/ListTourDirectory";
import UpdateTourDirectory from "../../Components/TourDirectory/UpdateTourDirectory";

import AddPromotion from "../../Components/Promotion/AddPromotion";
import ListPromotion from "../../Components/Promotion/ListPromotion";
import UpdatePromotionForm from "../../Components/Promotion/UpdatePromotion";

const Admin = () => {
  const location = useLocation();

  const isLoginPage = location.pathname === "/loginAdmin";

  return (
    <div className="layout grid grid-cols-5 gap-1">
      {!isLoginPage && (
        <div className="sidebar col-span-1 w-full">
          <Sidebar />
        </div>
      )}

      <div className={`content ${isLoginPage ? "col-span-5" : "col-span-4"}`}>
        <Routes>
          <Route path="/" element={<HomeAdmin />} />
          <Route path="/listTour" element={<ListTour />} />
          <Route path="/addTour" element={<AddTour />} />
          <Route path="/tour-detail/:tourId" element={<TourDetail />} />

          <Route path="/listOrder" element={<ListOrder />} />
          <Route
            path="/booking-detail/:bookingId"
            element={<BookingDetails />}
          />

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

          <Route path="/addTourDirectory" element={<AddTourDirectory />} />
          <Route path="/listTourDirectory" element={<ListTourDirectory />} />
          <Route
            path="/updateTourDirectory/:id"
            element={<UpdateTourDirectory />}
          />

          <Route path="/addPromotion" element={<AddPromotion />} />
          <Route path="/listPromotion" element={<ListPromotion />} />
          <Route path="/editPromotion/:id" element={<UpdatePromotionForm />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
