import { useEffect, useState } from "react";
import useEmployeeContext from "../../hooks/useEmployeeContext";
import Button from "../UI/Button";
import Container from "../UI/Container";
import axios from "axios";
import { CongeType } from "../../types/types";
import CongesTable from "./CongesTable";

const EmployeeConges = () => {
  const { congesAvalaibleCurrentYear, congesAvalaibleNextYear } =
    useEmployeeContext();

  const [congesPending, setCongesPending] = useState<CongeType[]>();
  const [congesAccepted, setCongesAccepted] = useState<CongeType[]>();
  const [congesRefused, setCongesRefused] = useState<CongeType[]>();

  const fetchPendingConges = () => {
    axios
      .get("http://localhost:3000/employee/conges_pending")
      .then((result) => setCongesPending(result.data.Result))
      .catch((err) => console.log(err));
  };
  const fetchAcceptedConges = () => {
    axios
      .get("http://localhost:3000/employee/conges_accepted")
      .then((result) => setCongesAccepted(result.data.Result))
      .catch((err) => console.log(err));
  };
  const fetchRefusedConges = () => {
    axios
      .get("http://localhost:3000/employee/conges_refused")
      .then((result) => setCongesRefused(result.data.Result))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchPendingConges();
    fetchAcceptedConges();
    fetchRefusedConges();
  }, []);
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
              <CongesTable conges={congesPending} fullDisplay={true} />
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

export default EmployeeConges;
