import { MdOutlinePendingActions } from "react-icons/md";
import EmployeeTicketsView from "./employeeTickets.view";
import { CiCircleCheck } from "react-icons/ci";
import { TiDelete } from "react-icons/ti";
import { useEffect, useState } from "react";
import { TicketsType } from "../../types/types";
import { useApiClient } from "../../axios";

const EmployeeTicketsController = () => {
  const [tickets, setTickets] = useState<TicketsType[]>([]);

  const apiClient = useApiClient();

  const statusIcon = (
    status: "En cours" | "Terminé" | "Bloqué" | "Rejeté" | "En attente"
  ) => {
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
    }
  };

  const urgenceStyle = (
    urgence: "Faible" | "Modérée" | "Urgent" | "Aujourd'hui" | null
  ) => {
    switch (urgence) {
      case "Faible":
        return (
          <span className="text-white bg-green-500 px-2 rounded flex items-center justify-center w-full">
            {urgence}
          </span>
        );
      case "Modérée":
        return (
          <span className="text-white bg-amber-500 px-2 rounded flex items-center justify-center w-full">
            {urgence}
          </span>
        );
      case "Urgent":
        return (
          <span className="text-white bg-red-500 px-2 rounded flex items-center justify-center w-full">
            {urgence}
          </span>
        );
      case "Aujourd'hui":
        return (
          <span className="text-white bg-black px-2 rounded flex items-center justify-center w-full">
            {urgence}
          </span>
        );
    }
  };

  const handleDelete = (id: number | undefined) => {
    return;
  };

  useEffect(() => {
    apiClient
      .get("/tickets")
      .then((result) => {
        if (result.data.Status) setTickets(result.data.Result);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <EmployeeTicketsView
      statusIcon={statusIcon}
      tickets={tickets}
      handleDelete={handleDelete}
      urgenceStyle={urgenceStyle}
    />
  );
};

export default EmployeeTicketsController;
