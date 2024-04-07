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
      navigate("/listAdmin");
    } catch (error) {
      alert("Cập nhật thông tin người dùng thất bại!!!.");
      console.error("Error updating user:", error);
    }
  };

  const provinces = [
    "An Giang",
    "Bà Rịa - Vũng Tàu",
    "Bắc Giang",
    "Bắc Kạn",
    "Bạc Liêu",
    "Bắc Ninh",
    "Bến Tre",
    "Bình Định",
    "Bình Dương",
    "Bình Phước",
    "Bình Thuận",
    "Cà Mau",
    "Cần Thơ",
    "Cao Bằng",
    "Đà Nẵng",
    "Đắk Lắk",
    "Đắk Nông",
    "Điện Biên",
    "Đồng Nai",
    "Đồng Tháp",
    "Gia Lai",
    "Hà Giang",
    "Hà Nam",
    "Hà Nội",
    "Hà Tĩnh",
    "Hải Dương",
    "Hải Phòng",
    "Hậu Giang",
    "Hòa Bình",
    "Hưng Yên",
    "Khánh Hòa",
    "Kiên Giang",
    "Kon Tum",
    "Lai Châu",
    "Lâm Đồng",
    "Lạng Sơn",
    "Lào Cai",
    "Long An",
    "Nam Định",
    "Nghệ An",
    "Ninh Bình",
    "Ninh Thuận",
    "Phú Thọ",
    "Phú Yên",
    "Quảng Bình",
    "Quảng Nam",
    "Quảng Ngãi",
    "Quảng Ninh",
    "Quảng Trị",
    "Sóc Trăng",
    "Sơn La",
    "Tây Ninh",
    "Thái Bình",
    "Thái Nguyên",
    "Thanh Hóa",
    "Thừa Thiên Huế",
    "Tiền Giang",
    "TP. Hồ Chí Minh",
    "Trà Vinh",
    "Tuyên Quang",
    "Vĩnh Long",
    "Vĩnh Phúc",
    "Yên Bái",
  ];

  return (
    <div className="mx-auto mt-3 max-w-4xl rounded-lg bg-white p-8 shadow-lg">
      <h1 className="mb-12 text-center text-3xl font-bold text-blue-800">
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
              className="mb-3 h-24 w-24 rounded-full border-4 border-blue-500 object-cover"
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
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Tên
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={userData.name}
              onChange={(e) =>
                setUserData({ ...userData, name: e.target.value })
              }
              placeholder="Nhập tên"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="cccd"
              className="block text-sm font-medium text-gray-700"
            >
              Căn cước công dân
            </label>
            <input
              type="text"
              name="cccd"
              id="cccd"
              value={userData.cccd}
              onChange={(e) =>
                setUserData({ ...userData, cccd: e.target.value })
              }
              placeholder="Số căn cước công dân"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Số điện thoại
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={userData.phone}
              onChange={(e) =>
                setUserData({ ...userData, phone: e.target.value })
              }
              placeholder="Số điện thoại"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              placeholder="Email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="col-span-1 md:col-span-2">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Địa chỉ
            </label>
            <select
              id="address"
              name="address"
              value={userData.address}
              onChange={(e) =>
                setUserData({ ...userData, address: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {provinces.map((province) => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </select>
            {/* <input
              type="text"
              name="address"
              id="address"
              value={userData.address}
              onChange={(e) =>
                setUserData({ ...userData, address: e.target.value })
              }
              placeholder="Địa chỉ"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            /> */}
          </div>
          <div className="col-span-1 md:col-span-2">
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
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
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
          className="mt-8 w-full rounded-md bg-blue-600 py-3 text-lg font-semibold text-white shadow transition-colors duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Cập nhật
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;