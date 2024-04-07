import SidebarListUser from "./SidebarListUser";

const ListUser = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <SidebarListUser />
      <div className="flex-1 py-3">{children}</div>
    </div>
  );
};

export default ListUser;
