import { useEffect } from "react";
import axios from "axios";
import useEmployeeContext from "./useEmployeeContext";

const useFetchSingleEmployee = () => {
  axios.defaults.withCredentials = true;

  const { employee, setEmployee, setFetchEmpError, FetchEmpError } =
    useEmployeeContext();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const result = await axios.get(`http://localhost:3000/employee/detail`);
        if (result.data.Status) {
          setEmployee(result.data.Result);
        } else {
          setFetchEmpError(result.data.Error);
        }
      } catch (err) {
        if (err instanceof Error) {
          setFetchEmpError(err.message || "An error occurred");
        } else {
          setFetchEmpError("An unknown error occurred");
        }
      }
      // finally {
      //   setLoading(false);
      // }
    };

    fetchEmployee();
  }, []);

  return { employee, setEmployee, FetchEmpError };
};

export default useFetchSingleEmployee;
