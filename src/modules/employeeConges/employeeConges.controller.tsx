import { useEffect, useState } from "react";
import { CongeType } from "../../types/types";
import { useApiClient } from "../../axios";
import useEmployeeContext from "../../hooks/useEmployeeContext";
import EmployeeCongesView from "./employeeConges.view";

const EmployeeCongesController = () => {
  const { congesAvalaibleCurrentYear, congesAvalaibleNextYear } =
    useEmployeeContext();
  const apiClient = useApiClient();

  const [congesPending, setCongesPending] = useState<CongeType[]>([]);
  const [congesAccepted, setCongesAccepted] = useState<CongeType[]>([]);
  const [congesRefused, setCongesRefused] = useState<CongeType[]>([]);

  const fetchPendingConges = () => {
    apiClient
      .get("http://localhost:3000/employee/conges_pending")
      .then((result) => setCongesPending(result.data.Result))
      .catch((err) => console.log(err));
  };
  const fetchAcceptedConges = () => {
    apiClient
      .get("http://localhost:3000/employee/conges_accepted")
      .then((result) => setCongesAccepted(result.data.Result))
      .catch((err) => console.log(err));
  };
  const fetchRefusedConges = () => {
    apiClient
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
    <EmployeeCongesView
      congesAvalaibleCurrentYear={congesAvalaibleCurrentYear}
      congesAvalaibleNextYear={congesAvalaibleNextYear}
      congesPending={congesPending}
      congesAccepted={congesAccepted}
      congesRefused={congesRefused}
      setCongesPending={setCongesPending}
    />
  );
};

export default EmployeeCongesController;
