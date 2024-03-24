import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils/config";

const Register = () => {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
    phone: "",
    role: "customer",
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
          navigate("/listUser");
        }, 3000);
      }
    } catch (error) {
      console.error(
        "Error during registration:",
        error.response ? error.response.data : "No response from server",
      );
    }
  };

  return (
    <div className="mx-4 my-4 flex min-h-screen items-center justify-center rounded-2xl bg-white ">
      <div className="w-96 rounded bg-white p-8 shadow-2xl">
        <h1 className="mb-6 text-2xl font-bold ">Thêm người dùng mới</h1>
        {successMessage && (
          <div className="mb-4 text-green-500">{successMessage}</div>
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
              className="mt-1 w-full rounded-md border p-2"
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
              className="mt-1 w-full rounded-md border p-2"
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
              className="mt-1 w-full rounded-md border p-2"
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
              className="mt-1 w-full rounded-md border p-2"
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
              className="mt-1 w-full rounded-md border p-2"
            />
          </div>
          <div className="mb-4">
            <select
              name="role"
              id="role"
              className="block w-full appearance-none rounded border border-gray-200 bg-white px-3 py-2 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
            >
              <option value="admin">Quản trị viên</option>
              <option value="staff">Nhân viên</option>
              <option value="guide">Hướng dẫn viên</option>
              <option value="customer">Khách hàng</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-blue-950 p-2 text-white hover:bg-blue-700 focus:border-blue-300 focus:outline-none focus:ring"
          >
            Thêm
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
