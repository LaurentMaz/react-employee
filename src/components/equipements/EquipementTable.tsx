import axios from "axios";
import { useEffect, useState } from "react";
import { EquipementType } from "../../types/types";
import Button from "../UI/Button";
import { Link } from "react-router-dom";

const EquipementTable = () => {
  const [equipements, setEquipements] = useState<EquipementType[]>();

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/equipements")
      .then((result) => {
        setEquipements(result.data.Result);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-md">
            <tr>
              <th scope="col" className="px-6 py-3">
                MARQUE
              </th>
              <th scope="col" className="px-6 py-3">
                NOM
              </th>
              <th scope="col" className="px-6 py-3">
                NUMERO DE SERIE
              </th>
              <th scope="col" className="px-6 py-3">
                DATE D'ACHAT
              </th>
              <th scope="col" className="px-6 py-3">
                RAM(Go)
              </th>
              <th scope="col" className="px-6 py-3">
                PROCESSEUR
              </th>
              <th scope="col" className="px-6 py-3">
                UTILISATEUR
              </th>
              <th scope="col" className="px-6 py-3">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody>
            {equipements?.map((equipement) => (
              <tr
                key={equipement.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {equipement.brand}
                </td>
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {equipement.name}
                </td>
                <td className="px-6 py-4">{equipement.serial}</td>
                <td className="px-6 py-4">
                  {equipement.date_service?.toString()}
                </td>
                <td className="px-6 py-4">{equipement.ram}</td>
                <td className="px-6 py-4">{equipement.proc}</td>
                <td className="px-6 py-4">
                  {
                    <Link
                      className="text-teal-500"
                      to={`/dashboard/employee/${equipement.employee_id}`}
                    >
                      {equipement.employee_name}
                    </Link>
                  }
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-5">
                    <Button
                      type="warning"
                      link
                      to={`/dashboard/employee/${equipement.id}`}
                    >
                      Modifier
                    </Button>
                    <Button
                      type="danger"
                      //   onClick={() => handleDelete(equipement.id)}
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

export default EquipementTable;
