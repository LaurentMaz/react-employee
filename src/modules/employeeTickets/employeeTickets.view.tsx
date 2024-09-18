import TicketTable from "../../components/TicketTable";
import Button from "../../components/UI/Button";
import Container from "../../components/UI/Container";
import { TicketsType } from "../../types/types";

interface employeeTicketViewProps {
  statusIcon: (status: string) => JSX.Element | undefined;
  tickets: TicketsType[];
  handleDelete: (id: number | undefined) => void;
}

const EmployeeTicketsView = ({
  statusIcon,
  tickets,
  handleDelete,
}: employeeTicketViewProps) => {
  return (
    <Container className="flex h-full flex-col items-center justify-start mt-16 gap-10">
      <div className="flex items-center justify-between w-full">
        <h3 className="mb-5 text-3xl font-bold">Mes tickets</h3>
        <Button type="main" link={true} to="/dashboard/add_category">
          Créer un ticket
        </Button>
      </div>
      <div className="w-full">
        <TicketTable
          statusIcon={statusIcon}
          tickets={tickets}
          handleDelete={handleDelete}
        />
      </div>
    </Container>
  );
};

export default EmployeeTicketsView;
