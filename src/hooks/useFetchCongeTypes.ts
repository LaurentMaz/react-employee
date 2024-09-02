import { useState, useEffect } from "react";
import axios from "axios";
import { ICongeTypes } from "../types/types";

const useFetchCongeTypes = () => {
  const [congeTypes, setCongeTypes] = useState<ICongeTypes[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCongeTypes = async () => {
      try {
        const result = await axios.get(
          "http://localhost:3000/employee/conge_types"
        );
        if (result.data.Status) {
          setCongeTypes(result.data.Result);
        } else {
          setError(result.data.Error || "Failed to fetch congeTypes");
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

    fetchCongeTypes();
  }, []);

  return { congeTypes, setCongeTypes, loading, error };
};

export default useFetchCongeTypes;
