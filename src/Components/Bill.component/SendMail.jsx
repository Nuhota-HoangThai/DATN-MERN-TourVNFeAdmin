import axios from "axios";
import { BASE_URL } from "../../utils/config";
import { useSelector } from "react-redux";

const SendEmailButton = ({ email, billId }) => {
  const { token } = useSelector((state) => state.user.currentUser);

  const handleSendEmail = async () => {
    if (!email || !billId) {
      alert("Email và ID hóa đơn không được để trống!");
      return;
    }

    try {
      await axios.post(
        `${BASE_URL}/bill/sendMail`,
        { email, billId },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );
      alert("Gửi hóa đơn cho khách hàng thành công.");
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Gửi hóa đơn không thành công!!!");
    }
  };

  return <button onClick={handleSendEmail}>Gửi mail</button>;
};

export default SendEmailButton;
