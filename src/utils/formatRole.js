export const translateRole = (role) => {
  const roleTranslations = {
    admin: "Quản trị viên",
    customer: "Khách hàng",
    staff: "Nhân viên",
    guide: "Hướng dẫn viên",
  };

  return roleTranslations[role] || role;
};
