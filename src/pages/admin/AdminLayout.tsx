import { Outlet } from "react-router-dom";
import AdminNavbar from "../../components/AdminNavbar";

const AdminLayout = () => {
  return (
    <div className="flex w-full h-[100vh]">
      <div className="flex w-[15%] bg-teal-950 text-white items-start justify-center pt-10">
        <AdminNavbar />
      </div>
      <div className="flex flex-col w-[85%] overflow-scroll pb-5">
        <div className="w-full h-[5%] shadow-lg py-9 flex items-center justify-center text-xl font-medium rounded">
          Système de gestion des employés
        </div>
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
