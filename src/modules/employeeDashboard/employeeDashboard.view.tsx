import { MdOutlineWavingHand } from "react-icons/md";
import Container from "../../components/UI/Container";
import CongesTable from "../../components/CongesTable";
import { CongeType, employeeType } from "../../types/types";
import EmployeeEquipements from "./EmployeeEquipements";

interface employeeDashboardViewProps {
  logedEmployee: employeeType | undefined;
  congesPending: CongeType[];
}

const EmployeeDashboardView = ({
  logedEmployee,
  congesPending,
}: employeeDashboardViewProps) => {
  return (
    <Container className="flex-col justify-start items-start gap-10">
      <div className="flex text-lg items-center justify-center gap-2">
        Bonjour {logedEmployee?.firstName}{" "}
        <span className="text-2xl">
          <MdOutlineWavingHand className="font-bold" />
        </span>
      </div>
      <div>
        <h2 className="text-xl font-bold">Mes équipements</h2>
        <EmployeeEquipements />
      </div>
      <div className="flex flex-col gap-5">
        <h2 className="text-xl font-bold">Mes congés</h2>
        <div>
          {congesPending.length > 0 && (
            <CongesTable conges={congesPending} fullDisplay={false} />
          )}
        </div>
      </div>
    </Container>
  );
};

export default EmployeeDashboardView;
