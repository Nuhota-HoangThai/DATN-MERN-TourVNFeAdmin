import { useState } from "react";
import { useSelector } from "react-redux";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { createBlog } from "../../api/blogApi"; // Import hàm createBlog từ file api
import { toast } from "react-toastify";

const AddBlog = () => {
  const { token } = useSelector((state) => state.user.currentUser);

  const [image, setImage] = useState(null);

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
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    if (image) {
      formDataToSend.append("image", image);
    }

    try {
      await createBlog(formDataToSend, token);
      toast("Tạo tin tức thành công");
    } catch (error) {
      console.error("Error creating blog:", error);
      toast("Tạo tin tức thất bại");
    }
  };

  return (
    <div className="mx-auto  my-4 h-[600px]">
      <h2 className="font-semibold text-gray-800">Tạo tin tức mới</h2>
      <PerfectScrollbar>
        <form
          onSubmit={handleSubmit}
          className="  space-y-8 rounded-lg bg-white p-6 shadow-2xl"
        >
          <div className="flex w-full justify-between">
            <div className="w-1/3">
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
                    <span className="text-sm text-gray-500">
                      Chưa có hình ảnh
                    </span>
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
              <div className=" space-y-4">
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
            </div>
            <div className="w-1/2 space-y-4">
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
          </div>
          <button
            type="submit"
            className=" w-48  rounded-md border border-transparent bg-blue-700  py-2 text-lg font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Tạo
          </button>
        </form>{" "}
      </PerfectScrollbar>
    </div>
  );
};

export default AddBlog;
