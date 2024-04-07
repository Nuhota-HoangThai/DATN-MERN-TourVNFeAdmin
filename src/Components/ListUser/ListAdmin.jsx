import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils/config";
import { useSelector } from "react-redux";

import defaultImage from "../../assets/images/logoicon.png";

const ListUser = () => {
  const { token } = useSelector((state) => state.user.currentUser);

  const [pageInfo, setPageInfo] = useState({
    currentPage: 1,
    totalPages: 1,
  });

  const [allUsers, setAllUsers] = useState([]);
  const navigate = useNavigate();

  const fetchInfo = async (page = 1) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/user/get_all_usersLimitAdmin?page=${page}&limit=6&role=admin`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );
      const data = res.data;
      setAllUsers(data.users);
      setPageInfo({
        currentPage: page,
        totalPages: data.totalPages,
      });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const handlePageChange = (newPage) => {
    fetchInfo(newPage);
  };

  const remove_user = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/user/removeUser/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      await fetchInfo();
    } catch (error) {
      console.error("Error removing user:", error);
    }
  };

  const translateRole = (role) => {
    const roleTranslations = {
      admin: "Quản trị viên",
      //   customer: "Khách hàng",
      //   staff: "Nhân viên",
      //   guide: "Hướng dẫn viên",
    };

    return roleTranslations[role] || role;
  };

  return (
    <div className="max-h-[600px] w-full">
      <div className="flex justify-between">
        <h1 className="my-2 text-center text-xl font-bold">
          Thông tin người dùng
        </h1>
      </div>
      {allUsers.length > 0 ? (
        <table className="w-full  table-fixed rounded-2xl text-left text-sm">
          <thead className="bg-gray-200 text-xs uppercase">
            <tr>
              <th scope="col" className="px-6 py-3">
                Hình
              </th>
              <th scope="col" className="px-6 py-3">
                Tên
              </th>
              <th scope="col" className="px-6 py-3">
                CCCD/CMND
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
              <tr key={user._id} className="bg-white hover:bg-gray-100">
                <td className="border-b px-6 py-2">
                  {Array.isArray(user.image) && user.image.length > 0 ? (
                    <img
                      src={`${BASE_URL}/${user.image[0].replace(/\\/g, "/")}`}
                      alt="user"
                      className="h-10 w-10 rounded"
                    />
                  ) : typeof user.image === "string" ? (
                    <img
                      src={`${BASE_URL}/${user.image.replace(/\\/g, "/")}`}
                      alt="user"
                      className="h-10 w-10 rounded"
                    />
                  ) : (
                    <img
                      src={defaultImage}
                      alt="Default"
                      className="h-10 w-10 rounded"
                    />
                  )}
                </td>
                <td className="ellipsis border-b px-6 py-2">{user.name}</td>
                <td className="ellipsis border-b px-6 py-2">{user.cccd}</td>
                <td className="ellipsis border-b px-6 py-2">{user.phone}</td>
                <td className=" ellipsis border-b px-6 py-2">{user.email}</td>
                <td className="ellipsis border-b px-6 py-2">{user.address}</td>
                <td className="ellipsis border-b px-6 py-2">
                  {translateRole(user.role)}
                </td>
                <td className="ellipsis border-b px-6 py-2">
                  <button
                    className="px-6 py-4 text-blue-800"
                    onClick={() => navigate(`/update_user/${user._id}`)}
                  >
                    Sửa
                  </button>
                </td>
                <td className="ellipsis border-b px-6 py-2">
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
      ) : (
        <p className="mt-5 text-center">Không có người dùng nào!!!</p>
      )}
      {/* phân trang */}
      <div className="mt-4 flex justify-center">
        {Array.from({ length: pageInfo.totalPages }, (_, i) => i + 1).map(
          (pageNum) => (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`mx-1 rounded bg-gray-500 px-4 py-2 text-white ${pageInfo.currentPage === pageNum ? "bg-gray-700" : ""}`}
            >
              {pageNum}
            </button>
          ),
        )}
      </div>
    </div>
  );
};

export default ListUser;
