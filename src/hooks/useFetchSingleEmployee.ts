import { useEffect, useState } from "react";
import { employeeType } from "../types/types";
import axios from "axios";

const useFetchSingleEmployee = (id?: string) => {
  const [employee, setEmployee] = useState<employeeType>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setError("ID is undefined");
      return;
    }

    const fetchEmployee = async () => {
      try {
        const result = await axios.get(
          `http://localhost:3000/employee/detail/${id}`
        );
        if (result.data.Status) {
          setEmployee(result.data.Result);
        } else {
          setError(result.data.Error);
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message || "An error occurred");
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, []);

  return { employee, setEmployee, loading, error };
};

export default useFetchSingleEmployee;
