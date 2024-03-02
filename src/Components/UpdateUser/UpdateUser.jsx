import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/config";

const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    role: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${BASE_URL}/user/getUserById/${id}`);
        const data = await res.json();
        setUserData(data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/user/update_user/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      alert("User updated successfully");
      navigate("/listUser");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="update-user-form max-w-4xl mx-auto mt-10 p-5 shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold mb-8 text-center text-blue-600">
        Cập nhật thông tin người dùng
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-2 font-semibold">
            Tên
          </label>
          <input
            id="name"
            name="name"
            value={userData.name}
            onChange={handleChange}
            placeholder="Tên"
            className="input input-bordered w-full"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="phone" className="mb-2 font-semibold">
            Số điện thoại
          </label>
          <input
            id="phone"
            name="phone"
            value={userData.phone}
            onChange={handleChange}
            placeholder="Số điện thoại"
            className="input input-bordered w-full"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-2 font-semibold">
            Email
          </label>
          <input
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            placeholder="Email"
            className="input input-bordered w-full"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="address" className="mb-2 font-semibold">
            Địa chỉ
          </label>
          <input
            id="address"
            name="address"
            value={userData.address}
            onChange={handleChange}
            placeholder="Địa chỉ"
            className="input input-bordered w-full"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="role" className="mb-2 font-semibold">
            Vai trò
          </label>
          <select
            id="role"
            name="role"
            value={userData.role}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            <option value="customer">Khách hàng</option>
            <option value="company">Công ty</option>
            <option value="admin">Quản trị viên</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary w-full mt-4">
          Cập nhật
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
