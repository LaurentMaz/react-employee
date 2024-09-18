import "./App.css";
import LoginAdmin from "./pages/admin/LoginAdmin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UpdateEmployee from "./modules/adminEmployees/UpdateEmployee";
import { ToastContainer } from "react-toastify";
import UpdateAdmin from "./modules/adminDashboard/UpdateAdmin";
import LoginEmployee from "./pages/employee/LoginEmployee";
import Start from "./pages/Start";
import DashboardEmployee from "./pages/employee/DashboardEmployee";
import HomeEmployee from "./pages/employee/HomeEmployee";
import ProtectedRoute from "./components/ProtectedRoute";
import { EmployeeContextProvider } from "./contexts/employee.context";
import AddAdminForm from "./modules/adminDashboard/AddAdminForm";
import Equipement from "./pages/admin/Equipement";
import AddEquipementForm from "./components/equipements/AddEquipementForm";
import UpdateEquipement from "./components/equipements/UpdateEquipement";
import EmployeeConges from "./components/conges/EmployeeConges";
import AddCongeForm from "./components/conges/AddCongeForm";
import UpdateConge from "./components/conges/UpdateConge";
import AdminConges from "./pages/admin/AdminConges";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminEmployee from "./pages/admin/AdminEmployee";
import AddEmployeeForm from "./modules/adminEmployees/AddEmployeeForm";
import AdminCategory from "./pages/admin/AdminCategory";
import AddCategoryForm from "./modules/adminCategory/AddCategoryForm";
import UpdateCategory from "./modules/adminCategory/UpdateCategory";

function App() {
  return (
    <div className="w-full h-[100vh] flex items-center justify-center bg-zinc-50">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Start />}></Route>
          <Route path="/adminLogin" element={<LoginAdmin />}></Route>
          <Route path="/employeeLogin" element={<LoginEmployee />}></Route>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute type="authAdmin">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="" element={<AdminDashboard />} />
            <Route path="/dashboard/employee" element={<AdminEmployee />} />
            <Route path="/dashboard/conges" element={<AdminConges />} />
            <Route path="/dashboard/category" element={<AdminCategory />} />
            <Route path="/dashboard/equipement" element={<Equipement />} />
            <Route
              path="/dashboard/add_category"
              element={<AddCategoryForm />}
            />
            <Route
              path="/dashboard/category/:id/:name"
              element={<UpdateCategory />}
            />
            <Route
              path="/dashboard/add_employee"
              element={<AddEmployeeForm />}
            />
            <Route
              path="/dashboard/employee/:id"
              element={<UpdateEmployee from="admin" />}
            />
            <Route
              path="/dashboard/profil/:id"
              element={<UpdateEmployee from="admin" />}
            />
            <Route path="/dashboard/admin/:id" element={<UpdateAdmin />} />
            <Route path="/dashboard/addAdmin" element={<AddAdminForm />} />
            <Route
              path="/dashboard/addEquipement"
              element={<AddEquipementForm />}
            />
            <Route
              path="/dashboard/equipement/:id"
              element={<UpdateEquipement />}
            />
          </Route>
          <Route
            path="/home"
            element={
              <ProtectedRoute type="authEmployee">
                <EmployeeContextProvider>
                  <DashboardEmployee />
                </EmployeeContextProvider>
              </ProtectedRoute>
            }
          >
            <Route path="/home" element={<HomeEmployee />} />
            <Route
              path="/home/profil/:id"
              element={<UpdateEmployee from="employee" />}
            />
            <Route path="/home/conges" element={<EmployeeConges />} />
            <Route path="/home/conge/:id" element={<UpdateConge />} />
            <Route path="/home/add_conges/" element={<AddCongeForm />} />
          </Route>
        </Routes>
        <ToastContainer position="bottom-right" />
      </BrowserRouter>
    </div>
  );
}

export default App;
