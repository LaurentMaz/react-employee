import { createContext, ReactNode, useEffect, useState } from "react";
import { EmployeeContextType, employeeType } from "../types/types";
import axios from "axios";

const EmployeeContext = createContext<EmployeeContextType | null>(null);

interface EmployeeContextProviderProps {
  children: ReactNode;
}

export const EmployeeContextProvider = ({
  children,
}: EmployeeContextProviderProps) => {
  const [logedEmployee, setLogedEmployee] = useState<employeeType>();
  // const [loading, setLoading] = useState(true);
  const [FetchEmpError, setFetchEmpError] = useState<string | null>(null);
  const [congesAvalaibleCurrentYear, setCongesAvalaibleCurrentYear] =
    useState<number>(30);
  const [congesAvalaibleNextYear, setCongesAvalaibleNextYear] =
    useState<number>(30);

  const calculateCongeAvalaibleNextYear = () => {
    // Obtenir la date actuelle
    const today = new Date();

    // Obtenir le mois de mai de l'année en cours
    let mayDate = new Date(today.getFullYear(), 4, 1); // Le mois est 4 car janvier est 0

    // Si aujourd'hui est avant le mois de mai, on prend le mois de mai de l'année précédente
    if (today < mayDate) {
      mayDate = new Date(today.getFullYear() - 1, 4, 1);
    }

    // Calculer le nombre de mois écoulés
    const monthsElapsed =
      (today.getFullYear() - mayDate.getFullYear()) * 12 +
      (today.getMonth() - mayDate.getMonth());

    return monthsElapsed * 2.5;
  };

  useEffect(() => {
    setCongesAvalaibleNextYear(calculateCongeAvalaibleNextYear);
    axios
      .get("http://localhost:3000/employee/congesAvalaible_currentYear")
      .then((result) => {
        setCongesAvalaibleCurrentYear(
          congesAvalaibleCurrentYear - result.data.Result[0].totalBusinessDays
        );
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <EmployeeContext.Provider
      value={{
        logedEmployee,
        setLogedEmployee,
        FetchEmpError,
        setFetchEmpError,
        congesAvalaibleCurrentYear,
        setCongesAvalaibleCurrentYear,
        congesAvalaibleNextYear,
        setCongesAvalaibleNextYear,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export default EmployeeContext;
