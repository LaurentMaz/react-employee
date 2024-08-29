import axios from "axios";
import { useEffect, useState } from "react";
import { adminRecordType } from "../../types/types";
import { toast } from "react-toastify";
import useFetchCurrentAdmin from "../../hooks/useFetchCurrentAdmin";
import Button from "../UI/Button";

const AdminTable = () => {
  const { currentAdminEmail } = useFetchCurrentAdmin();
  const [adminRecords, setAdminRecords] = useState<adminRecordType[] | null>();

  const handleDelete = (
    id: number | undefined,
    isSuperAdmin: boolean,
    email: string
  ) => {
    if (id !== undefined) {
      axios
        .request({
          url: `http://localhost:3000/auth/delete_admin/${id}`,
          method: "put",
          data: { isSuperAdmin: isSuperAdmin, email: email },
        })
        .then((result) => {
          if (result.data.Status) {
            toast.success("Admin supprimé");
            adminRecords &&
              setAdminRecords(
                adminRecords.filter(
                  (adminRecord) => adminRecord.email !== email
                )
              );
          } else {
            toast.error(result.data.Error);
          }
        })
        .catch((err) => alert(err));
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/admin_records")
      .then((result) => {
        if (result.data.Status) setAdminRecords(result.data.Result);
      })
      .catch((err) => console.log(err));
  }, []);

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
