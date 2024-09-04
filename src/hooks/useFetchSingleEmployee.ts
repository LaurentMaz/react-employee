import { useEffect } from "react";
import axios from "axios";
import useEmployeeContext from "./useEmployeeContext";
import { useApiClient } from "../axios";

const useFetchSingleEmployee = () => {
  axios.defaults.withCredentials = true;
  const apiClient = useApiClient();

  const { logedEmployee, setLogedEmployee, setFetchEmpError, FetchEmpError } =
    useEmployeeContext();

  useEffect(() => {
    const fetchEmployee = () => {
      apiClient
        .get(`/detail`)
        .then((result) => {
          if (result.data.Status) {
            setLogedEmployee(result.data.Result);
          } else {
            if (result.data.Error.message == "jwt expired")
              setFetchEmpError(result.data.Error);
          }
        })

        .catch((err) => console.log("useFetchSingleEmployeeError:", err));
    };

    fetchEmployee();
  }, []);

  return { logedEmployee, setLogedEmployee, FetchEmpError };
};

export default useFetchSingleEmployee;
