import Button from "../../components/UI/Button";
import Container from "../../components/UI/Container";
import { ICategories } from "../../types/types";
import CategoriesTable from "./CategoriesTable";

interface adminCategoryViewProps {
  loading: boolean;
  categories: ICategories[];
  handleDelete: (id: number) => void;
}

const AdminCategoryView = ({
  loading,
  categories,
  handleDelete,
}: adminCategoryViewProps) => {
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

export default AdminCategoryView;
