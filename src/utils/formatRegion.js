export const formatRegion = (region) => {
  switch (region) {
    case "mn":
      return "Miền Nam";
    case "mb":
      return "Miền Bắc";
    case "mt":
      return "Miền Trung";
    default:
      return "Không xác định";
  }
};
