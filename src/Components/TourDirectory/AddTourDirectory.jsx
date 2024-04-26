import { useState } from "react";
//import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils/config";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const AddTourDirectory = () => {
  const { token } = useSelector((state) => state.user.currentUser);

  const [image, setImage] = useState(null);

  const [message, setMessage] = useState("");
  //const navigate = useNavigate();

  const [formData, setFormData] = useState({
    directoryName: "",
    directoryDescription: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    if (image) {
      formDataToSend.append("image", image);
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/tourDirectory/createTourDirectory`,
        formDataToSend, // Sửa ở đây
        {
          headers: {
            "Content-Type": "multipart/form-data", // Thêm dòng này nếu cần
            Authorization: "Bearer " + token,
          },
        },
      );
      setMessage(response.data.message);
      toast("Thêm danh mục tour thành công.");
      // console.log(response.data);
      // navigate("/listTourDirectory"); // Chỉnh sửa lại đường dẫn sau khi thêm thành công
    } catch (error) {
      setMessage(error.response?.data?.message || "Lỗi tạo danh mục tour");
    }
  };

  return (
    <div className="mx-auto my-10 max-w-md rounded-lg border border-gray-200 bg-white p-8 shadow-lg">
      <h2 className="text-center text-2xl font-semibold text-gray-800">
        Thêm danh mục tour mới
      </h2>
      {message && <p className="mt-4 text-center text-green-500">{message}</p>}
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        {/* Image input */}
        <div>
          <label
            htmlFor="file-input"
            className="mb-1 block cursor-pointer text-sm font-medium text-gray-700"
          >
            Thêm hình ảnh
          </label>
          {image ? (
            <div className="mb-4 flex justify-center">
              <img
                src={URL.createObjectURL(image)}
                alt="Hình ảnh địa điểm"
                onLoad={() => URL.revokeObjectURL(image)}
                className="h-auto max-w-xs rounded-md shadow-sm"
              />
            </div>
          ) : (
            <div className="mb-4 flex h-48 w-full items-center justify-center rounded-md border-2 border-dashed border-gray-300">
              <span className="text-sm text-gray-500">Chưa có hình ảnh</span>
            </div>
          )}
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            name="image"
            id="file-input"
            className="hidden"
          />
        </div>
        <div>
          <label
            htmlFor="directoryName"
            className="block text-sm font-medium text-gray-700"
          >
            Tên danh mục tour:
          </label>
          <input
            type="text"
            name="directoryName"
            value={formData.directoryName}
            onChange={handleInputChange}
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold text-gray-700">
            Mô tả:
            <input
              type="text"
              name="directoryDescription"
              value={formData.directoryDescription}
              onChange={handleInputChange}
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              //required
            />
          </label>
        </div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Thêm danh mục tour
        </button>
      </form>
    </div>
  );
};

export default AddTourDirectory;
