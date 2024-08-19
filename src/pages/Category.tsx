import { Link } from "react-router-dom";
import CategoriesTable from "../components/CategoriesTable";
import { useEffect } from "react";

const Category = () => {
  useEffect(() => {}, []);

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
      <div>
        <CategoriesTable />
      </div>
    </div>
  );
};

export default Category;
