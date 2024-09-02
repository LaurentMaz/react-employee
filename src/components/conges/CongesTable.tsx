import { CongeType } from "../../types/types";
import Button from "../UI/Button";
import { MdOutlinePendingActions } from "react-icons/md";
import { CiCircleCheck } from "react-icons/ci";
import { TiDelete } from "react-icons/ti";

interface CongesTableProps {
  conges: CongeType[];
  fullDisplay: boolean;
}

const CongesTable = ({ conges, fullDisplay }: CongesTableProps) => {
  const statusIcon = (status: string) => {
    switch (status) {
      case "En cours":
        return <MdOutlinePendingActions className="text-amber-600 text-lg" />;
      case "Approuvé":
        return <CiCircleCheck className="text-green-600 text-lg" />;
      case "Rejeté":
        return <TiDelete className="text-red-600 text-lg" />;
      default:
        break;
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-md">
          <tr>
            <th scope="col" className="px-6 py-3">
              DATES
            </th>
            {fullDisplay && (
              <th scope="col" className="px-6 py-3">
                RAISON
              </th>
            )}

            <th scope="col" className="px-6 py-3">
              JOURS COMPTES
            </th>
            <th scope="col" className="px-6 py-3">
              STATUS
            </th>
            {fullDisplay && (
              <th scope="col" className="px-6 py-3">
                ACTIONS
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {conges &&
            conges.map((conge) => (
              <tr
                key={conge.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Du {conge.startDate} au {conge.endDate}
                </td>
                {fullDisplay && (
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {conge.reason}
                  </td>
                )}

                <td className="px-6 py-4">{conge.businessDays}</td>
                <td className="px-6 py-4 flex items-center justify-center gap-1">
                  {conge.status} {statusIcon(conge.status)}
                </td>
                {fullDisplay && (
                  <td className="px-6 py-4">
                    <div className="flex gap-5">
                      <Button
                        type="danger"
                        // onClick={() => handleClick(user.email, user.password)}
                      >
                        Supprimer
                      </Button>
                      <Button
                        type="warning"
                        // onClick={() => handleClick(user.email, user.password)}
                      >
                        Modifier
                      </Button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default CongesTable;
