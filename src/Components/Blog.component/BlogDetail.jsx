// BlogDetail.jsx
import { useEffect, useState } from "react";

import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../utils/config";
import axios from "axios";
import DOMPurify from "dompurify";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/blog/detail/${id}`);
        //console.log(data);
        setBlog(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBlogDetail();
  }, [id]);

  return (
    <div className="h-[600px]">
      {blog ? (
        <PerfectScrollbar>
          {" "}
          <div className="p-8">
            <h2 className="text-2xl font-bold">{blog.title}</h2>
            <p
              className="text-gray-700"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(blog.body),
              }}
            ></p>
          </div>
        </PerfectScrollbar>
      ) : (
        <p>Đang tải...</p>
      )}
    </div>
  );
};

export default BlogDetail;
