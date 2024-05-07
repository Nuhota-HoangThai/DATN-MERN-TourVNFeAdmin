import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/config";
import { useSelector } from "react-redux";

import defaultImage from "../../assets/images/logoicon.png";
import { translateRole } from "../../utils/formatRole";

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState({
    image: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    cccd: "",
    //role: "",
  });
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data } = await axios.get(
          `${BASE_URL}/user/getUserById/${currentUser.id}`,
          {
            headers: { Authorization: "Bearer " + currentUser.token },
          },
        );
        setUserProfile(data.user);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(error.response ? error.response.data.message : error.message);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate, currentUser]);

  if (loading) {
    return <p>Đang tải...</p>;
  }

  if (error) {
    return <p>Lỗi: {error}</p>;
  }

  return (
    <div className="mx-auto my-8 max-w-4xl px-4 sm:px-6 lg:px-8">
      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="flex items-center justify-between px-4 py-5 sm:px-6">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Thông tin cá nhân
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Thông tin chi tiết và hồ sơ.
            </p>
          </div>
          <button
            onClick={() => navigate(`/update_user/${userProfile._id}`)}
            className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none"
          >
            Chỉnh sửa hồ sơ
          </button>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Ảnh đại diện
              </dt>
              <dd className="mt-1  text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {Array.isArray(userProfile.image) &&
                userProfile.image.length > 0 ? (
                  <img
                    className="rounded-full"
                    src={`${BASE_URL}/${userProfile.image[0].replace(/\\/g, "/")}`}
                    alt="user"
                    style={{ width: "50px", height: "50px" }}
                  />
                ) : typeof userProfile.image === "string" ? (
                  <img
                    className="rounded-full"
                    src={`${BASE_URL}/${userProfile.image.replace(/\\/g, "/")}`}
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
                {userProfile.name}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                {userProfile.email}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Số điện thoại
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                {userProfile.phone}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Căn cước công dân
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                {userProfile.cccd}
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Địa chỉ</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                {userProfile.address}
              </dd>
            </div>
            {/* <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Vai trò</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                {translateRole(userProfile.role)}
              </dd>
            </div> */}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
