import { useState, useEffect } from "react";
import { ICategories } from "../types/types";
import { useApiAdmin } from "../axios";

const useFetchCategories = () => {
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const apiAdmin = useApiAdmin();

  useEffect(() => {
    const fetchCategories = () => {
      apiAdmin
        .get("http://localhost:3000/auth/category")
        .then((result) => {
          if (result.data.Status) {
            setLoading(false);
            setCategories(result.data.Result);
          } else {
            setError(result.data.Error || "Failed to fetch categories");
          }
        })
        .catch((err) => console.log(err));
    };

    fetchCategories();
  }, []);

  return { categories, setCategories, loading, error };
};

export default useFetchCategories;
