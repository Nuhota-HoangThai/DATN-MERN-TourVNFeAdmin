import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// Import the API functions directly
import { getAllBlogs, deleteBlog } from "../../api/blogApi";
// Assuming you have a Redux setup to handle the state where the user token is stored
import { useSelector } from "react-redux";

const BlogList = () => {
  const { token } = useSelector((state) => state.user.currentUser);

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getAllBlogs();
        //console.log(data);
        setBlogs(data.data);
      } catch (error) {
        console.error("Failed to load blogs.", error);
        alert("Failed to load blogs.");
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteBlog(id, token);
      setBlogs(blogs.filter((blog) => blog._id !== id));
      alert("Xóa blog thành công.");
    } catch (error) {
      console.error("Failed to delete the blog", error);
      alert("Xóa blog không thành công");
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Danh sách blog</h2>
        <Link
          to="/addBlog"
          className="w-48 rounded bg-gray-200  px-4 py-2 text-center font-bold "
        >
          Tạo blog
        </Link>
      </div>
      <table className="w-full table-auto rounded-lg bg-white shadow-md">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-6 py-3 text-left">Tiêu đề</th>
            <th className="px-6 py-3 text-center">Xem chi tiết</th>
            <th className="px-6 py-3 text-center">Cập nhật nhật</th>
            <th className="px-6 py-3 text-center">Xóa</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog._id} className="border-b hover:bg-gray-100">
              <td className="px-6 py-2">{blog.title}</td>
              <td className="px-6 py-2 text-center italic text-blue-600 underline">
                <Link to={`/blog/${blog._id}`}>Chi tiết</Link>
              </td>
              <td className="px-6 py-2 text-center text-green-600">
                <Link to={`/editBlog/${blog._id}`}>Cập nhật</Link>
              </td>
              <td className="px-6 py-2 text-center text-red-600">
                <button
                  onClick={() => handleDelete(blog._id)}
                  className="font-bold"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BlogList;
