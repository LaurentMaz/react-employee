import { Dispatch, SetStateAction } from "react";
import CongesTable from "../../components/CongesTable";
import Button from "../../components/UI/Button";
import Container from "../../components/UI/Container";
import { CongeType } from "../../types/types";

interface employeeCongesViewProps {
  congesAvalaibleCurrentYear: number;
  congesAvalaibleNextYear: number;
  congesPending: CongeType[];
  setCongesPending: Dispatch<SetStateAction<CongeType[]>>;
  congesAccepted: CongeType[];
  congesRefused: CongeType[];
}

const EmployeeCongesView = ({
  congesAvalaibleCurrentYear,
  congesAvalaibleNextYear,
  congesPending,
  setCongesPending,
  congesAccepted,
  congesRefused,
}: employeeCongesViewProps) => {
  return (
    <Container className="flex flex-col gap-5">
      <div className="shadow-lg p-10 rounded flex gap-10">
        <span className="text-xl font-bold">
          Total congés disponibles pour l'année en cours:{" "}
          <span className="text-teal-500 text-4xl">
            {congesAvalaibleCurrentYear}
          </span>
        </span>
        <span className="text-xl font-bold">
          Total congés disponibles pour l'année prochaine:{" "}
          <span className="text-teal-500 text-4xl">
            {congesAvalaibleNextYear}
          </span>
        </span>
      </div>
      <div className="flex flex-col gap-10 w-full items-start justify-center mt-10">
        <div className="flex flex-col gap-5 w-full">
          <div className="flex gap-10">
            <h2 className="text-2xl font-bold">
              Mes demandes de congés en cours
            </h2>
            <Button type="main" link={true} to="/home/add_conges">
              Faire une demande de congés
            </Button>
          </div>

          <div className="flex flex-col gap-3">
            {congesPending && (
              <CongesTable
                conges={congesPending}
                setConges={setCongesPending}
                fullDisplay={true}
              />
            )}
          </div>
        </div>
        <div className="flex w-full gap-10">
          <div className="flex flex-col gap-5 flex-1">
            <h2 className="text-2xl font-bold">Mes congés validés</h2>
            <div>
              {congesAccepted && (
                <CongesTable conges={congesAccepted} fullDisplay={false} />
              )}
            </div>
            <div>
              <Button type="secondary" link={true}>
                Voir plus
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-5 flex-1">
            <h2 className="text-2xl font-bold">Mes congés refusés</h2>
            <div>
              {congesRefused && (
                <CongesTable conges={congesRefused} fullDisplay={false} />
              )}
            </div>
            <div>
              <Button type="secondary" link={true}>
                Voir plus
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default EmployeeCongesView;
