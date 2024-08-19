import { Link } from "react-router-dom";
import CategoriesTable from "../components/categories/CategoriesTable";
import { useEffect, useState } from "react";
import axios from "axios";

const Category = () => {
  const [categories, setCategories] = useState<[]>([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/category")
      .then((result) => {
        if (result.data.Status) {
          setCategories(result.data.Result);
          console.log(result.data.Result);
        } else {
          console.log(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="flex h-full flex-col items-center justify-start mt-16 gap-10">
      <div className="flex flex-col items-center justify-center">
        <h3 className="mb-5 text-3xl font-bold">Liste des catégories</h3>
        <Link
          className="bg-teal-500 hover:bg-teal-400 rounded p-2 font-bold text-white"
          to="/dashboard/add_category"
        >
          Ajouter une catégorie
        </Link>
      </div>
      <div className="w-[80%]">
        <CategoriesTable categories={categories} />
      </div>
    </div>
  );
};

export default Category;
