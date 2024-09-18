import useFetchEmployees from "../../hooks/useFetchEmployees";
import AdminEmployeesView from "./adminEmployees.view";

const AdminEmployeesController = () => {
  const { employees, setEmployees, loading, error } = useFetchEmployees();
  if (error) console.log(error);

  return (
    <>
      <AdminEmployeesView
        employees={employees}
        setEmployees={setEmployees}
        loading={loading}
      />
    </>
  );
};

export default AdminEmployeesController;
