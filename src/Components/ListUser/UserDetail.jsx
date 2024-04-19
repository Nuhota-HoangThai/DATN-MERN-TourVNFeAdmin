import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/config";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import defaultImage from "../../assets/images/logoicon.png";
import { translateRole } from "../../utils/formatRole";

const UserDetail = () => {
  const { token } = useSelector((state) => state.user.currentUser);

  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/user/getUserById/${id}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        setUser(response.data.user);
      } catch (err) {
        setError("Failed to fetch user");
        console.error(err);
      }
    };

    fetchUser();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto my-8 max-w-4xl px-4 sm:px-6 lg:px-8">
      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="flex items-center justify-between px-4 py-5 sm:px-6">
          <div>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Thông tin chi tiết và hồ sơ.
            </p>
          </div>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Ảnh đại diện
              </dt>
              <dd className="mt-1  text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {Array.isArray(user.image) && user.image.length > 0 ? (
                  <img
                    className="rounded-full"
                    src={`${BASE_URL}/${user.image[0].replace(/\\/g, "/")}`}
                    alt="user"
                    style={{ width: "50px", height: "50px" }}
                  />
                ) : typeof user.image === "string" ? (
                  <img
                    className="rounded-full"
                    src={`${BASE_URL}/${user.image.replace(/\\/g, "/")}`}
                    alt="user"
                    style={{ width: "50px", height: "50px" }}
                  />
                ) : (
                  <img
                    src={defaultImage}
                    alt="Default"
                    style={{ width: "50px", height: "50px" }}
                  />
                )}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Tên đầy đủ</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {user.name}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                {user.email}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Số điện thoại
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                {user.phone}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Căn cước công dân
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                {user.cccd}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Địa chỉ</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                {user.address}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Vai trò</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                {translateRole(user.role)}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Lương tháng</dt>
              <dd className="mt-1 text-sm text-red-600 sm:col-span-2">
                {user.wage?.toLocaleString()} đ
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
