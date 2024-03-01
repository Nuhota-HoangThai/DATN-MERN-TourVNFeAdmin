import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils/config";

const Login = () => {
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    email: "",
  });

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/user/login`, formData);
      const { token, role } = response.data;

      // Kiểm tra vai trò và chỉ cho phép đăng nhập nếu là admin hoặc công ty
      if (role === "admin" || role === "company") {
        localStorage.setItem("auth-token", token);
        if (role === "admin") {
          navigate("/admin");
        } else if (role === "company") {
          navigate("/company");
        }
      } else {
        setLoginError("Chỉ dành cho Quản trị viên và Công ty.");
      }
    } catch (error) {
      setLoginError("Đăng nhập thất bại: Email hoặc mật khẩu không đúng.");
      console.error("Lỗi đăng nhập", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-96">
        <h1 className="text-2xl font-bold text-red-700 mb-6">ĐĂNG NHẬP</h1>{" "}
        {loginError && <div className="text-red-500 mb-4">{loginError}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Địa chỉ email"
              onChange={changeHandler}
              value={formData.email}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-white text-gray-700 focus:border-red-500 focus:ring focus:ring-red-200 transition duration-200" // Adjusted colors for better contrast
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
              className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-white text-gray-700 focus:border-red-500 focus:ring focus:ring-red-200 transition duration-200" // Adjusted colors for better contrast
            />
          </div>

          <div className="mb-4 flex items-center text-gray-800">
            <input
              type="checkbox"
              name=""
              id="rememberMe"
              checked={rememberMe}
              onChange={handleRememberMeChange}
            />
            <label htmlFor="rememberMe" className="pl-2">
              Lưu đăng nhập
            </label>
          </div>
          <div className="flex justify-between mb-4 text-gray-800">
            <p>Chưa có tài khoản?</p>
            <Link to="/register" className="underline hover:text-gray-500">
              Đăng ký
            </Link>
          </div>
          <button
            type="submit"
            className="w-full bg-red-700 text-white p-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-500 transition duration-200" // Adjusted button colors
          >
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
