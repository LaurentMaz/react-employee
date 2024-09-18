import { toast } from "react-toastify";
import useFetchCategories from "../../hooks/useFetchCategories";
import axios from "axios";
import AdminCategoryView from "./adminCategory.view";

const AdminCategoryController = () => {
  const notify = () => toast.success("Catégorie supprimée");
  const { categories, setCategories, loading, error } = useFetchCategories();
  if (error) console.log(error);

  const handleDelete = (id: number) => {
    axios
      .delete(`http://localhost:3000/auth/remove_category/${id}`)
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
    <>
      <AdminCategoryView
        handleDelete={handleDelete}
        loading={loading}
        categories={categories}
      />
    </>
  );
};

export default AdminCategoryController;
