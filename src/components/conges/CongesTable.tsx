import { CongeType, filterMenuType } from "../../types/types";
import Button from "../UI/Button";
import { MdOutlinePendingActions } from "react-icons/md";
import { CiCircleCheck } from "react-icons/ci";
import { TiDelete } from "react-icons/ti";
import { useApiAdmin, useApiClient } from "../../axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa6";
import { MdDeleteSweep } from "react-icons/md";
import FilterColumn from "../UI/FilterColumn";
import { createPortal } from "react-dom";

interface CongesTableProps {
  conges: CongeType[];
  setConges?: (e: any) => void;

  fullDisplay: boolean;
  admin?: boolean;
  fetchParentData?: () => void;
  filterStatus: string;
}

const CongesTable = ({
  conges,
  fullDisplay,
  setConges,
  admin = false,
  fetchParentData,
  filterStatus,
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
  const [congesTemp, setCongesTemp] = useState<CongeType[]>(conges);
  const [filterEmployee, setFilterEmployee] = useState("");
  const [filterMenu, setFilterMenu] = useState<filterMenuType>({
    visible: false,
    x: 0,
    y: 0,
    column: null,
  });

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

  // Fonction pour afficher le menu contextuel
  const handleContextMenu = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    column: string
  ) => {
    const target = e.target as SVGElement;
    const parentDiv = target.parentElement;
    if (parentDiv) {
      const divRect = parentDiv.getBoundingClientRect();
      const offsetX = e.clientX - divRect.left;
      const offsetY = e.clientY - divRect.top;

      setFilterMenu({
        visible: true,
        x: offsetX,
        y: offsetY,
        column,
      });
    }
  };

  /**
   * Modification de congesTemp en fonction du filtre status choisi
   */
  useEffect(() => {
    if (filterStatus && filterStatus == "Tous") {
      setCongesTemp(conges);
    } else if (filterStatus && filterStatus !== "Tous") {
      const filteredConges = conges.filter((conge) =>
        conge.status.toLowerCase().includes(filterStatus.toLowerCase())
      );
      setCongesTemp(filteredConges);
    } else {
      setCongesTemp(conges); // Réinitialiser si le filtre est vide
    }
  }, [filterStatus, conges]);

  /**
   * Modification de congesTemp en fonction du filtre employee choisi
   */
  useEffect(() => {
    if (filterEmployee && filterEmployee == "") {
      setCongesTemp(conges);
    } else if (filterEmployee && filterEmployee !== "") {
      const filteredConges = conges.filter((conge) =>
        conge.employeeFullName
          ?.toLowerCase()
          .includes(filterEmployee.toLowerCase())
      );
      setCongesTemp(filteredConges);
    } else {
      setCongesTemp(conges); // Réinitialiser si le filtre est vide
    }
  }, [filterEmployee, conges]);

  /**
   * Initialisation de congesTemp avec une copie de conges pour filtrer les données sans dénaturé le tableau initial
   */
  useEffect(() => {
    if (conges && conges.length > 0) {
      setCongesTemp(conges);
    }
  }, []);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-md">
          <tr>
            <th scope="col" className="px-6 py-3">
              DATES
            </th>
            {admin && (
              <th
                scope="col"
                className="flex gap-2 px-6 py-3 justify-start items-center"
              >
                <div>EMPLOYE</div>
                <div onClick={(e) => handleContextMenu(e, "employee")}>
                  <FaFilter className="text-teal-700" />
                </div>
                {filterEmployee !== "" && (
                  <div onClick={() => setFilterEmployee("")}>
                    <MdDeleteSweep className="text-red-500 text-lg" />
                  </div>
                )}
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
          {congesTemp.length > 0 ? (
            congesTemp.map((conge) => (
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
                    {conge.employeeFullName}
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
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-1">
                    {conge.status} {statusIcon(conge.status)}
                  </div>
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
            ))
          ) : (
            <tr>
              <td
                colSpan={fullDisplay ? 6 : 5}
                className="px-6 py-4 text-center"
              >
                Aucune donnée trouvée
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {/* Menu contextuel */}
      {filterMenu.visible &&
        createPortal(
          <FilterColumn
            filterMenu={filterMenu}
            setFilterMenu={setFilterMenu}
            setFilterEmployee={setFilterEmployee}
            filterEmployee={filterEmployee}
          />,
          document.body
        )}

      {/* Clic en dehors du menu pour le fermer */}
      {filterMenu.visible && (
        <div
          onClick={() => setFilterMenu({ ...filterMenu, visible: false })}
          className="bg-black bg-opacity-80	fixed top-0 left-0 right-0 bottom-0"
        />
      )}
    </div>
  );
};

export default CongesTable;
