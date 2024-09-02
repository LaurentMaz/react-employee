import { createContext, ReactNode, useState } from "react";
import { EmployeeContextType, employeeType } from "../types/types";

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
  const [congesAvalaible, setCongesAvalaible] = useState<number>(30);

  return (
    <EmployeeContext.Provider
      value={{
        logedEmployee,
        setLogedEmployee,
        FetchEmpError,
        setFetchEmpError,
        congesAvalaible,
        setCongesAvalaible,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export default EmployeeContext;
