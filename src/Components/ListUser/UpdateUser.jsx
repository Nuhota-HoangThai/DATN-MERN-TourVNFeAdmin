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
    wage: "",
    dob: "",
    sex: "",
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
      navigate("/listAdmin");
    } catch (error) {
      alert("Cập nhật thông tin người dùng thất bại!!!.");
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="mx-auto mt-3 max-w-4xl rounded-lg bg-white p-4 shadow-lg">
      <h1 className="mb-4 text-center text-xl font-bold ">
        Cập nhật thông tin người dùng
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-center">
          <label
            htmlFor="file-input"
            className="flex cursor-pointer flex-col items-center"
          >
            <img
              src={previewImage || "path/to/default/image"}
              alt="Preview"
              className="mb-2 h-16 w-16 rounded-full border-4 border-blue-500 object-cover"
            />
            <span className="text-sm text-blue-500">Thay đổi ảnh</span>
            <input
              onChange={handleImageChange}
              type="file"
              name="image"
              id="file-input"
              className="hidden"
            />
          </label>
        </div>
        <div className="space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Tên
            <input
              id="name"
              name="name"
              value={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
              placeholder="Tên"
              className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </label>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
            <input
              id="email"
              name="email"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              placeholder="Email"
              className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </label>
          <label
            htmlFor="cccd"
            className="block text-sm font-medium text-gray-700"
          >
            Số căn cước công dân
            <input
              id="cccd"
              name="cccd"
              value={userData.cccd}
              onChange={(e) =>
                setUserData({ ...userData, cccd: e.target.value })
              }
              placeholder="Số căn cước công dân"
              className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </label>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Số điện thoại
            <input
              id="phone"
              name="phone"
              value={userData.phone}
              onChange={(e) =>
                setUserData({ ...userData, phone: e.target.value })
              }
              placeholder="Số điện thoại"
              className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </label>
          <label
            htmlFor="sex"
            className="block text-sm font-medium text-gray-700"
          >
            Giới tính
            <input
              type="text"
              id="sex"
              name="sex"
              value={userData.sex}
              onChange={(e) =>
                setUserData({ ...userData, sex: e.target.value })
              }
              placeholder="Giới tính"
              className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </label>
          <label
            htmlFor="dob"
            className="block text-sm font-medium text-gray-700"
          >
            Ngày sinh
            <input
              type="date"
              id="dob"
              name="dob"
              value={userData.dob}
              onChange={(e) =>
                setUserData({ ...userData, dob: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </label>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
            Địa chỉ
            <input
              id="address"
              name="address"
              value={userData.address}
              onChange={(e) =>
                setUserData({ ...userData, address: e.target.value })
              }
              placeholder="Địa chỉ"
              className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </label>
          <label
            htmlFor="wage"
            className="block text-sm font-medium text-gray-700"
          >
            Lương
            <input
              type="number"
              name="wage"
              id="wage"
              value={userData.wage}
              onChange={(e) =>
                setUserData({ ...userData, wage: e.target.value })
              }
              placeholder="Lương nhân viên/hướng dẫn viên"
              className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </label>
        </div>
        <label
          htmlFor="role"
          className="block text-sm font-medium text-gray-700"
        >
          Vai trò
          <select
            id="role"
            name="role"
            value={userData.role}
            onChange={(e) => setUserData({ ...userData, role: e.target.value })}
            className="block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="customer">Khách hàng</option>
            <option value="staff">Nhân viên</option>
            <option value="admin">Quản trị viên</option>
            <option value="guide">Hướng dẫn viên</option>
          </select>
        </label>
        <button
          type="submit"
          className="mt-8 w-full rounded-md bg-blue-600 py-2 text-lg font-semibold text-white shadow transition-colors duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Cập nhật
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
