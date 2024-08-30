import CategoriesTable from "../../components/categories/CategoriesTable";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useFetchCategories from "../../hooks/useFetchCategories";
import Container from "../../components/UI/Container";
import Button from "../../components/UI/Button";

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
          alert(result.data.ErrorMessage);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container className="flex h-full flex-col items-center justify-start mt-16 gap-10">
      <div className="flex items-center justify-between w-full">
        <h3 className="mb-5 text-3xl font-bold">Liste des catégories</h3>
        <Button type="main" link={true} to="/dashboard/add_category">
          Ajouter une catégorie
        </Button>
      </div>
      <div className="w-full">
        {loading ? (
          "Chargement des catégories..."
        ) : (
          <CategoriesTable
            categories={categories}
            handleDelete={handleDelete}
          />
        )}
      </div>
    </Container>
  );
};

export default Category;
