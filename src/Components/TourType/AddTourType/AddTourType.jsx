import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../utils/config";

const AddTourType = () => {
  const [typeName, setTypeName] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}/tourType/createTourType`, {
        typeName,
        description,
      });
      setMessage(response.data.message);
      setTypeName("");
      setDescription("");
    } catch (error) {
      setMessage(error.response.data.message || "Lỗi tạo loại tour");
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 bg-white p-8 border border-gray-200 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-800">
        Thêm loại tour mới
      </h2>
      {message && <p className="text-center mt-4 text-green-500">{message}</p>}
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
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Thông tin thêm:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Thêm loại tour
        </button>
      </form>
    </div>
  );
};

export default AddTourType;
