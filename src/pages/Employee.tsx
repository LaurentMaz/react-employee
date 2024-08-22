import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmployeesTable from "../components/employees/EmployeesTable";
import useFetchEmployees from "../hooks/useFetchEmployees";

const Employee = () => {
  const { employees, setEmployees, loading, error } = useFetchEmployees();
  if (error) console.log(error);

  const notify = () => toast.success("Employé supprimé");
  return (
    <div className="flex h-full flex-col items-center justify-start mt-16 gap-10">
      <div className="flex flex-col items-center justify-center">
        <h3 className="mb-5 text-3xl font-bold">Liste des employés</h3>
        <Link
          className="bg-teal-500 hover:bg-teal-400 rounded p-2 font-bold text-white"
          to="/dashboard/add_employee"
        >
          Ajouter un employé
        </Link>
      </div>
      <div className="w-[80%]">
        {loading ? (
          "Chargement de la liste"
        ) : (
          <EmployeesTable employees={employees} />
        )}
        <ToastContainer position="bottom-right" />
      </div>
    </div>
  );
};

export default Employee;
