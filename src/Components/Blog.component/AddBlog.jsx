import { useState } from "react";
import { addNewBlog } from "../../service/blogSevice";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

import { useSelector } from "react-redux";

const AddBlog = () => {
  const { token } = useSelector((state) => state.user.currentUser);
  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDescriptionChange = (event, editor) => {
    const data = editor.getData();
    setFormData({
      ...formData,
      body: data,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addNewBlog(formData, token);
      alert("Tạo blog thành công!");
    } catch (error) {
      console.error("Failed to create blog:", error);
      alert("Lỗi tạo blog.");
    }
  };

  return (
    <div className="mt-8 flex h-[600px] justify-center">
      {" "}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl space-y-6 rounded-lg bg-white p-8 shadow-xl"
      >
        {" "}
        <PerfectScrollbar>
          <h2 className="text-2xl font-semibold text-gray-800">Tạo blog mới</h2>
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Tiêu đề
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label
              htmlFor="body"
              className="block text-sm font-medium text-gray-700"
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
            className="inline-flex w-48 justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Tạo
          </button>
        </PerfectScrollbar>
      </form>
    </div>
  );
};

export default AddBlog;
