import { useState, useEffect } from "react";
import { employeeType } from "../types/types";
import { useApiAdmin } from "../axios";

const useFetchEmployees = () => {
  const [employees, setEmployees] = useState<employeeType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const apiAdmin = useApiAdmin();

  useEffect(() => {
    const fetchEmployees = () => {
      apiAdmin.get("/employee").then((result) => {
        if (result.data.Status) {
          setLoading(false);
          setEmployees(result.data.Result);
        } else {
          setError(result.data.Error || "Failed to fetch employees");
        }
      });
    };

    fetchEmployees();
  }, []);

  return { employees, setEmployees, loading, error };
};

export default useFetchEmployees;
