import { TicketsType } from "../types/types";
import Button from "./UI/Button";

interface ticketTableProps {
  admin?: boolean;
  statusIcon: (
    status: "En cours" | "Terminé" | "Bloqué" | "Rejeté" | "En attente"
  ) => JSX.Element;
  urgenceStyle: (
    urgence: "Faible" | "Modérée" | "Urgent" | "Aujourd'hui" | null
  ) => JSX.Element | undefined;
  tickets: TicketsType[];
  handleDelete: (id: number | undefined) => void;
}

const TicketTable = ({
  admin,
  statusIcon,
  urgenceStyle,
  tickets,
  handleDelete,
}: ticketTableProps) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full min-h-[200px] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-md">
          <tr>
            <th scope="col" className="px-6 py-3">
              Titre
            </th>
            <th scope="col" className="px-6 py-3">
              Détails
            </th>
            <th scope="col" className="px-6 py-3">
              Service
            </th>
            <th scope="col" className="px-6 py-3">
              Statut
            </th>
            <th scope="col" className="px-6 py-3">
              Urgence
            </th>
            <th scope="col" className="px-6 py-3">
              Equipement
            </th>
            <th scope="col" className="px-6 py-3">
              Agent
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {tickets.length > 0 ? (
            tickets.map((ticket) => (
              <tr
                key={ticket.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {ticket.titre}
                </td>
                <td className="px-6 py-4">{ticket.details}</td>
                <td className="px-6 py-4">{ticket.service}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-1">
                    {ticket.statut} {statusIcon(ticket.statut)}
                  </div>
                </td>
                <td className="px-6 py-4">{urgenceStyle(ticket.urgence)}</td>
                <td className="px-6 py-4">{ticket.id_machine}</td>
                <td className="px-6 py-4">{ticket.emp_related}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-5">
                    <Button
                      type="danger"
                      onClick={() => handleDelete(ticket.id)}
                    >
                      Supprimer
                    </Button>
                    <Button
                      type="warning"
                      link={true}
                      to={`/home/ticket/${ticket.id}`}
                    >
                      Modifier
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="px-6 py-4 text-center">Aucune donnée trouvée</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Menu contextuel */}
      {/* {filterMenu.visible &&
        createPortal(
          <FilterColumn
            filterMenu={filterMenu}
            setFilterMenu={setFilterMenu}
          />,
          // document.body
          clickedRef?.current!
        )} */}
      {/* Clic en dehors du menu pour le fermer */}
      {/* {filterMenu.visible && (
        <div
          onClick={() => setFilterMenu({ ...filterMenu, visible: false })}
          className="	fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-15"
        />
      )} */}
    </div>
  );
};

export default TicketTable;
