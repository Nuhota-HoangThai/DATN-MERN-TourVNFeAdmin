import {} from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { Routes, Route, useLocation } from "react-router-dom";

import AddTour from "../../Components/AddTour/AddTour";
import ListTour from "../../Components/ListTour/ListTour";
import TourDetail from "../../Components/ListTour/TourDetail";

import ListUser from "../../Components/ListUser/ListUser";
import ListAdmin from "../../Components/ListUser/ListAdmin";
import ListStaff from "../../Components/ListUser/ListStaff";
import ListGuide from "../../Components/ListUser/ListGuide";
import ListCustomer from "../../Components/ListUser/ListCustomer";
import AddUser from "../../Components/ListUser/AddUser";
import UpdateUser from "../../Components/ListUser/UpdateUser";

import ListOrder from "../../Components/ListOrder/ListOrder";
import BookingDetails from "../../Components/ListOrder/BookingDetail";

import Statistical from "../../Pages/Admin/Statistical";
import HomeAdmin from "./HomeAdmin";

import UpdateTour from "../../Components/UpdateTour/UpdateTour";

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

import Bill from "./Bill";
import BillDetails from "../../Components/Bill.component/BillDetails";
import CommonRevenue from "../../Components/Statisical.component/CommonRevenue/CommonRevenue";

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

          <Route
            path="/listAdmin"
            element={
              <ListUser>
                <ListAdmin />
              </ListUser>
            }
          />
          <Route
            path="/listStaff"
            element={
              <ListUser>
                <ListStaff />
              </ListUser>
            }
          />
          <Route
            path="/listGuide"
            element={
              <ListUser>
                <ListGuide />
              </ListUser>
            }
          />
          <Route
            path="/listCustomer"
            element={
              <ListUser>
                <ListCustomer />
              </ListUser>
            }
          />
          <Route
            path="/addUser"
            element={
              <ListUser>
                <AddUser />
              </ListUser>
            }
          />
          <Route
            path="/update_user/:id"
            element={
              <ListUser>
                <UpdateUser />
              </ListUser>
            }
          />
          {/* <Route path="/update_user/:id" element={<UpdateUser />} /> */}
          {/* <Route path="/addUser" element={<AddUser />} /> */}
          {/* <Route path="/listUser" element={<ListUser />} /> */}
          {/* <Route path="/listAdmin" element={<ListAdmin />} /> */}
          {/* <Route path="/listStaff" element={<ListStaff />} /> */}
          {/* <Route path="/listGuide" element={<ListGuide />} /> */}
          {/* <Route path="/listCustomer" element={<ListCustomer />} /> */}

          <Route path="/profileUser" element={<ProfileUser />} />

          <Route path="/update_tour/:id" element={<UpdateTour />} />

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

          <Route path="/statistical" element={<Statistical />} />
          <Route path="/common-revenue" element={<CommonRevenue />} />

          <Route path="/bill" element={<Bill />} />
          <Route path="/bill/:id" element={<BillDetails />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
