import axios from "axios";
import { useEffect, useState } from "react";
import { employeeType } from "../../types/types";
import Button from "../UI/Button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AvailableEmployeeTable = () => {
  const [loading, setloading] = useState(true);
  const [users, setusers] = useState<employeeType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/employeesNoAdmin")
      .then((result) => {
        setusers(result.data.Result);
        setloading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleClick = (email: string, password: string | undefined) => {
    axios
      .put("http://localhost:3000/auth/add_admin", { email, password })
      .then((result) => {
        if (result.status) {
          setusers(users.filter((user) => user.email !== email));
          toast.success("Administrateur ajouté");
        }
      })
      .catch((err) => console.log(err));
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
              ACTIONS
            </th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr
                key={user.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {user.lastName}
                </th>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {user.firstName}
                </th>
                <td className="px-6 py-4">
                  <img
                    src={"http://localhost:3000/images/" + user.picture}
                    alt="profil image"
                    className="rounded-full w-[40px] h-[40px] object-cover"
                  />
                </td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-5">
                    <Button
                      type="main"
                      onClick={() => handleClick(user.email, user.password)}
                    >
                      Ajouter
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AvailableEmployeeTable;
