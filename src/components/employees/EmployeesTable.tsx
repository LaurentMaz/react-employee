import { employeeType } from "../../types/types";
import axios from "axios";
import { toast } from "react-toastify";
import useFetchCurrentAdmin from "../../hooks/useFetchCurrentAdmin";
import Button from "../UI/Button";
import SearchBar from "../UI/SearchBar";

interface EmployeesTableProps {
  employees: employeeType[];
  setEmployees: React.Dispatch<React.SetStateAction<employeeType[]>>;
}

const EmployeesTable = ({ employees, setEmployees }: EmployeesTableProps) => {
  const { currentAdminEmail } = useFetchCurrentAdmin();

  const handleDelete = (id?: number) => {
    if (id !== undefined) {
      const confirmDelete = confirm(
        "Êtes-vous sûr de vouloir supprimer l'utilisateur ?"
      );
      if (confirmDelete) {
        axios
          .delete(`http://localhost:3000/auth/remove_employee/${id}`)
          .then((result) => {
            if (result.data.Status) {
              setEmployees(employees.filter((employee) => employee.id !== id));
              toast.success("Employé supprimé");
            } else {
              toast.error(result.data.ErrorMessage);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      toast.error("L'id de l'employé n'est pas valide");
    }
  };

  return (
    <>
      <SearchBar
        setData={setEmployees}
        apiRoute="http://localhost:3000/auth/searchEmployee"
        placeholder="Rechercher un employé"
      />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-md">
            <tr>
              <th scope="col" className="px-6 py-3">
                NOM
              </th>
              <th scope="col" className="px-6 py-3">
                PRENOM
              </th>
              <th scope="col" className="px-6 py-3">
                PHOTO
              </th>
              <th scope="col" className="px-6 py-3">
                EMAIL
              </th>
              <th scope="col" className="px-6 py-3">
                ADRESSE
              </th>
              <th scope="col" className="px-6 py-3">
                CATEGORIE
              </th>
              <th scope="col" className="px-6 py-3">
                SALAIRE
              </th>
              <th scope="col" className="px-6 py-3">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr
                key={employee.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {employee.lastName}
                </th>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {employee.firstName}
                </th>
                <td className="px-6 py-4">
                  <img
                    src={"http://localhost:3000/images/" + employee.picture}
                    alt="profil image"
                    className="rounded-full w-[40px] h-[40px] object-cover"
                  />
                </td>
                <td className="px-6 py-4">{employee.email}</td>
                <td className="px-6 py-4">{employee.address}</td>
                <td className="px-6 py-4">{employee.category_name}</td>
                <td className="px-6 py-4">{employee.salary}€</td>
                <td className="px-6 py-4">
                  <div className="flex gap-5">
                    <Button
                      type="warning"
                      link
                      to={`/dashboard/employee/${employee.id}`}
                    >
                      Modifier
                    </Button>
                    <Button
                      type="danger"
                      onClick={() => handleDelete(employee.id)}
                      disabled={employee.email === currentAdminEmail}
                    >
                      Supprimer
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default EmployeesTable;
