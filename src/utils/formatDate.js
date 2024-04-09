export const formatDateVN = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const getDefaultConvergeTime = () => {
  const now = new Date();

  // Thêm giờ GMT+7 vào thời gian hiện tại
  const localTime = new Date(
    now.getTime() - now.getTimezoneOffset() * 60000 + 7 * 60 * 60 * 1000,
  );

  // Format ngày tháng năm theo dd/mm/yyyy
  const day = localTime.getDate().toString().padStart(2, "0");
  const month = (localTime.getMonth() + 1).toString().padStart(2, "0"); // Tháng trong JavaScript bắt đầu từ 0
  const year = localTime.getFullYear();
  const hours = localTime.getHours().toString().padStart(2, "0");
  const minutes = localTime.getMinutes().toString().padStart(2, "0");

  // Trả về chuỗi ngày giờ đã được format
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export const formatDateVNWithTime = (dateTimeString) => {
  const date = new Date(dateTimeString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes} ngày ${day}/${month}/${year} `;
};
