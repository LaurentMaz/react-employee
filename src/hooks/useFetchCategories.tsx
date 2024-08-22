import { useState, useEffect } from "react";
import axios from "axios";
import { ICategories } from "../types/types";

const useFetchCategories = () => {
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await axios.get("http://localhost:3000/auth/category");
        if (result.data.Status) {
          setCategories(result.data.Result);
        } else {
          setError(result.data.Error || "Failed to fetch categories");
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

    fetchCategories();
  }, []);

  return { categories, setCategories, loading, error };
};

export default useFetchCategories;
