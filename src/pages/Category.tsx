import { Link } from "react-router-dom";
import CategoriesTable from "../components/categories/CategoriesTable";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useFetchCategories from "../hooks/useFetchCategories";

const Category = () => {
  const notify = () => toast.success("Catégorie supprimée");
  const { categories, setCategories, loading, error } = useFetchCategories();
  if (error) console.log(error);

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
        {loading ? (
          "Chargement des catégories..."
        ) : (
          <CategoriesTable
            categories={categories}
            handleDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
};

export default Category;
