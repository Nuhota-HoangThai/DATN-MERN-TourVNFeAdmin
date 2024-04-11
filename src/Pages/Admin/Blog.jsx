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
        console.log(data);
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
    <div className="container mx-auto px-4">
      <div className="my-4 flex justify-between">
        <h2 className="text-2xl font-semibold">Danh sách blog</h2>
        <Link
          to="/addBlog"
          className="w-48 rounded bg-gray-200 px-4 py-1 text-center font-semibold transition-colors"
        >
          Tạo blog
        </Link>
      </div>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Tiêu đề blog</th>
            <th className="px-4 py-2">Xem chi tiết</th>
            <th className="px-4 py-2">Cập nhật</th>
            <th className="px-4 py-2">Xóa</th>
          </tr>
        </thead>
        <tbody>
          {blogs?.map((blog) => (
            <tr key={blog._id}>
              <td className="border px-4 py-2">{blog.title}</td>
              <td className="border px-4 py-2 text-blue-500">
                <Link to={`/blog/${blog._id}`}>Chi tiết</Link>
              </td>
              <td className="border px-4 py-2 text-green-500">
                <Link to={`/editBlog/${blog._id}`}>Cập nhật</Link>
              </td>
              <td className="border px-4 py-2 text-red-500">
                <button onClick={() => handleDelete(blog._id)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BlogList;
