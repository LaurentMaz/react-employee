import "./App.css";
import Category from "./pages/Category";
import Employee from "./pages/Employee";
import Home from "./pages/Home";
import Profil from "./pages/Profil";
import LoginAdmin from "./pages/LoginAdmin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddCategoryForm from "./components/categories/AddCategoryForm";
import UpdateCategory from "./components/categories/UpdateCategory";
import AddEmployeeForm from "./components/employees/AddEmployeeForm";
import UpdateEmployee from "./components/employees/UpdateEmployee";
import { ToastContainer } from "react-toastify";
import UpdateAdmin from "./components/admins/UpdateAdmin";
import LoginEmployee from "./pages/LoginEmployee";
import Start from "./components/Start";
import EmployeeDetail from "./pages/EmployeeDetail";
import Dashboard from "./pages/Dashboard";
import DashboardEmployee from "./pages/DashboardEmployee";
import HomeEmployee from "./pages/HomeEmployee";

function App() {
  return (
    <div className="w-full h-[100vh] flex items-center justify-center bg-zinc-50">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Start />}></Route>
          <Route path="/adminLogin" element={<LoginAdmin />}></Route>
          <Route path="/employeeLogin" element={<LoginEmployee />}></Route>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="" element={<Home />}></Route>
            <Route path="/dashboard/employee" element={<Employee />}></Route>
            <Route path="/dashboard/category" element={<Category />}></Route>
            <Route path="/dashboard/profil" element={<Profil />}></Route>
            <Route
              path="/dashboard/add_category"
              element={<AddCategoryForm />}
            ></Route>
            <Route
              path="/dashboard/category/:id/:name"
              element={<UpdateCategory />}
            ></Route>
            <Route
              path="/dashboard/add_employee"
              element={<AddEmployeeForm />}
            ></Route>
            <Route
              path="/dashboard/employee/:id"
              element={<UpdateEmployee />}
            ></Route>
            <Route
              path="/dashboard/admin/:id"
              element={<UpdateAdmin />}
            ></Route>
          </Route>
          <Route path="/home" element={<DashboardEmployee />}>
            <Route path="" element={<HomeEmployee />}></Route>
            <Route
              path="/home/employeeDetail/:id"
              element={<EmployeeDetail />}
            ></Route>
          </Route>
        </Routes>
        <ToastContainer position="bottom-right" />
      </BrowserRouter>
    </div>
  );
}

export default App;
