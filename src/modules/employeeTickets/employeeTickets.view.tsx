import TicketTable from "../../components/TicketTable";
import Button from "../../components/UI/Button";
import Container from "../../components/UI/Container";
import { TicketsType } from "../../types/types";

interface employeeTicketViewProps {
  statusIcon: (
    status: "En cours" | "Terminé" | "Bloqué" | "Rejeté" | "En attente"
  ) => JSX.Element;
  urgenceStyle: (
    urgence: "Faible" | "Modérée" | "Urgent" | "Aujourd'hui" | null
  ) => JSX.Element | undefined;
  tickets: TicketsType[];
  handleDelete: (id: number | undefined) => void;
}

const EmployeeTicketsView = ({
  statusIcon,
  urgenceStyle,
  tickets,
  handleDelete,
}: employeeTicketViewProps) => {
  return (
    <Container className="flex h-full flex-col items-center justify-start mt-16 gap-10">
      <div className="flex items-center justify-between w-full">
        <h3 className="mb-5 text-3xl font-bold">Mes tickets en cours</h3>
        <Button type="main" link={true} to="/home/add_ticket">
          Créer un ticket
        </Button>
      </div>
      <div className="w-full">
        <TicketTable
          statusIcon={statusIcon}
          tickets={tickets}
          handleDelete={handleDelete}
          urgenceStyle={urgenceStyle}
        />
      </div>
    </Container>
  );
};

export default EmployeeTicketsView;
