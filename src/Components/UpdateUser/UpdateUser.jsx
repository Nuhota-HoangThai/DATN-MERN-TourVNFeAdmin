import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/config";
import upload from "../../assets/images/upload.png";
import { useSelector } from "react-redux";
import axios from "axios";

const UpdateUser = () => {
  const { token } = useSelector((state) => state.user.currentUser);

  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    image: "",
    name: "",
    phone: "",
    email: "",
    address: "",
    cccd: "",
    role: "",
  });

  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(upload); // Chỉ lưu một URL hình ảnh

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/user/getUserById/${id}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        //const data = res.data;

        setUserData(data.user);

        if (data.user.image && typeof data.user.image === "string") {
          setPreviewImage(`${BASE_URL}/${data.user.image.replace(/\\/g, "/")}`); // Update the state with a single image URL
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [id, token]);

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
      await axios.put(`${BASE_URL}/user/update_user/${id}`, formData, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Cập nhật thông tin người dùng thành công.");
      navigate("/listUser");
    } catch (error) {
      alert("Cập nhật thông tin người dùng thất bại!!!.");
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="mx-auto max-w-4xl p-5">
      <div className="mt-10 rounded-lg bg-white p-8 shadow-lg">
        <h1 className="text-center text-3xl font-semibold text-blue-900">
          Cập nhật thông tin người dùng
        </h1>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="flex justify-center">
            <label
              htmlFor="file-input"
              className="flex cursor-pointer items-center gap-4"
            >
              <img
                src={previewImage}
                alt="Preview"
                className="h-24 w-24 rounded-full object-cover"
              />
              <input
                onChange={handleImageChange}
                type="file"
                name="image"
                id="file-input"
                className="hidden"
              />
              <svg
                className="h-6 w-6 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 2a1 1 0 011 1v.5l-4 4l-3-3l-4 4V5h10zM4 5a1 1 0 00-1 1v10a1 1 0 001 1h12a1 1 0 001-1V5a1 1 0 00-1-1H4z"></path>
              </svg>
            </label>
          </div>
          <div className=" grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="mt-5">
              <label
                htmlFor="name"
                className="block text-lg font-medium text-gray-700"
              >
                Tên
              </label>
              <input
                id="name"
                name="name"
                value={userData.name}
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
                placeholder="Tên"
                className="mt-1 block w-full rounded-md border-black px-2 py-1.5 shadow-2xl  "
              />
            </div>
            <div className="mt-5">
              <label
                htmlFor="cccd"
                className="block text-lg font-medium text-gray-700"
              >
                Căn cước công dân
              </label>
              <input
                id="cccd"
                name="cccd"
                value={userData.cccd}
                onChange={(e) =>
                  setUserData({ ...userData, cccd: e.target.value })
                }
                placeholder="Số căn cước công dân"
                className="mt-1 block w-full rounded-md border-gray-300 px-2 py-1.5 shadow-2xl  focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </div>
            <div className="mt-5">
              <label
                htmlFor="phone"
                className="block text-lg font-medium text-gray-700"
              >
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
                className="mt-1 block w-full rounded-md border-gray-300 px-2 py-1.5 shadow-2xl  focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </div>
            <div className="mt-5">
              <label
                htmlFor="email"
                className="block text-lg font-medium text-gray-700"
              >
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
                className="mt-1 block w-full rounded-md border-gray-300 px-2 py-1.5 shadow-2xl  focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </div>
            <div className="mt-5 md:col-span-2">
              <label
                htmlFor="address"
                className="block text-lg font-medium text-gray-700"
              >
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
                className="mt-1 block w-full rounded-md border-gray-900 px-2 py-1.5 shadow-2xl  focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </div>
            <div className="mt-5 md:col-span-2">
              <label
                htmlFor="role"
                className="block text-lg font-medium text-gray-700"
              >
                Vai trò
              </label>
              <select
                id="role"
                name="role"
                value={userData.role}
                onChange={(e) =>
                  setUserData({ ...userData, role: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-900 px-2 py-1.5 shadow-2xl  focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              >
                <option value="customer">Khách hàng</option>
                <option value="staff">Nhân viên</option>
                <option value="admin">Quản trị viên</option>
                <option value="guide">Hướng dẫn viên</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="mt-5 w-full rounded-lg bg-blue-900 py-3 text-lg font-semibold text-white shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Cập nhật
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
