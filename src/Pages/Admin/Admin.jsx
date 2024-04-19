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
//import Register from "./Register";

import AddTourDirectory from "../../Components/TourDirectory/AddTourDirectory";
import ListTourDirectory from "../../Components/TourDirectory/ListTourDirectory";
import UpdateTourDirectory from "../../Components/TourDirectory/UpdateTourDirectory";

import AddPromotion from "../../Components/Promotion/AddPromotion";
import ListPromotion from "../../Components/Promotion/ListPromotion";
import UpdatePromotionForm from "../../Components/Promotion/UpdatePromotion";

import Bill from "./Bill";
import BillDetails from "../../Components/Bill.component/BillDetails";
import CommonRevenue from "../../Components/Statisical.component/CommonRevenue/CommonRevenue";

import Blog from "./Blog";
import AddBlog from "../../Components/Blog.component/AddBlog";
import BlogDetail from "../../Components/Blog.component/BlogDetail";
import ReviewList from "./Review";
// import UpdateBlog from "../../Components/Blog.component/UpdateBlog";

import Guide from "../Guide/Guide";
import TourDetailGuide from "../../Components/ListTour/TourDetailGuide";

import AllTourGuide from "./AllTourGuide";

import ReviewDetails from "./ReviewDetail";
import UserDetail from "../../Components/ListUser/UserDetail";
const Admin = () => {
  const location = useLocation();

  const hideSidebar = location.pathname === "/loginAdmin";

  return (
    <div className="layout grid grid-cols-7 gap-1">
      {!hideSidebar && (
        <div className="sidebar col-span-1 w-full">
          <Sidebar />
        </div>
      )}

      <div className={`content ${hideSidebar ? "col-span-6" : "col-span-5"}`}>
        <Routes>
          <Route path="/" element={<HomeAdmin />} />
          <Route path="/listTour" element={<ListTour />} />
          <Route path="/addTour" element={<AddTour />} />
          <Route path="/tour-detail/:tourId" element={<TourDetail />} />
          <Route
            path="/tour-detail-guide/:tourId"
            element={<TourDetailGuide />}
          />

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

          <Route path="/profileUser" element={<ProfileUser />} />
          <Route path="/user-detail/:id" element={<UserDetail />} />

          <Route path="/update_tour/:id" element={<UpdateTour />} />

          <Route path="/loginAdmin" element={<Login />} />
          {/* <Route path="/register" element={<Register />} /> */}

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

          <Route path="/listBlog" element={<Blog />} />
          <Route path="/addBlog" element={<AddBlog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          {/* <Route path="/editBlog/:id" element={<UpdateBlog />} /> */}

          <Route path="/review" element={<ReviewList />} />
          <Route path="/tour-guide" element={<Guide />} />
          <Route path="/all-tour-guide" element={<AllTourGuide />} />

          <Route path="/review-details/:reviewId" element={<ReviewDetails />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
