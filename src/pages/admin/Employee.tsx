import "react-toastify/dist/ReactToastify.css";
import EmployeesTable from "../../components/employees/EmployeesTable";
import useFetchEmployees from "../../hooks/useFetchEmployees";
import Button from "../../components/UI/Button";
import Container from "../../components/UI/Container";

const Employee = () => {
  const { employees, setEmployees, loading, error } = useFetchEmployees();
  if (error) console.log(error);

  return (
    <Container className="flex h-full flex-col items-center justify-start mt-16 gap-10">
      <div className="flex items-center justify-between w-full">
        <h3 className="mb-5 text-3xl font-bold">Liste des employés</h3>
        <Button type="main" link={true} to="/dashboard/add_employee">
          Ajouter un employé
        </Button>
      </div>
      <div className="w-full">
        {loading ? (
          "Chargement de la liste"
        ) : (
          <EmployeesTable employees={employees} setEmployees={setEmployees} />
        )}
      </div>
    </Container>
  );
};

export default Employee;
