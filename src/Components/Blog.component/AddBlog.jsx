import { useState } from "react";
import { useSelector } from "react-redux";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { createBlog } from "../../api/blogApi"; // Import hàm createBlog từ file api

const AddBlog = () => {
  const { token } = useSelector((state) => state.user.currentUser);
  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleDescriptionChange = (event, editor) => {
    const data = editor.getData();
    setFormData((prevFormData) => ({
      ...prevFormData,
      body: data,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createBlog(formData, token);
      alert("Tạo blog thành công!");
      console.log(response);
    } catch (error) {
      console.error("Error creating blog:", error);
      alert("Tạo blog thất bại!");
    }
  };

  return (
    <div className="mt-4 flex h-[600px] items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl space-y-8 rounded-lg bg-white p-6 shadow-2xl"
      >
        <PerfectScrollbar>
          <h2 className="text-center text-xl font-semibold text-gray-800">
            Tạo blog mới
          </h2>
          <div className="mb-4 space-y-4">
            <label
              htmlFor="title"
              className="block text-lg font-medium text-gray-700"
            >
              Tiêu đề
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4 space-y-4">
            <label
              htmlFor="body"
              className="block text-lg font-medium text-gray-700"
            >
              Nội dung
            </label>
            <CKEditor
              name="body"
              editor={ClassicEditor}
              data={formData.body}
              onChange={handleDescriptionChange}
              className="mt-1"
            />
          </div>
          <button
            type="submit"
            className="inline-flex w-48 justify-center rounded-md border border-transparent bg-blue-700  py-2 text-lg font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Tạo
          </button>
        </PerfectScrollbar>
      </form>
    </div>
  );
};

export default AddBlog;
