import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils/config";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const AddUser = () => {
  const { token } = useSelector((state) => state.user.currentUser);

  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    confirmPassword: "",
    email: "",
    phone: "",
    role: "customer",
    address: "",
    cccd: "",
    dob: "",
    sex: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { password, confirmPassword } = formData;

      if (password.length < 8) {
        toast("Mật khẩu không đúng định dạng.");
        return;
      }

      if (password !== confirmPassword) {
        toast("Mật khẩu và xác nhận mật khẩu không khớp.");
        return;
      }
      const response = await axios.post(`${BASE_URL}/user/addUser`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        toast("Thêm người dùng thành công");
        setTimeout(() => {
          navigate("/listAdmin");
        }, 3000);
      }
    } catch (error) {
      toast("Thêm người dùng không thành công");
      console.error(
        "Error during registration:",
        error.response ? error.response.data : "No response from server",
      );
    }
  };

  return (
    <div className="mx-auto max-w-4xl rounded-lg bg-white p-8 shadow-xl">
      <h1 className="mb-6 text-xl font-bold text-gray-900">
        Thêm người dùng mới
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="-mx-2 flex flex-wrap">
          <div className="mb-4 w-full px-2 md:w-1/2">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Họ tên"
              onChange={changeHandler}
              value={formData.name}
              className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4 w-full px-2 md:w-1/2">
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Số điện thoại"
              onChange={changeHandler}
              value={formData.phone}
              className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            />
          </div>
        </div>
        <div className="-mx-2 flex flex-wrap">
          <div className="mb-4 w-full px-2 md:w-1/2">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Địa chỉ email"
              onChange={changeHandler}
              value={formData.email}
              className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4 w-full px-2 md:w-1/2">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Mật khẩu"
              onChange={changeHandler}
              value={formData.password}
              className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            />
          </div>
        </div>
        <div className="-mx-2 flex flex-wrap">
          <div className="mb-4 w-full px-2 md:w-1/2">
            <input
              type="password"
              placeholder="Xác nhận mật khẩu"
              className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              name="confirmPassword"
              id="confirmPassword"
              onChange={changeHandler}
              value={formData.confirmPassword}
            />
          </div>
          <div className="mb-4 w-full px-2 md:w-1/2">
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Địa chỉ"
              onChange={changeHandler}
              value={formData.address}
              className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            />
          </div>
        </div>
        <div className="-mx-2 flex flex-wrap">
          <div className="mb-4 w-full px-2 md:w-1/2">
            <input
              type="text"
              id="cccd"
              name="cccd"
              placeholder="Căn cước công dân"
              onChange={changeHandler}
              value={formData.cccd}
              className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4 w-full px-2 md:w-1/2">
            <input
              type="date"
              id="dob"
              name="dob"
              placeholder="Ngày sinh"
              onChange={changeHandler}
              value={formData.dob}
              className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            />
          </div>
        </div>
        <div className="-mx-2 flex flex-wrap">
          <div className="mb-4 w-full px-2 md:w-1/2">
            <input
              type="text"
              id="sex"
              name="sex"
              placeholder="Giới tính"
              onChange={changeHandler}
              value={formData.sex}
              className="mt-1 w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4 w-full px-2 md:w-1/2">
            <select
              name="role"
              id="role"
              className="mt-1 block w-full appearance-none rounded-md border border border-gray-300 bg-white px-3 px-4 py-2 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            >
              <option value="admin">Quản trị viên</option>
              <option value="staff">Nhân viên</option>
              <option value="guide">Hướng dẫn viên</option>
              <option value="customer">Khách hàng</option>
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 w-full rounded-md bg-blue-600 p-3 text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Thêm
        </button>
      </form>
    </div>
  );
};

export default AddUser;
