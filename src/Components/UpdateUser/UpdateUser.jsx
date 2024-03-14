import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/config";
import upload from "../../assets/images/upload.png";

const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    image: "",
    username: "",
    phone: "",
    email: "",
    address: "",
    role: "",
  });

  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(upload); // Chỉ lưu một URL hình ảnh

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${BASE_URL}/user/getUserById/${id}`);
        const data = await res.json();
        setUserData(data.user);

        if (data.user.image && typeof data.user.image === "string") {
          setPreviewImage(`${BASE_URL}/${data.user.image.replace(/\\/g, "/")}`); // Update the state with a single image URL
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [id]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    for (const key in userData) {
      formData.append(key, userData[key]);
    }

    if (image) {
      formData.append("image", image); // "image" phải trùng với tên trường dùng trong backend
    }

    try {
      const response = await fetch(`${BASE_URL}/user/update_user/${id}`, {
        method: "PUT",
        body: formData,
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
    <div className="update-user-form mx-auto mt-10 max-w-4xl rounded-lg bg-white p-8 shadow-lg">
      <h1 className="mb-8 text-center text-3xl font-semibold text-blue-900">
        Cập nhật thông tin người dùng
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="mb-4 flex justify-center">
          <label htmlFor="file-input" className="flex cursor-pointer gap-4">
            <img
              src={previewImage}
              alt="Preview"
              style={{ width: "100px", height: "100px" }}
            />
          </label>
          <input
            onChange={handleImageChange}
            type="file"
            name="image"
            id="file-input"
            className="flex"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-2 font-semibold text-gray-700">
            Tên
          </label>
          <input
            id="name"
            name="name"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            placeholder="Tên"
            className="input input-bordered w-full rounded-md border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="phone" className="mb-2 font-semibold text-gray-700">
            Số điện thoại
          </label>
          <input
            id="phone"
            name="phone"
            value={userData.phone}
            onChange={(e) =>
              setUserData({ ...userData, phone: e.target.value })
            }
            placeholder="Số điện thoại"
            className="input input-bordered w-full rounded-md border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-2 font-semibold text-gray-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
            placeholder="Email"
            className="input input-bordered w-full rounded-md border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="address" className="mb-2 font-semibold text-gray-700">
            Địa chỉ
          </label>
          <input
            id="address"
            name="address"
            value={userData.address}
            onChange={(e) =>
              setUserData({ ...userData, address: e.target.value })
            }
            placeholder="Địa chỉ"
            className="input input-bordered w-full rounded-md border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="role" className="mb-2 font-semibold text-gray-700">
            Vai trò
          </label>
          <select
            id="role"
            name="role"
            value={userData.role}
            onChange={(e) => setUserData({ ...userData, role: e.target.value })}
            className="select select-bordered w-full rounded-md border-gray-300 p-3 focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="customer">Khách hàng</option>
            <option value="company">Công ty</option>
            <option value="admin">Quản trị viên</option>
            <option value="guide">Hướng dẫn viên</option>
          </select>
        </div>
        <button
          type="submit"
          className="btn btn-primary mt-4 w-full rounded-lg bg-blue-900 py-3 text-center text-base font-semibold text-white shadow-md transition duration-200 ease-in hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2  focus:ring-offset-blue-200"
        >
          Cập nhật
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
