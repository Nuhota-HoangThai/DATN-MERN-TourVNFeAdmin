import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils/config";

const Register = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  // Khởi tạo trạng thái ban đầu cho formData
  const [formData, setFormData] = useState({
    name: "", // Đổi từ username thành name cho phù hợp với model User
    password: "",
    email: "",
    phone: "",
    role: "customer", // role giữ nguyên, không cần cartData trong formData
    address: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/user/addUser`, formData);
      if (response.data.success) {
        setSuccessMessage("Thêm người dùng thành công.");
        setTimeout(() => {
          navigate("/listUser"); // Chuyển hướng người dùng sau khi đăng ký thành công
        }, 1000);
      }
    } catch (error) {
      console.error(
        "Error during registration:",
        error.response ? error.response.data : "No response from server"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-red-700">
          Thêm người dùng mới
        </h1>
        {successMessage && (
          <div className="text-green-500 mb-4">{successMessage}</div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Họ tên"
              onChange={changeHandler}
              value={formData.name}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Số điện thoại"
              onChange={changeHandler}
              value={formData.phone}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Địa chỉ email"
              onChange={changeHandler}
              value={formData.email}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Mật khẩu"
              onChange={changeHandler}
              value={formData.password}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Địa chỉ"
              onChange={changeHandler}
              value={formData.address}
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>
          <div className="mb-4">
            <select
              name="role"
              id="role"
              className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-2 px-3 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            >
              <option value="customer">Khách hàng</option>
              <option value="company">Công ty</option>
              <option value="admin">Quản trị viên</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-red-700 text-white p-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Thêm
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
