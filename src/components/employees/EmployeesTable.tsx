import { Link } from "react-router-dom";
import { employeeType } from "../../types/types";
import axios from "axios";
import { toast } from "react-toastify";

interface EmployeesTableProps {
  employees: employeeType[];
  setEmployees: React.Dispatch<React.SetStateAction<employeeType[]>>;
}

const EmployeesTable = ({ employees, setEmployees }: EmployeesTableProps) => {
  const handleDelete = (id?: number) => {
    if (id !== undefined) {
      axios
        .delete(`http://localhost:3000/auth/remove_employee/${id}`)
        .then((result) => {
          setEmployees(employees.filter((employee) => employee.id !== id));
          toast.success("Employé supprimé");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast.error("L'id de l'employé n'est pas valide");
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
                  className="border-r-2 rounded-full w-[40px] h-[40px] object-cover"
                />
              </td>
              <td className="px-6 py-4">{employee.email}</td>
              <td className="px-6 py-4">{employee.address}</td>
              <td className="px-6 py-4">{employee.category_name}</td>
              <td className="px-6 py-4">{employee.salary}€</td>
              <td className="px-6 py-4">
                <div className="flex gap-5">
                  <Link to={`/dashboard/employee/${employee.id}`}>
                    <div className="flex justify-center cursor-pointer items-center bg-amber-400 text-white p-3 rounded">
                      Modifier
                    </div>
                  </Link>
                  <div
                    onClick={() => handleDelete(employee.id)}
                    className="flex justify-center cursor-pointer items-center bg-red-500 text-white p-3 rounded"
                  >
                    Supprimer
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeesTable;
