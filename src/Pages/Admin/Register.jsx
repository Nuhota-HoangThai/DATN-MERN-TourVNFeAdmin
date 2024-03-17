import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/config";

const Register = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!data.success) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/loginAdmin");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg">
        <h1 className="text-center text-2xl font-bold">Đăng Ký</h1>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Tên đăng nhập"
            className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
            id="name"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
            id="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
            id="password"
            onChange={handleChange}
          />

          <button
            disabled={loading}
            className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 disabled:bg-indigo-300"
          >
            {loading ? "Đang xử lý..." : "Đăng Ký"}
          </button>
        </form>
        <div className="text-center text-sm">
          <p>Đã có tài khoản?</p>
          <Link
            to="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
