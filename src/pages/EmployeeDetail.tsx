import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetchSingleEmployee from "../hooks/useFetchSingleEmployee";

const EmployeeDetail = () => {
  const { id } = useParams();

  const { employee, setEmployee, loading, error } = useFetchSingleEmployee(id);

  useEffect(() => {}, []);

  return <div>{error ? error : <div>{employee?.firstName}</div>}</div>;
};

export default EmployeeDetail;
