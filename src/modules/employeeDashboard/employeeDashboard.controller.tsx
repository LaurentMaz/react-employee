import { useEffect, useState } from "react";
import useEmployeeContext from "../../hooks/useEmployeeContext";
import { CongeType } from "../../types/types";
import axios from "axios";
import EmployeeDashboardView from "./employeeDashboard.view";

const EmployeeDashboardController = () => {
  const { logedEmployee } = useEmployeeContext();
  const [congesPending, setCongesPending] = useState<CongeType[]>([]);

  const fetchPendingConges = () => {
    axios
      .get("http://localhost:3000/employee/conges")
      .then((result) => setCongesPending(result.data.Result))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchPendingConges();
  }, []);

  return (
    <EmployeeDashboardView
      logedEmployee={logedEmployee}
      congesPending={congesPending}
    />
  );
};

export default EmployeeDashboardController;
