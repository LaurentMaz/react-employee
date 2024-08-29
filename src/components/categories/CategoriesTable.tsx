import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { ICategories } from "../../types/types";

interface CategoriesTableProps {
  categories: ICategories[];
  handleDelete: (id: number) => void;
}

const CategoriesTable = ({
  categories,
  handleDelete,
}: CategoriesTableProps) => {
  return (
    <div className="flex flex-col gap-5 ">
      {categories.map((cat) => (
        <div
          key={cat.id}
          className="flex gap-5 w-full border rounded-xl px-5 py-4 shadow-lg justify-between"
        >
          <div className="font-medium flex items-center justify-center">
            {cat.name}
          </div>
          <div className="flex gap-3">
            <div className="flex justify-center cursor-pointer items-center bg-amber-400 text-white p-3 rounded ">
              <FaEdit />
              <Link to={`/dashboard/category/${cat.id}/${cat.name}`}>
                Modifier
              </Link>
            </div>
            <div
              className="flex justify-center cursor-pointer items-center bg-red-500 text-white p-3 rounded"
              onClick={() => handleDelete(cat.id)}
            >
              <MdDelete />
              Supprimer
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoriesTable;
