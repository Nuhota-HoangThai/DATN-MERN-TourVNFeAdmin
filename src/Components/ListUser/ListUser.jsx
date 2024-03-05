import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/config";
import { MdClear } from "react-icons/md";
import defaultImage from "../../assets/images/logoicon.png";

const ListUser = () => {
  const [allUsers, setAllUsers] = useState([]);
  const navigate = useNavigate();

  const fetchInfo = async () => {
    try {
      const res = await fetch(`${BASE_URL}/user/get_all_users`);
      const data = await res.json();
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
      const response = await fetch(`${BASE_URL}/user/removeUser/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete the user");
      }

      await fetchInfo(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error removing user:", error);
    }
  };

  const translateRole = (role) => {
    const roleTranslations = {
      admin: "Quản trị viên",
      customer: "Khách hàng",
      company: "Công ty",
    };

    return roleTranslations[role] || role;
  };

  // Hàm sắp xếp người dùng theo vai trò
  const sortUsersByRole = (a, b) => {
    const order = { admin: 1, company: 2, customer: 3 }; // Định nghĩa thứ tự ưu tiên
    return order[a.role] - order[b.role];
  };

  return (
    <div className="w-full px-5 py-4">
      <h1 className="text-2xl font-bold mb-6">Thông tin khách hàng</h1>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-black">
          <thead className="text-xs text-white uppercase bg-gray-800">
            <tr>
              <th scope="col" className="px-6 py-3">
                Hình
              </th>
              <th scope="col" className="py-3 px-6">
                Tên
              </th>
              <th scope="col" className="py-3 px-6">
                SĐT
              </th>
              <th scope="col" className="py-3 px-6">
                Email
              </th>
              <th scope="col" className="py-3 px-6">
                Địa chỉ
              </th>
              <th scope="col" className="py-3 px-6">
                Vai trò
              </th>
              <th scope="col" className="py-3 px-6">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user) => (
              <tr key={user._id} className="bg-white border-b">
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
                <td className="py-4 px-6">{user.name}</td>
                <td className="py-4 px-6">{user.phone}</td>
                <td className="py-4 px-6">{user.email}</td>
                <td className="py-4 px-6">{user.address}</td>
                <td className="py-4 px-6">{translateRole(user.role)}</td>
                <td className="py-4 px-6 flex justify-around">
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => navigate(`/update_user/${user._id}`)}
                  >
                    Sửa
                  </button>
                  <MdClear
                    onClick={() => remove_user(user._id)}
                    className="cursor-pointer text-red-500 hover:text-red-700"
                    size="24"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListUser;
