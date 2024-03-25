import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../../utils/config";
import { useSelector } from "react-redux";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const AddTourType = () => {
  const { token } = useSelector((state) => state.user.currentUser);

  const [typeName, setTypeName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${BASE_URL}/tourType/createTourType`,
        {
          typeName,
          description,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );
      setMessage(response.data.message);
      setTypeName("");
      setDescription("");
      navigate("/listType");
    } catch (error) {
      setMessage(error.response.data.message || "Lỗi tạo loại tour");
    }
  };

  return (
    <div className="mx-auto my-10 max-w-md rounded-lg border border-gray-200 bg-white p-8 shadow-lg">
      <h2 className="text-center text-2xl font-semibold text-gray-800">
        Thêm loại tour mới
      </h2>
      {message && <p className="mt-4 text-center text-green-500">{message}</p>}
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
          <label
            htmlFor="typeName"
            className="block text-sm font-medium text-gray-700"
          >
            Tên loại tour:
          </label>
          <input
            type="text"
            id="typeName"
            value={typeName}
            onChange={(e) => setTypeName(e.target.value)}
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
            value={description}
            onChange={setDescription}
            className="mt-1 block w-full"
          />
        </div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Thêm loại tour
        </button>
      </form>
    </div>
  );
};

export default AddTourType;
