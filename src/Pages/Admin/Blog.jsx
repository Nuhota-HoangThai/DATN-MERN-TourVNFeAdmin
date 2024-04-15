import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// Import the API functions directly
import { getAllBlogs, deleteBlog } from "../../api/blogApi";
// Assuming you have a Redux setup to handle the state where the user token is stored
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
        <Link to="/addBlog" className="">
          <CgAddR color="red" size={"30px"} />
        </Link>
        <h2 className="font-bold">Danh sách blog</h2>
        {/* phân trang */}
        <div className="my-1 flex justify-end">
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
      <table className="w-full table-auto  bg-white shadow-md">
        <thead className="bg-blue-800 text-white">
          <tr>
            {" "}
            <th className="px-6 py-3 text-left">Hình</th>
            <th className="px-6 py-3 text-left">Tiêu đề</th>
            <th className="px-6 py-3 text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog._id} className="border-b hover:bg-gray-100">
              <td className="border-b">
                {blog.image ? (
                  <img
                    src={`${BASE_URL}/${blog.image.replace(/\\/g, "/")}`}
                    alt="promotion"
                    className="h-20 w-28 rounded-md object-cover"
                  />
                ) : (
                  <p className="text-center text-gray-500">Không có hình ảnh</p>
                )}
              </td>
              <td className="px-6 py-2">{blog.title}</td>
              <td className="px-6 py-2 text-center italic text-blue-600 underline">
                <div className="flex justify-center gap-2">
                  {" "}
                  <Link
                    to={`/blog/${blog._id}`}
                    className="border p-1 text-blue-500"
                  >
                    {" "}
                    <IoEyeSharp size={"25px"} />
                  </Link>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="border p-1 font-bold text-red-500"
                  >
                    <FaTrashCan size={"25px"} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BlogList;
