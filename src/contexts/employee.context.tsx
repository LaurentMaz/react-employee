import { createContext, ReactNode, useState } from "react";
import { EmployeeContextType, employeeType } from "../types/types";
import useFetchSingleEmployee from "../hooks/useFetchSingleEmployee";
import { useParams } from "react-router-dom";

const EmployeeContext = createContext<EmployeeContextType | null>(null);

interface EmployeeContextProviderProps {
  children: ReactNode;
}

export const EmployeeContextProvider = ({
  children,
}: EmployeeContextProviderProps) => {
  const [employee, setEmployee] = useState<employeeType>();
  const [loading, setLoading] = useState(true);
  const [FetchEmpError, setFetchEmpError] = useState<string | null>(null);

  return (
    <EmployeeContext.Provider
      value={{ employee, setEmployee, FetchEmpError, setFetchEmpError }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export default EmployeeContext;
