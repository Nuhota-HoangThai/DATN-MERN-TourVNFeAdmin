import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../utils/config";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { toast } from "react-toastify";

const UpdateBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/blog/detail/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching blog details:", error);
        toast("Lỗi không lấy được blog");
      }
    };

    fetchBlogDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setFormData({ ...formData, description: data });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${BASE_URL}/blog/update/${id}`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast("Cập nhật tin tức thành công.");
      navigate(`/blog/${id}`);
    } catch (error) {
      console.error("Failed to update the blog:", error);
      toast("Lỗi cập nhật tin tức.");
    }
  };

  return (
    <div className="container">
      <h1>Chỉnh sửa Blog</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Tiêu đề:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="body">Mô tả:</label>
          {/* <CKEditor
            editor={ClassicEditor}
            data={formData.body}
            onChange={handleEditorChange}
          /> */}
          <CKEditor
            editor={ClassicEditor}
            data={formData.body}
            onChange={(event, editor) => {
              const data = editor.getData();
              setFormData({ ...formData, body: data });
            }}
          />
        </div>
        <button type="submit">Cập nhật Blog</button>
      </form>
    </div>
  );
};

export default UpdateBlog;
