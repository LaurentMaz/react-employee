import {
  congesFiltersType,
  CongeType,
  filterMenuType,
} from "../../types/types";
import Button from "../UI/Button";
import { MdOutlinePendingActions } from "react-icons/md";
import { CiCircleCheck } from "react-icons/ci";
import { TiDelete } from "react-icons/ti";
import { useApiAdmin, useApiClient } from "../../axios";
import { toast } from "react-toastify";
import { RefObject, useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa6";
import { MdDeleteSweep } from "react-icons/md";
import FilterColumn from "../UI/FilterColumn";
import { createPortal } from "react-dom";
import { removeAccents } from "../../utils/helper";

interface CongesTableProps {
  conges: CongeType[];
  setConges?: (e: any) => void;

  fullDisplay: boolean;
  admin?: boolean;
  fetchData?: () => void;
}

const CongesTable = ({
  conges,
  fullDisplay,
  setConges,
  admin = false,
  fetchData,
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
  const [filterEmployeeName, setFilterEmployeeName] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("Tous");
  const filterStatusRef = useRef<HTMLTableCellElement | null>(null);
  const filterEmployeeNameRef = useRef<HTMLTableCellElement | null>(null);
  const [clickedRef, setclickedRef] =
    useState<RefObject<HTMLTableCellElement>>();

  const [activeFilters, setActiveFilters] = useState<{ [key: string]: string }>(
    {}
  );
  const [filterMenu, setFilterMenu] = useState<filterMenuType>({
    visible: false,
    column: null,
    filterState: "",
    setFilterState: null,
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
            fetchData && fetchData();
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

  // Fonction pour afficher le menu contextuel en fonction de la colonne filtrée
  const handleContextMenu = (
    column: congesFiltersType,
    ref: React.RefObject<HTMLTableCellElement>
  ) => {
    let filterState = "";
    let setFilterState = null;

    switch (column) {
      case "employeeFullName":
        filterState = filterEmployeeName;
        setFilterState = setFilterEmployeeName;
        break;
      case "status":
        filterState = filterStatus;
        setFilterState = setFilterStatus;
        break;
      default:
        break;
    }

    setFilterMenu({
      visible: true,
      column,
      filterState: filterState,
      setFilterState: setFilterState,
    });

    // Mettre à jour dynamiquement la position du conteneur en fonction du `ref`
    if (ref.current) {
      setclickedRef(ref);
    }
  };

  /**
   * Modification de congesTemp en fonction du filtre status choisi
   */
  useEffect(() => {
    setFilterMenu({
      ...filterMenu,
      filterState: filterStatus,
    });
    filterConges(filterStatus, "status");
  }, [filterStatus, conges]);

  /**
   * Function de filtrage des congés avec filtres cumulatifs
   * @param filter correspond au state mis à jour
   * @param column correspond au nom de la colonne filtrée
   */
  const filterConges = (filter: string, column: congesFiltersType) => {
    let updatedFilters = { ...activeFilters };

    // Ajouter ou mettre à jour le filtre pour une colonne spécifique
    if (filter === "" || filter === "Tous") {
      delete updatedFilters[column]; // Supprimer le filtre si le champ est vide
    } else {
      updatedFilters[column] = filter; // Ajouter ou mettre à jour le filtre
    }
    setActiveFilters(updatedFilters);

    let filteredConges = conges;

    Object.keys(updatedFilters).forEach((col) => {
      const filterValue = updatedFilters[col].toLowerCase();
      filteredConges = filteredConges.filter((conge) => {
        // Vérifiez le champ correspondant à la colonne
        switch (col) {
          case "employeeFullName":
            return removeAccents(
              conge.employeeFullName!.toLowerCase()
            ).includes(filterValue);
          case "status":
            return removeAccents(conge.status?.toLowerCase()).includes(
              filterValue
            );
          // Ajoutez d'autres colonnes ici
          default:
            return true;
        }
      });
    });

    setCongesTemp(filteredConges);
  };

  useEffect(() => {
    setFilterMenu({
      ...filterMenu,
      filterState: filterEmployeeName,
    });
    filterConges(filterEmployeeName, "employeeFullName");
  }, [filterEmployeeName, conges]);

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
      <table className="w-full min-h-[200px] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-md">
          <tr>
            <th scope="col" className="px-6 py-3">
              DATES
            </th>
            {admin && (
              <th
                ref={filterEmployeeNameRef}
                scope="col"
                className="flex gap-2 px-6 py-3 justify-start items-center"
              >
                <div>EMPLOYE</div>
                <div
                  onClick={() =>
                    handleContextMenu("employeeFullName", filterEmployeeNameRef)
                  }
                >
                  <FaFilter className="text-teal-700 cursor-pointer" />
                </div>
                {filterEmployeeName !== "" && (
                  <div onClick={() => setFilterEmployeeName("")}>
                    <MdDeleteSweep className="text-red-500 text-lg cursor-pointer" />
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
            <th
              ref={filterStatusRef}
              scope="col"
              className="flex gap-2 px-6 py-3 justify-start items-center"
            >
              <div>STATUS</div>

              <div onClick={() => handleContextMenu("status", filterStatusRef)}>
                <FaFilter className="text-teal-700 cursor-pointer" />
              </div>
              {filterStatus !== "Tous" && (
                <div onClick={() => setFilterStatus("Tous")}>
                  <MdDeleteSweep className="text-red-500 text-lg cursor-pointer" />
                </div>
              )}
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
          />,
          // document.body
          clickedRef?.current!
        )}

      {/* Clic en dehors du menu pour le fermer */}
      {filterMenu.visible && (
        <div
          onClick={() => setFilterMenu({ ...filterMenu, visible: false })}
          className="	fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-15"
        />
      )}
    </div>
  );
};

export default CongesTable;
