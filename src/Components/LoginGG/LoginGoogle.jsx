import React from "react"; // Đảm bảo bạn nhập React nếu bạn sử dụng JSX
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebaseGoogle"; // Đường dẫn này phải chính xác và phù hợp với vị trí của file cấu hình Firebase của bạn
import { signInSuccess } from "../../redux/user/userSlice";
import { BASE_URL } from "../../utils/config";

const GgAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      // Gửi yêu cầu đến server với thông tin người dùng từ Google
      const res = await fetch(`${BASE_URL}/user/login-google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          // Bạn có thể thêm các trường khác nếu server yêu cầu
        }),
      });
      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      console.log("could not sign in with Google", error);
    }
  };

  return (
    <button onClick={handleGoogle} type="button" className="">
      Đăng nhập Google
    </button>
  );
};

export default GgAuth;
