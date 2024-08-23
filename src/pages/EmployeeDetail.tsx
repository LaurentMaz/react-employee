import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetchSingleEmployee from "../hooks/useFetchSingleEmployee";

const EmployeeDetail = () => {
  const { id } = useParams();

  const { employee, setEmployee, loading, error } = useFetchSingleEmployee(id);

  useEffect(() => {}, []);

  return <div>{employee?.firstName}</div>;
};

export default EmployeeDetail;
