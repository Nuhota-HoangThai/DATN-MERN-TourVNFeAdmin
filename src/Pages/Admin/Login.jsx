import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/config";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../redux/user/userSlice";

const Login = () => {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch(`${BASE_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/admin");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-xl bg-white px-8 py-10 shadow-lg">
        <h1 className="text-center text-2xl font-bold text-gray-900">
          Đăng nhập
        </h1>
        {error && <p className="mt-4 text-center text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none"
            id="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none"
            id="password"
            onChange={handleChange}
          />
          <button
            disabled={loading}
            className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-indigo-300"
          >
            {loading ? "Đang tải..." : "Đăng nhập"}
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm">
            Chưa có tài khoản?{" "}
            <Link
              to="/register"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Đăng ký
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Login;
