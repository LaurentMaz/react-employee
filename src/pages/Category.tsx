import { Link } from "react-router-dom";
import CategoriesTable from "../components/categories/CategoriesTable";
import { useEffect, useState } from "react";
import axios from "axios";
import { ICategories } from "../types/types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Category = () => {
  const [categories, setCategories] = useState<ICategories[]>([]);
  const notify = () => toast.success("Catégorie supprimée");

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

  const handleDelete = (id: number) => {
    axios
      .post("http://localhost:3000/auth/remove_category", { id })
      .then((result) => {
        if (result.data.Status) {
          setCategories(categories.filter((category) => category.id !== id));
          notify();
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

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
        <CategoriesTable categories={categories} handleDelete={handleDelete} />
        <ToastContainer position="bottom-right" />
      </div>
    </div>
  );
};

export default Category;
