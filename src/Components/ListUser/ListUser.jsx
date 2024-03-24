import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils/config";
import { useSelector } from "react-redux";

import defaultImage from "../../assets/images/logoicon.png";

const ListUser = () => {
  const { token } = useSelector((state) => state.user.currentUser);

  const [allUsers, setAllUsers] = useState([]);
  const navigate = useNavigate();

  const fetchInfo = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/get_all_users`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const data = res.data;
      setAllUsers(data.sort(sortUsersByRole)); // Sắp xếp ngay sau khi lấy dữ liệu
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const remove_user = async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/user/removeUser/${id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete the user");
      }

      await fetchInfo();
    } catch (error) {
      console.error("Error removing user:", error);
    }
  };

  const translateRole = (role) => {
    const roleTranslations = {
      admin: "Quản trị viên",
      customer: "Khách hàng",
      staff: "Nhân viên",
      guide: "Hướng dẫn viên",
    };

    return roleTranslations[role] || role;
  };

  // Hàm sắp xếp người dùng theo vai trò
  const sortUsersByRole = (a, b) => {
    const order = { admin: 1, staff: 2, guide: 3, customer: 4 }; // Định nghĩa thứ tự ưu tiên
    return order[a.role] - order[b.role];
  };

  return (
    <div className="max-h-[600px] w-full p-4">
      <div className="flex justify-between">
        <h1 className="my-2 text-center text-2xl  font-bold">
          Thông tin người dùng
        </h1>
        <Link to={"/addUser"} className="no-underline">
          <div className="mb-2 flex w-48 items-center justify-center rounded-lg bg-blue-950 py-2 text-white">
            <p className="pl-2">Thêm người dùng</p>
          </div>
        </Link>
      </div>
      {allUsers.length > 0 ? (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-left text-sm ">
            <thead className="bg-blue-950 text-xs uppercase text-white">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Hình
                </th>
                <th scope="col" className="px-6 py-3">
                  Tên
                </th>
                <th scope="col" className="px-6 py-3">
                  CCCD
                </th>
                <th scope="col" className="px-6 py-3">
                  SĐT
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Địa chỉ
                </th>
                <th scope="col" className="px-6 py-3">
                  Vai trò
                </th>
                <th scope="col" className="px-6 py-3">
                  Hành động
                </th>
                <th scope="col" className="px-6 py-3">
                  Xóa
                </th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((user) => (
                <tr key={user._id} className="border-b bg-white">
                  <td className="px-6 py-4">
                    {Array.isArray(user.image) && user.image.length > 0 ? (
                      <img
                        src={`${BASE_URL}/${user.image[0].replace(/\\/g, "/")}`}
                        alt="user"
                        style={{ width: "50px", height: "50px" }}
                      />
                    ) : typeof user.image === "string" ? (
                      <img
                        src={`${BASE_URL}/${user.image.replace(/\\/g, "/")}`}
                        alt="user"
                        style={{ width: "50px", height: "50px" }}
                      />
                    ) : (
                      <img
                        src={defaultImage}
                        alt="Default"
                        style={{ width: "50px", height: "50px" }}
                      />
                    )}
                  </td>
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.cccd}</td>
                  <td className="px-6 py-4">{user.phone}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.address}</td>
                  <td className="px-6 py-4">{translateRole(user.role)}</td>
                  <td className="px-6 py-4">
                    <button
                      className="px-6 py-4"
                      onClick={() => navigate(`/update_user/${user._id}`)}
                    >
                      Sửa
                    </button>
                  </td>
                  <td className="px-6 py-4 ">
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => remove_user(user._id)}
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="mt-5 text-center">Không có người dùng nào!!!</p>
      )}
    </div>
  );
};

export default ListUser;
