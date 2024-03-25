import { useState } from "react";
//import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils/config";
import { useSelector } from "react-redux";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddTourDirectory = () => {
  const { token } = useSelector((state) => state.user.currentUser);

  const [directoryName, setDirectoryName] = useState("");
  const [directoryDescription, setDirectoryDescription] = useState("");
  const [message, setMessage] = useState("");
  //const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${BASE_URL}/tourDirectory/createTourDirectory`,
        {
          directoryName,
          directoryDescription,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );
      setMessage(response.data.message);
      setDirectoryName("");
      setDirectoryDescription("");
      // navigate("/listTourDirectory"); // Chỉnh sửa lại đường dẫn sau khi thêm thành công
    } catch (error) {
      setMessage(error.response.data.message || "Lỗi tạo danh mục tour");
    }
  };

  return (
    <div className="mx-auto my-10 max-w-md rounded-lg border border-gray-200 bg-white p-8 shadow-lg">
      <h2 className="text-center text-2xl font-semibold text-gray-800">
        Thêm danh mục tour mới
      </h2>
      {message && <p className="mt-4 text-center text-green-500">{message}</p>}
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
          <label
            htmlFor="directoryName"
            className="block text-sm font-medium text-gray-700"
          >
            Tên danh mục tour:
          </label>
          <input
            type="text"
            id="directoryName"
            value={directoryName}
            onChange={(e) => setDirectoryName(e.target.value)}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="directoryDescription"
            className="block text-sm font-medium text-gray-700"
          >
            Thông tin thêm:
          </label>
          <ReactQuill
            theme="snow"
            value={directoryDescription}
            onChange={setDirectoryDescription}
            className="mt-1 block w-full"
          />
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
