import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllBlogs, deleteBlog } from "../../api/blogApi";
import { useSelector } from "react-redux";

import { CgAddR } from "react-icons/cg";
import { BASE_URL } from "../../utils/config";
import { IoEyeSharp } from "react-icons/io5";
import { FaTrashCan } from "react-icons/fa6";

const BlogList = () => {
  const { token } = useSelector((state) => state.user.currentUser);

  const [blogs, setBlogs] = useState([]);

  const [pageInfo, setPageInfo] = useState({
    currentPage: 1,
    totalPages: 1,
  });

  const fetchBlogs = async (page = 1) => {
    try {
      const data = await getAllBlogs();
      // console.log(data);
      setBlogs(data.data);
      setPageInfo({
        currentPage: page,
        totalPages: data.totalPages,
      });
    } catch (error) {
      console.error("Failed to load blogs.", error);
      alert("Khong co blog.");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handlePageChange = (newPage) => {
    fetchBlogs(newPage);
  };

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
    <div className="container mx-auto">
      <div className="flex items-center justify-between">
        <h2 className="font-bold">Danh sách blog</h2>
        <Link to="/addBlog">
          <CgAddR color="red" size={"30px"} />
        </Link>
      </div>
      <table className="w-full table-auto border border-gray-300 bg-white shadow-md">
        <thead className="bg-blue-800 text-white">
          <tr>
            <th className="border-r border-gray-300 px-6 py-3 text-left">
              Hình
            </th>
            <th className="border-r border-gray-300 px-6 py-3 text-left">
              Tiêu đề
            </th>
            <th className="px-6 py-3 text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr
              key={blog._id}
              className="border-t border-gray-300 hover:bg-gray-100"
            >
              <td className="border-r border-gray-300 px-6 py-2 text-center">
                {blog.image ? (
                  <img
                    src={`${BASE_URL}/${blog.image.replace(/\\/g, "/")}`}
                    alt="Blog"
                    className="h-20 w-28 rounded-md object-cover"
                  />
                ) : (
                  <p className="text-gray-500">Không có hình ảnh</p>
                )}
              </td>
              <td className="border-r border-gray-300 px-6 py-2">
                {blog.title}
              </td>
              <td className="px-6 py-2 text-center">
                <div className="flex justify-center gap-2">
                  <Link
                    to={`/blog/${blog._id}`}
                    className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                  >
                    Chi tiết
                  </Link>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-700"
                  >
                    Xóa
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="my-4 flex justify-center">
        {Array.from({ length: pageInfo.totalPages }, (_, i) => i + 1).map(
          (pageNum) => (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`mx-1 h-6 w-6 rounded bg-blue-500 text-white ${pageInfo.currentPage === pageNum ? "bg-blue-700" : ""}`}
            >
              {pageNum}
            </button>
          ),
        )}
      </div>
    </div>
  );
};

export default BlogList;
