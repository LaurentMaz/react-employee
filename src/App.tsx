import "./App.css";
import Category from "./pages/admin/Category";
import Employee from "./pages/admin/Employee";
import Home from "./pages/admin/Home";
import LoginAdmin from "./pages/admin/LoginAdmin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddCategoryForm from "./components/categories/AddCategoryForm";
import UpdateCategory from "./components/categories/UpdateCategory";
import AddEmployeeForm from "./components/employees/AddEmployeeForm";
import UpdateEmployee from "./components/employees/UpdateEmployee";
import { ToastContainer } from "react-toastify";
import UpdateAdmin from "./components/admins/UpdateAdmin";
import LoginEmployee from "./pages/employee/LoginEmployee";
import Start from "./pages/Start";
import Dashboard from "./pages/admin/Dashboard";
import DashboardEmployee from "./pages/employee/DashboardEmployee";
import HomeEmployee from "./pages/employee/HomeEmployee";
import ProtectedRoute from "./components/ProtectedRoute";
import { EmployeeContextProvider } from "./contexts/employee.context";
import AddAdminForm from "./components/admins/AddAdminForm";

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
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route path="" element={<Home />} />
            <Route path="/dashboard/employee" element={<Employee />} />
            <Route path="/dashboard/category" element={<Category />} />
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
              element={<UpdateEmployee from="profil" />}
            />
            <Route path="/dashboard/admin/:id" element={<UpdateAdmin />} />
            <Route path="/dashboard/addAdmin" element={<AddAdminForm />} />
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
            {/* <Route path="/home/employeeDetail/" element={<EmployeeDetail />} /> */}
          </Route>
        </Routes>
        <ToastContainer position="bottom-right" />
      </BrowserRouter>
    </div>
  );
}

export default App;
