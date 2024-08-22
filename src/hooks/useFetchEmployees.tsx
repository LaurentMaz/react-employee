import { useState, useEffect } from "react";
import axios from "axios";
import { employeeType } from "../types/types";

const useFetchEmployees = () => {
  const [employees, setEmployees] = useState<employeeType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const result = await axios.get("http://localhost:3000/auth/employee");
        if (result.data.Status) {
          setEmployees(result.data.Result);
        } else {
          setError(result.data.Error || "Failed to fetch employees");
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

    fetchEmployees();
  }, []);

  return { employees, setEmployees, loading, error };
};

export default useFetchEmployees;
