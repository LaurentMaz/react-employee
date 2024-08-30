import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { ICategories } from "../../types/types";
import Button from "../UI/Button";

interface CategoriesTableProps {
  categories: ICategories[];
  handleDelete: (id: number) => void;
}

const CategoriesTable = ({
  categories,
  handleDelete,
}: CategoriesTableProps) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5 w-full ">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-md">
          <tr>
            <th scope="col" className="px-6 py-3">
              Nom
            </th>
            <th scope="col" className="px-6 py-3">
              ACTIONS
            </th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr
              key={cat.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 gap-5 w-full border rounded-xl px-5 py-4 shadow-lg justify-between"
            >
              <td
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white w-[75%]"
              >
                {cat.name}
              </td>

              <td className="px-6 py-4">
                <div className="flex gap-5">
                  <Button
                    type="warning"
                    link
                    to={`/dashboard/category/${cat.id}/${cat.name}`}
                  >
                    Modifier
                  </Button>
                  <Button type="danger" onClick={() => handleDelete(cat.id)}>
                    Supprimer
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriesTable;
