import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils/config";

import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../redux/user/userSlide";

const Login = () => {
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      dispatch(signInStart());
      const res = await axios.post(`${BASE_URL}/user/login`, formData);
      const { token, role } = res.data;

      // Kiểm tra vai trò và chỉ cho phép đăng nhập nếu là admin hoặc công ty
      if (role === "admin" || role === "company") {
        localStorage.setItem(import.meta.env.VITE_AUTH_TOKEN, token);
        if (role === "admin") {
          navigate("/admin");
        } else if (role === "company") {
          navigate("/company");
        }
      } else {
        alert("Chỉ dành cho Quản trị viên và Công ty.");
      }

      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-96 rounded-lg bg-white p-8 shadow-2xl">
        <h1 className="mb-6 text-2xl font-bold text-red-700">ĐĂNG NHẬP</h1>{" "}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Địa chỉ email"
              onChange={changeHandler}
              value={formData.email}
              className="mt-1 w-full rounded-md border border-gray-300 bg-white p-2 text-gray-700 transition duration-200 focus:border-red-500 focus:ring focus:ring-red-200" // Adjusted colors for better contrast
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
              className="mt-1 w-full rounded-md border border-gray-300 bg-white p-2 text-gray-700 transition duration-200 focus:border-red-500 focus:ring focus:ring-red-200" // Adjusted colors for better contrast
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
          <div className="mb-4 flex justify-between text-gray-800">
            <p>Chưa có tài khoản?</p>
            <Link to="/register" className="underline hover:text-gray-500">
              Đăng ký
            </Link>
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-red-700 p-2 text-white transition duration-200 hover:bg-red-600 focus:border-red-500 focus:outline-none focus:ring" // Adjusted button colors
          >
            {loading ? "Đang tải trang..." : "Đăng nhập"}
          </button>
          {error && <p className="mt-5 text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
