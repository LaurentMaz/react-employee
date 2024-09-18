import { MdOutlinePendingActions } from "react-icons/md";
import EmployeeTicketsView from "./employeeTickets.view";
import { CiCircleCheck } from "react-icons/ci";
import { TiDelete } from "react-icons/ti";
import { useState } from "react";
import { TicketsType } from "../../types/types";

const EmployeeTicketsController = () => {
  const [tickets, setTickets] = useState<TicketsType[]>([]);
  const statusIcon = (status: string) => {
    switch (status) {
      case "En cours":
        return <MdOutlinePendingActions className="text-amber-600 text-lg" />;
      case "En attente":
        return <MdOutlinePendingActions className="text-amber-600 text-lg" />;
      case "Terminé":
        return <CiCircleCheck className="text-green-600 text-lg" />;
      case "Rejeté":
        return <TiDelete className="text-red-600 text-lg" />;
      case "Bloqué":
        return <TiDelete className="text-red-600 text-lg" />;
      default:
        break;
    }
  };

  const handleDelete = (id: number | undefined) => {
    return;
  };

  return (
    <EmployeeTicketsView
      statusIcon={statusIcon}
      tickets={tickets}
      handleDelete={handleDelete}
    />
  );
};

export default EmployeeTicketsController;
