import { useState, useEffect } from "react";
import { BASE_URL } from "../../utils/config";
import { MdClear } from "react-icons/md";

const ProfileUser = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const fetchInfo = async () => {
    try {
      const res = await fetch(`${BASE_URL}/user/get_all_users`);
      const data = await res.json();
      setAllUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  useEffect(() => {
    fetchInfo();
  }, []);

  const startEditing = (user) => {
    setEditingId(user._id);
    setEditFormData({
      name: user.name,
      phone: user.phone,
      email: user.email,
      address: user.address,
    });
  };

  const remove_user = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/user/removeUser/${id}`, {
        method: "DELETE", // Ensure this matches the expected HTTP method in your backend
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

  const update_user = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/user/update_user/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editFormData),
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      await fetchInfo();
      setEditingId(null);
      setEditFormData({
        name: "",
        phone: "",
        email: "",
        address: "",
      });
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="w-full px-5 py-4">
      <h1 className="text-2xl font-bold mb-6">Thông tin khách hàng</h1>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-black">
          <thead className="text-xs text-white uppercase bg-gray-800">
            <tr>
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
                Cập nhật
              </th>
              <th scope="col" className="py-3 px-6">
                Xóa
              </th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((user) => (
              <tr
                key={user._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                {editingId === user._id ? (
                  // Editable inputs
                  <>
                    <td className="py-4 px-6">
                      <input
                        className="input input-bordered w-full"
                        type="text"
                        defaultValue={user.name}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            name: e.target.value,
                          })
                        }
                      />
                    </td>
                    <td className="py-4 px-6">
                      <input
                        className="input input-bordered w-full"
                        type="text"
                        defaultValue={user.phone}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            phone: e.target.value,
                          })
                        }
                      />
                    </td>
                    <td className="py-4 px-6">
                      <input
                        className="input input-bordered w-full"
                        type="email"
                        defaultValue={user.email}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            email: e.target.value,
                          })
                        }
                      />
                    </td>
                    <td className="py-4 px-6">
                      <input
                        className="input input-bordered w-full"
                        type="text"
                        defaultValue={user.address}
                        onChange={(e) =>
                          setEditFormData({
                            ...editFormData,
                            address: e.target.value,
                          })
                        }
                      />
                    </td>
                  </>
                ) : (
                  // Display mode
                  <>
                    <td className="py-4 px-6">{user.name}</td>
                    <td className="py-4 px-6">{user.phone}</td>
                    <td className="py-4 px-6">{user.email}</td>
                    <td className="py-4 px-6">{user.address}</td>
                  </>
                )}
                <td className="py-4 px-6">
                  {editingId === user._id ? (
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => update_user(user._id)}
                    >
                      Cập nhật
                    </button>
                  ) : (
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => startEditing(user)}
                    >
                      Sửa
                    </button>
                  )}
                </td>
                <td className="py-4 px-6">
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

export default ProfileUser;
