import { CongeType } from "../../types/types";
import Button from "../UI/Button";
import { MdOutlinePendingActions } from "react-icons/md";
import { CiCircleCheck } from "react-icons/ci";
import { TiDelete } from "react-icons/ti";
import { useApiAdmin, useApiClient } from "../../axios";
import { toast } from "react-toastify";

interface CongesTableProps {
  conges: CongeType[];
  setConges?: (e: any) => void;

  fullDisplay: boolean;
  admin?: boolean;
  fetchParentData?: () => void;
}

const CongesTable = ({
  conges,
  fullDisplay,
  setConges,
  admin = false,
  fetchParentData,
}: CongesTableProps) => {
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

  const apiClient = useApiClient();
  const apiAdmin = useApiAdmin();

  const handleDelete = (id: number | undefined) => {
    if (!id) {
      toast.error("ID de la tâche manquante");
    } else {
      apiClient
        .delete(`/remove_conge/${id}`)
        .then((result) => {
          if (result.data.Status) {
            setConges && setConges(conges?.filter((conge) => conge.id !== id));
            toast.success("Congé supprimé");
          } else {
            toast.error(result.data.ErrorMessage);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: number | undefined
  ) => {
    const data = e.currentTarget.dataset.data;
    if (id) {
      apiAdmin
        .put(`/updateConge/${id}`, {
          status: data,
        })
        .then((result) => {
          if (result.data.Status) {
            fetchParentData && fetchParentData();
            toast.success("Demande modifiée");
          } else {
            toast.error(result.data.Error);
          }
        })
        .catch((err) => console.log(err));
    } else {
      console.log("Erreur: id manquant");
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
            {admin && (
              <th scope="col" className="px-6 py-3">
                EMPLOYE
              </th>
            )}
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
                {admin && (
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {conge.employeeId}
                  </td>
                )}
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
                {fullDisplay && !admin && (
                  <td className="px-6 py-4">
                    <div className="flex gap-5">
                      <Button
                        type="danger"
                        onClick={() => handleDelete(conge.id)}
                      >
                        Supprimer
                      </Button>
                      <Button
                        type="warning"
                        link={true}
                        to={`/home/conge/${conge.id}`}
                      >
                        Modifier
                      </Button>
                    </div>
                  </td>
                )}
                {fullDisplay && admin && (
                  <td className="px-6 py-4">
                    <div className="flex gap-5">
                      <Button
                        type="danger"
                        dataSet="Rejeté"
                        onClick={(e) => handleClick(e, conge.id)}
                      >
                        Refuser
                      </Button>
                      <Button
                        type="warning"
                        dataSet="En cours"
                        onClick={(e) => handleClick(e, conge.id)}
                      >
                        En cours
                      </Button>
                      <Button
                        type="main"
                        dataSet="Approuvé"
                        onClick={(e) => handleClick(e, conge.id)}
                      >
                        Accepter
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
