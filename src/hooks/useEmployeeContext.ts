import { useContext } from "react";
import EmployeeContext from "../contexts/employee.context";

const useEmployeeContext = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error(
      "useEmployeeContext must be used within a EmployeeContextProvider"
    );
  }
  return context;
};

export default useEmployeeContext;
