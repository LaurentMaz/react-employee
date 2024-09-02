import { useEffect } from "react";
import axios from "axios";
import useEmployeeContext from "./useEmployeeContext";
import { useNavigate } from "react-router-dom";

const useFetchSingleEmployee = () => {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  const { logedEmployee, setLogedEmployee, setFetchEmpError, FetchEmpError } =
    useEmployeeContext();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const result = await axios.get(`http://localhost:3000/employee/detail`);
        if (result.data.Status) {
          setLogedEmployee(result.data.Result);
        } else {
          setFetchEmpError(result.data.Error);
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (err.response) {
            // Vérifiez le code de statut de la réponse
            if (err.response.status === 401) {
              navigate("/"); // Redirige vers /start si l'utilisateur n'est pas authentifié
            } else {
              setFetchEmpError(err.response.data.Error || "An error occurred");
            }
          } else {
            // Gestion d'autres erreurs Axios
            setFetchEmpError(err.message || "An error occurred");
          }
        } else {
          // Gestion d'erreurs non Axios
          setFetchEmpError("An unknown error occurred");
        }
      }
    };

    fetchEmployee();
  }, []);

  return { logedEmployee, setLogedEmployee, FetchEmpError };
};

export default useFetchSingleEmployee;
