import Button from "../../components/UI/Button";
import { adminRecordType } from "../../types/types";

interface adminTableProps {
  adminRecords: adminRecordType[] | null;
  currentAdminEmail: string;
  handleDelete: (
    id: number | undefined,
    isSuperAdmin: boolean,
    email: string
  ) => void;
}

const AdminTable = ({
  adminRecords,
  currentAdminEmail,
  handleDelete,
}: adminTableProps) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-md">
          <tr>
            <th scope="col" className="px-6 py-3">
              NOM
            </th>
            <th scope="col" className="px-6 py-3">
              PRENOM
            </th>
            <th scope="col" className="px-6 py-3">
              EMAIL
            </th>
            <th scope="col" className="px-6 py-3">
              ACTIONS
            </th>
          </tr>
        </thead>
        <tbody>
          {adminRecords &&
            adminRecords.map((admin) => (
              <tr
                key={admin.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {admin.lastName}
                </th>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {admin.firstName}
                </th>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {admin.email}
                </th>
                <td className="px-6 py-4">
                  <div className="flex gap-5">
                    <Button
                      type="warning"
                      link={true}
                      to={`/dashboard/admin/${admin.id}`}
                    >
                      Modifier
                    </Button>
                    <Button
                      type="danger"
                      disabled={admin.email === currentAdminEmail}
                      onClick={() =>
                        handleDelete(admin.id, admin.isSuperAdmin, admin.email)
                      }
                      className="flex justify-center cursor-pointer items-center bg-red-500 text-white p-3 rounded"
                    >
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

export default AdminTable;
